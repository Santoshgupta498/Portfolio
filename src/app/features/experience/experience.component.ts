import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { ScrollService } from '../../core/services/scroll.service';
import { PortfolioService } from '../../core/services/portfolio.service';
import { Experience } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, GlassCardComponent],
  template: `
    <section id="experience" class="experience section" #experienceSection>
      <div class="container">
        <app-section-heading
          label="CAREER PATH"
          title="Professional"
          highlight="Experience"
          subtitle="A journey through enterprise systems, distributed architectures, and modern software engineering."
        ></app-section-heading>

        <div class="experience__timeline">
          <div class="experience__line" aria-hidden="true"></div>

          <div
            *ngFor="let exp of experiences; let i = index; let last = last"
            class="experience__item reveal"
            [style.animation-delay]="(i * 150) + 'ms'"
          >
            <!-- Timeline node -->
            <div class="experience__node" aria-hidden="true">
              <span class="experience__node-dot" [class.experience__node-dot--active]="exp.current"></span>
              <span class="experience__node-ring" *ngIf="exp.current"></span>
            </div>

            <!-- Content card -->
            <app-glass-card [enableGlow]="true" [enableTilt]="false">
              <div class="experience__card">
                <div class="experience__card-header">
                  <div class="experience__card-company">
                    <h3 class="experience__card-role">{{ exp.role }}</h3>
                    <p class="experience__card-org">{{ exp.company }}</p>
                  </div>
                  <div class="experience__card-meta">
                    <span class="experience__card-date">{{ exp.startDate }} — {{ exp.endDate }}</span>
                    <span class="experience__card-badge" *ngIf="exp.current">CURRENT</span>
                  </div>
                </div>

                <p class="experience__card-desc">{{ exp.description }}</p>

                <div class="experience__card-achievements">
                  <div *ngFor="let achievement of exp.achievements" class="experience__achievement">
                    <span class="experience__achievement-icon">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    <span class="experience__achievement-text">{{ achievement }}</span>
                  </div>
                </div>

                <div class="experience__card-tech">
                  <span *ngFor="let tech of exp.technologies" class="experience__tech-tag">{{ tech }}</span>
                </div>
              </div>
            </app-glass-card>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    .experience__timeline {
      position: relative;
      max-width: 800px;
      margin: 0 auto;
    }

    .experience__line {
      position: absolute;
      left: 16px;
      top: 0;
      bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, var(--accent-cyan-dim), var(--border-subtle), transparent);

      @media (max-width: 768px) {
        left: 12px;
      }
    }

    .experience__item {
      position: relative;
      padding-left: 56px;
      padding-bottom: var(--space-2xl);

      @media (max-width: 768px) {
        padding-left: 40px;
      }

      &:last-child {
        padding-bottom: 0;
      }
    }

    .experience__node {
      position: absolute;
      left: 8px;
      top: 24px;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (max-width: 768px) {
        left: 4px;
      }
    }

    .experience__node-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--border-light);
      border: 2px solid var(--bg-primary);
      z-index: 2;
      position: relative;

      &--active {
        background: var(--accent-cyan);
        box-shadow: 0 0 10px var(--accent-cyan-glow);
      }
    }

    .experience__node-ring {
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 1px solid var(--accent-cyan-dim);
      animation: pulse 2s ease-in-out infinite;
    }

    .experience__card {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .experience__card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--space-md);
      flex-wrap: wrap;
    }

    .experience__card-role {
      font-size: var(--text-lg);
      font-weight: 600;
      color: var(--text-primary);
    }

    .experience__card-org {
      font-size: var(--text-sm);
      color: var(--accent-cyan);
      margin-top: 2px;
    }

    .experience__card-meta {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .experience__card-date {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--text-muted);
      letter-spacing: 0.05em;
    }

    .experience__card-badge {
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: 0.1em;
      padding: 2px 8px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: var(--radius-full);
      color: var(--accent-emerald);
    }

    .experience__card-desc {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: 1.7;
    }

    .experience__card-achievements {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .experience__achievement {
      display: flex;
      align-items: flex-start;
      gap: var(--space-sm);
    }

    .experience__achievement-icon {
      color: var(--accent-emerald);
      flex-shrink: 0;
      margin-top: 2px;
    }

    .experience__achievement-text {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .experience__card-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: var(--space-sm);
    }

    .experience__tech-tag {
      font-family: var(--font-mono);
      font-size: 10px;
      padding: 3px 8px;
      background: var(--surface-glass);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: var(--text-muted);
    }
  `]
})
export class ExperienceComponent implements OnInit, AfterViewInit {
  @ViewChild('experienceSection', { static: true }) experienceSection!: ElementRef;
  private scrollService = inject(ScrollService);
  private portfolioService = inject(PortfolioService);

  experiences: Experience[] = [];

  ngOnInit(): void {
    this.portfolioService.getExperiences().subscribe(e => this.experiences = e);
  }

  ngAfterViewInit(): void {
    this.scrollService.registerSection('experience', this.experienceSection.nativeElement);
  }
}
