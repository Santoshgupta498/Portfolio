import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
  NgZone,
  inject,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { AnimationService } from '../../../core/services/animation.service';
import { ThemeService } from '../../../core/services/theme.service';

interface NeuralNode {
  mesh: THREE.Mesh;
  basePosition: THREE.Vector3;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
  pulsePhase: number;
}

interface ConnectionLine {
  line: THREE.Line;
  nodeA: number;
  nodeB: number;
  opacity: number;
}

@Component({
  selector: 'app-ai-scene',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ai-scene" #sceneContainer>
      <canvas #canvas class="ai-scene__canvas"></canvas>
    </div>
  `,
  styles: [`
    .ai-scene {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 400px;
    }

    .ai-scene__canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `]
})
export class AiSceneComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('sceneContainer', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  @Input() particleCount = 200;
  @Input() nodeCount = 12;

  private ngZone = inject(NgZone);
  private animationService = inject(AnimationService);
  private themeService = inject(ThemeService);

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationFrameId = 0;
  private clock = new THREE.Clock();

  private neuralNodes: NeuralNode[] = [];
  private connections: ConnectionLine[] = [];
  private particles!: THREE.Points;
  private coreGroup!: THREE.Group;
  private rings: THREE.Mesh[] = [];

  private targetCameraX = 0;
  private targetCameraY = 0;
  private currentCameraX = 0;
  private currentCameraY = 0;

  private resizeObserver?: ResizeObserver;
  private isDestroyed = false;

  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    this.ngZone.runOutsideAngular(() => {
      this.initScene();
      this.createAICore();
      this.createNeuralNodes();
      this.createConnections();
      this.createParticles();
      this.createOrbitalRings();
      this.setupLighting();
      this.startAnimation();
      this.setupResize();
    });
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.resizeObserver?.disconnect();
    this.disposeScene();
  }

  private initScene(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = this.containerRef.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    const dpr = Math.min(window.devicePixelRatio, 2);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0);

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 8);
  }

  private createAICore(): void {
    this.coreGroup = new THREE.Group();

    // Central glowing sphere
    const coreGeo = new THREE.IcosahedronGeometry(0.6, 2);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x00d4ff,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.7,
      wireframe: true
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    this.coreGroup.add(coreMesh);

    // Inner solid core
    const innerGeo = new THREE.IcosahedronGeometry(0.35, 1);
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.6
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    this.coreGroup.add(innerMesh);

    // Outer glow sphere
    const glowGeo = new THREE.SphereGeometry(0.9, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.05
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    this.coreGroup.add(glowMesh);

    this.scene.add(this.coreGroup);
  }

  private createNeuralNodes(): void {
    const count = this.animationService.getParticleCount(this.nodeCount);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2 + Math.random() * 2;
      const height = (Math.random() - 0.5) * 3;

      const position = new THREE.Vector3(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );

      const nodeGeo = new THREE.SphereGeometry(0.06 + Math.random() * 0.04, 8, 8);
      const nodeMat = new THREE.MeshPhongMaterial({
        color: i % 3 === 0 ? 0x8b5cf6 : 0x00d4ff,
        emissive: i % 3 === 0 ? 0x8b5cf6 : 0x00d4ff,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.8
      });
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.copy(position);

      this.scene.add(mesh);
      this.neuralNodes.push({
        mesh,
        basePosition: position.clone(),
        orbitRadius: radius,
        orbitSpeed: 0.1 + Math.random() * 0.3,
        orbitOffset: angle,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
  }

  private createConnections(): void {
    const nodeCount = this.neuralNodes.length;
    const maxConnections = Math.min(nodeCount * 2, 24);

    for (let i = 0; i < maxConnections; i++) {
      const a = Math.floor(Math.random() * nodeCount);
      let b = Math.floor(Math.random() * nodeCount);
      if (b === a) b = (a + 1) % nodeCount;

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(6);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.LineBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.1
      });

      const line = new THREE.Line(geometry, material);
      this.scene.add(line);

      this.connections.push({
        line,
        nodeA: a,
        nodeB: b,
        opacity: 0.05 + Math.random() * 0.1
      });
    }
  }

  private createParticles(): void {
    const count = this.animationService.getParticleCount(this.particleCount);
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 1 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.02,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private createOrbitalRings(): void {
    const ringRadii = [2.5, 3.2, 4.0];

    ringRadii.forEach((radius, i) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.005, 8, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.08 - i * 0.02
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2 + (i * 0.3 - 0.3);
      ring.rotation.z = i * 0.4;
      this.scene.add(ring);
      this.rings.push(ring);
    });
  }

  private setupLighting(): void {
    const ambient = new THREE.AmbientLight(0x404060, 0.5);
    this.scene.add(ambient);

    const point1 = new THREE.PointLight(0x00d4ff, 1, 15);
    point1.position.set(3, 3, 3);
    this.scene.add(point1);

    const point2 = new THREE.PointLight(0x8b5cf6, 0.6, 12);
    point2.position.set(-3, -2, 2);
    this.scene.add(point2);

    const point3 = new THREE.PointLight(0x00d4ff, 0.4, 10);
    point3.position.set(0, 0, 0);
    this.scene.add(point3);
  }

  private startAnimation(): void {
    const animate = () => {
      if (this.isDestroyed) return;
      this.animationFrameId = requestAnimationFrame(animate);

      if (!this.animationService.isTabVisible()) return;
      if (this.animationService.prefersReducedMotion()) {
        this.renderer.render(this.scene, this.camera);
        return;
      }

      const elapsed = this.clock.getElapsedTime();
      const delta = this.clock.getDelta();

      this.updateCamera();
      this.updateCore(elapsed);
      this.updateNodes(elapsed);
      this.updateConnections();
      this.updateParticles(elapsed);
      this.updateRings(elapsed);

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  private updateCamera(): void {
    const mouse = this.themeService.getNormalizedMouse();
    this.targetCameraX = mouse.x * 0.5;
    this.targetCameraY = mouse.y * 0.3;

    this.currentCameraX += (this.targetCameraX - this.currentCameraX) * 0.02;
    this.currentCameraY += (this.targetCameraY - this.currentCameraY) * 0.02;

    this.camera.position.x = this.currentCameraX;
    this.camera.position.y = this.currentCameraY;
    this.camera.lookAt(0, 0, 0);
  }

  private updateCore(time: number): void {
    if (!this.coreGroup) return;
    this.coreGroup.rotation.y = time * 0.2;
    this.coreGroup.rotation.x = Math.sin(time * 0.3) * 0.1;

    // Pulse the core
    const scale = 1 + Math.sin(time * 2) * 0.03;
    this.coreGroup.scale.set(scale, scale, scale);
  }

  private updateNodes(time: number): void {
    this.neuralNodes.forEach((node) => {
      const angle = node.orbitOffset + time * node.orbitSpeed * 0.3;
      node.mesh.position.x = Math.cos(angle) * node.orbitRadius;
      node.mesh.position.z = Math.sin(angle) * node.orbitRadius;
      node.mesh.position.y = node.basePosition.y + Math.sin(time + node.pulsePhase) * 0.2;

      // Pulse opacity
      const mat = node.mesh.material as THREE.MeshPhongMaterial;
      mat.opacity = 0.6 + Math.sin(time * 2 + node.pulsePhase) * 0.2;
    });
  }

  private updateConnections(): void {
    this.connections.forEach((conn) => {
      const posA = this.neuralNodes[conn.nodeA]?.mesh.position;
      const posB = this.neuralNodes[conn.nodeB]?.mesh.position;
      if (!posA || !posB) return;

      const positions = conn.line.geometry.getAttribute('position') as THREE.BufferAttribute;
      positions.setXYZ(0, posA.x, posA.y, posA.z);
      positions.setXYZ(1, posB.x, posB.y, posB.z);
      positions.needsUpdate = true;

      // Fade based on distance
      const dist = posA.distanceTo(posB);
      const mat = conn.line.material as THREE.LineBasicMaterial;
      mat.opacity = Math.max(0, conn.opacity * (1 - dist / 6));
    });
  }

  private updateParticles(time: number): void {
    if (!this.particles) return;
    this.particles.rotation.y = time * 0.03;
    this.particles.rotation.x = time * 0.01;
  }

  private updateRings(time: number): void {
    this.rings.forEach((ring, i) => {
      ring.rotation.z += 0.001 * (i + 1);
      ring.rotation.x += 0.0005 * (i + 1);
    });
  }

  private setupResize(): void {
    this.resizeObserver = new ResizeObserver((entries) => {
      if (this.isDestroyed) return;
      const entry = entries[0];
      if (!entry) return;

      const { width, height } = entry.contentRect;
      if (width === 0 || height === 0) return;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });

    this.resizeObserver.observe(this.containerRef.nativeElement);
  }

  private disposeScene(): void {
    // Dispose all geometries and materials
    this.scene?.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
        object.geometry?.dispose();
        if (object.material instanceof THREE.Material) {
          object.material.dispose();
        } else if (Array.isArray(object.material)) {
          object.material.forEach(m => m.dispose());
        }
      }
    });

    this.renderer?.dispose();
  }
}
