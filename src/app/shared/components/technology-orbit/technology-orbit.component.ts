import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Technology } from '../../../core/models/portfolio.models';
import { AnimationService } from '../../../core/services/animation.service';

@Component({
  selector: 'app-technology-orbit',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tech-orbit" [class.tech-orbit--mobile]="isMobile">
      <!-- Desktop: Orbital visualization -->
      <div class="tech-orbit__scene" *ngIf="!isMobile">
        <div class="tech-orbit__core">
          <span class="tech-orbit__core-text">.NET<br>ENGINEER</span>
          <div class="tech-orbit__core-ring"></div>
          <div class="tech-orbit__core-ring tech-orbit__core-ring--2"></div>
        </div>

        <div
          *ngFor="let tech of technologies; let i = index"
          class="tech-orbit__node"
          [style.--orbit-radius]="tech.orbitRadius + 'px'"
          [style.--orbit-speed]="tech.orbitSpeed"
          [style.--orbit-offset]="getOrbitOffset(i)"
          [style.--orbit-tilt]="getOrbitTilt(i) + 'deg'"
          [class.tech-orbit__node--active]="activeTech === tech.name"
          (mouseenter)="activeTech = tech.name"
          (mouseleave)="activeTech = null"
        >
          <div class="tech-orbit__node-inner">
            <span class="tech-orbit__node-name">{{ tech.name }}</span>
          </div>
          <div class="tech-orbit__tooltip" *ngIf="activeTech === tech.name">
            <span class="tech-orbit__tooltip-category">{{ tech.category }}</span>
            <span class="tech-orbit__tooltip-desc">{{ tech.description }}</span>
          </div>
        </div>

        <!-- Orbit rings (decorative) -->
        <div class="tech-orbit__ring" *ngFor="let r of orbitRings" [style.--ring-size]="r + 'px'"></div>
      </div>

      <!-- Mobile: Card grid -->
      <div class="tech-orbit__grid" *ngIf="isMobile">
        <div
          *ngFor="let tech of technologies"
          class="tech-orbit__card"
          (click)="activeTech = activeTech === tech.name ? null : tech.name"
        >
          <span class="tech-orbit__card-name">{{ tech.name }}</span>
          <span class="tech-orbit__card-cat">{{ tech.category }}</span>
          <span class="tech-orbit__card-desc" *ngIf="activeTech === tech.name">{{ tech.description }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tech-orbit {
      position: relative;
      width: 100%;
    }

    .tech-orbit__scene {
      position: relative;
      width: 100%;
      height: 600px;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (max-width: 1024px) {
        height: 450px;
      }
    }

    .tech-orbit__core {
      position: absolute;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: radial-gradient(circle, var(--accent-cyan-dim), transparent);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 5;
    }

    .tech-orbit__core-text {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--accent-cyan);
      text-align: center;
      line-height: 1.4;
    }

    .tech-orbit__core-ring {
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      border: 1px solid rgba(0, 212, 255, 0.2);
      animation: pulse 3s ease-in-out infinite;

      &--2 {
        inset: -20px;
        border-color: rgba(0, 212, 255, 0.1);
        animation-delay: 1s;
      }
    }

    .tech-orbit__node {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%)
                 rotate(calc(var(--orbit-offset) * 360deg))
                 translateX(var(--orbit-radius))
                 rotate(calc(var(--orbit-offset) * -360deg));
      animation: orbitRotate calc(30s / var(--orbit-speed)) linear infinite;
      z-index: 3;
      cursor: pointer;

      &--active {
        animation-play-state: paused;
        z-index: 10;

        .tech-orbit__node-inner {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 20px var(--accent-cyan-dim);
          transform: scale(1.15);
        }
      }
    }

    .tech-orbit__node-inner {
      padding: 6px 14px;
      background: rgba(10, 10, 15, 0.9);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      transition: all var(--duration-normal) var(--ease-out);
      white-space: nowrap;
    }

    .tech-orbit__node-name {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.05em;
      color: var(--text-secondary);
    }

    .tech-orbit__node--active .tech-orbit__node-name {
      color: var(--accent-cyan);
    }

    .tech-orbit__tooltip {
      position: absolute;
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      background: rgba(10, 10, 15, 0.95);
      border: 1px solid var(--border-accent);
      border-radius: var(--radius-md);
      padding: var(--space-sm) var(--space-md);
      white-space: nowrap;
      z-index: 20;
      animation: fadeIn var(--duration-fast) var(--ease-out);
    }

    .tech-orbit__tooltip-category {
      display: block;
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--accent-cyan);
      margin-bottom: 2px;
    }

    .tech-orbit__tooltip-desc {
      font-size: var(--text-xs);
      color: var(--text-secondary);
    }

    .tech-orbit__ring {
      position: absolute;
      left: 50%;
      top: 50%;
      width: var(--ring-size);
      height: var(--ring-size);
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.03);
      pointer-events: none;
    }

    @keyframes orbitRotate {
      from { transform: translate(-50%, -50%) rotate(calc(var(--orbit-offset) * 360deg)) translateX(var(--orbit-radius)) rotate(calc(var(--orbit-offset) * -360deg + 0deg)); }
      to { transform: translate(-50%, -50%) rotate(calc(var(--orbit-offset) * 360deg + 360deg)) translateX(var(--orbit-radius)) rotate(calc(var(--orbit-offset) * -360deg - 360deg)); }
    }

    // Mobile grid
    .tech-orbit__grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-sm);
    }

    .tech-orbit__card {
      background: var(--surface-glass);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: var(--space-md);
      cursor: pointer;
      transition: all var(--duration-fast) var(--ease-out);

      &:hover, &:focus {
        border-color: var(--border-accent);
        background: var(--accent-cyan-dim);
      }
    }

    .tech-orbit__card-name {
      display: block;
      font-family: var(--font-mono);
      font-size: var(--text-sm);
      font-weight: 500;
      color: var(--text-primary);
      margin-bottom: 2px;
    }

    .tech-orbit__card-cat {
      font-size: 10px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-muted);
    }

    .tech-orbit__card-desc {
      display: block;
      margin-top: var(--space-xs);
      font-size: var(--text-xs);
      color: var(--text-secondary);
    }
  `]
})
export class TechnologyOrbitComponent implements OnInit, OnDestroy {
  @Input() technologies: Technology[] = [];

  private animationService = inject(AnimationService);

  activeTech: string | null = null;
  isMobile = false;
  orbitRings = [240, 320, 400, 500];

  private resizeObserver?: ResizeObserver;

  ngOnInit(): void {
    this.checkMobile();
    if (typeof window !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.checkMobile());
      this.resizeObserver.observe(document.body);
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  private checkMobile(): void {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth < 768;
    }
  }

  getOrbitOffset(index: number): string {
    return (index / this.technologies.length).toFixed(4);
  }

  getOrbitTilt(index: number): number {
    return (index % 3) * 15 - 15;
  }
}
