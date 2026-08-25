import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  type: 'user' | 'assistant';
  content: string;
}

interface QuickAction {
  label: string;
  query: string;
}

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Floating Button -->
    <button
      class="ai-btn"
      [class.ai-btn--open]="isOpen"
      (click)="toggle()"
      aria-label="Open AI assistant"
    >
      <svg *ngIf="!isOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 2a4 4 0 014 4v1a4 4 0 01-8 0V6a4 4 0 014-4z"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <rect x="4" y="10" width="16" height="10" rx="4"/>
        <circle cx="9" cy="14" r="1" fill="currentColor"/>
        <circle cx="15" cy="14" r="1" fill="currentColor"/>
      </svg>
      <svg *ngIf="isOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>

    <!-- Panel -->
    <div class="ai-panel" [class.ai-panel--open]="isOpen" role="dialog" aria-label="AI Assistant" [attr.aria-hidden]="!isOpen">
      <div class="ai-panel__header">
        <span class="ai-panel__header-dot"></span>
        <span class="ai-panel__header-title">AI ASSISTANT</span>
        <span class="ai-panel__header-status">LOCAL</span>
      </div>

      <div class="ai-panel__messages">
        <div *ngFor="let msg of messages" class="ai-panel__msg" [class.ai-panel__msg--user]="msg.type === 'user'">
          <span class="ai-panel__msg-label">{{ msg.type === 'user' ? 'YOU' : 'AI' }}</span>
          <p class="ai-panel__msg-text">{{ msg.content }}</p>
        </div>

        <div *ngIf="messages.length === 0" class="ai-panel__welcome">
          <p>Hello! I can answer questions about Santosh's portfolio. Try asking:</p>
        </div>
      </div>

      <!-- Quick actions -->
      <div class="ai-panel__quick" *ngIf="messages.length < 3">
        <button
          *ngFor="let action of quickActions"
          class="ai-panel__quick-btn"
          (click)="askQuestion(action.query)"
        >
          {{ action.label }}
        </button>
      </div>

      <!-- Input -->
      <div class="ai-panel__input-row">
        <input
          class="ai-panel__input"
          [(ngModel)]="userInput"
          (keydown.enter)="sendMessage()"
          placeholder="Ask a question..."
          [attr.aria-label]="'Ask the AI assistant a question'"
        />
        <button class="ai-panel__send" (click)="sendMessage()" aria-label="Send message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .ai-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: var(--bg-elevated);
      border: 1px solid var(--border-light);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-cyan);
      cursor: pointer;
      z-index: 999;
      box-shadow: var(--shadow-lg), 0 0 20px var(--accent-cyan-dim);
      transition: all var(--duration-normal) var(--ease-out);

      @media (max-width: 768px) {
        bottom: 16px;
        right: 16px;
      }

      &:hover {
        border-color: var(--accent-cyan);
        box-shadow: var(--shadow-lg), 0 0 30px var(--accent-cyan-dim);
        transform: scale(1.05);
      }

      &--open {
        background: var(--accent-cyan-dim);
        border-color: var(--accent-cyan);
      }
    }

    .ai-panel {
      position: fixed;
      bottom: 88px;
      right: 24px;
      width: 360px;
      max-width: calc(100vw - 48px);
      max-height: 500px;
      background: var(--bg-elevated);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
      z-index: 998;
      display: flex;
      flex-direction: column;
      transform: translateY(10px) scale(0.95);
      opacity: 0;
      pointer-events: none;
      transition: all var(--duration-normal) var(--ease-out);

      @media (max-width: 768px) {
        bottom: 80px;
        right: 16px;
        left: 16px;
        width: auto;
        max-width: none;
        max-height: calc(100vh - 120px);
      }

      &--open {
        transform: translateY(0) scale(1);
        opacity: 1;
        pointer-events: all;
      }
    }

    .ai-panel__header {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-md) var(--space-lg);
      border-bottom: 1px solid var(--border-subtle);
    }

    .ai-panel__header-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-emerald);
      box-shadow: 0 0 6px var(--accent-emerald);
    }

    .ai-panel__header-title {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.12em;
      color: var(--text-secondary);
      flex: 1;
    }

    .ai-panel__header-status {
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: 0.1em;
      color: var(--text-dim);
      padding: 2px 6px;
      background: var(--surface-glass);
      border-radius: var(--radius-sm);
    }

    .ai-panel__messages {
      flex: 1;
      overflow-y: auto;
      padding: var(--space-md);
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      min-height: 120px;
      max-height: 250px;
    }

    .ai-panel__msg {
      display: flex;
      flex-direction: column;
      gap: 4px;

      &--user {
        align-items: flex-end;

        .ai-panel__msg-text {
          background: var(--accent-cyan-dim);
          border-color: rgba(0, 212, 255, 0.2);
        }
      }
    }

    .ai-panel__msg-label {
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: 0.1em;
      color: var(--text-dim);
    }

    .ai-panel__msg-text {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: 1.5;
      padding: var(--space-sm) var(--space-md);
      background: var(--surface-glass);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      max-width: 280px;
    }

    .ai-panel__welcome {
      font-size: var(--text-sm);
      color: var(--text-muted);
      text-align: center;
      padding: var(--space-md);
    }

    .ai-panel__quick {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 0 var(--space-md) var(--space-md);
    }

    .ai-panel__quick-btn {
      font-family: var(--font-mono);
      font-size: 11px;
      padding: 8px 14px;
      background: var(--surface-glass);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--duration-fast);
      min-height: 36px;

      &:hover {
        border-color: var(--accent-cyan-dim);
        color: var(--accent-cyan);
      }
    }

    .ai-panel__input-row {
      display: flex;
      gap: var(--space-sm);
      padding: var(--space-md);
      border-top: 1px solid var(--border-subtle);
    }

    .ai-panel__input {
      flex: 1;
      padding: var(--space-sm) var(--space-md);
      background: var(--surface-glass);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: var(--text-sm);
      min-height: 44px;

      &:focus {
        border-color: var(--accent-cyan);
      }

      &::placeholder {
        color: var(--text-dim);
      }
    }

    .ai-panel__send {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--accent-cyan-dim);
      border: 1px solid var(--accent-cyan-dim);
      border-radius: var(--radius-md);
      color: var(--accent-cyan);
      cursor: pointer;
      flex-shrink: 0;
      transition: all var(--duration-fast);

      &:hover {
        background: rgba(0, 212, 255, 0.2);
        border-color: var(--accent-cyan);
      }
    }
  `]
})
export class AiAssistantComponent {
  isOpen = false;
  userInput = '';
  messages: ChatMessage[] = [];

  quickActions: QuickAction[] = [
    { label: 'Technologies?', query: 'What technologies do you use?' },
    { label: 'Experience?', query: 'Tell me about your experience' },
    { label: 'Projects?', query: 'Show me your projects' },
    { label: 'Contact?', query: 'How can I contact you?' }
  ];

  private responses: Record<string, string> = {
    'technologies': 'I work primarily with C#, ASP.NET Core, Angular, TypeScript, SQL Server, PostgreSQL, Redis, Docker, Azure, and AI/ML integrations. My stack is focused on building enterprise-grade distributed systems.',
    'experience': 'I have 4+ years of experience building enterprise .NET applications. Currently a Senior .NET Developer at TechNova Solutions, architecting microservices platforms handling millions of requests daily.',
    'projects': 'My featured projects include NeuralCommerce (AI e-commerce platform), QuantumFinance API (financial services), SynapseHub (real-time collaboration), and CloudOrchestrator (infrastructure management). Check the Projects section for details!',
    'contact': 'You can reach me via the Contact form on this page, email me at santosh.gupta@example.com, or connect on LinkedIn and GitHub. I\'m currently open to new opportunities!',
    'default': 'I can tell you about my technologies, experience, projects, or how to contact me. What would you like to know?'
  };

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  askQuestion(query: string): void {
    this.userInput = query;
    this.sendMessage();
  }

  sendMessage(): void {
    const input = this.userInput.trim();
    if (!input) return;

    this.messages.push({ type: 'user', content: input });
    this.userInput = '';

    // Simple local response matching
    setTimeout(() => {
      const response = this.getResponse(input);
      this.messages.push({ type: 'assistant', content: response });
    }, 500);
  }

  private getResponse(input: string): string {
    const lower = input.toLowerCase();
    if (lower.includes('technolog') || lower.includes('stack') || lower.includes('use')) {
      return this.responses['technologies'];
    }
    if (lower.includes('experience') || lower.includes('career') || lower.includes('work')) {
      return this.responses['experience'];
    }
    if (lower.includes('project') || lower.includes('build') || lower.includes('portfolio')) {
      return this.responses['projects'];
    }
    if (lower.includes('contact') || lower.includes('reach') || lower.includes('email') || lower.includes('hire')) {
      return this.responses['contact'];
    }
    return this.responses['default'];
  }
}
