import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from './core/services/animation.service';
import { ThemeService } from './core/services/theme.service';
import { FuturisticNavbarComponent } from './shared/components/futuristic-navbar/futuristic-navbar.component';
import { ParticleBackgroundComponent } from './shared/components/particle-background/particle-background.component';
import { CursorGlowComponent } from './shared/components/cursor-glow/cursor-glow.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoadingScreenComponent } from './shared/components/loading-screen/loading-screen.component';
import { CommandPaletteComponent } from './shared/components/command-palette/command-palette.component';
import { AiAssistantComponent } from './shared/components/ai-assistant/ai-assistant.component';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ArchitectureLabComponent } from './features/architecture-lab/architecture-lab.component';
import { SkillsComponent } from './features/skills/skills.component';
import { GithubComponent } from './features/github/github.component';
import { ContactComponent } from './features/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FuturisticNavbarComponent,
    ParticleBackgroundComponent,
    CursorGlowComponent,
    FooterComponent,
    LoadingScreenComponent,
    CommandPaletteComponent,
    AiAssistantComponent,
    HomeComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    ArchitectureLabComponent,
    SkillsComponent,
    GithubComponent,
    ContactComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  private animationService = inject(AnimationService);
  private themeService = inject(ThemeService);

  isLoaded = false;

  ngOnInit(): void {
    this.animationService.initialize();
    this.themeService.initialize();
  }

  ngAfterViewInit(): void {
    // Setup IntersectionObserver for reveal animations
    if (typeof window !== 'undefined') {
      this.setupRevealObserver();
    }
  }

  onLoadingComplete(): void {
    this.isLoaded = true;
  }

  private setupRevealObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    // Observe all elements with reveal classes after components render
    setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
      revealElements.forEach((el) => {
        observer.observe(el);
      });
    }, 500);

    // Fallback: reveal everything after 3 seconds in case observer doesn't trigger
    setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
        el.classList.add('revealed');
      });
    }, 3000);
  }
}
