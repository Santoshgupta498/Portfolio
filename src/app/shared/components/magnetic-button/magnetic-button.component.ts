import { Component, Input, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-magnetic-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="magnetic-btn"
      [class]="'magnetic-btn magnetic-btn--' + variant + ' magnetic-btn--' + size"
      [style.--tx]="translateX + 'px'"
      [style.--ty]="translateY + 'px'"
      [attr.aria-label]="ariaLabel"
      [disabled]="disabled"
    >
      <span class="magnetic-btn__content">
        <ng-content></ng-content>
      </span>
      <span class="magnetic-btn__bg"></span>
      <span class="magnetic-btn__border"></span>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    .magnetic-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
      padding: var(--space-md) var(--space-xl);
      border-radius: var(--radius-full);
      font-weight: 500;
      font-size: var(--text-sm);
      letter-spacing: 0.02em;
      cursor: pointer;
      overflow: hidden;
      transform: translate(var(--tx, 0), var(--ty, 0));
      transition: transform var(--duration-normal) var(--ease-out),
                  box-shadow var(--duration-normal) var(--ease-out);

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &--sm {
        padding: var(--space-sm) var(--space-lg);
        font-size: var(--text-xs);
      }

      &--lg {
        padding: var(--space-lg) var(--space-2xl);
        font-size: var(--text-base);
      }

      // Primary variant
      &--primary {
        color: var(--bg-primary);

        .magnetic-btn__bg {
          background: var(--gradient-primary);
        }

        &:hover {
          box-shadow: 0 0 30px var(--accent-cyan-dim), 0 0 60px rgba(0, 212, 255, 0.1);
        }
      }

      // Secondary/outline variant
      &--secondary {
        color: var(--text-primary);

        .magnetic-btn__bg {
          background: transparent;
        }

        .magnetic-btn__border {
          border: 1px solid var(--border-light);
        }

        &:hover .magnetic-btn__border {
          border-color: var(--accent-cyan);
          box-shadow: inset 0 0 20px var(--accent-cyan-dim);
        }

        &:hover {
          color: var(--accent-cyan);
        }
      }

      // Ghost variant
      &--ghost {
        color: var(--text-secondary);

        .magnetic-btn__bg {
          background: transparent;
        }

        &:hover {
          color: var(--accent-cyan);
        }

        &:hover .magnetic-btn__bg {
          background: var(--accent-cyan-dim);
        }
      }
    }

    .magnetic-btn__content {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .magnetic-btn__bg {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      z-index: 1;
      transition: background var(--duration-normal) var(--ease-out),
                  opacity var(--duration-normal) var(--ease-out);
    }

    .magnetic-btn__border {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      transition: border-color var(--duration-normal) var(--ease-out),
                  box-shadow var(--duration-normal) var(--ease-out);
    }
  `]
})
export class MagneticButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() ariaLabel = '';
  @Input() disabled = false;
  @Input() magnetic = true;

  translateX = 0;
  translateY = 0;

  constructor(private el: ElementRef) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.magnetic) return;

    const rect = this.el.nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    this.translateX = (event.clientX - centerX) * 0.15;
    this.translateY = (event.clientY - centerY) * 0.15;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.translateX = 0;
    this.translateY = 0;
  }
}
