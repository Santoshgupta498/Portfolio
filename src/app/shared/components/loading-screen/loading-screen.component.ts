import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading" [class.loading--hidden]="isHidden" role="status" aria-label="Loading application">
      <div class="loading__content">
        <div class="loading__icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke-linejoin="round"/>
          </svg>
        </div>

        <div class="loading__lines">
          <div *ngFor="let line of visibleLines; let i = index" class="loading__line" [style.animation-delay]="(i * 100) + 'ms'">
            <span class="loading__prefix">&gt;</span>
            <span class="loading__text">{{ line }}</span>
          </div>
        </div>

        <div class="loading__bar">
          <div class="loading__bar-fill" [style.width]="progress + '%'"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loading {
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: #050507;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.6s ease, visibility 0.6s ease;

      &--hidden {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }
    }

    .loading__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      max-width: 400px;
      width: 100%;
      padding: 24px;
    }

    .loading__icon {
      color: #00d4ff;
      animation: loadPulse 2s ease-in-out infinite;
    }

    .loading__lines {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
      min-height: 100px;
    }

    .loading__line {
      display: flex;
      align-items: center;
      gap: 8px;
      opacity: 0;
      animation: loadFadeIn 0.3s ease forwards;
    }

    .loading__prefix {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: #00d4ff;
    }

    .loading__text {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.05em;
      color: #606078;
    }

    .loading__bar {
      width: 100%;
      height: 2px;
      background: rgba(255,255,255,0.03);
      border-radius: 9999px;
      overflow: hidden;
    }

    .loading__bar-fill {
      height: 100%;
      background: linear-gradient(135deg, #00d4ff, #8b5cf6);
      border-radius: 9999px;
      transition: width 0.3s ease;
    }

    @keyframes loadPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    @keyframes loadFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class LoadingScreenComponent implements OnInit {
  @Output() loadingComplete = new EventEmitter<void>();
  private cdr = inject(ChangeDetectorRef);

  isHidden = false;
  progress = 0;
  visibleLines: string[] = [];

  private allLines = [
    'INITIALIZING NEURAL INTERFACE...',
    'LOADING SYSTEM COMPONENTS...',
    'ESTABLISHING DATA CONNECTIONS...',
    'CONFIGURING AI CORE...',
    'SYSTEM ONLINE'
  ];

  ngOnInit(): void {
    this.startSequence();
  }

  private startSequence(): void {
    let lineIndex = 0;
    const lineInterval = setInterval(() => {
      if (lineIndex < this.allLines.length) {
        this.visibleLines = [...this.visibleLines, this.allLines[lineIndex]];
        this.progress = ((lineIndex + 1) / this.allLines.length) * 100;
        lineIndex++;
        this.cdr.detectChanges();
      } else {
        clearInterval(lineInterval);
        setTimeout(() => {
          this.isHidden = true;
          this.cdr.detectChanges();
          this.loadingComplete.emit();
        }, 400);
      }
    }, 300);
  }
}
