export type Locale = 'es' | 'en';

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type LinkStatus = 'active' | 'pending';

export interface ExternalLinkItem {
  id: 'github' | 'linkedin' | 'cv' | 'email';
  label: LocalizedText;
  href: string | null;
  displayValue: string | null;
  status: LinkStatus;
  pendingNote: LocalizedText;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: LocalizedText;
  period: LocalizedText;
  location?: string;
  current: boolean;
  summary: LocalizedText;
  highlights: LocalizedList;
  technologies: string[];
}

export type SkillTier = 'core' | 'proficient' | 'applied';

export interface SkillItem {
  name: string;
  tier: SkillTier;
  note?: LocalizedText;
}

export interface SkillCategory {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  skills: SkillItem[];
}

export type CaseStudyCategory = 'security' | 'modernization' | 'ai-automation' | 'enterprise';

export type CaseStudyDiagramType =
  'security-hardening' | 'legacy-modernization' | 'ai-workflow' | 'enterprise-architecture';

export interface CaseStudy {
  slug: string;
  order: string;
  category: CaseStudyCategory;
  diagramType: CaseStudyDiagramType;
  visibility: 'private-professional';
  title: LocalizedText;
  subtitle: LocalizedText;
  summary: LocalizedText;
  scopeBadge: LocalizedText;
  contextTags: string[];
  sections: {
    technicalContext: LocalizedText;
    problem: LocalizedText;
    challenges: LocalizedList;
    personalContribution: LocalizedList;
    engineeringDecisions: LocalizedList;
    implementedSolution: LocalizedText;
    technologies: string[];
    verifiableResults: LocalizedList;
    learnings: LocalizedList;
  };
}

export type PublicProjectStatus = 'in-development' | 'active' | 'prototype';

export interface PublicProject {
  id: string;
  title: LocalizedText;
  status: PublicProjectStatus;
  category: CaseStudyCategory | 'portfolio';
  description: LocalizedText;
  architectureSummary: LocalizedText;
  technologies: string[];
  repositoryUrl: string | null;
  demoPath: string | null;
  pendingReason?: LocalizedText;
}
