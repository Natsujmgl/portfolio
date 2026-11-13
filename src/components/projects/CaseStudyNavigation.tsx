import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { CaseStudy, Locale } from '@/types/portfolio';

interface CaseStudyNavigationProps {
  previous: CaseStudy | null;
  next: CaseStudy | null;
  locale: Locale;
}

export function CaseStudyNavigation({ previous, next, locale }: CaseStudyNavigationProps) {
  const t = useTranslations('common');

  return (
    <nav
      aria-label={t('nextCase')}
      className="grid gap-4 border-t border-border-subtle pt-8 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={`/projects/${previous.slug}`}
          className="group flex flex-col rounded-xl border border-border-subtle bg-bg-elevated p-4 transition-colors hover:border-accent-primary"
        >
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            {t('previousCase')}
          </span>
          <span className="mt-1 text-sm font-semibold text-text-primary group-hover:text-accent-primary">
            {previous.order}. {previous.title[locale]}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          className="group flex flex-col items-end rounded-xl border border-border-subtle bg-bg-elevated p-4 text-right transition-colors hover:border-accent-primary"
        >
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted">
            {t('nextCase')}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="mt-1 text-sm font-semibold text-text-primary group-hover:text-accent-primary">
            {next.order}. {next.title[locale]}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}

