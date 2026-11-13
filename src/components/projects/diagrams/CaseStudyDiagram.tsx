import type { CaseStudyDiagramType, Locale } from '@/types/portfolio';
import { AiWorkflowSimulator } from './AiWorkflowSimulator';
import { EnterpriseArchitectureDiagram } from './EnterpriseArchitectureDiagram';
import { LegacyModernizationDiagram } from './LegacyModernizationDiagram';
import { SecurityHardeningDiagram } from './SecurityHardeningDiagram';

interface CaseStudyDiagramProps {
  type: CaseStudyDiagramType;
  locale: Locale;
}

export function CaseStudyDiagram({ type, locale }: CaseStudyDiagramProps) {
  switch (type) {
    case 'security-hardening':
      return <SecurityHardeningDiagram locale={locale} />;
    case 'legacy-modernization':
      return <LegacyModernizationDiagram locale={locale} />;
    case 'ai-workflow':
      return <AiWorkflowSimulator locale={locale} />;
    case 'enterprise-architecture':
      return <EnterpriseArchitectureDiagram locale={locale} />;
  }
}
