// import {
//   Project,
//   Experience,
//   Skill,
//   Technology,
//   Achievement,
//   SocialLink,
//   GitHubStats,
//   NavItem
// } from '../models/portfolio.models';

// export const NAV_ITEMS: NavItem[] = [
//   { label: 'Home', sectionId: 'hero' },
//   { label: 'About', sectionId: 'about' },
//   { label: 'Experience', sectionId: 'experience' },
//   { label: 'Projects', sectionId: 'projects' },
//   { label: 'Architecture', sectionId: 'architecture' },
//   { label: 'Skills', sectionId: 'skills' },
//   { label: 'GitHub', sectionId: 'github' },
//   { label: 'Contact', sectionId: 'contact' }
// ];

// export const PROJECTS: Project[] = [
//   {
//     id: 'proj-1',
//     name: 'NeuralCommerce Platform',
//     category: 'E-Commerce / Microservices',
//     description: 'A high-performance, AI-powered e-commerce platform built with microservices architecture. Features intelligent product recommendations, real-time inventory management, and automated pricing optimization.',
//     shortDescription: 'AI-powered e-commerce platform with microservices architecture',
//     technologies: ['ASP.NET Core 10', 'Angular 19', 'SQL Server', 'Redis', 'RabbitMQ', 'Docker', 'Azure'],
//     features: ['AI Product Recommendations', 'Real-time Inventory', 'Microservices Architecture', 'Event-Driven Design'],
//     architecture: 'Microservices with CQRS and Event Sourcing',
//     liveUrl: '#',
//     githubUrl: '#',
//     featured: true,
//     year: 2024
//   },
//   {
//     id: 'proj-2',
//     name: 'QuantumFinance API',
//     category: 'Financial Technology',
//     description: 'Enterprise-grade financial services API handling millions of transactions daily. Implements complex business rules, real-time fraud detection using ML models, and regulatory compliance automation.',
//     shortDescription: 'Enterprise financial API with ML-based fraud detection',
//     technologies: ['ASP.NET Core', 'Entity Framework Core', 'PostgreSQL', 'ML.NET', 'Azure Functions', 'Kubernetes'],
//     features: ['Real-time Fraud Detection', 'Regulatory Compliance', 'High-throughput Processing', 'ML Integration'],
//     architecture: 'Clean Architecture with Domain-Driven Design',
//     githubUrl: '#',
//     featured: true,
//     year: 2024
//   },
//   {
//     id: 'proj-3',
//     name: 'SynapseHub',
//     category: 'SaaS / Real-time Collaboration',
//     description: 'Real-time collaboration platform with AI-assisted content generation, live document editing, and intelligent workflow automation for distributed teams.',
//     shortDescription: 'AI-assisted real-time collaboration platform',
//     technologies: ['Angular 19', 'SignalR', 'ASP.NET Core', 'Azure OpenAI', 'CosmosDB', 'Docker'],
//     features: ['Real-time Collaboration', 'AI Content Generation', 'Workflow Automation', 'WebSocket Communication'],
//     architecture: 'Event-driven with SignalR real-time hub',
//     liveUrl: '#',
//     githubUrl: '#',
//     featured: true,
//     year: 2025
//   },
//   {
//     id: 'proj-4',
//     name: 'CloudOrchestrator',
//     category: 'DevOps / Cloud Infrastructure',
//     description: 'Intelligent cloud resource management system that automatically scales, monitors, and optimizes cloud infrastructure based on real-time demand patterns and cost analysis.',
//     shortDescription: 'Intelligent cloud infrastructure management system',
//     technologies: ['ASP.NET Core', 'Azure SDK', 'Terraform', 'Docker', 'Kubernetes', 'Grafana'],
//     features: ['Auto-scaling', 'Cost Optimization', 'Health Monitoring', 'Infrastructure as Code'],
//     architecture: 'Serverless with Azure Functions and Durable Entities',
//     githubUrl: '#',
//     featured: true,
//     year: 2024
//   },
//   {
//     id: 'proj-5',
//     name: 'CortexAnalytics',
//     category: 'AI / Data Intelligence',
//     description: 'Advanced analytics dashboard with AI-powered insights, natural language querying, and predictive modeling for business intelligence professionals.',
//     shortDescription: 'AI-powered business analytics and intelligence platform',
//     technologies: ['Angular 19', 'ASP.NET Core', 'Python', 'TensorFlow', 'PostgreSQL', 'D3.js'],
//     features: ['NL Query Engine', 'Predictive Analytics', 'Real-time Dashboards', 'Custom Visualizations'],
//     architecture: 'Hybrid .NET + Python ML pipeline',
//     liveUrl: '#',
//     githubUrl: '#',
//     featured: true,
//     year: 2025
//   },
//   {
//     id: 'proj-6',
//     name: 'SecureVault API',
//     category: 'Security / Authentication',
//     description: 'Enterprise identity and access management system with multi-factor authentication, OAuth 2.0/OIDC provider, role-based access control, and comprehensive audit logging.',
//     shortDescription: 'Enterprise identity management with MFA and OAuth 2.0',
//     technologies: ['ASP.NET Core', 'IdentityServer', 'SQL Server', 'Redis', 'Azure Key Vault', 'JWT'],
//     features: ['Multi-factor Auth', 'OAuth 2.0 Provider', 'RBAC', 'Audit Logging'],
//     architecture: 'Security-first clean architecture',
//     githubUrl: '#',
//     featured: false,
//     year: 2023
//   }
// ];

