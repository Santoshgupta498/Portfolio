import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Project,
  Experience,
  Skill,
  Technology,
  Achievement,
  SocialLink,
  GitHubStats,
  ContactFormData,
  PortfolioConfig,
  NavItem
} from '../models/portfolio.models';
import { PORTFOLIO_CONFIG } from '../constants/portfolio.config';
import {
  PROJECTS,
  EXPERIENCES,
  SKILLS,
  TECHNOLOGIES,
  ACHIEVEMENTS,
  SOCIAL_LINKS,
  GITHUB_STATS,
  NAV_ITEMS
} from '../constants/portfolio.data';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  getConfig(): PortfolioConfig {
    return PORTFOLIO_CONFIG;
  }

  getNavItems(): NavItem[] {
    return NAV_ITEMS;
  }

  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }

  getFeaturedProjects(): Observable<Project[]> {
    return of(PROJECTS.filter(p => p.featured));
  }

  getExperiences(): Observable<Experience[]> {
    return of(EXPERIENCES);
  }

  getSkills(): Observable<Skill[]> {
    return of(SKILLS);
  }

  getSkillsByCategory(category: string): Observable<Skill[]> {
    return of(SKILLS.filter(s => s.category === category));
  }

  getTechnologies(): Observable<Technology[]> {
    return of(TECHNOLOGIES);
  }

  getAchievements(): Observable<Achievement[]> {
    return of(ACHIEVEMENTS);
  }

  getSocialLinks(): SocialLink[] {
    return SOCIAL_LINKS;
  }

  getGitHubStats(): Observable<GitHubStats> {
    return of(GITHUB_STATS);
  }

  submitContact(data: ContactFormData): Observable<{ success: boolean; message: string }> {
    // Mock implementation - replace with ASP.NET Core API call
    console.log('Contact form submitted:', data);
    return of({ success: true, message: 'Message sent successfully. I will respond shortly.' });
  }
}
