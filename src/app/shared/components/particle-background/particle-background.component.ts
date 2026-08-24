import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../../../core/services/animation.service';

@Component({
  selector: 'app-particle-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-system" aria-hidden="true">
      <!-- Deep gradient base -->
      <div class="bg-system__gradient"></div>

      <!-- Subtle radial ambient glows -->
      <div class="bg-system__glow bg-system__glow--1"></div>
      <div class="bg-system__glow bg-system__glow--2"></div>
      <div class="bg-system__glow bg-system__glow--3"></div>

      <!-- Perspective cyber grid -->
      <div class="bg-system__grid"></div>

      <!-- CSS Particles (lightweight) -->
      <div class="bg-system__particles" *ngIf="shouldAnimate">
        <span
          *ngFor="let p of particles"
          class="bg-system__particle"
          [style.left]="p.x + '%'"
          [style.top]="p.y + '%'"
          [style.animation-delay]="p.delay + 's'"
          [style.animation-duration]="p.duration + 's'"
          [style.width.px]="p.size"
          [style.height.px]="p.size"
          [style.opacity]="p.opacity"
        ></span>
      </div>

      <!-- Subtle scan lines -->
      <div class="bg-system__scanlines" *ngIf="shouldAnimate"></div>

      <!-- Occasional light streaks -->
      <div class="bg-system__streaks" *ngIf="shouldAnimate">
        <span class="bg-system__streak bg-system__streak--1"></span>
        <span class="bg-system__streak bg-system__streak--2"></span>
      </div>
    </div>
  `,
  styles: [`
    .bg-system {
      position: fixed;
      inset: 0;
      z-index: var(--z-background);
      overflow: hidden;
      pointer-events: none;
    }

    .bg-system__gradient {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse at 20% 50%, rgba(0, 212, 255, 0.015) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.01) 0%, transparent 40%),
        radial-gradient(ellipse at 50% 100%, rgba(0, 0, 0, 0.5) 0%, transparent 50%),
        linear-gradient(180deg, #050507 0%, #0a0a0f 50%, #050507 100%);
    }

    .bg-system__glow {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);

      &--1 {
        top: 10%;
        left: 15%;
        width: 400px;
        height: 400px;
        background: rgba(0, 212, 255, 0.02);
        animation: floatGlow 20s ease-in-out infinite;
      }

      &--2 {
        bottom: 20%;
        right: 10%;
        width: 350px;
        height: 350px;
        background: rgba(139, 92, 246, 0.015);
        animation: floatGlow 25s ease-in-out infinite reverse;
      }

      &--3 {
        top: 60%;
        left: 50%;
        width: 500px;
        height: 500px;
        background: rgba(0, 212, 255, 0.01);
        animation: floatGlow 30s ease-in-out infinite;
        animation-delay: -10s;
      }
    }

    .bg-system__grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
      background-size: 60px 60px;
      transform: perspective(500px) rotateX(60deg);
      transform-origin: center top;
      opacity: 0.3;
      mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.1) 70%, transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.1) 70%, transparent 100%);
    }

    .bg-system__particles {
      position: absolute;
      inset: 0;
    }

    .bg-system__particle {
      position: absolute;
      border-radius: 50%;
      background: var(--accent-cyan);
      animation: particleFloat linear infinite;
    }

    .bg-system__scanlines {
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.03) 2px,
        rgba(0, 0, 0, 0.03) 4px
      );
      opacity: 0.4;
    }

    .bg-system__streaks {
      position: absolute;
      inset: 0;
    }

    .bg-system__streak {
      position: absolute;
      width: 200px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.15), transparent);
      animation: streak 8s linear infinite;

      &--1 {
        top: 30%;
        animation-delay: 0s;
      }

      &--2 {
        top: 70%;
        animation-delay: 4s;
        width: 150px;
        background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);
        animation-duration: 10s;
      }
    }

    @keyframes floatGlow {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(20px, -30px) scale(1.05); }
      50% { transform: translate(-10px, 20px) scale(0.95); }
      75% { transform: translate(15px, 10px) scale(1.02); }
    }

    @keyframes particleFloat {
      0% {
        transform: translateY(100vh) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: var(--particle-opacity, 0.3);
      }
      90% {
        opacity: var(--particle-opacity, 0.3);
      }
      100% {
        transform: translateY(-20px) translateX(20px);
        opacity: 0;
      }
    }

    @keyframes streak {
      0% {
        left: -200px;
        opacity: 0;
      }
      5% {
        opacity: 1;
      }
      95% {
        opacity: 1;
      }
      100% {
        left: calc(100% + 200px);
        opacity: 0;
      }
    }
  `]
})
export class ParticleBackgroundComponent implements OnInit, OnDestroy {
  private animationService = inject(AnimationService);

  shouldAnimate = true;
  particles: { x: number; y: number; delay: number; duration: number; size: number; opacity: number }[] = [];

  ngOnInit(): void {
    this.shouldAnimate = !this.animationService.prefersReducedMotion();
    this.generateParticles();
  }

  ngOnDestroy(): void {}

  private generateParticles(): void {
    const count = this.animationService.getParticleCount(20);
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 15 + Math.random() * 20,
      size: 1 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.3
    }));
  }
}
