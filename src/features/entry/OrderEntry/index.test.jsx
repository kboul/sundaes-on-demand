import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from '../../../testUtils';
import OrderEntry from '.';
import { server } from '../../../mocks/servers';
import client from '../../../api/client';
import { grandTotalText, orderBtnLabel } from './constants';

test('handles error for scoops and toppings routes', async () => {
    // ovewrite existing handlers
    server.resetHandlers(
        rest.get(`${client.defaults.baseURL}/scoops`, (req, res, ctx) => {
            return res(ctx.status(500));
        }),
        rest.get(`${client.defaults.baseURL}/toppings`, (req, res, ctx) => {
            return res(ctx.status(500));
        })
    );

    render(<OrderEntry />);

    await waitFor(async () => {
        const alerts = await screen.findAllByRole('alert');
        expect(alerts).toHaveLength(2);
    });
});

describe('Grand total', () => {
    let grandTotal;
    let vanillaInput;
    let cherriesInput;

    beforeEach(async () => {
        render(<OrderEntry />);

        grandTotal = screen.getByText(grandTotalText, { exact: false });

        vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla'
        });

        cherriesInput = await screen.findByRole('checkbox', {
            name: 'Cherries'
        });
    });

    test('updates properly if scoop is added first', async () => {
        expect(grandTotal).toHaveTextContent('0.00');

        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2');

        expect(grandTotal).toHaveTextContent('4.00');
    });

    test('updates properly if topping is added first', async () => {
        userEvent.click(cherriesInput);

        expect(grandTotal).toHaveTextContent('1.50');
    });

    test('updates properly if item is removed', async () => {
        // add cherry ( + 1.50)
        userEvent.click(cherriesInput);

        userEvent.clear(vanillaInput);
        // add 3 vanillas (+6)
        userEvent.type(vanillaInput, '3');

        // remove cherry (-1.50)
        userEvent.click(cherriesInput);

        // expect to have total 6
        expect(grandTotal).toHaveTextContent('6.00');

        userEvent.clear(vanillaInput);
        // remove 1 vanilla
        userEvent.type(vanillaInput, '2');
        // expect to have total 4
        expect(grandTotal).toHaveTextContent('4.00');
    });
});

test('enable order button if scoops or toppings have been selected', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);

    const orderButton = await screen.findByRole('button', {
        name: orderBtnLabel
    });
    expect(orderButton).toBeDisabled();

    const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla'
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(orderButton).toBeEnabled();

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '0');
    expect(orderButton).toBeDisabled();
});
