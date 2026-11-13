import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PublicProjectCard } from '@/components/projects/PublicProjectCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CASE_STUDIES } from '@/content/case-studies';
import { PUBLIC_PROJECTS } from '@/content/projects';
import { ProjectFilterBar } from '@/features/project-filters/ProjectFilterBar';
import { buildLocalizedMetadata } from '@/lib/seo';
import type { Locale } from '@/types/portfolio';

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = (locale === 'en' ? 'en' : 'es') as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: 'metadata.projects' });

  return buildLocalizedMetadata({
    locale: typedLocale,
    pathname: '/projects',
    title: t('title'),
    description: t('description'),
  });
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const typedLocale = (locale === 'en' ? 'en' : 'es') as Locale;
  setRequestLocale(typedLocale);

  const t = await getTranslations('projects');

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="space-y-3 border-b border-border-subtle pb-10">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-primary">
          {t('eyebrow')}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          {t('title')}
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-text-secondary sm:text-base">
          {t('subtitle')}
        </p>
      </header>

      <section className="space-y-6">
        <SectionHeading
          title={t('professionalSectionTitle')}
          description={t('professionalSectionDescription')}
        />
        <ProjectFilterBar caseStudies={CASE_STUDIES} locale={typedLocale} />
      </section>

      <section className="space-y-6 border-t border-border-subtle pt-12">
        <SectionHeading
          title={t('openSourceSectionTitle')}
          description={t('openSourceSectionDescription')}
        />
        <div className="grid gap-5 md:grid-cols-2">
          {PUBLIC_PROJECTS.map((project) => (
            <PublicProjectCard key={project.id} project={project} locale={typedLocale} />
          ))}
        </div>
      </section>
    </div>
  );
}

