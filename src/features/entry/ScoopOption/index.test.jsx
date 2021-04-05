import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ScoopOption from '.';

test('alet should be displayed when scoop has negative input', () => {
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
    const alertMessage = screen.getByText('Please provide', { exact: false });
    expect(alertMessage).toBeInTheDocument();

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(vanillaInput).not.toHaveClass('is-invalid');
    expect(alertMessage).not.toBeInTheDocument();
});
