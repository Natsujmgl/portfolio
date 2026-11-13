import type { PublicProject } from '@/types/portfolio';

export const PUBLIC_PROJECTS: PublicProject[] = [
  {
    id: 'ai-development-workflow-lab',
    title: {
      es: 'AI Development Workflow Lab',
      en: 'AI Development Workflow Lab',
    },
    status: 'in-development',
    category: 'ai-automation',
    description: {
      es: 'Laboratorio demostrativo de código abierto inspirado en automatizaciones de soporte L3: ingesta de ticket simulado, análisis de código con MCP, especificación SDD, propuesta de cambios y preparación de Pull Request con aprobación humana obligatoria.',
      en: 'Open-source demonstration lab inspired by L3 support automation workflows: simulated ticket intake, MCP-backed code analysis, SDD specification, change proposal, and Pull Request preparation with mandatory human approval.',
    },
    architectureSummary: {
      es: 'Arquitectura desacoplada por etapas con datos ficticios y repositorio de prueba aislado, sin conexión a herramientas corporativas reales.',
      en: 'Stage-based decoupled architecture operating on fictional data and an isolated sandbox repository, without connecting to real corporate tools.',
    },
    technologies: [
      'TypeScript',
      'Next.js',
      'Python / Laravel',
      'MCP',
      'Spec-Driven Development',
      'GitHub Actions',
    ],
    repositoryUrl: null,
    demoPath: '/projects/ai-development-automation',
    pendingReason: {
      es: 'Repositorio público en desarrollo; podés probar el simulador conceptual interactivo en el Caso 03.',
      en: 'Public repository in development; you can test the interactive conceptual simulator inside Case Study 03.',
    },
  },
  {
    id: 'software-engineering-portfolio',
    title: {
      es: 'Software Engineering Portfolio (Este repositorio)',
      en: 'Software Engineering Portfolio (This Repository)',
    },
    status: 'active',
    category: 'portfolio',
    description: {
      es: 'Aplicación bilingüe (ES/EN) construida con Next.js App Router, TypeScript estricto, Tailwind CSS, next-intl, next-themes y diagramas interactivos originales para presentar casos técnicos sin comprometer confidencialidad.',
      en: 'Bilingual (ES/EN) web application built with Next.js App Router, strict TypeScript, Tailwind CSS, next-intl, next-themes, and original interactive diagrams to showcase engineering work without breaching confidentiality.',
    },
    architectureSummary: {
      es: 'Server Components por defecto, separación estricta de contenido y presentación, headers de seguridad HTTP y suite de tests unitarios y E2E.',
      en: 'Server Components by default, strict separation of structured content and UI, hardened HTTP security headers, and automated unit plus E2E test suites.',
    },
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'next-intl',
      'Vitest',
      'Playwright',
    ],
    repositoryUrl: 'https://github.com/Natsujmgl/portfolio',
    demoPath: '/',
    pendingReason: undefined,
  },
];
