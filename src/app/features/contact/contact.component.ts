import { Component, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { MagneticButtonComponent } from '../../shared/components/magnetic-button/magnetic-button.component';
import { ScrollService } from '../../core/services/scroll.service';
import { EmailService } from '../../core/services/email.service';
import { PORTFOLIO_CONFIG } from '../../core/constants/portfolio.config';
import { SOCIAL_LINKS } from '../../core/constants/portfolio.data';
import { ContactFormData, SocialLink } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, SectionHeadingComponent, MagneticButtonComponent],
  template: `
    <section id="contact" class="contact section" #contactSection>
      <div class="container">
        <app-section-heading
          label="GET IN TOUCH"
          title="Let's"
          highlight="Connect"
          subtitle="Have a project in mind or want to discuss opportunities? Send a message through this terminal."
          align="center"
        ></app-section-heading>

        <div class="contact__grid">
          <!-- Form -->
          <div class="contact__form-wrapper reveal">
            <div class="contact__terminal">
              <div class="contact__terminal-header">
                <span class="contact__terminal-dot contact__terminal-dot--red"></span>
                <span class="contact__terminal-dot contact__terminal-dot--yellow"></span>
                <span class="contact__terminal-dot contact__terminal-dot--green"></span>
                <span class="contact__terminal-title">COMMUNICATION TERMINAL</span>
              </div>

              <form class="contact__form" (ngSubmit)="onSubmit()" #contactForm="ngForm">
                <div class="contact__field">
                  <label class="contact__label" for="name">NAME</label>
                  <input
                    id="name"
                    class="contact__input"
                    type="text"
                    [(ngModel)]="formData.name"
                    name="name"
                    required
                    placeholder="Your name"
                    autocomplete="name"
                  />
                </div>

                <div class="contact__field">
                  <label class="contact__label" for="email">EMAIL</label>
                  <input
                    id="email"
                    class="contact__input"
                    type="email"
                    [(ngModel)]="formData.email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    autocomplete="email"
                  />
                </div>

                <div class="contact__field">
                  <label class="contact__label" for="subject">SUBJECT</label>
                  <input
                    id="subject"
                    class="contact__input"
                    type="text"
                    [(ngModel)]="formData.subject"
                    name="subject"
                    required
                    placeholder="Project discussion"
                  />
                </div>

                <div class="contact__field">
                  <label class="contact__label" for="message">MESSAGE</label>
                  <textarea
                    id="message"
                    class="contact__textarea"
                    [(ngModel)]="formData.message"
                    name="message"
                    required
                    placeholder="Tell me about your project..."
                    rows="5"
                  ></textarea>
                </div>

                <div class="contact__submit">
                  <app-magnetic-button
                    variant="primary"
                    size="lg"
                    [disabled]="isSubmitting || !contactForm.valid"
                  >
                    <span *ngIf="!isSubmitting && !submitSuccess">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Send Message
                    </span>
                    <span *ngIf="isSubmitting" class="contact__transmitting">
                      TRANSMITTING...
                    </span>
                    <span *ngIf="submitSuccess" class="contact__success">
                      MESSAGE DELIVERED
                    </span>
                  </app-magnetic-button>
                </div>

                <p *ngIf="submitMessage" class="contact__message" [class.contact__message--success]="submitSuccess">
                  {{ submitMessage }}
                </p>
              </form>
            </div>
          </div>

          <!-- Info panel -->
          <div class="contact__info reveal delay-2">
            <div class="contact__info-block">
              <span class="contact__info-label">LOCATION</span>
              <span class="contact__info-value">{{ config.location }}</span>
            </div>
            <div class="contact__info-block">
              <span class="contact__info-label">EMAIL</span>
              <a class="contact__info-value contact__info-link" [href]="'mailto:' + config.email">{{ config.email }}</a>
            </div>
            <div class="contact__info-block">
              <span class="contact__info-label">AVAILABILITY</span>
              <span class="contact__info-value contact__info-available">
                <span class="contact__info-dot"></span>
                Open to opportunities
              </span>
            </div>

            <div class="contact__socials">
              <span class="contact__info-label">CONNECT</span>
              <div class="contact__social-links">
                <a
                  *ngFor="let link of socialLinks"
                  [href]="link.url"
                  class="contact__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  [attr.aria-label]="link.label"
                >
                  <svg *ngIf="link.icon === 'github'" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  <svg *ngIf="link.icon === 'linkedin'" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <svg *ngIf="link.icon === 'twitter'" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  <svg *ngIf="link.icon === 'mail'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg>
                  <span>{{ link.platform }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    .contact__grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: var(--space-3xl);
      align-items: start;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    .contact__terminal {
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      overflow: hidden;
      background: rgba(10, 10, 15, 0.8);
    }

    .contact__terminal-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: var(--space-md) var(--space-lg);
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid var(--border-subtle);
    }

    .contact__terminal-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;

      &--red { background: #ff5f57; }
      &--yellow { background: #ffbd2e; }
      &--green { background: #28ca41; }
    }

    .contact__terminal-title {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.12em;
      color: var(--text-muted);
      margin-left: var(--space-sm);
    }

    .contact__form {
      padding: var(--space-xl);
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }

    .contact__field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .contact__label {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.12em;
      color: var(--text-muted);
    }

    .contact__input,
    .contact__textarea {
      width: 100%;
      padding: var(--space-md);
      background: var(--surface-glass);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: var(--text-sm);
      transition: border-color var(--duration-fast);

      &:focus {
        border-color: var(--accent-cyan);
        box-shadow: 0 0 0 3px var(--accent-cyan-dim);
      }

      &::placeholder {
        color: var(--text-dim);
      }
    }

    .contact__textarea {
      resize: vertical;
      min-height: 120px;
    }

    .contact__submit {
      margin-top: var(--space-sm);
    }

    .contact__transmitting {
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      letter-spacing: 0.1em;
      animation: pulse 1s ease-in-out infinite;
    }

    .contact__success {
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      letter-spacing: 0.1em;
      color: var(--accent-emerald);
    }

    .contact__message {
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      color: var(--text-muted);
      margin-top: var(--space-sm);

      &--success {
        color: var(--accent-emerald);
      }
    }

    // Info
    .contact__info {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    .contact__info-block {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .contact__info-label {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.12em;
      color: var(--text-muted);
    }

    .contact__info-value {
      font-size: var(--text-base);
      color: var(--text-primary);
    }

    .contact__info-link {
      color: var(--accent-cyan);
      transition: opacity var(--duration-fast);

      &:hover {
        opacity: 0.8;
      }
    }

    .contact__info-available {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--accent-emerald);
    }

    .contact__info-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-emerald);
      box-shadow: 0 0 8px var(--accent-emerald);
      animation: pulse 2s ease-in-out infinite;
    }

    .contact__socials {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .contact__social-links {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
    }

    .contact__social-link {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.05em;
      padding: 8px 14px;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      color: var(--text-secondary);
      transition: all var(--duration-fast);
      display: inline-flex;
      align-items: center;
      gap: 8px;

      &:hover {
        border-color: var(--accent-cyan-dim);
        color: var(--accent-cyan);
        background: var(--accent-cyan-dim);
      }

      svg {
        flex-shrink: 0;
      }
    }
  `]
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('contactSection', { static: true }) contactSection!: ElementRef;
  private scrollService = inject(ScrollService);
  private emailService = inject(EmailService);

  config = PORTFOLIO_CONFIG;
  socialLinks: SocialLink[] = SOCIAL_LINKS;

  formData: ContactFormData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  submitSuccess = false;
  submitMessage = '';

  ngAfterViewInit(): void {
    this.scrollService.registerSection('contact', this.contactSection.nativeElement);
  }

  onSubmit(): void {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.submitMessage = '';

    this.emailService.sendEmail(this.formData).then((res) => {
      this.isSubmitting = false;
      this.submitSuccess = res.success;
      this.submitMessage = res.message;
      if (res.success) {
        this.formData = { name: '', email: '', subject: '', message: '' };
        setTimeout(() => { this.submitSuccess = false; this.submitMessage = ''; }, 5000);
      }
    }).catch(() => {
      this.isSubmitting = false;
      this.submitMessage = 'Transmission failed. Please try again.';
    });
  }
}