// export const EXPERIENCES: Experience[] = [
//   {
//     id: 'exp-1',
//     company: 'TechNova Solutions',
//     role: 'Senior .NET Developer',
//     location: 'Mumbai, India',
//     startDate: 'Jan 2023',
//     endDate: 'Present',
//     current: true,
//     description: 'Leading development of enterprise-scale microservices platforms, mentoring junior developers, and architecting cloud-native solutions for high-traffic applications.',
//     technologies: ['ASP.NET Core', 'Angular', 'Azure', 'Docker', 'Kubernetes', 'SQL Server', 'Redis'],
//     achievements: [
//       'Architected microservices platform handling 10M+ daily requests',
//       'Reduced API response time by 60% through caching and optimization',
//       'Led migration of monolithic application to cloud-native architecture',
//       'Mentored team of 5 developers in clean architecture practices'
//     ]
//   },
//   {
//     id: 'exp-2',
//     company: 'DataStream Corp',
//     role: '.NET Developer',
//     location: 'Pune, India',
//     startDate: 'Jun 2021',
//     endDate: 'Dec 2022',
//     current: false,
//     description: 'Developed high-performance REST APIs and real-time data processing pipelines for financial services clients.',
//     technologies: ['ASP.NET Core', 'Entity Framework', 'PostgreSQL', 'RabbitMQ', 'SignalR', 'Angular'],
//     achievements: [
//       'Built real-time trading data pipeline processing 50K events/second',
//       'Implemented event-driven architecture reducing system coupling by 70%',
//       'Designed and deployed CI/CD pipelines reducing deployment time by 80%',
//       'Developed comprehensive API documentation and integration tests'
//     ]
//   },
//   {
//     id: 'exp-3',
//     company: 'InnoSoft Technologies',
//     role: 'Junior .NET Developer',
//     location: 'Mumbai, India',
//     startDate: 'Jul 2020',
//     endDate: 'May 2021',
//     current: false,
//     description: 'Contributed to full-stack web applications using .NET and Angular, focusing on RESTful API development and frontend component architecture.',
//     technologies: ['ASP.NET Core', 'Angular', 'SQL Server', 'Entity Framework', 'Git', 'Azure DevOps'],
//     achievements: [
//       'Developed 15+ RESTful API endpoints for customer management system',
//       'Built reusable Angular component library used across 3 projects',
//       'Implemented JWT authentication and role-based authorization',
//       'Achieved 90%+ code coverage with unit and integration tests'
//     ]
//   }
// ];

// export const SKILLS: Skill[] = [
//   // Backend
//   { name: 'C#', category: 'backend', description: 'Primary language for enterprise applications' },
//   { name: 'ASP.NET Core', category: 'backend', description: 'Web APIs and microservices framework' },
//   { name: '.NET 10', category: 'backend', description: 'Latest runtime for high-performance apps' },
//   { name: 'Entity Framework Core', category: 'backend', description: 'ORM for data access layer' },
//   { name: 'REST API Design', category: 'backend', description: 'RESTful architecture and API standards' },
//   { name: 'SignalR', category: 'backend', description: 'Real-time web communication' },
//   // Frontend
//   { name: 'Angular', category: 'frontend', description: 'Enterprise-grade SPA framework' },
//   { name: 'TypeScript', category: 'frontend', description: 'Type-safe JavaScript development' },
//   { name: 'RxJS', category: 'frontend', description: 'Reactive programming for async data' },
//   { name: 'HTML5 / CSS3', category: 'frontend', description: 'Semantic markup and modern styling' },
//   { name: 'SCSS', category: 'frontend', description: 'Advanced CSS with variables and mixins' },
//   // Database
//   { name: 'SQL Server', category: 'database', description: 'Enterprise relational database' },
//   { name: 'PostgreSQL', category: 'database', description: 'Advanced open-source RDBMS' },
//   { name: 'Redis', category: 'database', description: 'In-memory caching and data store' },
//   { name: 'CosmosDB', category: 'database', description: 'Global-scale NoSQL database' },
//   // Cloud & DevOps
//   { name: 'Azure', category: 'cloud', description: 'Cloud platform and services' },
//   { name: 'Docker', category: 'cloud', description: 'Containerization and deployment' },
//   { name: 'Kubernetes', category: 'cloud', description: 'Container orchestration' },
//   { name: 'CI/CD', category: 'cloud', description: 'Automated build and deployment pipelines' },
//   { name: 'Git', category: 'cloud', description: 'Version control and collaboration' },
//   // Architecture
//   { name: 'Microservices', category: 'architecture', description: 'Distributed system architecture' },
//   { name: 'Clean Architecture', category: 'architecture', description: 'Separation of concerns and testability' },
//   { name: 'CQRS', category: 'architecture', description: 'Command Query Responsibility Segregation' },
//   { name: 'Event-Driven', category: 'architecture', description: 'Asynchronous event-based systems' },
//   { name: 'Domain-Driven Design', category: 'architecture', description: 'Complex domain modeling' },
//   // Security
//   { name: 'JWT / OAuth 2.0', category: 'security', description: 'Token-based authentication' },
//   { name: 'OWASP', category: 'security', description: 'Security best practices and standards' },
//   { name: 'Azure Key Vault', category: 'security', description: 'Secrets and keys management' },
//   // Testing
//   { name: 'xUnit', category: 'testing', description: '.NET unit testing framework' },
//   { name: 'Integration Testing', category: 'testing', description: 'End-to-end API testing' },
//   { name: 'Jasmine / Karma', category: 'testing', description: 'Angular testing frameworks' },
//   // AI
//   { name: 'ML.NET', category: 'ai', description: 'Machine learning in .NET' },
//   { name: 'Azure OpenAI', category: 'ai', description: 'AI model integration' },
//   { name: 'AI Integration', category: 'ai', description: 'Building AI-powered features' }
// ];

