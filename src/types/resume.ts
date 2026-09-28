export type TemplateId = 
  | 'modern' 
  | 'minimal' 
  | 'professional' 
  | 'creative' 
  | 'student' 
  | 'ats';

export type FontFamily = 
  | 'Plus Jakarta Sans' 
  | 'Inter' 
  | 'EB Garamond' 
  | 'Merriweather' 
  | 'JetBrains Mono';

export type FontSize = 'sm' | 'base' | 'lg';
export type SpacingSize = 'compact' | 'balanced' | 'spacious';

export interface ThemeConfig {
  template: TemplateId;
  fontFamily: FontFamily;
  fontSize: FontSize;
  spacing: SpacingSize;
  accentColor: string; // hex
  headingStyle: 'uppercase' | 'titlecase' | 'bar' | 'underline';
}

export interface PersonalInfo {
  fullName: string;
  jobTitle?: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  college: string;
  university: string;
  year: string;
  cgpaOrPercentage: string;
  city?: string;
}

export interface SkillSet {
  technical: string[];
  soft: string[];
}

export interface ProjectItem {
  id: string;
  projectName: string;
  description: string;
  technologies: string;
  projectLink?: string;
  bulletPoints?: string[];
}

export interface ExperienceItem {
  id: string;
  jobTitle: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  bulletPoints?: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuerOrEvent: string;
  year: string;
  description: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Conversational';
}

export interface ResumeData {
  id: string;
  title: string;
  lastModified: number;
  personal: PersonalInfo;
  summary: string;
  education: EducationItem[];
  skills: SkillSet;
  projects: ProjectItem[];
  experience: ExperienceItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  languages: LanguageItem[];
  hobbies: string[];
  theme: ThemeConfig;
}

export interface AtsAuditResult {
  score: number;
  summary: string;
  breakdown: {
    contactInfo: { score: number; status: 'good' | 'needs-improvement'; notes: string };
    sectionCompleteness: { score: number; status: 'good' | 'needs-improvement'; notes: string };
    keywords: { score: number; status: 'good' | 'needs-improvement'; notes: string };
    readability: { score: number; status: 'good' | 'needs-improvement'; notes: string };
    quantifiableResults: { score: number; status: 'good' | 'needs-improvement'; notes: string };
  };
  strengths: string[];
  improvements: string[];
  suggestedKeywords: string[];
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  createdAt: number;
}
