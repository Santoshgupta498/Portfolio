import { Component, Input, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="glass-card"
      [class.glass-card--hover-tilt]="enableTilt"
      [class.glass-card--glow]="enableGlow"
      [style.--tilt-x]="tiltX + 'deg'"
      [style.--tilt-y]="tiltY + 'deg'"
      [style.--glow-x]="glowX + '%'"
      [style.--glow-y]="glowY + '%'"
    >
      <div class="glass-card__content">
        <ng-content></ng-content>
      </div>
      <div class="glass-card__border"></div>
      <div *ngIf="enableGlow" class="glass-card__glow"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .glass-card {
      position: relative;
      background: var(--gradient-card);
      backdrop-filter: blur(var(--blur-md));
      -webkit-backdrop-filter: blur(var(--blur-md));
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: transform var(--duration-normal) var(--ease-out),
                  box-shadow var(--duration-normal) var(--ease-out);

      &--hover-tilt {
        transform: perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
      }

      &:hover {
        box-shadow: var(--shadow-lg);
      }

      &--glow:hover .glass-card__glow {
        opacity: 1;
      }
    }

    .glass-card__content {
      position: relative;
      z-index: 2;
      padding: var(--space-xl);
    }

    .glass-card__border {
      position: absolute;
      inset: 0;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-subtle);
      pointer-events: none;
      transition: border-color var(--duration-normal) var(--ease-out);
    }

    .glass-card:hover .glass-card__border {
      border-color: var(--border-accent);
    }

    .glass-card__glow {
      position: absolute;
      inset: 0;
      opacity: 0;
      background: radial-gradient(
        400px circle at var(--glow-x, 50%) var(--glow-y, 50%),
        rgba(0, 212, 255, 0.06),
        transparent 60%
      );
      pointer-events: none;
      transition: opacity var(--duration-normal) var(--ease-out);
      z-index: 1;
    }
  `]
})
export class GlassCardComponent {
  @Input() enableTilt = false;
  @Input() enableGlow = true;

  tiltX = 0;
  tiltY = 0;
  glowX = 50;
  glowY = 50;

  constructor(private el: ElementRef) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.enableTilt && !this.enableGlow) return;

    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    if (this.enableTilt) {
      this.tiltX = (y - 0.5) * -6;
      this.tiltY = (x - 0.5) * 6;
    }

    if (this.enableGlow) {
      this.glowX = x * 100;
      this.glowY = y * 100;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.tiltX = 0;
    this.tiltY = 0;
    this.glowX = 50;
    this.glowY = 50;
  }
}
