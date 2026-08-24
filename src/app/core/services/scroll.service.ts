import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  activeSection = signal<string>('hero');
  scrollY = signal<number>(0);
  isScrolled = signal<boolean>(false);

  private sectionElements: Map<string, HTMLElement> = new Map();

  registerSection(id: string, element: HTMLElement): void {
    this.sectionElements.set(id, element);
  }

  unregisterSection(id: string): void {
    this.sectionElements.delete(id);
  }

  scrollToSection(sectionId: string): void {
    const element = this.sectionElements.get(sectionId) || document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  updateScrollState(): void {
    const scrollTop = window.scrollY;
    this.scrollY.set(scrollTop);
    this.isScrolled.set(scrollTop > 80);

    // Determine active section
    let currentSection = 'hero';
    const offset = window.innerHeight * 0.3;

    this.sectionElements.forEach((element, id) => {
      const rect = element.getBoundingClientRect();
      if (rect.top <= offset && rect.bottom > offset) {
        currentSection = id;
      }
    });

    this.activeSection.set(currentSection);
  }
}
