import { Component, OnInit, inject, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiSceneComponent } from '../../shared/components/ai-scene/ai-scene.component';
import { MagneticButtonComponent } from '../../shared/components/magnetic-button/magnetic-button.component';
import { ScrollService } from '../../core/services/scroll.service';
import { PORTFOLIO_CONFIG } from '../../core/constants/portfolio.config';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AiSceneComponent, MagneticButtonComponent],
  template: `
    <section id="hero" class="hero" #heroSection>
      <div class="hero__container">
        <!-- Left: Content -->
        <div class="hero__content">
          <div class="hero__label animate-fade-in-up">
            <span class="hero__label-dot"></span>
            <span class="hero__label-text">{{ config.subtitle }}</span>
          </div>

          <h1 class="hero__title animate-fade-in-up delay-1">
            Building<br>
            <span class="gradient-text">Intelligent</span> Digital<br>
            Experiences
          </h1>

          <p class="hero__desc animate-fade-in-up delay-2">
            {{ config.bio }}
          </p>

          <div class="hero__actions animate-fade-in-up delay-3">
            <app-magnetic-button variant="primary" (click)="scrollTo('projects')">
              <span>Explore My Work</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </app-magnetic-button>
            <app-magnetic-button variant="secondary">
              <a [href]="config.resume" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:8px;color:inherit;text-decoration:none;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Download Resume
              </a>
            </app-magnetic-button>
          </div>

          <!-- Stats row -->
          <div class="hero__stats animate-fade-in-up delay-4">
            <div class="hero__stat">
              <span class="hero__stat-value">5+</span>
              <span class="hero__stat-label">Years Exp</span>
            </div>
            <div class="hero__stat-divider"></div>
            <div class="hero__stat">
              <span class="hero__stat-value">20+</span>
              <span class="hero__stat-label">Technologies</span>
            </div>
            <div class="hero__stat-divider"></div>
            <div class="hero__stat">
              <span class="hero__stat-value">10+</span>
              <span class="hero__stat-label">Projects</span>
            </div>
          </div>
        </div>

        <!-- Right: 3D Scene -->
        <div class="hero__scene">
          <app-ai-scene [particleCount]="180" [nodeCount]="12"></app-ai-scene>

          <!-- HUD Overlay -->
          <div class="hero__hud" aria-hidden="true">
            <div class="hero__hud-item hero__hud-item--tl">
              <span class="hero__hud-label">AI CORE</span>
              <span class="hero__hud-value">ACTIVE</span>
            </div>
            <div class="hero__hud-item hero__hud-item--tr">
              <span class="hero__hud-label">NEURAL NET</span>
              <span class="hero__hud-value">ONLINE</span>
            </div>
            <div class="hero__hud-item hero__hud-item--bl">
              <span class="hero__hud-label">.NET</span>
              <span class="hero__hud-sep">|</span>
              <span class="hero__hud-label">ANGULAR</span>
              <span class="hero__hud-sep">|</span>
              <span class="hero__hud-label">CLOUD</span>
            </div>
            <div class="hero__hud-item hero__hud-item--br">
              <span class="hero__hud-label">API</span>
              <span class="hero__hud-sep">|</span>
              <span class="hero__hud-label">DATABASE</span>
            </div>
            <div class="hero__hud-status">
              <span class="hero__hud-status-dot"></span>
              <span class="hero__hud-status-text">SYSTEM ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="hero__scroll" aria-hidden="true">
        <div class="hero__scroll-line"></div>
        <span class="hero__scroll-text">SCROLL</span>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding-top: 80px;
    }

    .hero__container {
      max-width: var(--container-max);
      margin: 0 auto;
      padding: 0 var(--container-padding);
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-3xl);
      align-items: center;

      @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        gap: var(--space-2xl);
      }
    }

    // Content
    .hero__content {
      position: relative;
      z-index: 2;
    }

    .hero__label {
      display: inline-flex;
      align-items: center;
      gap: var(--space-sm);
      margin-bottom: var(--space-lg);
      padding: 6px 16px;
      background: var(--surface-glass);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
    }

    .hero__label-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-cyan);
      box-shadow: 0 0 8px var(--accent-cyan);
      animation: pulse 2s ease-in-out infinite;
    }

    .hero__label-text {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-secondary);
    }

    .hero__title {
      font-size: var(--text-5xl);
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: var(--text-primary);
      margin-bottom: var(--space-xl);
    }

    .hero__desc {
      font-size: var(--text-base);
      color: var(--text-secondary);
      line-height: 1.8;
      max-width: 520px;
      margin-bottom: var(--space-2xl);
    }

    .hero__actions {
      display: flex;
      gap: var(--space-md);
      margin-bottom: var(--space-3xl);
      flex-wrap: wrap;
    }

    .hero__stats {
      display: flex;
      align-items: center;
      gap: var(--space-lg);
    }

    .hero__stat {
      display: flex;
      flex-direction: column;
    }

    .hero__stat-value {
      font-size: var(--text-2xl);
      font-weight: 700;
      color: var(--text-primary);
    }

    .hero__stat-label {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-top: 2px;
    }

    .hero__stat-divider {
      width: 1px;
      height: 32px;
      background: var(--border-subtle);
    }

    // 3D Scene
    .hero__scene {
      position: relative;
      height: 550px;
      min-height: 400px;

      @media (max-width: 1024px) {
        height: 400px;
        order: -1;
      }

      @media (max-width: 768px) {
        height: 320px;
      }
    }

    // HUD
    .hero__hud {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 2;
    }

    .hero__hud-item {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(0, 212, 255, 0.1);
      border-radius: var(--radius-sm);
      backdrop-filter: blur(4px);

      &--tl { top: 16px; left: 16px; }
      &--tr { top: 16px; right: 16px; }
      &--bl { bottom: 48px; left: 16px; }
      &--br { bottom: 48px; right: 16px; }

      @media (max-width: 768px) {
        display: none;
      }
    }

    .hero__hud-label {
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(0, 212, 255, 0.7);
    }

    .hero__hud-value {
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: 0.1em;
      color: var(--accent-emerald);
    }

    .hero__hud-sep {
      color: rgba(255, 255, 255, 0.15);
      font-size: 9px;
    }

    .hero__hud-status {
      position: absolute;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: var(--radius-full);

      @media (max-width: 768px) {
        display: none;
      }
    }

    .hero__hud-status-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--accent-emerald);
      box-shadow: 0 0 6px var(--accent-emerald);
      animation: pulse 2s ease-in-out infinite;
    }

    .hero__hud-status-text {
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: 0.15em;
      color: var(--accent-emerald);
    }

    // Scroll indicator
    .hero__scroll {
      position: absolute;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);

      @media (max-width: 768px) {
        display: none;
      }
    }

    .hero__scroll-line {
      width: 1px;
      height: 40px;
      background: linear-gradient(to bottom, var(--accent-cyan), transparent);
      animation: scrollPulse 2s ease-in-out infinite;
    }

    .hero__scroll-text {
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: 0.2em;
      color: var(--text-dim);
    }

    @keyframes scrollPulse {
      0%, 100% { opacity: 0.3; transform: scaleY(1); }
      50% { opacity: 1; transform: scaleY(1.2); }
    }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('heroSection', { static: true }) heroSection!: ElementRef;

  private scrollService = inject(ScrollService);
  config = PORTFOLIO_CONFIG;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.scrollService.registerSection('hero', this.heroSection.nativeElement);
  }

  scrollTo(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
  }
}
