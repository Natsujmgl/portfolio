'use client';

import { useState } from 'react';
import { Database, FileText, Layers, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types/portfolio';

interface ArchitectureNode {
  id: string;
  icon: typeof Layers;
  title: Record<Locale, string>;
  stack: string;
  responsibilities: Record<Locale, string[]>;
  patterns: Record<Locale, string>;
}

const NODES: ArchitectureNode[] = [
  {
    id: 'erp',
    icon: Layers,
    title: {
      es: 'Núcleo Administrativo (ERP)',
      en: 'Administrative Core (ERP)',
    },
    stack: 'PHP / Laravel',
    responsibilities: {
      es: [
        'Gestión de reglas contables, inventario, pedidos y permisos operativos.',
        'Orquestación de estados internos con consistencia transaccional.',
      ],
      en: [
        'Managing accounting rules, inventory, orders, and operational permissions.',
        'Orchestrating internal state transitions with transactional consistency.',
      ],
    },
    patterns: {
      es: 'Límites transaccionales explícitos, validación de estado previo y auditoría de cambios.',
      en: 'Explicit transaction boundaries, precondition checks, and change audit trails.',
    },
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: {
      es: 'Capa Comercial / E-Commerce',
      en: 'Commerce Layer / E-Commerce',
    },
    stack: 'Backend APIs + Vue / React',
    responsibilities: {
      es: [
        'Sincronización de catálogo, disponibilidad y flujos de compra.',
        'Integración con pasarelas externas y confirmación asíncrona de eventos.',
      ],
      en: [
        'Catalog synchronization, stock availability, and checkout flows.',
        'Integration with external gateways and asynchronous event confirmation.',
      ],
    },
    patterns: {
      es: 'Desacoplamiento por eventos/webhooks y manejo seguro de timeouts o reintentos.',
      en: 'Event/webhook decoupling and resilient handling of timeouts and retries.',
    },
  },
  {
    id: 'invoicing',
    icon: FileText,
    title: {
      es: 'Facturación Electrónica',
      en: 'Electronic Invoicing',
    },
    stack: 'REST Integrations + Queues',
    responsibilities: {
      es: [
        'Generación, validación y transmisión de comprobantes electrónicos.',
        'Trazabilidad de respuestas fiscales, rechazos y estados de contingencia.',
      ],
      en: [
        'Generation, validation, and transmission of electronic fiscal documents.',
        'Traceability of tax authority responses, rejections, and fallback states.',
      ],
    },
    patterns: {
      es: 'Claves de idempotencia, registro detallado de payloads y colas de reintento controlado.',
      en: 'Idempotency keys, structured payload logging, and controlled retry queues.',
    },
  },
  {
    id: 'database',
    icon: Database,
    title: {
      es: 'Capa de Datos Relacional',
      en: 'Relational Data Layer',
    },
    stack: 'PostgreSQL / MySQL',
    responsibilities: {
      es: [
        'Persistencia relacional con integridad referencial en tablas de alto volumen.',
        'Optimización de consultas críticas, índices y reportes operativos.',
      ],
      en: [
        'Relational persistence enforcing referential integrity across high-volume tables.',
        'Optimization of critical queries, indexes, and operational reporting.',
      ],
    },
    patterns: {
      es: 'Análisis de planes de ejecución (EXPLAIN), índices compuestos y consultas parametrizadas.',
      en: 'Execution plan analysis (EXPLAIN), composite indexing, and parameterized queries.',
    },
  },
];

interface EnterpriseArchitectureDiagramProps {
  locale: Locale;
}

export function EnterpriseArchitectureDiagram({ locale }: EnterpriseArchitectureDiagramProps) {
  const t = useTranslations('diagrams.enterprise');
  const [selectedId, setSelectedId] = useState<string>(NODES[0]?.id ?? 'erp');

  const selected = NODES.find((node) => node.id === selectedId) ?? NODES[0];

  return (
    <div className="rounded-xl border border-border-subtle bg-bg-elevated p-5 sm:p-6">
      <div className="border-b border-border-subtle pb-4">
        <h3 className="text-base font-semibold text-text-primary">{t('title')}</h3>
        <p className="mt-1 text-xs leading-relaxed text-text-muted sm:text-sm">{t('subtitle')}</p>
      </div>

      <div
        className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        role="group"
        aria-label={t('selectNode')}
      >
        {NODES.map((node) => {
          const Icon = node.icon;
          const isSelected = node.id === selectedId;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedId(node.id)}
              aria-pressed={isSelected}
              className={cn(
                'flex flex-col items-start rounded-lg border p-3.5 text-left transition-colors',
                isSelected
                  ? 'border-accent-primary bg-accent-subtle'
                  : 'border-border-subtle bg-bg-muted/60 hover:border-border-strong'
              )}
            >
              <Icon className="h-4 w-4 text-accent-primary" aria-hidden="true" />
              <span className="mt-2.5 text-xs font-semibold text-text-primary">
                {node.title[locale]}
              </span>
              <span className="mt-1 font-mono text-[11px] text-text-muted">{node.stack}</span>
            </button>
          );
        })}
      </div>

      {selected ? (
        <div className="mt-4 grid gap-4 rounded-lg border border-border-subtle bg-bg-muted/50 p-4 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs font-semibold text-text-primary">
              {t('responsibilitiesLabel')}
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-text-secondary">
              {selected.responsibilities[locale].map((item) => (
                <li key={item} className="leading-relaxed">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs font-semibold text-text-primary">
              {t('patternsLabel')}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {selected.patterns[locale]}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

