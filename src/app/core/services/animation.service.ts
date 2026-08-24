import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  prefersReducedMotion = signal<boolean>(false);
  isTabVisible = signal<boolean>(true);

  private mediaQuery: MediaQueryList | null = null;

  initialize(): void {
    if (typeof window === 'undefined') return;

    // Check reduced motion preference
    this.mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.prefersReducedMotion.set(this.mediaQuery.matches);
    this.mediaQuery.addEventListener('change', (e) => {
      this.prefersReducedMotion.set(e.matches);
    });

    // Track tab visibility
    document.addEventListener('visibilitychange', () => {
      this.isTabVisible.set(!document.hidden);
    });
  }

  shouldAnimate(): boolean {
    return !this.prefersReducedMotion() && this.isTabVisible();
  }

  getParticleCount(base: number): number {
    if (this.prefersReducedMotion()) return Math.floor(base * 0.1);
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    if (isMobile) return Math.floor(base * 0.3);
    if (isTablet) return Math.floor(base * 0.6);
    return base;
  }

  getAnimationDuration(baseDuration: number): number {
    if (this.prefersReducedMotion()) return 0;
    return baseDuration;
  }
}
