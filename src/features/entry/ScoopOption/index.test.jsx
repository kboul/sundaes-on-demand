import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ScoopOption from '.';
import { scoopAlertText } from './constants';

test('alert should be displayed when scoop has negative input', () => {
    render(
        <ScoopOption
            item={{ name: '', imagePath: '' }}
            updateItemCount={jest.fn()}
        />
    );

    const vanillaInput = screen.getByRole('spinbutton');
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '-1');

    expect(vanillaInput).toHaveClass('is-invalid');
    const alertMessage = screen.getByText(scoopAlertText);
    expect(alertMessage).toBeInTheDocument();

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(vanillaInput).not.toHaveClass('is-invalid');
    expect(alertMessage).not.toBeInTheDocument();
});
