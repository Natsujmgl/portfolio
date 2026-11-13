import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import type { Locale, SkillCategory, SkillTier } from '@/types/portfolio';

interface TechnicalSkillsGridProps {
  categories: SkillCategory[];
  locale: Locale;
}

const TIER_VARIANT: Record<SkillTier, 'accent' | 'outline' | 'default'> = {
  core: 'accent',
  proficient: 'outline',
  applied: 'default',
};

export function TechnicalSkillsGrid({ categories, locale }: TechnicalSkillsGridProps) {
  const t = useTranslations('common');

  const tierLabel = (tier: SkillTier) => {
    switch (tier) {
      case 'core':
        return t('tierCore');
      case 'proficient':
        return t('tierProficient');
      case 'applied':
        return t('tierApplied');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Badge variant="accent">{t('tierCore')}</Badge>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Badge variant="outline">{t('tierProficient')}</Badge>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Badge variant="default">{t('tierApplied')}</Badge>
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id} className="flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-text-primary">
                {category.title[locale]}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-text-muted">
                {category.description[locale]}
              </p>

              <ul className="mt-4 space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill.name} className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-text-primary">{skill.name}</span>
                      <Badge variant={TIER_VARIANT[skill.tier]}>{tierLabel(skill.tier)}</Badge>
                    </div>
                    {skill.note ? (
                      <p className="text-[11px] leading-snug text-text-muted">
                        {skill.note[locale]}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

