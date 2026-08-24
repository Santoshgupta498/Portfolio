import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-heading" [class.section-heading--center]="align === 'center'">
      <div class="section-heading__label">
        <span class="section-heading__dot"></span>
        <span class="section-heading__label-text">{{ label }}</span>
        <span class="section-heading__line"></span>
      </div>
      <h2 class="section-heading__title heading-2">
        {{ title }}
        <span *ngIf="highlight" class="gradient-text"> {{ highlight }}</span>
      </h2>
      <p *ngIf="subtitle" class="section-heading__subtitle">{{ subtitle }}</p>
    </div>
  `,
  styles: [`
    .section-heading {
      margin-bottom: var(--space-3xl);

      &--center {
        text-align: center;

        .section-heading__label {
          justify-content: center;
        }
      }
    }

    .section-heading__label {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      margin-bottom: var(--space-md);
    }

    .section-heading__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-cyan);
      box-shadow: 0 0 8px var(--accent-cyan-glow);
      animation: pulse 2s ease-in-out infinite;
    }

    .section-heading__label-text {
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--accent-cyan);
    }

    .section-heading__line {
      height: 1px;
      width: 40px;
      background: linear-gradient(90deg, var(--accent-cyan), transparent);
    }

    .section-heading__title {
      color: var(--text-primary);
      margin-bottom: var(--space-md);
    }

    .section-heading__subtitle {
      font-size: var(--text-lg);
      color: var(--text-secondary);
      max-width: 600px;
      line-height: 1.7;
    }

    .section-heading--center .section-heading__subtitle {
      margin: 0 auto;
    }
  `]
})
export class SectionHeadingComponent {
  @Input() label = '';
  @Input() title = '';
  @Input() highlight = '';
  @Input() subtitle = '';
  @Input() align: 'left' | 'center' = 'left';
}
