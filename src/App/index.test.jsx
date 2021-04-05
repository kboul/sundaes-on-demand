import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '.';

let orderButton;
let vanillaInput;

beforeEach(async () => {
    render(<App />);

    orderButton = await screen.findByRole('button', {
        name: 'Order sundae!'
    });

    vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla'
    });
});

test('Order phases', async () => {
    // add ice cream scoops and toppings
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    const chocolateInput = screen.getByRole('spinbutton', {
        name: 'Chocolate'
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
        name: 'Cherries'
    });
    userEvent.click(cherriesCheckbox);

    // order
    userEvent.click(orderButton);

    const scoopsHeading = screen.getByRole('heading', {
        name: 'Scoops: $6.00'
    });
    expect(scoopsHeading).toBeInTheDocument();
    const toppingsHeading = screen.getByRole('heading', {
        name: 'Toppings: $1.50'
    });
    expect(toppingsHeading).toBeInTheDocument();

    // confirm
    const agreeCheckbox = screen.getByTestId('terms');
    userEvent.click(agreeCheckbox);

    const confirmButton = screen.getByRole('button', {
        name: 'Confirm Order'
    });
    userEvent.click(confirmButton);

    // display loading
    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();

    // display thank you
    const thankYouHeading = await screen.findByRole('heading', {
        name: 'Thank you!'
    });
    expect(thankYouHeading).toBeInTheDocument();

    const notLoading = screen.queryByText('Loading...');
    expect(notLoading).not.toBeInTheDocument();

    const createNewOrderButton = await screen.findByRole('button', {
        name: 'Create new order'
    });
    userEvent.click(createNewOrderButton);

    // initial screen
    const scoopsTotal = screen.getByText('Scoops total: $0.00');
    expect(scoopsTotal).toBeInTheDocument();
    const toppingsTotal = screen.getByText('Scoops total: $0.00');
    expect(toppingsTotal).toBeInTheDocument();

    // wait for items to appear so that Testing Library doesn't get angry about stuff
    // happening after test is over
    await screen.findByRole('spinbutton', { name: 'Vanilla' });
    await screen.findByRole('checkbox', { name: 'Cherries' });
});

test('toppings section not displayed  if no toppings have been selected', async () => {
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    userEvent.click(orderButton);

    const toppingsHeader = screen.queryByText('Toppings:', { exact: false });
    expect(toppingsHeader).not.toBeInTheDocument();
});
