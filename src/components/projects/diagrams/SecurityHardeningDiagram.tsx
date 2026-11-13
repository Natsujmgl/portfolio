'use client';

import { useState } from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types/portfolio';

interface SecurityLayer {
  id: string;
  title: Record<Locale, string>;
  risk: Record<Locale, string>;
  control: Record<Locale, string>;
  owaspTag: string;
}

const LAYERS: SecurityLayer[] = [
  {
    id: 'auth',
    title: {
      es: '1. Sesión y Autenticación',
      en: '1. Session & Authentication',
    },
    owaspTag: 'A07 · Auth',
    risk: {
      es: 'Acciones heredadas que confían en estado implícito de sesión sin validar vigencia o contexto.',
      en: 'Legacy actions trusting implicit session state without verifying freshness or context.',
    },
    control: {
      es: 'Verificación centralizada de sesión activa antes de despachar cualquier controlador protegido.',
      en: 'Centralized active-session verification enforced prior to dispatching protected controller actions.',
    },
  },
  {
    id: 'rbac-idor',
    title: {
      es: '2. RBAC y Propiedad del Recurso (IDOR)',
      en: '2. RBAC & Resource Ownership (IDOR)',
    },
    owaspTag: 'A01 · Access Control',
    risk: {
      es: 'Aceptar un ID por URL/formulario sin comprobar si el rol o usuario tiene permiso sobre ese registro.',
      en: 'Accepting a record ID via URL/form without verifying whether the role or user owns that record.',
    },
    control: {
      es: 'Guardia de autorización en servidor: rol permitido + alcance organizacional/propiedad por consulta.',
      en: 'Server-side authorization guard: allowed role plus tenant/ownership scoping on every query.',
    },
  },
  {
    id: 'csrf',
    title: {
      es: '3. Protección Anti-CSRF',
      en: '3. Anti-CSRF Protection',
    },
    owaspTag: 'A01 / CSRF',
    risk: {
      es: 'Formularios y endpoints mutadores procesados sin token sincronizado por sesión.',
      en: 'State-changing forms and endpoints processed without per-session synchronizer tokens.',
    },
    control: {
      es: 'Validación obligatoria de token CSRF en operaciones POST/mutadoras antes de persistir cambios.',
      en: 'Mandatory CSRF token validation on POST/state-changing requests prior to persisting changes.',
    },
  },
  {
    id: 'sqli',
    title: {
      es: '4. Capa de Datos Parametrizada',
      en: '4. Parameterized Data Layer',
    },
    owaspTag: 'A03 · Injection',
    risk: {
      es: 'Concatenación directa de entrada de usuario en consultas SQL heredadas de CakePHP 1.3.',
      en: 'Direct string concatenation of user input inside legacy CakePHP 1.3 SQL queries.',
    },
    control: {
      es: 'Uso estricto de parámetros enlazados, validación de tipos y listas blancas para ordenamiento.',
      en: 'Strict bound parameters, input type validation, and allow-lists for dynamic sorting fields.',
    },
  },
  {
    id: 'sast',
    title: {
      es: '5. Verificación Continua (SAST)',
      en: '5. Continuous Verification (SAST)',
    },
    owaspTag: 'Checkmarx',
    risk: {
      es: 'Regresiones silenciosas al modificar módulos antiguos sin análisis estático posterior.',
      en: 'Silent regressions introduced when touching legacy modules without subsequent static analysis.',
    },
    control: {
      es: 'Re-escaneo en Checkmarx, triaje de verdaderos positivos y verificación funcional sin regresiones.',
      en: 'Checkmarx re-scans, true-positive triage, and regression-free functional verification.',
    },
  },
];

interface SecurityHardeningDiagramProps {
  locale: Locale;
}

export function SecurityHardeningDiagram({ locale }: SecurityHardeningDiagramProps) {
  const t = useTranslations('diagrams.security');
  const [mode, setMode] = useState<'hardened' | 'vulnerable'>('hardened');
  const [selectedLayerId, setSelectedLayerId] = useState<string>(LAYERS[1]?.id ?? 'auth');

  const selectedLayer = LAYERS.find((layer) => layer.id === selectedLayerId) ?? LAYERS[0];

  return (
    <div className="rounded-xl border border-border-subtle bg-bg-elevated p-5 sm:p-6">
      <div className="flex flex-col gap-4 border-b border-border-subtle pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-text-primary">{t('title')}</h3>
          <p className="mt-1 text-xs leading-relaxed text-text-muted sm:text-sm">{t('subtitle')}</p>
        </div>

        <div
          role="group"
          aria-label={t('title')}
          className="inline-flex shrink-0 rounded-lg border border-border-subtle bg-bg-muted p-1"
        >
          <button
            type="button"
            onClick={() => setMode('vulnerable')}
            aria-pressed={mode === 'vulnerable'}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
              mode === 'vulnerable'
                ? 'bg-bg-elevated text-status-danger shadow-sm ring-1 ring-border-subtle'
                : 'text-text-muted hover:text-text-primary'
            )}
          >
            <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
            {t('vulnerableMode')}
          </button>
          <button
            type="button"
            onClick={() => setMode('hardened')}
            aria-pressed={mode === 'hardened'}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
              mode === 'hardened'
                ? 'bg-bg-elevated text-status-success shadow-sm ring-1 ring-border-subtle'
                : 'text-text-muted hover:text-text-primary'
            )}
          >
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            {t('hardenedMode')}
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-5">
        {LAYERS.map((layer) => {
          const isActive = layer.id === selectedLayerId;
          return (
            <button
              key={layer.id}
              type="button"
              onClick={() => setSelectedLayerId(layer.id)}
              aria-pressed={isActive}
              className={cn(
                'flex flex-col items-start justify-between rounded-lg border p-3 text-left transition-colors',
                isActive
                  ? 'border-accent-primary bg-accent-subtle'
                  : 'border-border-subtle bg-bg-muted/60 hover:border-border-strong'
              )}
            >
              <span className="font-mono text-[11px] font-medium text-accent-primary">
                {layer.owaspTag}
              </span>
              <span className="mt-2 text-xs font-semibold leading-snug text-text-primary">
                {layer.title[locale]}
              </span>
              <span
                className={cn(
                  'mt-3 inline-flex items-center gap-1 text-[11px] font-medium',
                  mode === 'hardened' ? 'text-status-success' : 'text-status-danger'
                )}
              >
                {mode === 'hardened' ? (
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {mode === 'hardened' ? 'OK' : 'Risk'}
              </span>
            </button>
          );
        })}
      </div>

      {selectedLayer ? (
        <div className="mt-4 rounded-lg border border-border-subtle bg-bg-muted/50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-xs font-semibold text-text-primary">
              {t('stepLabel')}: {selectedLayer.title[locale]}
            </p>
            <span className="font-mono text-xs text-accent-primary">{selectedLayer.owaspTag}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            <strong className="font-semibold text-text-primary">
              {mode === 'hardened' ? t('hardenedControl') : t('legacyRisk')}:{' '}
            </strong>
            {mode === 'hardened' ? selectedLayer.control[locale] : selectedLayer.risk[locale]}
          </p>
        </div>
      ) : null}
    </div>
  );
}