// export const TECHNOLOGIES: Technology[] = [
//   { name: 'C#', category: 'Language', description: 'Primary development language', orbitRadius: 120, orbitSpeed: 0.3 },
//   { name: 'ASP.NET Core', category: 'Framework', description: 'Backend web framework', orbitRadius: 150, orbitSpeed: 0.25 },
//   { name: '.NET 10', category: 'Runtime', description: 'Latest .NET runtime', orbitRadius: 130, orbitSpeed: 0.35 },
//   { name: 'Angular', category: 'Frontend', description: 'SPA framework', orbitRadius: 180, orbitSpeed: 0.2 },
//   { name: 'TypeScript', category: 'Language', description: 'Typed JavaScript', orbitRadius: 160, orbitSpeed: 0.28 },
//   { name: 'SQL Server', category: 'Database', description: 'Enterprise RDBMS', orbitRadius: 200, orbitSpeed: 0.18 },
//   { name: 'PostgreSQL', category: 'Database', description: 'Open-source database', orbitRadius: 210, orbitSpeed: 0.15 },
//   { name: 'Entity Framework', category: 'ORM', description: 'Data access layer', orbitRadius: 140, orbitSpeed: 0.32 },
//   { name: 'REST API', category: 'Architecture', description: 'API design pattern', orbitRadius: 170, orbitSpeed: 0.22 },
//   { name: 'JWT', category: 'Security', description: 'Token authentication', orbitRadius: 190, orbitSpeed: 0.19 },
//   { name: 'Docker', category: 'DevOps', description: 'Containerization', orbitRadius: 220, orbitSpeed: 0.14 },
//   { name: 'Azure', category: 'Cloud', description: 'Cloud platform', orbitRadius: 240, orbitSpeed: 0.12 },
//   { name: 'Git', category: 'Tools', description: 'Version control', orbitRadius: 155, orbitSpeed: 0.26 },
//   { name: 'GitHub', category: 'Platform', description: 'Code hosting', orbitRadius: 165, orbitSpeed: 0.24 },
//   { name: 'AI / ML', category: 'Intelligence', description: 'Machine learning', orbitRadius: 230, orbitSpeed: 0.13 },
//   { name: 'Microservices', category: 'Architecture', description: 'Distributed design', orbitRadius: 250, orbitSpeed: 0.11 }
// ];

// export const ACHIEVEMENTS: Achievement[] = [
//   {
//     id: 'ach-1',
//     title: 'Microsoft Certified: Azure Developer Associate',
//     issuer: 'Microsoft',
//     date: '2024',
//     description: 'Designing, building, testing, and maintaining cloud applications on Azure'
//   },
//   {
//     id: 'ach-2',
//     title: 'ASP.NET Core Performance Optimization',
//     issuer: 'Pluralsight',
//     date: '2023',
//     description: 'Advanced techniques for building high-performance .NET applications'
//   },
//   {
//     id: 'ach-3',
//     title: 'Angular Architecture Patterns',
//     issuer: 'Udemy',
//     date: '2023',
//     description: 'Enterprise-scale Angular application architecture'
//   },
//   {
//     id: 'ach-4',
//     title: 'Docker & Kubernetes Mastery',
//     issuer: 'Linux Foundation',
//     date: '2024',
//     description: 'Container orchestration and cloud-native deployment'
//   }
// ];

