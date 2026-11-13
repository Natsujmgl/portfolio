import { Briefcase } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import type { ExperienceItem, Locale } from '@/types/portfolio';

interface ExperienceTimelineProps {
  items: ExperienceItem[];
  locale: Locale;
  compact?: boolean;
}

export function ExperienceTimeline({ items, locale, compact = false }: ExperienceTimelineProps) {
  const t = useTranslations('common');

  return (
    <ol className="relative space-y-6 border-l border-border-subtle pl-6">
      {items.map((item) => (
        <li key={item.id} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[31px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-accent-primary bg-bg-primary"
          />
          <article className="rounded-xl border border-border-subtle bg-bg-elevated p-5 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-text-primary">{item.company}</h3>
                  {item.current ? <Badge variant="accent">{t('currentRole')}</Badge> : null}
                </div>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-accent-primary">
                  <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{item.role[locale]}</span>
                </p>
              </div>
              <p className="font-mono text-xs text-text-muted">{item.period[locale]}</p>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {item.summary[locale]}
            </p>

            {!compact ? (
              <ul className="mt-4 space-y-1.5 border-t border-border-subtle pt-4 text-sm text-text-secondary">
                {item.highlights[locale].map((point) => (
                  <li key={point} className="leading-relaxed">
                    • {point}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-1.5">
              {item.technologies.map((tech) => (
                <Badge key={tech} variant="default">
                  {tech}
                </Badge>
              ))}
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}

