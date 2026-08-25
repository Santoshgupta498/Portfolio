import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { HolographicPanelComponent } from '../../shared/components/holographic-panel/holographic-panel.component';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { ScrollService } from '../../core/services/scroll.service';
import { PortfolioService } from '../../core/services/portfolio.service';
import { GitHubStats } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-github',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, HolographicPanelComponent, GlassCardComponent],
  template: `
    <section id="github" class="github section" #githubSection>
      <div class="container">
        <app-section-heading
          label="DEVELOPER ACTIVITY"
          title="GitHub"
          highlight="Dashboard"
          subtitle="A real-time view of my development activity, contributions, and open-source work."
          align="center"
        ></app-section-heading>

        <div class="github__grid" *ngIf="stats">
          <!-- Stats row -->
          <div class="github__stats reveal">
            <div class="github__stat" *ngFor="let stat of statCards">
              <app-holographic-panel [title]="stat.label" status="LIVE">
                <div class="github__stat-inner">
                  <span class="github__stat-value">{{ stat.value }}</span>
                </div>
              </app-holographic-panel>
            </div>
          </div>

          <!-- Activity heatmap -->
          <div class="github__activity reveal delay-1">
            <app-glass-card [enableGlow]="true" [enableTilt]="false">
              <div class="github__activity-header">
                <span class="github__activity-label">CONTRIBUTION ACTIVITY</span>
                <span class="github__activity-streak">{{ stats.streakDays }} day streak</span>
              </div>
              <div class="github__heatmap">
                <div
                  *ngFor="let day of stats.recentActivity"
                  class="github__heatmap-cell"
                  [style.--intensity]="getIntensity(day.count)"
                  [title]="day.date + ': ' + day.count + ' contributions'"
                ></div>
              </div>
            </app-glass-card>
          </div>

          <!-- Languages -->
          <div class="github__languages reveal delay-2">
            <app-glass-card [enableGlow]="true" [enableTilt]="false">
              <div class="github__lang-header">
                <span class="github__lang-label">TECHNOLOGIES & SKILLS</span>
              </div>
              <div class="github__lang-bars">
                <div *ngFor="let lang of stats.topLanguages" class="github__lang-item">
                  <div class="github__lang-info">
                    <i *ngIf="lang.icon" [class]="lang.icon" class="github__lang-icon" [style.color]="lang.color"></i>
                    <span *ngIf="!lang.icon" class="github__lang-dot" [style.background]="lang.color"></span>
                    <span class="github__lang-name">{{ lang.name }}</span>
                    <span class="github__lang-pct">{{ lang.percentage }}%</span>
                  </div>
                  <div class="github__lang-bar">
                    <div class="github__lang-bar-fill" [style.width]="lang.percentage + '%'" [style.background]="lang.color"></div>
                  </div>
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

    .github__grid {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    .github__stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-md);

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .github__stat-inner {
      text-align: center;
    }

    .github__stat-value {
      font-size: var(--text-2xl);
      font-weight: 700;
      color: var(--text-primary);
    }

    .github__activity-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-md);
    }

    .github__activity-label {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.12em;
      color: var(--text-muted);
    }

    .github__activity-streak {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--accent-emerald);
    }

    .github__heatmap {
      display: grid;
      grid-template-columns: repeat(14, 1fr);
      gap: 4px;

      @media (max-width: 600px) {
        grid-template-columns: repeat(7, 1fr);
        gap: 3px;
      }
    }

    .github__heatmap-cell {
      aspect-ratio: 1;
      border-radius: 3px;
      background: color-mix(in srgb, var(--accent-cyan) calc(var(--intensity, 0) * 100%), var(--surface-glass));
      border: 1px solid rgba(0, 212, 255, calc(var(--intensity, 0) * 0.3));
      min-height: 20px;
      transition: transform var(--duration-fast);

      @media (max-width: 600px) {
        min-height: 24px;
        border-radius: 4px;
      }

      &:hover {
        transform: scale(1.2);
      }
    }

    .github__lang-header {
      margin-bottom: var(--space-md);
    }

    .github__lang-label {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.12em;
      color: var(--text-muted);
    }

    .github__lang-bars {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .github__lang-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .github__lang-info {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .github__lang-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .github__lang-icon {
      font-size: 18px;
      flex-shrink: 0;
      width: 20px;
      text-align: center;
    }

    .github__lang-name {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      flex: 1;
    }

    .github__lang-pct {
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      color: var(--text-muted);
    }

    .github__lang-bar {
      height: 4px;
      background: var(--surface-glass);
      border-radius: var(--radius-full);
      overflow: hidden;
    }

    .github__lang-bar-fill {
      height: 100%;
      border-radius: var(--radius-full);
      transition: width 1s var(--ease-out);
    }
  `]
})
export class GithubComponent implements OnInit, AfterViewInit {
  @ViewChild('githubSection', { static: true }) githubSection!: ElementRef;
  private scrollService = inject(ScrollService);
  private portfolioService = inject(PortfolioService);

  stats: GitHubStats | null = null;
  statCards: { label: string; value: string | number }[] = [];

  ngOnInit(): void {
    this.portfolioService.getGitHubStats().subscribe(s => {
      this.stats = s;
      this.statCards = [
        { label: 'REPOSITORIES', value: s.repositories },
        { label: 'CONTRIBUTIONS', value: s.contributions },
        { label: 'STARS', value: s.stars },
        { label: 'FOLLOWERS', value: s.followers }
      ];
    });
  }

  ngAfterViewInit(): void {
    this.scrollService.registerSection('github', this.githubSection.nativeElement);
  }

  getIntensity(count: number): string {
    return Math.min(count / 15, 1).toFixed(2);
  }
}