// export const SOCIAL_LINKS: SocialLink[] = [
//   { platform: 'GitHub', url: 'https://github.com/santoshgupta', icon: 'github', label: 'GitHub Profile' },
//   { platform: 'LinkedIn', url: 'https://linkedin.com/in/santoshgupta', icon: 'linkedin', label: 'LinkedIn Profile' },
//   { platform: 'Twitter', url: 'https://twitter.com/santoshgupta', icon: 'twitter', label: 'Twitter Profile' },
//   { platform: 'Email', url: 'mailto:santosh.gupta@example.com', icon: 'mail', label: 'Send Email' }
// ];

// export const GITHUB_STATS: GitHubStats = {
//   repositories: 42,
//   contributions: 1247,
//   stars: 156,
//   followers: 89,
//   topLanguages: [
//     { name: 'C#', percentage: 45, color: '#178600' },
//     { name: 'TypeScript', percentage: 30, color: '#3178c6' },
//     { name: 'HTML', percentage: 10, color: '#e34c26' },
//     { name: 'SCSS', percentage: 8, color: '#c6538c' },
//     { name: 'Python', percentage: 7, color: '#3572A5' }
//   ],
//   recentActivity: [
//     { date: '2025-01-01', count: 5 },
//     { date: '2025-01-02', count: 8 },
//     { date: '2025-01-03', count: 3 },
//     { date: '2025-01-04', count: 12 },
//     { date: '2025-01-05', count: 6 },
//     { date: '2025-01-06', count: 9 },
//     { date: '2025-01-07', count: 4 },
//     { date: '2025-01-08', count: 7 },
//     { date: '2025-01-09', count: 11 },
//     { date: '2025-01-10', count: 2 },
//     { date: '2025-01-11', count: 8 },
//     { date: '2025-01-12', count: 15 },
//     { date: '2025-01-13', count: 6 },
//     { date: '2025-01-14', count: 9 }
//   ],
//   streakDays: 34
// };







import {
  Project,
  Experience,
  Skill,
  Technology,
  Achievement,
  SocialLink,
  GitHubStats,
  NavItem
} from '../models/portfolio.models';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', sectionId: 'hero' },
  { label: 'About', sectionId: 'about' },
  { label: 'Experience', sectionId: 'experience' },
  { label: 'Projects', sectionId: 'projects' },
  { label: 'Architecture', sectionId: 'architecture' },
  { label: 'Skills', sectionId: 'skills' },
  { label: 'GitHub', sectionId: 'github' },
  { label: 'Contact', sectionId: 'contact' }
];

