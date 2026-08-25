import { Component, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { ScrollService } from '../../core/services/scroll.service';

interface ArchNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  layer: string;
}

interface ArchConnection {
  from: string;
  to: string;
}

@Component({
  selector: 'app-architecture-lab',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent],
  template: `
    <section id="architecture" class="arch section" #archSection>
      <div class="container">
        <app-section-heading
          label="ARCHITECTURE LAB"
          title="System"
          highlight="Architecture"
          subtitle="How I think about building scalable, observable, and intelligent distributed systems."
          align="center"
        ></app-section-heading>

        <!-- Architecture diagram -->
        <div class="arch__diagram reveal">
          <div class="arch__canvas">
            <!-- SVG Connections -->
            <svg class="arch__svg" viewBox="0 0 900 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <defs>
                <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="rgba(0,212,255,0.3)"/>
                  <stop offset="50%" stop-color="rgba(0,212,255,0.6)"/>
                  <stop offset="100%" stop-color="rgba(0,212,255,0.3)"/>
                </linearGradient>
              </defs>
              <g *ngFor="let conn of connections">
                <line
                  class="arch__connection"
                  [attr.x1]="getNode(conn.from)?.x"
                  [attr.y1]="getNode(conn.from)?.y"
                  [attr.x2]="getNode(conn.to)?.x"
                  [attr.y2]="getNode(conn.to)?.y"
                  stroke="url(#connGrad)"
                  stroke-width="1"
                />
              </g>
              <!-- Animated data packets -->
              <g *ngFor="let conn of animatedConnections; let i = index">
                <circle
                  class="arch__packet"
                  r="3"
                  fill="#00d4ff"
                  [style.animation-delay]="(i * 0.8) + 's'"
                >
                  <animateMotion
                    [attr.dur]="(2 + i * 0.5) + 's'"
                    repeatCount="indefinite"
                    [attr.path]="getPathD(conn.from, conn.to)"
                  />
                </circle>
              </g>
            </svg>

            <!-- Nodes -->
            <div
              *ngFor="let node of nodes"
              class="arch__node"
              [style.left]="(node.x / 900 * 100) + '%'"
              [style.top]="(node.y / 500 * 100) + '%'"
              [style.--node-color]="node.color"
            >
              <span class="arch__node-dot"></span>
              <span class="arch__node-label">{{ node.label }}</span>
            </div>
          </div>

          <!-- Labels -->
          <div class="arch__labels">
            <span class="arch__badge" *ngFor="let badge of badges">{{ badge }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    .arch__diagram {
      margin-top: var(--space-xl);
    }

    .arch__canvas {
      position: relative;
      width: 100%;
      max-width: 900px;
      aspect-ratio: 900 / 500;
      margin: 0 auto;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      background: rgba(5, 5, 7, 0.6);
      overflow: hidden;
    }

    .arch__svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .arch__connection {
      opacity: 0.4;
    }

    .arch__packet {
      opacity: 0.8;
      filter: drop-shadow(0 0 4px rgba(0, 212, 255, 0.8));
    }

    .arch__node {
      position: absolute;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: rgba(10, 10, 15, 0.9);
      border: 1px solid var(--node-color, var(--border-subtle));
      border-radius: var(--radius-sm);
      transition: all var(--duration-fast) var(--ease-out);
      cursor: default;
      z-index: 2;

      @media (max-width: 600px) {
        padding: 4px 8px;
        gap: 4px;
      }

      &:hover {
        border-color: var(--node-color);
        box-shadow: 0 0 15px color-mix(in srgb, var(--node-color) 30%, transparent);
        transform: translate(-50%, -50%) scale(1.05);
      }
    }

    .arch__node-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--node-color, var(--accent-cyan));
      box-shadow: 0 0 4px var(--node-color, var(--accent-cyan));

      @media (max-width: 600px) {
        width: 5px;
        height: 5px;
      }
    }

    .arch__node-label {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-secondary);
      white-space: nowrap;

      @media (max-width: 600px) {
        font-size: 8px;
        letter-spacing: 0.04em;
      }
    }

    .arch__labels {
      display: flex;
      justify-content: center;
      gap: var(--space-md);
      margin-top: var(--space-xl);
      flex-wrap: wrap;
    }

    .arch__badge {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 6px 14px;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      color: var(--text-muted);
      transition: all var(--duration-fast);

      &:hover {
        border-color: var(--accent-cyan-dim);
        color: var(--accent-cyan);
        background: var(--accent-cyan-dim);
      }
    }
  `]
})
export class ArchitectureLabComponent implements AfterViewInit {
  @ViewChild('archSection', { static: true }) archSection!: ElementRef;
  private scrollService = inject(ScrollService);

  nodes: ArchNode[] = [
    { id: 'frontend', label: 'Frontend', x: 450, y: 60, color: '#3b82f6', layer: 'presentation' },
    { id: 'gateway', label: 'API Gateway', x: 450, y: 140, color: '#00d4ff', layer: 'edge' },
    { id: 'auth', label: 'Authentication', x: 700, y: 140, color: '#f59e0b', layer: 'security' },
    { id: 'service1', label: 'User Service', x: 250, y: 240, color: '#8b5cf6', layer: 'services' },
    { id: 'service2', label: 'Order Service', x: 450, y: 240, color: '#8b5cf6', layer: 'services' },
    { id: 'service3', label: 'AI Service', x: 650, y: 240, color: '#10b981', layer: 'services' },
    { id: 'bus', label: 'Message Broker', x: 450, y: 330, color: '#f97316', layer: 'messaging' },
    { id: 'db', label: 'Database', x: 250, y: 420, color: '#06b6d4', layer: 'data' },
    { id: 'cache', label: 'Cache', x: 450, y: 420, color: '#ec4899', layer: 'data' },
    { id: 'monitor', label: 'Monitoring', x: 650, y: 420, color: '#84cc16', layer: 'observability' },
    { id: 'cloud', label: 'Cloud', x: 150, y: 140, color: '#06b6d4', layer: 'infra' },
  ];

  connections: ArchConnection[] = [
    { from: 'frontend', to: 'gateway' },
    { from: 'gateway', to: 'auth' },
    { from: 'gateway', to: 'service1' },
    { from: 'gateway', to: 'service2' },
    { from: 'gateway', to: 'service3' },
    { from: 'service1', to: 'bus' },
    { from: 'service2', to: 'bus' },
    { from: 'service3', to: 'bus' },
    { from: 'service1', to: 'db' },
    { from: 'service2', to: 'cache' },
    { from: 'service3', to: 'monitor' },
    { from: 'cloud', to: 'gateway' },
  ];

  animatedConnections: ArchConnection[] = [
    { from: 'frontend', to: 'gateway' },
    { from: 'gateway', to: 'service2' },
    { from: 'service2', to: 'bus' },
    { from: 'service1', to: 'db' },
    { from: 'gateway', to: 'service3' },
  ];

  badges = ['SCALABLE', 'SECURE', 'OBSERVABLE', 'AI-READY', 'CLOUD-NATIVE'];

  ngAfterViewInit(): void {
    this.scrollService.registerSection('architecture', this.archSection.nativeElement);
  }

  getNode(id: string): ArchNode | undefined {
    return this.nodes.find(n => n.id === id);
  }

  getPathD(fromId: string, toId: string): string {
    const from = this.getNode(fromId);
    const to = this.getNode(toId);
    if (!from || !to) return '';
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  }
}
