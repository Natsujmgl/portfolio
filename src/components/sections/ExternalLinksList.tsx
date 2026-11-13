import { ArrowUpRight, Clock, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { SITE_CONFIG } from '@/config/site';
import type { ExternalLinkItem, Locale } from '@/types/portfolio';

const LINK_ICONS: Record<ExternalLinkItem['id'], typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  cv: FileText,
  email: Mail,
};

interface ExternalLinksListProps {
  locale: Locale;
}

export function ExternalLinksList({ locale }: ExternalLinksListProps) {
  const t = useTranslations('common');
  const items: ExternalLinkItem[] = [
    SITE_CONFIG.links.github,
    SITE_CONFIG.links.linkedin,
    SITE_CONFIG.links.cv,
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => {
        const Icon = LINK_ICONS[item.id];
        const isActive = item.status === 'active' && item.href;

        if (isActive && item.href) {
          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-border-subtle bg-bg-elevated p-4 transition-colors hover:border-accent-primary"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-accent-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-text-primary">{item.label[locale]}</p>
                  {item.displayValue ? (
                    <p className="font-mono text-xs text-text-muted">{item.displayValue}</p>
                  ) : null}
                </div>
              </div>
              <ArrowUpRight
                className="h-4 w-4 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-primary"
                aria-hidden="true"
              />
            </a>
          );
        }

        return (
          <div
            key={item.id}
            className="flex flex-col justify-between gap-3 rounded-xl border border-dashed border-border-strong bg-bg-elevated/60 p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <Icon className="h-4 w-4 text-text-muted" aria-hidden="true" />
                <p className="text-sm font-semibold text-text-primary">{item.label[locale]}</p>
              </div>
              <Badge variant="warning">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {t('pendingLink')}
              </Badge>
            </div>
            <p className="text-xs leading-relaxed text-text-muted">{item.pendingNote[locale]}</p>
          </div>
        );
      })}
    </div>
  );
}
