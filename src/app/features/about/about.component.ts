import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { HolographicPanelComponent } from '../../shared/components/holographic-panel/holographic-panel.component';
import { ScrollService } from '../../core/services/scroll.service';
import { PORTFOLIO_CONFIG } from '../../core/constants/portfolio.config';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, GlassCardComponent, HolographicPanelComponent],
  template: `
    <section id="about" class="about section" #aboutSection>
      <div class="container">
        <app-section-heading
          label="ABOUT ME"
          title="Passionate about"
          highlight="Digital Engineering"
          subtitle="Building scalable systems and intelligent applications that push the boundaries of modern software."
        ></app-section-heading>

        <div class="about__grid">
          <!-- Main bio panel -->
          <div class="about__main reveal">
            <app-glass-card [enableGlow]="true">
              <div class="about__bio">
                <div class="about__avatar">
                  <div class="about__avatar-ring"></div>
                  <div class="about__avatar-inner">
                    <img src="assets/images/Passport-size photograph.png" alt="Santosh Gupta" class="about__avatar-img" />
                  </div>
                  <div class="about__avatar-status">
                    <span class="about__avatar-status-dot"></span>
                  </div>
                </div>

                <div class="about__info">
                  <h3 class="about__name">{{ config.name }}</h3>
                  <p class="about__role">{{ config.title }}</p>
                  <p class="about__location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {{ config.location }}
                  </p>
                </div>

                <div class="about__bio-text">
                  <p>{{ config.bio }}</p>
                </div>

                <div class="about__focus">
                  <span class="about__focus-label">TECHNOLOGY FOCUS</span>
                  <div class="about__focus-tags">
                    <span class="about__focus-tag">.NET Core</span>
                    <span class="about__focus-tag">Angular</span>
                    <span class="about__focus-tag">Microservices</span>
                    <span class="about__focus-tag">Cloud Architecture</span>
                    <span class="about__focus-tag">AI Integration</span>
                    <span class="about__focus-tag">REST APIs</span>
                  </div>
                </div>
              </div>
            </app-glass-card>
          </div>

          <!-- Stats panels -->
          <div class="about__stats">
            <div class="about__stat-card reveal delay-1" *ngFor="let stat of stats">
              <app-holographic-panel [title]="stat.label" [animated]="false">
                <div class="about__stat-content">
                  <span class="about__stat-value">{{ stat.value }}</span>
                  <span class="about__stat-desc">{{ stat.description }}</span>
                </div>
              </app-holographic-panel>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    .about__grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: var(--space-2xl);
      align-items: start;

      @media (max-width: 1024px) {
        grid-template-columns: 1fr;
      }
    }

    .about__bio {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    .about__avatar {
      position: relative;
      width: 100px;
      height: 100px;
    }

    .about__avatar-ring {
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 1.5px solid var(--accent-cyan-dim);
      animation: pulse 3s ease-in-out infinite;
    }

    .about__avatar-inner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid var(--border-light);
    }

    .about__avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
    }

    .about__avatar-initials {
      font-family: var(--font-mono);
      font-size: var(--text-xl);
      font-weight: 600;
      color: var(--text-primary);
    }

    .about__avatar-status {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--bg-primary);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .about__avatar-status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-emerald);
      box-shadow: 0 0 6px var(--accent-emerald);
    }

    .about__info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .about__name {
      font-size: var(--text-xl);
      font-weight: 600;
      color: var(--text-primary);
    }

    .about__role {
      font-size: var(--text-sm);
      color: var(--accent-cyan);
      font-family: var(--font-mono);
    }

    .about__location {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: var(--text-sm);
      color: var(--text-muted);
      margin-top: 4px;
    }

    .about__bio-text {
      font-size: var(--text-base);
      color: var(--text-secondary);
      line-height: 1.8;
    }

    .about__focus {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .about__focus-label {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.12em;
      color: var(--text-muted);
    }

    .about__focus-tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
    }

    .about__focus-tag {
      font-family: var(--font-mono);
      font-size: 11px;
      padding: 4px 12px;
      background: var(--surface-glass);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      color: var(--text-secondary);
      transition: all var(--duration-fast);

      &:hover {
        border-color: var(--accent-cyan-dim);
        color: var(--accent-cyan);
      }
    }

    // Stats
    .about__stats {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .about__stat-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .about__stat-value {
      font-size: var(--text-2xl);
      font-weight: 700;
      color: var(--text-primary);
    }

    .about__stat-desc {
      font-size: var(--text-sm);
      color: var(--text-secondary);
    }
  `]
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutSection', { static: true }) aboutSection!: ElementRef;
  private scrollService = inject(ScrollService);
  config = PORTFOLIO_CONFIG;

  stats = [
    { label: 'EXPERIENCE', value: '5+ Years', description: 'Building enterprise-scale .NET applications and cloud systems' },
    { label: 'TECHNOLOGIES', value: '20+', description: 'Across backend, frontend, cloud, and AI domains' },
    { label: 'SYSTEMS', value: 'Production-Grade', description: 'Multiple scalable systems handling millions of requests' },
    { label: 'ARCHITECTURE', value: 'Microservices', description: 'Clean architecture, CQRS, event-driven, domain-driven design' }
  ];

  ngAfterViewInit(): void {
    this.scrollService.registerSection('about', this.aboutSection.nativeElement);
  }
}
