import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { AnimationService } from '../../../core/services/animation.service';

@Component({
  selector: 'app-cursor-glow',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="isVisible"
      class="cursor-glow"
      [style.left.px]="x"
      [style.top.px]="y"
      [class.cursor-glow--active]="isPressed"
    ></div>
  `,
  styles: [`
    .cursor-glow {
      position: fixed;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        rgba(0, 212, 255, 0.04) 0%,
        rgba(0, 212, 255, 0.02) 30%,
        transparent 70%
      );
      pointer-events: none;
      z-index: var(--z-cursor);
      transform: translate(-50%, -50%);
      transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
      will-change: left, top;

      &--active {
        width: 350px;
        height: 350px;
        background: radial-gradient(
          circle,
          rgba(0, 212, 255, 0.06) 0%,
          rgba(139, 92, 246, 0.03) 30%,
          transparent 70%
        );
      }
    }
  `]
})
export class CursorGlowComponent implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);
  private animationService = inject(AnimationService);

  x = 0;
  y = 0;
  isVisible = false;
  isPressed = false;

  private animationFrameId = 0;
  private targetX = 0;
  private targetY = 0;

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    if (this.themeService.isTouchDevice() || this.animationService.prefersReducedMotion()) return;

    this.isVisible = true;
    this.startTracking();

    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  private startTracking(): void {
    const update = () => {
      this.targetX = this.themeService.mouseX();
      this.targetY = this.themeService.mouseY();

      // Smooth interpolation
      this.x += (this.targetX - this.x) * 0.08;
      this.y += (this.targetY - this.y) * 0.08;

      this.animationFrameId = requestAnimationFrame(update);
    };
    this.animationFrameId = requestAnimationFrame(update);
  }

  private onMouseDown = (): void => { this.isPressed = true; };
  private onMouseUp = (): void => { this.isPressed = false; };
}
