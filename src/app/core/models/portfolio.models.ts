export interface PortfolioConfig {
  name: string;
  title: string;
  subtitle: string;
  location: string;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  Instagram?: string;
  resume: string;
  avatar?: string;
  bio: string;
  shortBio: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  features: string[];
  architecture?: string;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured: boolean;
  year: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  technologies: string[];
  achievements: string[];
  companyUrl?: string;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  icon?: string;
  description?: string;
}

export type SkillCategory =
  | 'backend'
  | 'frontend'
  | 'database'
  | 'cloud'
  | 'architecture'
  | 'security'
  | 'testing'
  | 'ai';

export interface Technology {
  name: string;
  icon?: string;
  category: string;
  description: string;
  orbitRadius?: number;
  orbitSpeed?: number;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  credentialUrl?: string;
  icon?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface GitHubStats {
  repositories: number;
  contributions: number;
  stars: number;
  followers: number;
  topLanguages: { name: string; percentage: number; color: string; icon?: string }[];
  recentActivity: { date: string; count: number }[];
  streakDays: number;
}

export interface NavItem {
  label: string;
  sectionId: string;
  icon?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AIAssistantMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface CommandPaletteItem {
  label: string;
  description?: string;
  action: () => void;
  icon?: string;
  category?: string;
}
