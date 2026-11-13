import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';
import { CopyEmailButton } from '@/components/sections/CopyEmailButton';
import enMessages from '../../messages/en.json';

describe('CopyEmailButton', () => {
  it('copies email to clipboard and displays accessible confirmation', async () => {
    const user = userEvent.setup();
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: writeTextMock },
    });

    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <CopyEmailButton email="julio.example@domain.test" />
      </NextIntlClientProvider>
    );

    await user.click(screen.getByRole('button', { name: enMessages.common.copyEmail }));

    expect(writeTextMock).toHaveBeenCalledWith('julio.example@domain.test');
    expect(screen.getByRole('status')).toHaveTextContent(enMessages.common.emailCopied);
  });
});
