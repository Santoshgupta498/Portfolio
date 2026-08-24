import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { ScrollService } from '../../core/services/scroll.service';
import { PortfolioService } from '../../core/services/portfolio.service';
import { Project } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, ProjectCardComponent],
  template: `
    <section id="projects" class="projects section" #projectsSection>
      <div class="container">
        <app-section-heading
          label="FEATURED WORK"
          title="Projects &"
          highlight="Solutions"
          subtitle="Enterprise systems, AI platforms, and cloud architectures built with modern .NET and Angular."
          align="center"
        ></app-section-heading>

        <div class="projects__grid">
          <div *ngFor="let project of projects; let i = index" class="projects__item reveal" [style.animation-delay]="(i * 100) + 'ms'">
            <app-project-card [project]="project"></app-project-card>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    .projects__grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-xl);

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    .projects__item {
      display: flex;
    }
  `]
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  @ViewChild('projectsSection', { static: true }) projectsSection!: ElementRef;
  private scrollService = inject(ScrollService);
  private portfolioService = inject(PortfolioService);

  projects: Project[] = [];

  ngOnInit(): void {
    this.portfolioService.getFeaturedProjects().subscribe(p => this.projects = p);
  }

  ngAfterViewInit(): void {
    this.scrollService.registerSection('projects', this.projectsSection.nativeElement);
  }
}
