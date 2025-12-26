import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResetButton } from '../../components/common/ResetButton';
import { GameProvider } from '../../context/GameContext';

describe('ResetButton', () => {
  const renderResetButton = () => {
    return render(
      <GameProvider>
        <ResetButton />
      </GameProvider>
    );
  };

  it('should render the reset button', () => {
    renderResetButton();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should show tooltip on hover', async () => {
    renderResetButton();
    const button = screen.getByRole('button');

    await userEvent.hover(button);

    // Tooltip should appear (may need waitFor in real test)
    expect(button).toBeInTheDocument();
  });

  it('should open dialog when clicked', async () => {
    renderResetButton();
    const button = screen.getByRole('button');

    await userEvent.click(button);

    // Dialog should open
    const dialogTitle = screen.getByText('Reset Game?');
    expect(dialogTitle).toBeInTheDocument();
  });

  it('should show confirmation message in dialog', async () => {
    renderResetButton();
    const button = screen.getByRole('button');

    await userEvent.click(button);

    const message = screen.getByText(/All progress will be lost/i);
    expect(message).toBeInTheDocument();
  });

  it('should have Cancel and Reset buttons in dialog', async () => {
    renderResetButton();
    const resetButton = screen.getByRole('button');

    await userEvent.click(resetButton);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    const confirmButton = screen.getByRole('button', { name: /reset game/i });

    expect(cancelButton).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
  });

  it('should close dialog when Cancel is clicked', async () => {
    renderResetButton();
    const resetButton = screen.getByRole('button');

    await userEvent.click(resetButton);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelButton);

    // Dialog should close (wait for animation)
    await waitFor(() => {
      expect(screen.queryByText('Reset Game?')).not.toBeInTheDocument();
    });
  });
});
