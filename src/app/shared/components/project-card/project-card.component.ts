import { Component, Input, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article
      class="project-card"
      [style.--tilt-x]="tiltX + 'deg'"
      [style.--tilt-y]="tiltY + 'deg'"
      [style.--glow-x]="glowX + '%'"
      [style.--glow-y]="glowY + '%'"
    >
      <div class="project-card__header">
        <span class="project-card__category">{{ project.category }}</span>
        <span class="project-card__year">{{ project.year }}</span>
      </div>

      <h3 class="project-card__title">{{ project.name }}</h3>
      <p class="project-card__desc">{{ project.shortDescription }}</p>

      <div class="project-card__tech">
        <span *ngFor="let tech of project.technologies.slice(0, 5)" class="project-card__tech-tag">
          {{ tech }}
        </span>
      </div>

      <div class="project-card__features">
        <span *ngFor="let feature of project.features.slice(0, 3)" class="project-card__feature">
          <span class="project-card__feature-dot"></span>
          {{ feature }}
        </span>
      </div>

      <div class="project-card__actions">
        <a *ngIf="project.liveUrl" [href]="project.liveUrl" class="project-card__link" target="_blank" rel="noopener noreferrer" [attr.aria-label]="'View live demo of ' + project.name">
          Live Demo
        </a>
        <a *ngIf="project.githubUrl" [href]="project.githubUrl" class="project-card__link project-card__link--secondary" target="_blank" rel="noopener noreferrer" [attr.aria-label]="'View source code of ' + project.name">
          Source Code
        </a>
      </div>

      <div class="project-card__glow"></div>
      <div class="project-card__border"></div>
    </article>
  `,
  styles: [`
    .project-card {
      position: relative;
      background: var(--gradient-card);
      border-radius: var(--radius-lg);
      padding: var(--space-xl);
      overflow: hidden;
      transform: perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
      transition: transform var(--duration-normal) var(--ease-out),
                  box-shadow var(--duration-normal) var(--ease-out);
      display: flex;
      flex-direction: column;
      height: 100%;

      @media (max-width: 600px) {
        padding: var(--space-lg);
      }

      &:hover {
        box-shadow: var(--shadow-lg), 0 0 40px rgba(0, 212, 255, 0.05);
      }

      &:hover .project-card__glow {
        opacity: 1;
      }

      &:hover .project-card__border {
        border-color: var(--border-accent);
      }
    }

    .project-card__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-md);
    }

    .project-card__category {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--accent-cyan);
      padding: 4px 10px;
      border: 1px solid var(--accent-cyan-dim);
      border-radius: var(--radius-full);
    }

    .project-card__year {
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      color: var(--text-muted);
    }

    .project-card__title {
      font-size: var(--text-xl);
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: var(--space-sm);
    }

    .project-card__desc {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: var(--space-lg);
    }

    .project-card__tech {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
      margin-bottom: var(--space-lg);
    }

    .project-card__tech-tag {
      font-family: var(--font-mono);
      font-size: 10px;
      padding: 3px 8px;
      background: var(--surface-glass);
      border-radius: var(--radius-sm);
      color: var(--text-muted);
      border: 1px solid var(--border-subtle);
    }

    .project-card__features {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      margin-bottom: var(--space-lg);
      flex: 1;
    }

    .project-card__feature {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      font-size: var(--text-sm);
      color: var(--text-secondary);
    }

    .project-card__feature-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--accent-cyan);
      flex-shrink: 0;
    }

    .project-card__actions {
      display: flex;
      gap: var(--space-md);
      margin-top: auto;
    }

    .project-card__link {
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      letter-spacing: 0.05em;
      color: var(--accent-cyan);
      padding: var(--space-sm) var(--space-md);
      border: 1px solid var(--accent-cyan-dim);
      border-radius: var(--radius-sm);
      transition: all var(--duration-fast) var(--ease-out);
      text-transform: uppercase;

      &:hover {
        background: var(--accent-cyan-dim);
        border-color: var(--accent-cyan);
      }

      &--secondary {
        color: var(--text-muted);
        border-color: var(--border-subtle);

        &:hover {
          color: var(--text-primary);
          border-color: var(--border-light);
          background: var(--surface-glass);
        }
      }
    }

    .project-card__glow {
      position: absolute;
      inset: 0;
      opacity: 0;
      background: radial-gradient(
        350px circle at var(--glow-x, 50%) var(--glow-y, 50%),
        rgba(0, 212, 255, 0.06),
        transparent 60%
      );
      pointer-events: none;
      transition: opacity var(--duration-normal) var(--ease-out);
    }

    .project-card__border {
      position: absolute;
      inset: 0;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-subtle);
      pointer-events: none;
      transition: border-color var(--duration-normal) var(--ease-out);
    }
  `]
})
export class ProjectCardComponent {
  @Input() project!: Project;

  tiltX = 0;
  tiltY = 0;
  glowX = 50;
  glowY = 50;

  constructor(private el: ElementRef) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    this.tiltX = (y - 0.5) * -4;
    this.tiltY = (x - 0.5) * 4;
    this.glowX = x * 100;
    this.glowY = y * 100;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.tiltX = 0;
    this.tiltY = 0;
    this.glowX = 50;
    this.glowY = 50;
  }
}
