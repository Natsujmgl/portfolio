import { ArrowRight, Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { Link } from '@/i18n/navigation';
import type { CaseStudy, Locale } from '@/types/portfolio';

interface CaseStudyCardProps {
  study: CaseStudy;
  locale: Locale;
}

export function CaseStudyCard({ study, locale }: CaseStudyCardProps) {
  const t = useTranslations('common');

  return (
    <article className="group flex flex-col justify-between rounded-xl border border-border-subtle bg-bg-elevated p-6 transition-colors hover:border-border-strong">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs font-semibold text-accent-primary">
            {study.order} · {study.scopeBadge[locale]}
          </span>
          <Badge variant="default">
            <Lock className="h-3 w-3" aria-hidden="true" />
            {t('privateCaseBadge')}
          </Badge>
        </div>

        <h3 className="mt-4 text-lg font-semibold leading-snug text-text-primary">
          {study.title[locale]}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{study.summary[locale]}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {study.contextTags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-border-subtle pt-4">
        <Link
          href={`/projects/${study.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-primary transition-colors hover:text-accent-hover"
        >
          <span>{t('readCaseStudy')}</span>
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}

