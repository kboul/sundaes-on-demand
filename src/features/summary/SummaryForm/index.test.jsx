import { fireEvent, render, screen } from '@testing-library/react';

import SummaryForm from './index';

test('checkbox is unchecked and button is disabled on page landing', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
});

test('button becomes enabled when checkbox is first clicked and disabled when is clicked again', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox');
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
});
