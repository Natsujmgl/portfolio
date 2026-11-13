import { ArrowRight, Clock, Code2, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { Link } from '@/i18n/navigation';
import type { Locale, PublicProject } from '@/types/portfolio';

interface PublicProjectCardProps {
  project: PublicProject;
  locale: Locale;
}

export function PublicProjectCard({ project, locale }: PublicProjectCardProps) {
  const commonT = useTranslations('common');
  const projectsT = useTranslations('projects');

  const statusBadge = () => {
    switch (project.status) {
      case 'in-development':
        return <Badge variant="warning">{commonT('inDevelopment')}</Badge>;
      case 'active':
        return <Badge variant="success">{commonT('active')}</Badge>;
      case 'prototype':
        return <Badge variant="accent">{commonT('prototype')}</Badge>;
    }
  };

  return (
    <article className="flex flex-col justify-between rounded-xl border border-border-subtle bg-bg-elevated p-6">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="accent">
            <Code2 className="h-3 w-3" aria-hidden="true" />
            {commonT('openSourceBadge')}
          </Badge>
          {statusBadge()}
        </div>

        <h3 className="mt-4 text-lg font-semibold text-text-primary">{project.title[locale]}</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          {project.description[locale]}
        </p>

        <div className="mt-4 rounded-lg border border-border-subtle bg-bg-muted/50 p-3">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            {projectsT('architectureLabel')}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-text-secondary">
            {project.architectureSummary[locale]}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="default">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4">
        {project.demoPath ? (
          <Link
            href={project.demoPath}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-primary transition-colors hover:text-accent-hover"
          >
            <span>{projectsT('demoLabel')}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : null}

        {project.repositoryUrl ? (
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-primary transition-colors hover:text-accent-primary"
          >
            <span>{projectsT('repositoryLabel')}</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : project.pendingReason ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
            <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{project.pendingReason[locale]}</span>
          </span>
        ) : null}
      </div>
    </article>
  );
}

