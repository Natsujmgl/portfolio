import type { Metadata } from 'next';
import { ArrowLeft, Lock } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CaseStudyNavigation } from '@/components/projects/CaseStudyNavigation';
import { CaseStudyDiagram } from '@/components/projects/diagrams/CaseStudyDiagram';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { CASE_STUDIES, getCaseStudyBySlug } from '@/content/case-studies';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { buildLocalizedMetadata } from '@/lib/seo';
import type { Locale } from '@/types/portfolio';

interface CaseStudyDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CASE_STUDIES.map((study) => ({
      locale,
      slug: study.slug,
    }))
  );
}

export async function generateMetadata({ params }: CaseStudyDetailProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale = (locale === 'en' ? 'en' : 'es') as Locale;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {};
  }

  return buildLocalizedMetadata({
    locale: typedLocale,
    pathname: `/projects/${study.slug}`,
    title: `${study.title[typedLocale]} — Julio Miguel Giménez León`,
    description: study.summary[typedLocale],
  });
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailProps) {
  const { locale, slug } = await params;
  const typedLocale = (locale === 'en' ? 'en' : 'es') as Locale;
  setRequestLocale(typedLocale);

  const study = getCaseStudyBySlug(slug);
  if (!study) {
    notFound();
  }

  const currentIndex = CASE_STUDIES.findIndex((item) => item.slug === study.slug);
  const previous = currentIndex > 0 ? (CASE_STUDIES[currentIndex - 1] ?? null) : null;
  const next =
    currentIndex >= 0 && currentIndex < CASE_STUDIES.length - 1
      ? (CASE_STUDIES[currentIndex + 1] ?? null)
      : null;

  const commonT = await getTranslations('common');
  const caseT = await getTranslations('caseStudy');
  const projectsT = await getTranslations('projects');

  return (
    <article className="mx-auto max-w-5xl space-y-12 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="space-y-6 border-b border-border-subtle pb-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-accent-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>{commonT('backToProjects')}</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">
            {study.order} · {study.scopeBadge[typedLocale]}
          </Badge>
          <Badge variant="default">
            <Lock className="h-3 w-3" aria-hidden="true" />
            {caseT('privacyNotice')}
          </Badge>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {study.title[typedLocale]}
          </h1>
          <p className="text-base font-medium text-text-secondary sm:text-lg">
            {study.subtitle[typedLocale]}
          </p>
        </div>

        <p className="rounded-lg border border-border-subtle bg-bg-muted/60 px-4 py-3 text-xs leading-relaxed text-text-secondary">
          {projectsT('privacyBanner')}
        </p>
      </div>

      {/* Interactive Educational Diagram */}
      <section className="space-y-4">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-primary">
          {caseT('diagramTitle')}
        </h2>
        <CaseStudyDiagram type={study.diagramType} locale={typedLocale} />
      </section>

      {/* 9 Mandatory Case Study Sections */}
      <div className="grid gap-6">
        <Card className="space-y-2">
          <h2 className="text-lg font-semibold text-text-primary">
            {caseT('sections.technicalContext')}
          </h2>
          <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
            {study.sections.technicalContext[typedLocale]}
          </p>
        </Card>

        <Card className="space-y-2">
          <h2 className="text-lg font-semibold text-text-primary">{caseT('sections.problem')}</h2>
          <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
            {study.sections.problem[typedLocale]}
          </p>
        </Card>

        <Card className="space-y-3">
          <h2 className="text-lg font-semibold text-text-primary">
            {caseT('sections.challenges')}
          </h2>
          <ul className="space-y-2 text-sm leading-relaxed text-text-secondary sm:text-base">
            {study.sections.challenges[typedLocale].map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </Card>

        <Card className="space-y-3">
          <h2 className="text-lg font-semibold text-text-primary">
            {caseT('sections.personalContribution')}
          </h2>
          <ul className="space-y-2 text-sm leading-relaxed text-text-secondary sm:text-base">
            {study.sections.personalContribution[typedLocale].map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </Card>

        <Card className="space-y-3">
          <h2 className="text-lg font-semibold text-text-primary">
            {caseT('sections.engineeringDecisions')}
          </h2>
          <ul className="space-y-2 text-sm leading-relaxed text-text-secondary sm:text-base">
            {study.sections.engineeringDecisions[typedLocale].map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </Card>

        <Card className="space-y-2">
          <h2 className="text-lg font-semibold text-text-primary">
            {caseT('sections.implementedSolution')}
          </h2>
          <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
            {study.sections.implementedSolution[typedLocale]}
          </p>
        </Card>

        <Card className="space-y-3">
          <h2 className="text-lg font-semibold text-text-primary">
            {caseT('sections.technologies')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {study.sections.technologies.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="space-y-3">
          <h2 className="text-lg font-semibold text-text-primary">
            {caseT('sections.verifiableResults')}
          </h2>
          <ul className="space-y-2 text-sm leading-relaxed text-text-secondary sm:text-base">
            {study.sections.verifiableResults[typedLocale].map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </Card>

        <Card className="space-y-3">
          <h2 className="text-lg font-semibold text-text-primary">{caseT('sections.learnings')}</h2>
          <ul className="space-y-2 text-sm leading-relaxed text-text-secondary sm:text-base">
            {study.sections.learnings[typedLocale].map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </Card>
      </div>

      <CaseStudyNavigation previous={previous} next={next} locale={typedLocale} />
    </article>
  );
}

