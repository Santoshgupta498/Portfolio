import { Component, OnInit, OnDestroy, inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollService } from '../../../core/services/scroll.service';

interface PaletteItem {
  label: string;
  description: string;
  sectionId: string;
  icon: string;
}

@Component({
  selector: 'app-command-palette',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="palette"
      [class.palette--open]="isOpen"
      (click)="onBackdropClick($event)"
      role="dialog"
      [attr.aria-hidden]="!isOpen"
      aria-label="Command palette"
    >
      <div class="palette__panel" *ngIf="isOpen">
        <div class="palette__header">
          <svg class="palette__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            #searchInput
            class="palette__input"
            type="text"
            [(ngModel)]="query"
            (ngModelChange)="onQueryChange()"
            (keydown)="onKeydown($event)"
            placeholder="Navigate to..."
            autocomplete="off"
          />
          <span class="palette__esc">ESC</span>
        </div>

        <div class="palette__results" role="listbox">
          <button
            *ngFor="let item of filteredItems; let i = index"
            class="palette__item"
            [class.palette__item--active]="i === activeIndex"
            (click)="selectItem(item)"
            (mouseenter)="activeIndex = i"
            role="option"
            [attr.aria-selected]="i === activeIndex"
          >
            <span class="palette__item-icon">{{ item.icon }}</span>
            <div class="palette__item-content">
              <span class="palette__item-label">{{ item.label }}</span>
              <span class="palette__item-desc">{{ item.description }}</span>
            </div>
            <span class="palette__item-hint">Enter</span>
          </button>

          <div *ngIf="filteredItems.length === 0" class="palette__empty">
            No results found
          </div>
        </div>

        <div class="palette__footer">
          <span class="palette__footer-hint">
            <span class="palette__key">&uarr;&darr;</span> Navigate
          </span>
          <span class="palette__footer-hint">
            <span class="palette__key">Enter</span> Select
          </span>
          <span class="palette__footer-hint">
            <span class="palette__key">Esc</span> Close
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .palette {
      position: fixed;
      inset: 0;
      z-index: var(--z-modal);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 20vh;
      pointer-events: none;
      opacity: 0;
      transition: opacity var(--duration-fast) var(--ease-out);

      &--open {
        pointer-events: all;
        opacity: 1;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
      }
    }

    .palette__panel {
      width: 100%;
      max-width: 540px;
      margin: 0 var(--space-md);
      background: var(--bg-elevated);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl), 0 0 60px rgba(0, 212, 255, 0.05);
      overflow: hidden;
      animation: scaleIn var(--duration-fast) var(--ease-out);
    }

    .palette__header {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-md) var(--space-lg);
      border-bottom: 1px solid var(--border-subtle);
    }

    .palette__search-icon {
      color: var(--text-muted);
      flex-shrink: 0;
    }

    .palette__input {
      flex: 1;
      font-size: var(--text-base);
      color: var(--text-primary);
      background: transparent;

      &::placeholder {
        color: var(--text-dim);
      }
    }

    .palette__esc {
      font-family: var(--font-mono);
      font-size: 10px;
      padding: 2px 6px;
      background: var(--surface-glass);
      border: 1px solid var(--border-subtle);
      border-radius: 3px;
      color: var(--text-dim);
    }

    .palette__results {
      max-height: 320px;
      overflow-y: auto;
      padding: var(--space-sm);
    }

    .palette__item {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      width: 100%;
      padding: var(--space-md);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: background var(--duration-fast);
      text-align: left;

      &--active {
        background: var(--surface-glass-hover);
      }

      &:hover {
        background: var(--surface-glass-hover);
      }
    }

    .palette__item-icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--accent-cyan-dim);
      border-radius: var(--radius-sm);
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--accent-cyan);
      flex-shrink: 0;
    }

    .palette__item-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .palette__item-label {
      font-size: var(--text-sm);
      color: var(--text-primary);
      font-weight: 500;
    }

    .palette__item-desc {
      font-size: var(--text-xs);
      color: var(--text-muted);
    }

    .palette__item-hint {
      font-family: var(--font-mono);
      font-size: 10px;
      padding: 2px 6px;
      background: var(--surface-glass);
      border-radius: 3px;
      color: var(--text-dim);
      opacity: 0;
      transition: opacity var(--duration-fast);
    }

    .palette__item--active .palette__item-hint {
      opacity: 1;
    }

    .palette__empty {
      padding: var(--space-xl);
      text-align: center;
      font-size: var(--text-sm);
      color: var(--text-dim);
    }

    .palette__footer {
      display: flex;
      gap: var(--space-lg);
      padding: var(--space-sm) var(--space-lg);
      border-top: 1px solid var(--border-subtle);
    }

    .palette__footer-hint {
      font-size: 11px;
      color: var(--text-dim);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .palette__key {
      font-family: var(--font-mono);
      font-size: 10px;
      padding: 1px 5px;
      background: var(--surface-glass);
      border: 1px solid var(--border-subtle);
      border-radius: 3px;
    }

    @keyframes scaleIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `]
})
export class CommandPaletteComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  private scrollService = inject(ScrollService);

  isOpen = false;
  query = '';
  activeIndex = 0;
  filteredItems: PaletteItem[] = [];

  private items: PaletteItem[] = [
    { label: 'Home', description: 'Go to hero section', sectionId: 'hero', icon: 'HM' },
    { label: 'About', description: 'Learn about me', sectionId: 'about', icon: 'AB' },
    { label: 'Experience', description: 'View career timeline', sectionId: 'experience', icon: 'EX' },
    { label: 'Projects', description: 'Browse featured work', sectionId: 'projects', icon: 'PJ' },
    { label: 'Architecture Lab', description: 'System design visualization', sectionId: 'architecture', icon: 'AR' },
    { label: 'Skills', description: 'Technology universe', sectionId: 'skills', icon: 'SK' },
    { label: 'GitHub', description: 'Developer activity', sectionId: 'github', icon: 'GH' },
    { label: 'Contact', description: 'Get in touch', sectionId: 'contact', icon: 'CT' }
  ];

  private keydownListener: ((e: KeyboardEvent) => void) | null = null;
  private customEventListener: ((e: Event) => void) | null = null;

  ngOnInit(): void {
    this.filteredItems = [...this.items];

    if (typeof window !== 'undefined') {
      this.keydownListener = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          this.toggle();
        }
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      };
      window.addEventListener('keydown', this.keydownListener);

      this.customEventListener = () => this.open();
      window.addEventListener('open-command-palette', this.customEventListener);
    }
  }

  ngOnDestroy(): void {
    if (this.keydownListener) window.removeEventListener('keydown', this.keydownListener);
    if (this.customEventListener) window.removeEventListener('open-command-palette', this.customEventListener);
  }

  toggle(): void {
    this.isOpen ? this.close() : this.open();
  }

  open(): void {
    this.isOpen = true;
    this.query = '';
    this.activeIndex = 0;
    this.filteredItems = [...this.items];
    setTimeout(() => this.searchInput?.nativeElement?.focus(), 50);
  }

  close(): void {
    this.isOpen = false;
  }

  onQueryChange(): void {
    const q = this.query.toLowerCase().trim();
    this.filteredItems = q
      ? this.items.filter(i => i.label.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
      : [...this.items];
    this.activeIndex = 0;
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex = (this.activeIndex + 1) % this.filteredItems.length;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex = (this.activeIndex - 1 + this.filteredItems.length) % this.filteredItems.length;
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (this.filteredItems[this.activeIndex]) {
        this.selectItem(this.filteredItems[this.activeIndex]);
      }
    }
  }

  selectItem(item: PaletteItem): void {
    this.scrollService.scrollToSection(item.sectionId);
    this.close();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('palette')) {
      this.close();
    }
  }
}
