import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../../core/services/scroll.service';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { NavItem } from '../../../core/models/portfolio.models';
import { PORTFOLIO_CONFIG } from '../../../core/constants/portfolio.config';

@Component({
  selector: 'app-futuristic-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav
      class="navbar"
      [class.navbar--scrolled]="scrollService.isScrolled()"
      [class.navbar--hidden]="isHidden"
      role="navigation"
      aria-label="Main navigation"
    >
      <div class="navbar__container">
        <!-- Logo -->
        <a class="navbar__logo" (click)="navigateTo('hero')" role="button" tabindex="0" (keydown.enter)="navigateTo('hero')">
          <span class="navbar__logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="navbar__logo-text">SG</span>
          <span class="navbar__logo-dot"></span>
        </a>

        <!-- Desktop Nav Links -->
        <ul class="navbar__links">
          <li *ngFor="let item of navItems">
            <a
              class="navbar__link"
              [class.navbar__link--active]="scrollService.activeSection() === item.sectionId"
              (click)="navigateTo(item.sectionId)"
              (keydown.enter)="navigateTo(item.sectionId)"
              tabindex="0"
              [attr.aria-current]="scrollService.activeSection() === item.sectionId ? 'true' : null"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>

        <!-- Desktop CTA -->
        <div class="navbar__actions">
          <button class="navbar__cmd-btn" (click)="openCommandPalette()" aria-label="Open command palette (Ctrl+K)">
            <span class="navbar__cmd-key">Ctrl</span>
            <span class="navbar__cmd-key">K</span>
          </button>
          <a class="navbar__cta" [href]="resumeUrl" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="navbar__burger"
          [class.navbar__burger--open]="isMobileMenuOpen"
          (click)="toggleMobileMenu()"
          [attr.aria-expanded]="isMobileMenuOpen"
          aria-label="Toggle navigation menu"
        >
          <span class="navbar__burger-line"></span>
          <span class="navbar__burger-line"></span>
          <span class="navbar__burger-line"></span>
        </button>
      </div>

      <!-- Mobile Drawer -->
      <div
        class="navbar__drawer"
        [class.navbar__drawer--open]="isMobileMenuOpen"
        role="dialog"
        [attr.aria-hidden]="!isMobileMenuOpen"
      >
        <div class="navbar__drawer-bg" (click)="closeMobileMenu()"></div>
        <div class="navbar__drawer-content">
          <div class="navbar__drawer-header">
            <span class="navbar__drawer-label">NAVIGATION</span>
            <span class="navbar__drawer-status">ACTIVE</span>
          </div>
          <ul class="navbar__drawer-links">
            <li *ngFor="let item of navItems; let i = index">
              <a
                class="navbar__drawer-link"
                [class.navbar__drawer-link--active]="scrollService.activeSection() === item.sectionId"
                [style.animation-delay]="(i * 50) + 'ms'"
                (click)="navigateTo(item.sectionId); closeMobileMenu()"
                (keydown.enter)="navigateTo(item.sectionId); closeMobileMenu()"
                tabindex="0"
              >
                <span class="navbar__drawer-link-index">0{{ i + 1 }}</span>
                <span class="navbar__drawer-link-label">{{ item.label }}</span>
                <span class="navbar__drawer-link-arrow">&rarr;</span>
              </a>
            </li>
          </ul>
          <div class="navbar__drawer-footer">
            <a class="navbar__drawer-cta" [href]="resumeUrl" target="_blank" rel="noopener noreferrer">
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: var(--z-navbar);
      padding: var(--space-md) 0;
      transition: all var(--duration-normal) var(--ease-out);

      &--scrolled {
        padding: var(--space-sm) 0;
        background: rgba(5, 5, 7, 0.85);
        backdrop-filter: blur(var(--blur-md));
        -webkit-backdrop-filter: blur(var(--blur-md));
        border-bottom: 1px solid var(--border-subtle);
      }

      &--hidden {
        transform: translateY(-100%);
      }
    }

    .navbar__container {
      max-width: var(--container-max);
      margin: 0 auto;
      padding: 0 var(--container-padding);
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
    }

    // Logo
    .navbar__logo {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      cursor: pointer;
      transition: opacity var(--duration-fast);

      &:hover {
        opacity: 0.8;
      }
    }

    .navbar__logo-icon {
      color: var(--accent-cyan);
      display: flex;
      align-items: center;
    }

    .navbar__logo-text {
      font-family: var(--font-mono);
      font-size: var(--text-lg);
      font-weight: 600;
      color: var(--text-primary);
      letter-spacing: 0.05em;
    }

    .navbar__logo-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-cyan);
      box-shadow: 0 0 6px var(--accent-cyan);
    }

    // Desktop Links
    .navbar__links {
      display: flex;
      align-items: center;
      gap: var(--space-xs);

      @media (max-width: 1024px) {
        display: none;
      }
    }

    .navbar__link {
      position: relative;
      padding: var(--space-sm) var(--space-md);
      font-size: var(--text-sm);
      color: var(--text-secondary);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: color var(--duration-fast) var(--ease-out),
                  background var(--duration-fast) var(--ease-out);

      &:hover {
        color: var(--text-primary);
        background: var(--surface-glass);
      }

      &--active {
        color: var(--accent-cyan);

        &::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 2px;
          background: var(--accent-cyan);
          border-radius: var(--radius-full);
          box-shadow: 0 0 6px var(--accent-cyan);
        }
      }
    }

    // Actions
    .navbar__actions {
      display: flex;
      align-items: center;
      gap: var(--space-md);

      @media (max-width: 1024px) {
        display: none;
      }
    }

    .navbar__cmd-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 10px;
      background: var(--surface-glass);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all var(--duration-fast);

      &:hover {
        border-color: var(--border-light);
        background: var(--surface-glass-hover);
      }
    }

    .navbar__cmd-key {
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--text-muted);
      padding: 2px 5px;
      background: rgba(255, 255, 255, 0.04);
      border-radius: 3px;
    }

    .navbar__cta {
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--accent-cyan);
      padding: var(--space-sm) var(--space-md);
      border: 1px solid var(--accent-cyan-dim);
      border-radius: var(--radius-full);
      transition: all var(--duration-fast);

      &:hover {
        background: var(--accent-cyan-dim);
        border-color: var(--accent-cyan);
        box-shadow: 0 0 20px var(--accent-cyan-dim);
      }
    }

    // Burger
    .navbar__burger {
      display: none;
      flex-direction: column;
      gap: 5px;
      padding: var(--space-sm);
      cursor: pointer;
      z-index: 110;

      @media (max-width: 1024px) {
        display: flex;
      }
    }

    .navbar__burger-line {
      width: 22px;
      height: 1.5px;
      background: var(--text-primary);
      border-radius: 2px;
      transition: all var(--duration-normal) var(--ease-out);
    }

    .navbar__burger--open {
      .navbar__burger-line:nth-child(1) {
        transform: rotate(45deg) translateY(4.5px) translateX(4.5px);
      }
      .navbar__burger-line:nth-child(2) {
        opacity: 0;
        transform: translateX(10px);
      }
      .navbar__burger-line:nth-child(3) {
        transform: rotate(-45deg) translateY(-4.5px) translateX(4.5px);
      }
    }

    // Mobile Drawer
    .navbar__drawer {
      position: fixed;
      inset: 0;
      z-index: 99;
      pointer-events: none;
      visibility: hidden;

      &--open {
        pointer-events: all;
        visibility: visible;

        .navbar__drawer-bg {
          opacity: 1;
        }

        .navbar__drawer-content {
          transform: translateX(0);
        }

        .navbar__drawer-link {
          opacity: 1;
          transform: translateX(0);
        }
      }
    }

    .navbar__drawer-bg {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
      opacity: 0;
      transition: opacity var(--duration-normal) var(--ease-out);
    }

    .navbar__drawer-content {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 320px;
      max-width: 85vw;
      background: var(--bg-secondary);
      border-left: 1px solid var(--border-subtle);
      padding: var(--space-4xl) var(--space-xl) var(--space-xl);
      transform: translateX(100%);
      transition: transform var(--duration-normal) var(--ease-out);
      display: flex;
      flex-direction: column;
    }

    .navbar__drawer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-2xl);
      padding-bottom: var(--space-md);
      border-bottom: 1px solid var(--border-subtle);
    }

    .navbar__drawer-label {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.15em;
      color: var(--text-muted);
    }

    .navbar__drawer-status {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.1em;
      color: var(--accent-emerald);
    }

    .navbar__drawer-links {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      flex: 1;
    }

    .navbar__drawer-link {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-md);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--duration-fast) var(--ease-out);
      opacity: 0;
      transform: translateX(20px);
      animation: slideInDrawer var(--duration-normal) var(--ease-out) forwards;

      &:hover {
        background: var(--surface-glass);
      }

      &--active {
        background: var(--accent-cyan-dim);

        .navbar__drawer-link-label {
          color: var(--accent-cyan);
        }
      }
    }

    .navbar__drawer-link-index {
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--text-dim);
    }

    .navbar__drawer-link-label {
      font-size: var(--text-base);
      color: var(--text-primary);
      flex: 1;
    }

    .navbar__drawer-link-arrow {
      color: var(--text-dim);
      font-size: var(--text-sm);
      transition: transform var(--duration-fast);
    }

    .navbar__drawer-link:hover .navbar__drawer-link-arrow {
      transform: translateX(4px);
      color: var(--accent-cyan);
    }

    .navbar__drawer-footer {
      margin-top: auto;
      padding-top: var(--space-lg);
      border-top: 1px solid var(--border-subtle);
    }

    .navbar__drawer-cta {
      display: block;
      text-align: center;
      font-family: var(--font-mono);
      font-size: var(--text-sm);
      letter-spacing: 0.05em;
      color: var(--accent-cyan);
      padding: var(--space-md);
      border: 1px solid var(--accent-cyan-dim);
      border-radius: var(--radius-md);
      transition: all var(--duration-fast);

      &:hover {
        background: var(--accent-cyan-dim);
      }
    }

    @keyframes slideInDrawer {
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `]
})
export class FuturisticNavbarComponent implements OnInit, OnDestroy {
  scrollService = inject(ScrollService);
  private portfolioService = inject(PortfolioService);

  navItems: NavItem[] = [];
  isMobileMenuOpen = false;
  isHidden = false;
  resumeUrl = PORTFOLIO_CONFIG.resume;

  private lastScrollY = 0;
  private scrollListener: (() => void) | null = null;
  private commandPaletteCallback: (() => void) | null = null;

  ngOnInit(): void {
    this.navItems = this.portfolioService.getNavItems();

    if (typeof window !== 'undefined') {
      this.scrollListener = () => {
        this.scrollService.updateScrollState();
        this.handleScrollDirection();
      };
      window.addEventListener('scroll', this.scrollListener, { passive: true });
    }
  }

  ngOnDestroy(): void {
    if (this.scrollListener && typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  navigateTo(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  openCommandPalette(): void {
    // This will be wired up to the command palette component via event
    const event = new CustomEvent('open-command-palette');
    window.dispatchEvent(event);
  }

  setCommandPaletteCallback(callback: () => void): void {
    this.commandPaletteCallback = callback;
  }

  private handleScrollDirection(): void {
    const currentScrollY = window.scrollY;
    if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
      this.isHidden = true;
    } else {
      this.isHidden = false;
    }
    this.lastScrollY = currentScrollY;
  }
}