/* ============================================================
   PROJECTS
   ============================================================ */

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Dynamic Form - Tata Steel',
    category: 'Enterprise Web Application',
    description:
      'Dynamic form management web application developed for Tata Steel. The solution focused on dynamic form workflows, iframe integrations, and improving application workflows for business users.',
    shortDescription:
      'Dynamic form management application with iframe integrations',
    technologies: [
      '.NET MVC',
      'Dapper',
      'C#',
      'SQL Server',
      'HTML',
      'CSS',
      'JavaScript'
    ],
    features: [
      'Dynamic Form Management',
      'Iframe Integration',
      'Business Workflow',
      'Database Integration'
    ],
    architecture: 'ASP.NET MVC with Dapper',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    year: 2022
  },

  {
    id: 'proj-2',
    name: 'Project Management Institute (PMI)',
    category: 'E-Commerce / API',
    description:
      'Hybrid e-commerce API and backend application developed for Project Management Institute. Worked on backend services, database management and deployment activities.',
    shortDescription:
      'Hybrid e-commerce API with backend services',
    technologies: [
      '.NET',
      'C#',
      'REST APIs',
      'SQL Server',
      'GitLab',
      'SSMS',
      'Amazon EC2'
    ],
    features: [
      'E-Commerce APIs',
      'Backend Services',
      'Database Management',
      'Cloud Deployment'
    ],
    architecture: 'API-based backend architecture',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    year: 2022
  },

  {
    id: 'proj-3',
    name: 'Innov Digione & Client Service Portals',
    category: 'Enterprise Portal',
    description:
      'Enterprise client service portals involving custom API development, Windows Services and user interface development. Focused on reliable client interactions and maintainable application architecture.',
    shortDescription:
      'Enterprise portals with custom APIs and Windows Services',
    technologies: [
      '.NET MVC',
      'Entity Framework',
      'C#',
      'REST APIs',
      'SQL Server',
      'JavaScript',
      'HTML',
      'CSS'
    ],
    features: [
      'Custom APIs',
      'Windows Services',
      'Client Service Portal',
      'UI Development',
      'Database Integration'
    ],
    architecture: 'ASP.NET MVC with Entity Framework',
    githubUrl: '#',
    featured: true,
    year: 2022
  },

  {
    id: 'proj-4',
    name: 'Belson Admin & Belsio Customer',
    category: 'Enterprise / API',
    description:
      'Enterprise applications migrated to .NET Core with RESTful API development. Implemented repository patterns and Dependency Injection to improve maintainability and separation of concerns.',
    shortDescription:
      '.NET Core migration with REST APIs and dependency injection',
    technologies: [
      '.NET Core',
      'EF Core',
      'C#',
      'REST APIs',
      'Repository Pattern',
      'Dependency Injection',
      'SQL Server'
    ],
    features: [
      '.NET Core Migration',
      'RESTful APIs',
      'Repository Pattern',
      'Dependency Injection',
      'Maintainable Architecture'
    ],
    architecture: 'Layered architecture with Repository Pattern and DI',
    githubUrl: '#',
    featured: true,
    year: 2023
  },

  {
    id: 'proj-5',
    name: 'CTDI MCE.ACEAU.OLP.ApplicationFL',
    category: 'Logistics / Enterprise Application',
    description:
      'Full-stack enterprise application developed for CTDI. Worked with modular application architecture, Entity Framework-based data management and Knockout.js for frontend development.',
    shortDescription:
      'Modular enterprise application for CTDI',
    technologies: [
      '.NET Framework',
      'Knockout.js',
      'Entity Framework',
      'JavaScript',
      'SQL Server',
      'HTML',
      'CSS'
    ],
    features: [
      'Modular Architecture',
      'Data Management',
      'Enterprise UI',
      'Entity Framework',
      'Version Control'
    ],
    architecture: 'Modular enterprise architecture',
    githubUrl: '#',
    featured: true,
    year: 2024
  },

  {
    id: 'proj-6',
    name: 'CTDI AC',
    category: 'Enterprise / Modern .NET',
    description:
      'Full-stack enterprise application developed using .NET Core, Blazor, EF Core, FastEndpoints and MediatR. Worked on UI development using MudBlazor and API development using modern .NET architecture patterns.',
    shortDescription:
      'Modern .NET Core application using Blazor, FastEndpoints and MediatR',
    technologies: [
      '.NET Core',
      'Blazor',
      'EF Core',
      'FastEndpoints',
      'MediatR',
      'MudBlazor',
      'C#',
      'SQL Server'
    ],
    features: [
      'Blazor UI',
      'REST APIs',
      'FastEndpoints',
      'MediatR',
      'Entity Framework Core',
      'Clean Architecture',
      'Modular Development'
    ],
    architecture: 'Clean Architecture with FastEndpoints and MediatR',
    githubUrl: '#',
    featured: true,
    year: 2025
  },

  {
    id: 'proj-7',
    name: 'CTDI DPL',
    category: 'Logistics / Financial Domain',
    description:
      'Full-stack .NET application for CTDI DPL modules. Developed and enhanced business modules using ASP.NET MVC, C#, JavaScript, Entity Framework, LINQ and SQL Server. Worked on stored procedures, SQL optimization, reporting, UI enhancements and production support.',
    shortDescription:
      'Enterprise DPL modules with .NET MVC and SQL Server',
    technologies: [
      '.NET',
      'ASP.NET MVC',
      'C#',
      'Entity Framework',
      'LINQ',
      'SQL Server',
      'JavaScript',
      'Stored Procedures'
    ],
    features: [
      'Business Modules',
      'Stored Procedures',
      'SQL Optimization',
      'Reporting',
      'UI Enhancements',
      'Production Support'
    ],
    architecture: 'ASP.NET MVC with Entity Framework',
    githubUrl: '#',
    featured: true,
    year: 2025
  }
];

/* ============================================================
   EXPERIENCE
   ============================================================ */

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    company: 'Techstalwarts Software Development LLP',
    role: 'Software Engineer',
    location: 'Mumbai, Maharashtra, India',
    startDate: 'Nov 2021',
    endDate: 'Present',
    current: true,

    description:
      'Results-driven Software Engineer with 5+ years of experience developing enterprise web applications using .NET Core, ASP.NET MVC, C#, Entity Framework Core, SQL Server, LINQ, REST APIs, JavaScript and jQuery. Experienced in HRMS, SLAM Property Management, Logistics and Financial domains, currently working with the CTDI client.',

    technologies: [
      '.NET',
      '.NET Core',
      'ASP.NET MVC',
      'C#',
      'Entity Framework',
      'Entity Framework Core',
      'SQL Server',
      'LINQ',
      'REST APIs',
      'JavaScript',
      'jQuery',
      'HTML',
      'CSS',
      'Bootstrap',
      'Angular',
      'TypeScript',
      'Knockout.js',
      'Blazor',
      'FastEndpoints',
      'MediatR'
    ],

    achievements: [
      'Developed and maintained enterprise web applications using modern .NET technologies',
      'Worked on HRMS and SLAM Property Management solutions',
      'Currently working with CTDI client across Logistics and Financial domains',
      'Participated in the complete SDLC including analysis, development, testing, deployment and production support',
      'Worked on application performance optimization and database optimization',
      'Collaborated with business stakeholders and cross-functional teams',
      'Mentored junior developers through code reviews and technical guidance',
      'Used AI-powered development tools including GitHub Copilot, ChatGPT, Kiro and Windsurf',
      'Developed and deployed an Angular application on Microsoft Azure',
      'Currently expanding knowledge in Angular, Azure, CI/CD, Docker and Kubernetes'
    ]
  }
];

