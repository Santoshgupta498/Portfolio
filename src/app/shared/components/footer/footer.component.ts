import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PORTFOLIO_CONFIG } from '../../../core/constants/portfolio.config';
import { SOCIAL_LINKS } from '../../../core/constants/portfolio.data';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__top">
          <!-- Brand -->
          <div class="footer__brand">
            <div class="footer__logo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke-linejoin="round"/>
              </svg>
              <span class="footer__brand-name">{{ config.name }}</span>
            </div>
            <p class="footer__tagline">Building intelligent digital experiences</p>
          </div>

          <!-- Navigation -->
          <div class="footer__nav">
            <span class="footer__nav-label">NAVIGATION</span>
            <div class="footer__nav-links">
              <a *ngFor="let item of navItems" class="footer__nav-link" (click)="scrollTo(item.id)" (keydown.enter)="scrollTo(item.id)" tabindex="0">
                {{ item.label }}
              </a>
            </div>
          </div>

          <!-- Social -->
          <div class="footer__social">
            <span class="footer__nav-label">CONNECT</span>
            <div class="footer__social-links">
              <a
                *ngFor="let link of socialLinks"
                [href]="link.url"
                class="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                [attr.aria-label]="link.label"
              >
                <svg *ngIf="link.icon === 'github'" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                <svg *ngIf="link.icon === 'linkedin'" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                <svg *ngIf="link.icon === 'twitter'" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                <svg *ngIf="link.icon === 'mail'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg>
                <span>{{ link.platform }}</span>
              </a>
            </div>
          </div>
        </div>

        <div class="footer__divider"></div>

        <div class="footer__bottom">
          <span class="footer__copyright">&copy; {{ year }} {{ config.name }}. Crafted with precision.</span>
          <div class="footer__tech">
            <span class="footer__tech-label">BUILT WITH</span>
            <span class="footer__tech-item">Angular</span>
            <span class="footer__tech-sep">&middot;</span>
            <span class="footer__tech-item">Three.js</span>
            <span class="footer__tech-sep">&middot;</span>
            <span class="footer__tech-item">TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      position: relative;
      padding: var(--space-4xl) 0 var(--space-2xl);
      border-top: 1px solid var(--border-subtle);
      background: linear-gradient(180deg, transparent, rgba(0, 212, 255, 0.01));
    }

    .footer__container {
      max-width: var(--container-max);
      margin: 0 auto;
      padding: 0 var(--container-padding);
    }

    .footer__top {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr;
      gap: var(--space-3xl);
      margin-bottom: var(--space-3xl);

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: var(--space-2xl);
      }
    }

    .footer__logo {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      color: var(--accent-cyan);
      margin-bottom: var(--space-sm);
    }

    .footer__brand-name {
      font-size: var(--text-lg);
      font-weight: 600;
      color: var(--text-primary);
    }

    .footer__tagline {
      font-size: var(--text-sm);
      color: var(--text-muted);
    }

    .footer__nav-label {
      display: block;
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.12em;
      color: var(--text-dim);
      margin-bottom: var(--space-md);
    }

    .footer__nav-links {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .footer__nav-link {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      cursor: pointer;
      transition: color var(--duration-fast);

      &:hover {
        color: var(--accent-cyan);
      }
    }

    .footer__social-links {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .footer__social-link {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      transition: color var(--duration-fast);
      display: flex;
      align-items: center;
      gap: 8px;

      &:hover {
        color: var(--accent-cyan);
      }

      svg {
        flex-shrink: 0;
      }
    }

    .footer__divider {
      height: 1px;
      background: var(--border-subtle);
      margin-bottom: var(--space-xl);
    }

    .footer__bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--space-md);
    }

    .footer__copyright {
      font-size: var(--text-xs);
      color: var(--text-dim);
    }

    .footer__tech {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .footer__tech-label {
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: 0.1em;
      color: var(--text-dim);
      margin-right: 4px;
    }

    .footer__tech-item {
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--text-muted);
    }

    .footer__tech-sep {
      color: var(--text-dim);
      font-size: 10px;
    }
  `]
})
export class FooterComponent {
  private scrollService = inject(ScrollService);
  config = PORTFOLIO_CONFIG;
  socialLinks = SOCIAL_LINKS;
  year = new Date().getFullYear();

  navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' }
  ];

  scrollTo(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
  }
}
