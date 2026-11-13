import { describe, expect, it } from 'vitest';
import { CASE_STUDIES } from '@/content/case-studies';
import { EXPERIENCE_ITEMS } from '@/content/experience';
import { PUBLIC_PROJECTS } from '@/content/projects';
import { routing } from '@/i18n/routing';
import enMessages from '../../messages/en.json';
import esMessages from '../../messages/es.json';

describe('Routing and bilingual content integrity', () => {
  it('configures Spanish as default locale and supports ES/EN', () => {
    expect(routing.defaultLocale).toBe('es');
    expect(routing.locales).toEqual(['es', 'en']);
  });

  it('keeps matching top-level translation namespaces across ES and EN', () => {
    expect(Object.keys(esMessages).sort()).toEqual(Object.keys(enMessages).sort());
  });

  it('includes all 4 case studies with all 9 mandatory sections in both locales', () => {
    expect(CASE_STUDIES).toHaveLength(4);

    for (const study of CASE_STUDIES) {
      expect(study.visibility).toBe('private-professional');
      expect(study.sections.technicalContext.es.length).toBeGreaterThan(20);
      expect(study.sections.technicalContext.en.length).toBeGreaterThan(20);
      expect(study.sections.problem.es.length).toBeGreaterThan(20);
      expect(study.sections.problem.en.length).toBeGreaterThan(20);
      expect(study.sections.challenges.es.length).toBeGreaterThan(0);
      expect(study.sections.challenges.en.length).toBeGreaterThan(0);
      expect(study.sections.personalContribution.es.length).toBeGreaterThan(0);
      expect(study.sections.personalContribution.en.length).toBeGreaterThan(0);
      expect(study.sections.engineeringDecisions.es.length).toBeGreaterThan(0);
      expect(study.sections.engineeringDecisions.en.length).toBeGreaterThan(0);
      expect(study.sections.implementedSolution.es.length).toBeGreaterThan(20);
      expect(study.sections.implementedSolution.en.length).toBeGreaterThan(20);
      expect(study.sections.technologies.length).toBeGreaterThan(0);
      expect(study.sections.verifiableResults.es.length).toBeGreaterThan(0);
      expect(study.sections.verifiableResults.en.length).toBeGreaterThan(0);
      expect(study.sections.learnings.es.length).toBeGreaterThan(0);
      expect(study.sections.learnings.en.length).toBeGreaterThan(0);
    }
  });

  it('preserves exact chronological companies and public project separation', () => {
    expect(EXPERIENCE_ITEMS.map((item) => item.company)).toEqual([
      'ITTI Digital',
      'Grupo EPEM',
      'Grupo EPEM',
    ]);
    expect(PUBLIC_PROJECTS.some((project) => project.status === 'in-development')).toBe(true);
  });
});