/* ============================================================
   SKILLS
   ============================================================ */

export const SKILLS: Skill[] = [

  // Backend
  { name: 'C#', category: 'backend', description: 'Primary programming language for .NET enterprise applications', icon: 'devicon-csharp-plain' },
  { name: '.NET', category: 'backend', description: 'Enterprise application development', icon: 'devicon-dot-net-plain' },
  { name: '.NET Core', category: 'backend', description: 'Modern cross-platform application and API development', icon: 'devicon-dotnetcore-plain' },
  { name: 'ASP.NET MVC', category: 'backend', description: 'MVC-based enterprise web application development', icon: 'devicon-dot-net-plain' },
  { name: 'ASP.NET Core', category: 'backend', description: 'Modern web API and backend development', icon: 'devicon-dotnetcore-plain' },
  { name: 'ADO.NET', category: 'backend', description: 'Database connectivity and data access', icon: 'devicon-microsoftsqlserver-plain' },
  { name: 'Entity Framework', category: 'backend', description: 'ORM and data access', icon: 'devicon-dotnetcore-plain' },
  { name: 'Entity Framework Core', category: 'backend', description: 'Modern .NET ORM', icon: 'devicon-dotnetcore-plain' },
  { name: 'LINQ', category: 'backend', description: 'Querying and data transformation', icon: 'devicon-csharp-plain' },
  { name: 'REST APIs', category: 'backend', description: 'RESTful API development and integration', icon: 'devicon-fastapi-plain' },
  { name: 'Dapper', category: 'backend', description: 'Lightweight ORM for high-performance data access', icon: 'devicon-dotnetcore-plain' },
  { name: 'FastEndpoints', category: 'backend', description: 'Modern .NET endpoint development', icon: 'devicon-dotnetcore-plain' },
  { name: 'MediatR', category: 'backend', description: 'Mediator pattern implementation in .NET', icon: 'devicon-dotnetcore-plain' },

  // Frontend
  { name: 'Angular', category: 'frontend', description: 'Modern frontend framework currently being developed', icon: 'devicon-angular-plain' },
  { name: 'TypeScript', category: 'frontend', description: 'Type-safe frontend development', icon: 'devicon-typescript-plain' },
  { name: 'JavaScript', category: 'frontend', description: 'Web application development', icon: 'devicon-javascript-plain' },
  { name: 'jQuery', category: 'frontend', description: 'Client-side web development', icon: 'devicon-jquery-plain' },
  { name: 'Knockout.js', category: 'frontend', description: 'MVVM-based JavaScript framework', icon: 'devicon-javascript-plain' },
  { name: 'Blazor', category: 'frontend', description: '.NET-based web UI development', icon: 'devicon-blazor-original' },
  { name: 'MudBlazor', category: 'frontend', description: 'Blazor component library', icon: 'devicon-blazor-original' },
  { name: 'HTML5', category: 'frontend', description: 'Semantic web markup', icon: 'devicon-html5-plain' },
  { name: 'CSS', category: 'frontend', description: 'Web application styling', icon: 'devicon-css3-plain' },
  { name: 'Bootstrap', category: 'frontend', description: 'Responsive UI framework', icon: 'devicon-bootstrap-plain' },

  // Database
  { name: 'SQL Server', category: 'database', description: 'Enterprise relational database', icon: 'devicon-microsoftsqlserver-plain' },
  { name: 'PostgreSQL', category: 'database', description: 'Open-source relational database', icon: 'devicon-postgresql-plain' },
  { name: 'Oracle', category: 'database', description: 'Enterprise relational database', icon: 'devicon-oracle-original' },
  { name: 'Stored Procedures', category: 'database', description: 'SQL Server business and reporting operations', icon: 'devicon-microsoftsqlserver-plain' },
  { name: 'SQL Optimization', category: 'database', description: 'Query and database performance optimization', icon: 'devicon-microsoftsqlserver-plain' },

  // Architecture
  { name: 'MVC', category: 'architecture', description: 'Model-View-Controller application architecture', icon: 'devicon-dot-net-plain' },
  { name: 'MVVM', category: 'architecture', description: 'Model-View-ViewModel architectural pattern', icon: 'devicon-dot-net-plain' },
  { name: 'Repository Pattern', category: 'architecture', description: 'Data access abstraction and maintainability', icon: 'devicon-github-original' },
  { name: 'Clean Architecture', category: 'architecture', description: 'Separation of concerns and maintainable application design', icon: 'devicon-archlinux-plain' },
  { name: 'Microservices', category: 'architecture', description: 'Distributed application architecture', icon: 'devicon-kubernetes-plain' },
  { name: 'Dependency Injection', category: 'architecture', description: 'Dependency management and loose coupling', icon: 'devicon-dotnetcore-plain' },

  // Cloud & DevOps
  { name: 'Microsoft Azure', category: 'cloud', description: 'Cloud platform currently being developed', icon: 'devicon-azure-plain' },
  { name: 'CI/CD', category: 'cloud', description: 'Continuous integration and deployment learning focus', icon: 'devicon-azuredevops-plain' },
  { name: 'Docker', category: 'cloud', description: 'Containerization technology currently being learned', icon: 'devicon-docker-plain' },
  { name: 'Kubernetes', category: 'cloud', description: 'Container orchestration technology currently being learned', icon: 'devicon-kubernetes-plain' },
  { name: 'Git', category: 'cloud', description: 'Version control', icon: 'devicon-git-plain' },
  { name: 'GitLab', category: 'cloud', description: 'Source control and DevOps platform', icon: 'devicon-gitlab-plain' },

  // AI
  { name: 'GitHub Copilot', category: 'ai', description: 'AI-assisted software development', icon: 'devicon-github-original' },
  { name: 'ChatGPT', category: 'ai', description: 'AI-assisted development, debugging and documentation', icon: 'ai-custom-chatgpt' },
  { name: 'Kiro', category: 'ai', description: 'AI-powered development assistance', icon: 'devicon-vscode-plain' },
  { name: 'Windsurf', category: 'ai', description: 'AI-assisted development environment', icon: 'devicon-vscode-plain' },
  { name: 'Prompt Engineering', category: 'ai', description: 'Prompt design for AI-assisted development', icon: 'ai-custom-prompt' }
];

