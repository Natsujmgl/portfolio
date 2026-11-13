'use client';

import { useState } from 'react';
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  FileCode2,
  GitBranch,
  GitCommit,
  GitPullRequest,
  RotateCcw,
  ShieldCheck,
  Ticket,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types/portfolio';

interface WorkflowStage {
  id: string;
  label: string;
  icon: typeof Ticket;
  mcpCall: string;
  outputs: Record<string, Record<Locale, string>>;
}

interface FictionalTicket {
  id: string;
  code: string;
  title: Record<Locale, string>;
  branchName: string;
}

const FICTIONAL_TICKETS: FictionalTicket[] = [
  {
    id: 'billing-timeout',
    code: 'DEMO-104',
    title: {
      es: 'Reintento idempotente ante timeout en servicio de facturación ficticio',
      en: 'Idempotent retry on fictional invoicing service timeout',
    },
    branchName: 'fix/demo-104-idempotent-invoice-retry',
  },
  {
    id: 'export-filter',
    code: 'DEMO-218',
    title: {
      es: 'Validación de rango de fechas en endpoint simulado de exportación',
      en: 'Date-range validation in simulated export endpoint',
    },
    branchName: 'fix/demo-218-export-date-guard',
  },
];

const STAGES: WorkflowStage[] = [
  {
    id: 'jira-ticket',
    label: 'Jira Ticket',
    icon: Ticket,
    mcpCall: 'mcp.issueTracker.getTicket({ key: "<FICTIONAL_KEY>" })',
    outputs: {
      'billing-timeout': {
        es: 'Ticket DEMO-104 leído: se reporta duplicación ocasional de solicitud al reintentar envíos tras timeout HTTP.',
        en: 'Ticket DEMO-104 parsed: occasional duplicate request reported when retrying submissions after an HTTP timeout.',
      },
      'export-filter': {
        es: 'Ticket DEMO-218 leído: consulta de exportación permite rangos mayores a 365 días sin validación previa.',
        en: 'Ticket DEMO-218 parsed: export endpoint accepts date ranges exceeding 365 days without upfront validation.',
      },
    },
  },
  {
    id: 'code-analysis',
    label: 'Code Analysis',
    icon: Bot,
    mcpCall: 'mcp.workspace.searchSymbol({ scope: "sandbox-repo" })',
    outputs: {
      'billing-timeout': {
        es: 'Agente analizador ubica el dispatcher simulado en src/billing/InvoiceDispatcher.ts y detecta ausencia de clave de idempotencia.',
        en: 'Analyzer agent locates simulated dispatcher in src/billing/InvoiceDispatcher.ts and spots missing idempotency key.',
      },
      'export-filter': {
        es: 'Agente analizador inspecciona src/reports/ExportValidator.ts y confirma falta de límite máximo de días.',
        en: 'Analyzer agent inspects src/reports/ExportValidator.ts and confirms missing max-day span guard.',
      },
    },
  },
  {
    id: 'solution-planning',
    label: 'Solution Planning',
    icon: ShieldCheck,
    mcpCall: 'sdd.spec.validate({ rules: ["scope-guard", "test-first"] })',
    outputs: {
      'billing-timeout': {
        es: 'Plan SDD acotado: generar clave determinística por comprobante, agregar test de reintento y mantener interfaz pública intacta.',
        en: 'Scoped SDD plan: derive deterministic key per document, add retry unit test, and preserve public interface.',
      },
      'export-filter': {
        es: 'Plan SDD acotado: validar rango <= 90 días con mensaje claro de error HTTP 422 y test de regresión.',
        en: 'Scoped SDD plan: enforce <= 90-day span with clear HTTP 422 validation error and regression test.',
      },
    },
  },
  {
    id: 'code-changes',
    label: 'Code Changes',
    icon: FileCode2,
    mcpCall: 'worker.edit({ allowedSurface: ["src/**", "tests/**"] })',
    outputs: {
      'billing-timeout': {
        es: 'Cambio aplicado en entorno sandbox (+28 / -4 líneas) junto con caso de prueba que verifica un único envío efectivo.',
        en: 'Patch applied in sandbox environment (+28 / -4 lines) alongside test verifying single effective dispatch.',
      },
      'export-filter': {
        es: 'Validación agregada en capa de entrada (+18 / -2 líneas) + tests de borde para 90 y 91 días.',
        en: 'Input-layer guard added (+18 / -2 lines) + boundary tests covering 90 and 91 days.',
      },
    },
  },
  {
    id: 'git-branch',
    label: 'Git Branch',
    icon: GitBranch,
    mcpCall: 'git checkout -b <scoped-fix-branch>',
    outputs: {
      'billing-timeout': {
        es: 'Rama aislada preparada: fix/demo-104-idempotent-invoice-retry sobre repositorio de prueba.',
        en: 'Isolated branch prepared: fix/demo-104-idempotent-invoice-retry on sandbox repository.',
      },
      'export-filter': {
        es: 'Rama aislada preparada: fix/demo-218-export-date-guard sobre repositorio de prueba.',
        en: 'Isolated branch prepared: fix/demo-218-export-date-guard on sandbox repository.',
      },
    },
  },
  {
    id: 'commit',
    label: 'Commit',
    icon: GitCommit,
    mcpCall: 'git commit -m "fix(demo): enforce scoped invariant"',
    outputs: {
      'billing-timeout': {
        es: 'Commit convencional generado tras pasar lint y tests unitarios en el sandbox.',
        en: 'Conventional commit recorded after passing lint and unit tests in sandbox.',
      },
      'export-filter': {
        es: 'Commit convencional generado con tests de validación en verde.',
        en: 'Conventional commit recorded with passing validation tests.',
      },
    },
  },
  {
    id: 'pull-request',
    label: 'Pull Request',
    icon: GitPullRequest,
    mcpCall: 'mcp.gitProvider.prepareDraftPR({ requireHumanApproval: true })',
    outputs: {
      'billing-timeout': {
        es: 'Borrador de PR preparado con resumen de causa raíz, diff acotado y checklist. Queda detenido esperando revisión humana.',
        en: 'Draft PR prepared with root-cause summary, scoped diff, and checklist. Halted pending human review.',
      },
      'export-filter': {
        es: 'Borrador de PR preparado con evidencia de pruebas. No se fusiona ni ejecuta en producción sin aprobación humana.',
        en: 'Draft PR prepared with test evidence. Never merged or deployed without explicit human approval.',
      },
    },
  },
];

