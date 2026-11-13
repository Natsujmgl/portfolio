'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CaseStudyCard } from '@/components/projects/CaseStudyCard';
import { cn } from '@/lib/utils';
import type { CaseStudy, CaseStudyCategory, Locale } from '@/types/portfolio';

type FilterOption = 'all' | CaseStudyCategory;

const FILTER_OPTIONS: FilterOption[] = [
  'all',
  'security',
  'modernization',
  'ai-automation',
  'enterprise',
];

interface ProjectFilterBarProps {
  caseStudies: CaseStudy[];
  locale: Locale;
}

export function ProjectFilterBar({ caseStudies, locale }: ProjectFilterBarProps) {
  const t = useTranslations('projects');
  const [selectedCategory, setSelectedCategory] = useState<FilterOption>('all');

  const filteredStudies = useMemo(() => {
    if (selectedCategory === 'all') return caseStudies;
    return caseStudies.filter((study) => study.category === selectedCategory);
  }, [caseStudies, selectedCategory]);

  return (
    <div className="space-y-6">
      <div role="group" aria-label={t('filterLabel')} className="flex flex-wrap items-center gap-2">
        {FILTER_OPTIONS.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={isSelected}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm',
                isSelected
                  ? 'border-accent-primary bg-accent-subtle text-accent-primary'
                  : 'border-border-subtle bg-bg-elevated text-text-secondary hover:border-border-strong hover:text-text-primary'
              )}
            >
              {t(`filters.${category}`)}
            </button>
          );
        })}
      </div>

      {filteredStudies.length === 0 ? (
        <p className="rounded-xl border border-border-subtle bg-bg-elevated p-6 text-sm text-text-muted">
          {t('emptyFilter')}
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filteredStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
