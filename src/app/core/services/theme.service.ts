import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  mouseX = signal<number>(0);
  mouseY = signal<number>(0);
  isTouchDevice = signal<boolean>(false);

  initialize(): void {
    if (typeof window === 'undefined') return;

    this.isTouchDevice.set(
      'ontouchstart' in window || navigator.maxTouchPoints > 0
    );

    if (!this.isTouchDevice()) {
      window.addEventListener('mousemove', (e) => {
        this.mouseX.set(e.clientX);
        this.mouseY.set(e.clientY);
      });
    }
  }

  getNormalizedMouse(): { x: number; y: number } {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    return {
      x: (this.mouseX() / window.innerWidth) * 2 - 1,
      y: -(this.mouseY() / window.innerHeight) * 2 + 1
    };
  }
}