/* ============================================================
   TECHNOLOGIES
   ============================================================ */

export const TECHNOLOGIES: Technology[] = [
  {
    name: 'C#',
    category: 'Language',
    description: 'Primary development language',
    orbitRadius: 120,
    orbitSpeed: 0.3
  },
  {
    name: '.NET Core',
    category: 'Framework',
    description: 'Modern .NET development',
    orbitRadius: 150,
    orbitSpeed: 0.25
  },
  {
    name: 'ASP.NET MVC',
    category: 'Framework',
    description: 'Enterprise MVC applications',
    orbitRadius: 135,
    orbitSpeed: 0.32
  },
  {
    name: 'Entity Framework',
    category: 'ORM',
    description: 'Object-relational mapping',
    orbitRadius: 160,
    orbitSpeed: 0.28
  },
  {
    name: 'LINQ',
    category: 'Data',
    description: 'Data querying',
    orbitRadius: 145,
    orbitSpeed: 0.3
  },
  {
    name: 'Angular',
    category: 'Frontend',
    description: 'Modern frontend framework',
    orbitRadius: 180,
    orbitSpeed: 0.2
  },
  {
    name: 'TypeScript',
    category: 'Language',
    description: 'Typed JavaScript development',
    orbitRadius: 170,
    orbitSpeed: 0.25
  },
  {
    name: 'JavaScript',
    category: 'Language',
    description: 'Web development',
    orbitRadius: 155,
    orbitSpeed: 0.27
  },
  {
    name: 'SQL Server',
    category: 'Database',
    description: 'Enterprise relational database',
    orbitRadius: 200,
    orbitSpeed: 0.18
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    description: 'Open-source relational database',
    orbitRadius: 210,
    orbitSpeed: 0.15
  },
  {
    name: 'Dapper',
    category: 'ORM',
    description: 'Lightweight data access',
    orbitRadius: 140,
    orbitSpeed: 0.33
  },
  {
    name: 'REST API',
    category: 'Backend',
    description: 'RESTful API development',
    orbitRadius: 175,
    orbitSpeed: 0.22
  },
  {
    name: 'FastEndpoints',
    category: 'Backend',
    description: 'Modern .NET API endpoints',
    orbitRadius: 190,
    orbitSpeed: 0.19
  },
  {
    name: 'MediatR',
    category: 'Architecture',
    description: 'Mediator pattern implementation',
    orbitRadius: 165,
    orbitSpeed: 0.24
  },
  {
    name: 'Blazor',
    category: 'Frontend',
    description: '.NET web UI framework',
    orbitRadius: 185,
    orbitSpeed: 0.21
  },
  {
    name: 'Knockout.js',
    category: 'Frontend',
    description: 'MVVM JavaScript framework',
    orbitRadius: 195,
    orbitSpeed: 0.18
  },
  {
    name: 'Azure',
    category: 'Cloud',
    description: 'Microsoft cloud platform',
    orbitRadius: 240,
    orbitSpeed: 0.12
  },
  {
    name: 'Docker',
    category: 'DevOps',
    description: 'Containerization',
    orbitRadius: 220,
    orbitSpeed: 0.14
  },
  {
    name: 'Kubernetes',
    category: 'DevOps',
    description: 'Container orchestration',
    orbitRadius: 230,
    orbitSpeed: 0.13
  },
  {
    name: 'Git',
    category: 'Tools',
    description: 'Version control',
    orbitRadius: 155,
    orbitSpeed: 0.26
  },
  {
    name: 'GitLab',
    category: 'DevOps',
    description: 'Source control and CI/CD',
    orbitRadius: 175,
    orbitSpeed: 0.23
  },
  {
    name: 'AI Tools',
    category: 'AI',
    description: 'AI-assisted development',
    orbitRadius: 230,
    orbitSpeed: 0.13
  }
];

