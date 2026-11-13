'use client';

import { useState } from 'react';
import { ArrowRight, CheckSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types/portfolio';

interface ModernizationArea {
  id: string;
  label: Record<Locale, string>;
  before: Record<Locale, string>;
  after: Record<Locale, string>;
  checks: Record<Locale, string[]>;
}

const AREAS: ModernizationArea[] = [
  {
    id: 'runtime-dependencies',
    label: {
      es: 'Runtime y Dependencias',
      en: 'Runtime & Dependencies',
    },
    before: {
      es: 'Laravel 5.6, PHP antiguo y paquetes Composer sin soporte activo.',
      en: 'Laravel 5.6, older PHP runtime, and unmaintained Composer packages.',
    },
    after: {
      es: 'Laravel 10 con PHP moderno y árbol de dependencias compatible y mantenido.',
      en: 'Laravel 10 on modern PHP with a compatible, actively maintained dependency tree.',
    },
    checks: {
      es: [
        'Auditoría de restricciones en composer.json y reemplazo de paquetes abandonados.',
        'Revisión de cambios de firma en tipos de retorno y contratos PHP.',
      ],
      en: [
        'Auditing composer.json constraints and replacing abandoned packages.',
        'Reviewing return-type signature updates and PHP language changes.',
      ],
    },
  },
  {
    id: 'framework-contracts',
    label: {
      es: 'Contratos y Helpers',
      en: 'Contracts & Helpers',
    },
    before: {
      es: 'Uso extendido de helpers globales eliminados y convenciones antiguas de ruteo/validación.',
      en: 'Widespread use of removed global helpers and legacy routing/validation conventions.',
    },
    after: {
      es: 'Uso de facades/clases estándar (`Str`, `Arr`), middlewares y políticas actualizadas.',
      en: 'Standardized framework classes (`Str`, `Arr`), updated middleware, and current contracts.',
    },
    checks: {
      es: [
        'Sustitución sistemática de helpers globales obsoletos sin alterar semántica.',
        'Verificación de definiciones de rutas, colas, jobs y providers.',
      ],
      en: [
        'Systematic replacement of deprecated global helpers without changing semantics.',
        'Verification of route definitions, queue jobs, and service providers.',
      ],
    },
  },
  {
    id: 'business-parity',
    label: {
      es: 'Paridad Funcional',
      en: 'Functional Parity',
    },
    before: {
      es: 'Reglas de negocio implícitas distribuidas en controladores y modelos extensos.',
      en: 'Implicit business rules spread across large controllers and models.',
    },
    after: {
      es: 'Mismos flujos de negocio preservados con refactorización acotada y comportamiento verificado.',
      en: 'Core business workflows preserved via scoped refactoring and verified runtime behavior.',
    },
    checks: {
      es: [
        'Lectura previa de módulos críticos antes de tocar implementaciones heredadas.',
        'Pruebas manuales y automatizadas sobre flujos administrativos clave.',
      ],
      en: [
        'Pre-change reading of critical modules prior to modifying legacy implementations.',
        'Manual and automated verification across key administrative workflows.',
      ],
    },
  },
];

interface LegacyModernizationDiagramProps {
  locale: Locale;
}

export function LegacyModernizationDiagram({ locale }: LegacyModernizationDiagramProps) {
  const t = useTranslations('diagrams.modernization');
  const [selectedId, setSelectedId] = useState<string>(AREAS[0]?.id ?? 'runtime-dependencies');

  const selected = AREAS.find((area) => area.id === selectedId) ?? AREAS[0];

  return (
    <div className="rounded-xl border border-border-subtle bg-bg-elevated p-5 sm:p-6">
      <div className="border-b border-border-subtle pb-4">
        <h3 className="text-base font-semibold text-text-primary">{t('title')}</h3>
        <p className="mt-1 text-xs leading-relaxed text-text-muted sm:text-sm">{t('subtitle')}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={t('focusLabel')}>
        {AREAS.map((area) => {
          const isSelected = area.id === selectedId;
          return (
            <button
              key={area.id}
              type="button"
              onClick={() => setSelectedId(area.id)}
              aria-pressed={isSelected}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
                isSelected
                  ? 'border-accent-primary bg-accent-subtle text-accent-primary'
                  : 'border-border-subtle bg-bg-muted text-text-secondary hover:text-text-primary'
              )}
            >
              {area.label[locale]}
            </button>
          );
        })}
      </div>

      {selected ? (
        <div className="mt-5 space-y-4">
          <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-lg border border-border-subtle bg-bg-muted/60 p-4">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                {t('beforeLabel')}
              </span>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {selected.before[locale]}
              </p>
            </div>

            <div className="flex items-center justify-center text-accent-primary">
              <ArrowRight className="h-5 w-5 rotate-90 md:rotate-0" aria-hidden="true" />
            </div>

            <div className="rounded-lg border border-accent-primary/40 bg-accent-subtle p-4">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent-primary">
                {t('afterLabel')}
              </span>
              <p className="mt-2 text-sm leading-relaxed text-text-primary">
                {selected.after[locale]}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border-subtle bg-bg-muted/40 p-4">
            <p className="font-mono text-xs font-semibold text-text-primary">{t('checksLabel')}</p>
            <ul className="mt-2 space-y-1.5">
              {selected.checks[locale].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckSquare
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-primary"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