interface AiWorkflowSimulatorProps {
  locale: Locale;
}

export function AiWorkflowSimulator({ locale }: AiWorkflowSimulatorProps) {
  const t = useTranslations('diagrams.aiWorkflow');
  const [ticketId, setTicketId] = useState<string>(FICTIONAL_TICKETS[0]?.id ?? 'billing-timeout');
  const [stageIndex, setStageIndex] = useState<number>(0);

  const currentTicket =
    FICTIONAL_TICKETS.find((ticket) => ticket.id === ticketId) ?? FICTIONAL_TICKETS[0];
  const currentStage = STAGES[stageIndex] ?? STAGES[0];

  const handleSelectTicket = (nextId: string) => {
    setTicketId(nextId);
    setStageIndex(0);
  };

  return (
    <div className="rounded-xl border border-border-subtle bg-bg-elevated p-5 sm:p-6">
      <div className="flex flex-col gap-4 border-b border-border-subtle pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-text-primary">{t('title')}</h3>
          <p className="mt-1 text-xs leading-relaxed text-text-muted sm:text-sm">{t('subtitle')}</p>
        </div>

        <button
          type="button"
          onClick={() => setStageIndex(0)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border-subtle bg-bg-muted px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-text-primary"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          {t('resetButton')}
        </button>
      </div>

      <div className="mt-4">
        <p className="font-mono text-xs font-medium text-text-muted">{t('ticketLabel')}</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {FICTIONAL_TICKETS.map((ticket) => {
            const isSelected = ticket.id === ticketId;
            return (
              <button
                key={ticket.id}
                type="button"
                onClick={() => handleSelectTicket(ticket.id)}
                aria-pressed={isSelected}
                className={cn(
                  'rounded-lg border p-3 text-left transition-colors',
                  isSelected
                    ? 'border-accent-primary bg-accent-subtle'
                    : 'border-border-subtle bg-bg-muted/60 hover:border-border-strong'
                )}
              >
                <span className="font-mono text-xs font-semibold text-accent-primary">
                  {ticket.code}
                </span>
                <p className="mt-1 text-xs font-medium leading-snug text-text-primary">
                  {ticket.title[locale]}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {STAGES.map((stage, index) => {
          const Icon = stage.icon;
          const isCurrent = index === stageIndex;
          const isDone = index < stageIndex;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setStageIndex(index)}
              aria-current={isCurrent ? 'step' : undefined}
              className={cn(
                'flex flex-col items-start rounded-lg border p-2.5 text-left transition-colors',
                isCurrent
                  ? 'border-accent-primary bg-accent-subtle text-text-primary'
                  : isDone
                    ? 'border-border-strong bg-bg-muted text-text-secondary'
                    : 'border-border-subtle bg-bg-primary text-text-muted hover:text-text-primary'
              )}
            >
              <div className="flex w-full items-center justify-between">
                <Icon className="h-3.5 w-3.5 text-accent-primary" aria-hidden="true" />
                <span className="font-mono text-[10px]">0{index + 1}</span>
              </div>
              <span className="mt-2 text-xs font-semibold leading-tight">{stage.label}</span>
            </button>
          );
        })}
      </div>

      {currentStage && currentTicket ? (
        <div className="mt-4 space-y-3 rounded-lg border border-border-subtle bg-bg-muted/50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs font-semibold text-accent-primary">
              {currentStage.label} ({stageIndex + 1}/{STAGES.length})
            </span>
            <span className="font-mono text-xs text-text-muted">{currentTicket.branchName}</span>
          </div>

          <div className="rounded-md border border-border-subtle bg-bg-primary px-3 py-2">
            <p className="font-mono text-[11px] text-text-muted">{t('mcpLabel')}</p>
            <code className="mt-1 block overflow-x-auto font-mono text-xs text-text-primary">
              {currentStage.mcpCall}
            </code>
          </div>

          <div>
            <p className="font-mono text-[11px] text-text-muted">{t('outputLabel')}</p>
            <p className="mt-1 text-sm leading-relaxed text-text-secondary">
              {currentStage.outputs[currentTicket.id]?.[locale]}
            </p>
          </div>

          {stageIndex === STAGES.length - 1 ? (
            <div className="flex items-center gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-medium text-status-warning">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t('humanGate')}</span>
            </div>
          ) : null}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setStageIndex((prev) => Math.max(0, prev - 1))}
              disabled={stageIndex === 0}
              className="inline-flex items-center gap-1 rounded-md border border-border-subtle bg-bg-elevated px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
              {t('prevStage')}
            </button>
            <button
              type="button"
              onClick={() => setStageIndex((prev) => Math.min(STAGES.length - 1, prev + 1))}
              disabled={stageIndex === STAGES.length - 1}
              className="inline-flex items-center gap-1 rounded-md bg-accent-primary px-3 py-1.5 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t('nextStage')}
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
