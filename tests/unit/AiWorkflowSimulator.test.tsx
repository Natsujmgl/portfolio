import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import { AiWorkflowSimulator } from '@/components/projects/diagrams/AiWorkflowSimulator';
import esMessages from '../../messages/es.json';

describe('AiWorkflowSimulator', () => {
  it('steps through all 7 stages and surfaces human approval gate at Pull Request', async () => {
    const user = userEvent.setup();

    render(
      <NextIntlClientProvider locale="es" messages={esMessages}>
        <AiWorkflowSimulator locale="es" />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Jira Ticket (1/7)')).toBeInTheDocument();

    const nextButton = screen.getByRole('button', {
      name: esMessages.diagrams.aiWorkflow.nextStage,
    });
    for (let i = 0; i < 6; i += 1) {
      await user.click(nextButton);
    }

    expect(screen.getByText('Pull Request (7/7)')).toBeInTheDocument();
    expect(screen.getByText(esMessages.diagrams.aiWorkflow.humanGate)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /DEMO-218/i }));
    expect(screen.getByText('Jira Ticket (1/7)')).toBeInTheDocument();
  });
});
