import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-holographic-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="holo-panel" [class.holo-panel--animated]="animated">
      <div class="holo-panel__header" *ngIf="title">
        <span class="holo-panel__indicator"></span>
        <span class="holo-panel__title">{{ title }}</span>
        <span class="holo-panel__status" *ngIf="status">{{ status }}</span>
      </div>
      <div class="holo-panel__body">
        <ng-content></ng-content>
      </div>
      <div class="holo-panel__scanline"></div>
      <div class="holo-panel__corner holo-panel__corner--tl"></div>
      <div class="holo-panel__corner holo-panel__corner--tr"></div>
      <div class="holo-panel__corner holo-panel__corner--bl"></div>
      <div class="holo-panel__corner holo-panel__corner--br"></div>
    </div>
  `,
  styles: [`
    .holo-panel {
      position: relative;
      background: rgba(0, 212, 255, 0.02);
      border: 1px solid rgba(0, 212, 255, 0.12);
      border-radius: var(--radius-md);
      padding: var(--space-lg);
      overflow: hidden;
    }

    .holo-panel__header {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      margin-bottom: var(--space-md);
      padding-bottom: var(--space-sm);
      border-bottom: 1px solid rgba(0, 212, 255, 0.08);
    }

    .holo-panel__indicator {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-cyan);
      box-shadow: 0 0 6px var(--accent-cyan);
      animation: pulse 2s ease-in-out infinite;
    }

    .holo-panel__title {
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--accent-cyan);
    }

    .holo-panel__status {
      margin-left: auto;
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.1em;
      color: var(--accent-emerald);
      text-transform: uppercase;
    }

    .holo-panel__body {
      position: relative;
      z-index: 1;
    }

    .holo-panel__scanline {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--accent-cyan-dim), transparent);
      opacity: 0;
      pointer-events: none;
    }

    .holo-panel--animated .holo-panel__scanline {
      animation: scanline 4s linear infinite;
      opacity: 0.4;
    }

    .holo-panel__corner {
      position: absolute;
      width: 12px;
      height: 12px;
      pointer-events: none;

      &--tl {
        top: -1px;
        left: -1px;
        border-top: 2px solid var(--accent-cyan);
        border-left: 2px solid var(--accent-cyan);
        border-top-left-radius: var(--radius-md);
      }

      &--tr {
        top: -1px;
        right: -1px;
        border-top: 2px solid var(--accent-cyan);
        border-right: 2px solid var(--accent-cyan);
        border-top-right-radius: var(--radius-md);
      }

      &--bl {
        bottom: -1px;
        left: -1px;
        border-bottom: 2px solid var(--accent-cyan);
        border-left: 2px solid var(--accent-cyan);
        border-bottom-left-radius: var(--radius-md);
      }

      &--br {
        bottom: -1px;
        right: -1px;
        border-bottom: 2px solid var(--accent-cyan);
        border-right: 2px solid var(--accent-cyan);
        border-bottom-right-radius: var(--radius-md);
      }
    }

    @keyframes scanline {
      0% { top: 0; opacity: 0; }
      10% { opacity: 0.4; }
      90% { opacity: 0.4; }
      100% { top: 100%; opacity: 0; }
    }
  `]
})
export class HolographicPanelComponent {
  @Input() title = '';
  @Input() status = '';
  @Input() animated = false;
}