/* ============================================================
   ACHIEVEMENTS / CERTIFICATIONS
   ============================================================ */

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'ASP.NET Course',
    issuer: 'Aptech Computers',
    date: 'Completed',
    description:
      'Professional ASP.NET development course completed through Aptech Computers.'
  }
];

/* ============================================================
   SOCIAL LINKS
   ============================================================ */

/*
 * Your resume only contains your email address.
 * GitHub, LinkedIn and Twitter URLs were not provided in the resume,
 * so they should not be invented.
 */

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/santoshgupta498', icon: 'github', label: 'GitHub Profile' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/santoshgupta7698', icon: 'linkedin', label: 'LinkedIn Profile' },
  { platform: 'Instagram', url: 'https://www.instagram.com/santosh_gupta__07?utm_source=qr&igsi=anc5aTU2emthbnU4', icon: 'twitter', label: 'Twitter Profile' },
  { platform: 'Email', url: 'mailto:santosh.gupta@example.com', icon: 'mail', label: 'Send Email' }
];

/* ============================================================
   GITHUB STATS
   ============================================================ */

/*
 * GitHub statistics are not mentioned in the resume.
 * Keep these values neutral instead of displaying fabricated numbers.
 */

export const GITHUB_STATS: GitHubStats = {
  repositories: 0,
  contributions: 0,
  stars: 0,
  followers: 0,

  topLanguages: [
    // Data Structures & Algorithms
    { name: 'DSA', percentage: 70, color: '#2b8bd4', icon: 'devicon-thealgorithms-plain' },
    // Backend - .NET Ecosystem
    { name: '.NET & .NET Core', percentage: 90, color: '#512bd4', icon: 'devicon-dot-net-plain' },
    { name: 'C#', percentage: 95, color: '#178600', icon: 'devicon-csharp-plain' },
    { name: 'ASP.NET & ASP.NET Core', percentage: 90, color: '#5c2d91', icon: 'devicon-dotnetcore-plain' },
    { name: 'ADO.NET', percentage: 75, color: '#68217a', icon: 'devicon-microsoftsqlserver-plain' },
    { name: 'Entity Framework & EF Core', percentage: 85, color: '#7b3f9e', icon: 'devicon-dotnetcore-plain' },
    { name: 'Web API', percentage: 90, color: '#0078d7', icon: 'devicon-fastapi-plain' },
    // Architecture & Design
    { name: 'Design Patterns', percentage: 80, color: '#ff6f61', icon: 'devicon-unifiedmodelinglanguage-plain' },
    { name: 'SOLID Principles', percentage: 85, color: '#e44d26', icon: 'devicon-unifiedmodelinglanguage-plain' },
    { name: 'Project Architecture', percentage: 80, color: '#f06529', icon: 'devicon-archlinux-plain' },
    { name: 'System Design', percentage: 75, color: '#d63384', icon: 'devicon-kubernetes-plain' },
    // Frontend
    { name: 'JavaScript', percentage: 80, color: '#f7df1e', icon: 'devicon-javascript-plain' },
    { name: 'jQuery', percentage: 70, color: '#0769ad', icon: 'devicon-jquery-plain' },
    { name: 'TypeScript', percentage: 85, color: '#3178c6', icon: 'devicon-typescript-plain' },
    { name: 'Angular', percentage: 85, color: '#dd0031', icon: 'devicon-angular-plain' },
    { name: 'HTML', percentage: 90, color: '#e34c26', icon: 'devicon-html5-plain' },
    { name: 'CSS', percentage: 85, color: '#264de4', icon: 'devicon-css3-plain' },
    { name: 'Bootstrap', percentage: 80, color: '#7952b3', icon: 'devicon-bootstrap-plain' },
    // Database
    { name: 'Microsoft SQL Server', percentage: 90, color: '#cc2927', icon: 'devicon-microsoftsqlserver-plain' },
    { name: 'PostgreSQL', percentage: 75, color: '#336791', icon: 'devicon-postgresql-plain' },
    { name: 'Oracle', percentage: 65, color: '#f80000', icon: 'devicon-oracle-original' },
    // Cloud
    { name: 'Azure', percentage: 70, color: '#0089d6', icon: 'devicon-azure-plain' }
  ],

  recentActivity: [],

  streakDays: 0
};