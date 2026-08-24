import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { TechnologyOrbitComponent } from '../../shared/components/technology-orbit/technology-orbit.component';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { ScrollService } from '../../core/services/scroll.service';
import { PortfolioService } from '../../core/services/portfolio.service';
import { Skill, Technology } from '../../core/models/portfolio.models';

interface SkillGroup {
  key: string;
  label: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, TechnologyOrbitComponent, GlassCardComponent],
  template: `
    <section id="skills" class="skills section" #skillsSection>
      <div class="container">
        <app-section-heading
          label="TECHNICAL EXPERTISE"
          title="Technology"
          highlight="Universe"
          subtitle="A constellation of tools, frameworks, and platforms I work with to build intelligent systems."
          align="center"
        ></app-section-heading>

        <!-- Technology Orbit -->
        <div class="skills__orbit reveal">
          <app-technology-orbit [technologies]="technologies"></app-technology-orbit>
        </div>

        <!-- Skill categories grid -->
        <div class="skills__grid">
          <div *ngFor="let group of skillGroups; let i = index" class="skills__group reveal" [style.animation-delay]="(i * 100) + 'ms'">
            <app-glass-card [enableGlow]="true" [enableTilt]="false">
              <div class="skills__group-header">
                <span class="skills__group-icon">{{ getGroupIcon(group.key) }}</span>
                <span class="skills__group-label">{{ group.label }}</span>
              </div>
              <div class="skills__group-items">
                <div *ngFor="let skill of group.skills" class="skills__item">
                  <!-- Devicon class icons -->
                  <i *ngIf="skill.icon && !skill.icon.startsWith('ai-custom')" [class]="skill.icon" class="skills__item-icon"></i>
                  <!-- ChatGPT custom SVG -->
                  <svg *ngIf="skill.icon === 'ai-custom-chatgpt'" class="skills__item-svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
                  </svg>
                  <!-- Prompt Engineering custom SVG -->
                  <svg *ngIf="skill.icon === 'ai-custom-prompt'" class="skills__item-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
                  </svg>
                  <!-- Fallback dot if no icon -->
                  <span *ngIf="!skill.icon" class="skills__item-dot"></span>
                  <span class="skills__item-name">{{ skill.name }}</span>
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

    .skills__orbit {
      margin-bottom: var(--space-4xl);
    }

    .skills__grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-md);

      @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .skills__group-header {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      margin-bottom: var(--space-md);
      padding-bottom: var(--space-sm);
      border-bottom: 1px solid var(--border-subtle);
    }

    .skills__group-icon {
      font-size: var(--text-lg);
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--accent-cyan-dim);
      border-radius: var(--radius-sm);
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--accent-cyan);
    }

    .skills__group-label {
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .skills__group-items {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .skills__item {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: 4px 0;
    }

    .skills__item-icon {
      font-size: 16px;
      width: 20px;
      text-align: center;
      color: var(--accent-cyan);
      opacity: 0.8;
      flex-shrink: 0;
    }

    .skills__item-svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      color: var(--accent-cyan);
      opacity: 0.8;
    }

    .skills__item-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--accent-cyan);
      opacity: 0.6;
      flex-shrink: 0;
    }

    .skills__item-name {
      font-size: var(--text-sm);
      color: var(--text-secondary);
    }
  `]
})
export class SkillsComponent implements OnInit, AfterViewInit {
  @ViewChild('skillsSection', { static: true }) skillsSection!: ElementRef;
  private scrollService = inject(ScrollService);
  private portfolioService = inject(PortfolioService);

  technologies: Technology[] = [];
  skillGroups: SkillGroup[] = [];

  ngOnInit(): void {
    this.portfolioService.getTechnologies().subscribe(t => this.technologies = t);
    this.portfolioService.getSkills().subscribe(skills => {
      const groups: Record<string, Skill[]> = {};
      skills.forEach(s => {
        if (!groups[s.category]) groups[s.category] = [];
        groups[s.category].push(s);
      });

      const labelMap: Record<string, string> = {
        backend: 'Backend',
        frontend: 'Frontend',
        database: 'Database',
        cloud: 'Cloud & DevOps',
        architecture: 'Architecture',
        security: 'Security',
        testing: 'Testing',
        ai: 'AI & ML'
      };

      this.skillGroups = Object.keys(groups).map(key => ({
        key,
        label: labelMap[key] || key,
        skills: groups[key]
      }));
    });
  }

  ngAfterViewInit(): void {
    this.scrollService.registerSection('skills', this.skillsSection.nativeElement);
  }

  getGroupIcon(key: string): string {
    const icons: Record<string, string> = {
      backend: 'BE',
      frontend: 'FE',
      database: 'DB',
      cloud: 'CL',
      architecture: 'AR',
      security: 'SC',
      testing: 'TS',
      ai: 'AI'
    };
    return icons[key] || '//';
  }
}
