import type { ExternalLinkItem, Locale } from '@/types/portfolio';

export const SITE_CONFIG = {
  owner: {
    fullName: 'Julio Miguel Giménez León',
    shortName: 'Julio Giménez',
    roleTitle: {
      es: 'Software Engineer | Backend & Full Stack Development | AI Automation',
      en: 'Software Engineer | Backend & Full Stack Development | AI Automation',
    },
    location: {
      es: 'Paraguay · Remoto',
      en: 'Paraguay · Remote',
    },
  },
  defaultLocale: 'es' as Locale,
  locales: ['es', 'en'] as const,
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://127.0.0.1:3000',
  /**
   * Centralized external links and contact data.
   * Update `href`, `displayValue`, and `status: 'active'` when ready to publish
   * personal links. Pending placeholders prevent exposing unverified URLs.
   */
  links: {
    github: {
      id: 'github',
      label: { es: 'GitHub', en: 'GitHub' },
      href: 'https://github.com/Natsujmgl',
      displayValue: 'github.com/Natsujmgl',
      status: 'active',
      pendingNote: {
        es: 'Enlace de GitHub pendiente de configurar en src/config/site.ts',
        en: 'GitHub URL pending configuration in src/config/site.ts',
      },
    },
    linkedin: {
      id: 'linkedin',
      label: { es: 'LinkedIn', en: 'LinkedIn' },
      href: 'https://www.linkedin.com/in/julio-miguel-gimenez-leon-2402141b2/',
      displayValue: 'linkedin.com/in/julio-miguel-gimenez-leon-2402141b2',
      status: 'active',
      pendingNote: {
        es: 'Perfil de LinkedIn pendiente de configurar en src/config/site.ts',
        en: 'LinkedIn profile URL pending configuration in src/config/site.ts',
      },
    },
    cv: {
      id: 'cv',
      label: { es: 'Currículum (CV)', en: 'Resume (CV)' },
      href: '/cv-julio-gimenez-leon.pdf',
      displayValue: 'cv-julio-gimenez-leon.pdf',
      status: 'active',
      pendingNote: {
        es: 'Archivo o enlace de CV pendiente de configurar en src/config/site.ts',
        en: 'Resume (CV) file or URL pending configuration in src/config/site.ts',
      },
    },
    email: {
      id: 'email',
      label: { es: 'Correo electrónico', en: 'Email' },
      href: 'mailto:julkleon3@gmail.com',
      displayValue: 'julkleon3@gmail.com',
      status: 'active',
      pendingNote: {
        es: 'Dirección de correo de ejemplo; reemplazar con el correo real en src/config/site.ts',
        en: 'Placeholder email address; replace with real email in src/config/site.ts',
      },
    },
  } satisfies Record<'github' | 'linkedin' | 'cv' | 'email', ExternalLinkItem>,
} as const;

