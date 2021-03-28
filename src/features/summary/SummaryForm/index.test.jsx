import {
    render,
    screen,
    waitForElementToBeRemoved
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SummaryForm from './index';

let checkbox;
let button;

beforeEach(() => {
    render(<SummaryForm />);
    checkbox = screen.getByRole('checkbox');
    button = screen.getByRole('button');
});

test('checkbox is unchecked and button is disabled on page landing', () => {
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
});

test('button becomes enabled when checkbox is first clicked and disabled when is clicked again', () => {
    expect(button).toBeDisabled();

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();

    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
});

test('popover responds to hover', async () => {
    // popover starts out hiden
    const noPopover = screen.queryByText(
        /no ice cream will actually be delivered/i
    );
    expect(noPopover).not.toBeInTheDocument();

    // popover appears upon mouseover of checkbox label
    const terms = screen.getByTestId('terms');
    userEvent.hover(terms);
    const popover = screen.getByText(
        /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // terms popover dissapears when we mouse out
    userEvent.unhover(terms);
    // use waitForElementToBeRemoved to fix act warning which is called already under the hood
    // the disapearence of our popover was happening async and the test was running before
    // it the async operation had finished
    await waitForElementToBeRemoved(() =>
        screen.queryByText(/no ice cream will actually be delivered/i)
    );
});
