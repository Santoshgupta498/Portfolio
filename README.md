# Santosh Gupta — Developer Portfolio

A premium, futuristic personal developer portfolio built with **Angular 19**, **Three.js**, and **TypeScript**. Features a 3D AI neural-core visualization, glassmorphism UI, animated architecture diagrams, and a cyber-intelligence aesthetic.

## Tech Stack

- **Frontend:** Angular 19 (Standalone Components)
- **3D Engine:** Three.js 0.170
- **Language:** TypeScript 5.x
- **Styling:** SCSS with CSS Custom Properties
- **Icons:** Lucide Angular
- **Future Backend:** ASP.NET Core 10 Web API (ready to connect)

## Features

- Three.js AI neural-core scene with parallax mouse interaction
- Glassmorphism cards with 3D tilt effects
- CSS particle background system with cyber grid
- Responsive design (desktop, tablet, mobile)
- Command palette (Ctrl+K / Cmd+K)
- AI assistant chat panel (local responses, API-ready)
- Animated architecture lab diagram
- Technology orbit visualization
- GitHub activity dashboard
- Terminal-style contact form
- Loading screen with boot sequence
- Custom cursor glow effect (desktop)
- IntersectionObserver reveal animations
- Reduced-motion support
- Keyboard-accessible navigation
- SEO metadata and Open Graph tags

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

### Installation

```bash
cd portfolio
npm install
```

### Development

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app will reload on source changes.

### Production Build

```bash
npm run build
```

Build artifacts are stored in `dist/portfolio/`.

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── constants/       # Portfolio config and mock data
│   │   ├── models/          # TypeScript interfaces
│   │   └── services/        # Portfolio, Scroll, Animation, Theme services
│   ├── shared/
│   │   └── components/      # Reusable UI components
│   │       ├── ai-scene/           # Three.js neural core
│   │       ├── ai-assistant/       # Chat panel
│   │       ├── command-palette/    # Ctrl+K navigation
│   │       ├── cursor-glow/        # Custom cursor effect
│   │       ├── footer/
│   │       ├── futuristic-navbar/  # Glass navigation bar
│   │       ├── glass-card/         # Glassmorphism card
│   │       ├── holographic-panel/  # HUD-style panel
│   │       ├── loading-screen/     # Boot sequence
│   │       ├── magnetic-button/    # Magnetic hover button
│   │       ├── particle-background/ # Ambient CSS particles
│   │       ├── project-card/       # 3D tilt project card
│   │       ├── section-heading/    # Consistent section headers
│   │       └── technology-orbit/   # Orbital tech visualization
│   └── features/
│       ├── home/             # Hero section
│       ├── about/            # About me
│       ├── experience/       # Career timeline
│       ├── projects/         # Featured projects
│       ├── architecture-lab/ # System architecture diagram
│       ├── skills/           # Technology universe
│       ├── github/           # GitHub dashboard
│       └── contact/          # Contact terminal
├── styles/
│   ├── _variables.scss       # CSS custom properties
│   ├── _reset.scss           # Browser reset
│   ├── _typography.scss      # Type scale and utilities
│   ├── _animations.scss      # Keyframes and reveal classes
│   └── _utilities.scss       # Layout and helper classes
└── index.html                # Entry with fonts and meta tags
```

## Configuration

All personal information is centralized in `src/app/core/constants/portfolio.config.ts`:

```typescript
export const PORTFOLIO_CONFIG: PortfolioConfig = {
  name: 'Santosh Gupta',
  title: '.NET Developer | AI Builder',
  location: 'Mumbai, India',
  email: '...',
  github: '...',
  linkedin: '...',
  resume: '/assets/resume.pdf',
  bio: '...'
};
```

Mock data (projects, experience, skills) lives in `portfolio.data.ts` and can be replaced with API calls via `PortfolioService`.

## Assets

- Place your resume PDF at `public/assets/resume.pdf`
- Place OG image at `public/assets/images/og-image.png`
- Optional GLTF/GLB models go in `public/assets/models/`

## Connecting to ASP.NET Core 10 API

The `PortfolioService` uses `Observable`-based methods that currently return mock data. To connect to a backend:

1. Import `HttpClient` in `app.config.ts`
2. Replace `of(...)` calls in `PortfolioService` with `this.http.get<T>(apiUrl)`
3. Configure the API base URL via environment files
4. The AI assistant can be connected to an AI endpoint by modifying `AiAssistantComponent.getResponse()`

## Performance Notes

- Three.js scenes pause when the tab is hidden
- Particle counts reduce on mobile/tablet
- DevicePixelRatio capped at 2
- All Three.js resources are disposed on component destroy
- CSS particles use `will-change` and GPU-accelerated transforms
- IntersectionObserver prevents off-screen animation work

## Accessibility

- Semantic HTML with proper heading hierarchy
- ARIA labels on interactive elements
- Keyboard navigation for command palette and mobile menu
- Focus-visible styles
- Reduced-motion media query support
- Screen-reader-only utility class available

## License

MIT
