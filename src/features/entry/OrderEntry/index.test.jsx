import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from '../../../testUtils';
import OrderEntry from '.';
import { server } from '../../../mocks/servers';
import client from '../../../api/client';

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

describe('grand total', () => {
    test('updates properly if scoop is added first', async () => {
        render(<OrderEntry />);
        const grandTotal = screen.getByText('Grand total', { exact: false });
        expect(grandTotal).toHaveTextContent('0.00');

        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla'
        });
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2');

        expect(grandTotal).toHaveTextContent('4.00');
    });

    test('updates properly if topping is added first', async () => {
        render(<OrderEntry />);

        const cherriesInput = await screen.findByRole('checkbox', {
            name: 'Cherries'
        });
        userEvent.click(cherriesInput);

        const grandTotal = screen.getByText('Grand total', { exact: false });
        expect(grandTotal).toHaveTextContent('1.50');
    });

    test('updates properly if item is removed', async () => {
        render(<OrderEntry />);

        const cherriesInput = await screen.findByRole('checkbox', {
            name: 'Cherries'
        });
        // add cherry ( + 1.50)
        userEvent.click(cherriesInput);

        const vanillaInput = await screen.findByRole('spinbutton', {
            name: 'Vanilla'
        });
        userEvent.clear(vanillaInput);
        // add 3 vanillas (+6)
        userEvent.type(vanillaInput, '3');

        // remove cherry (-1.50)
        userEvent.click(cherriesInput);

        const grandTotal = screen.getByText('Grand total', { exact: false });
        // expect to have total 6
        expect(grandTotal).toHaveTextContent('6.00');

        userEvent.clear(vanillaInput);
        // remove 1 vanilla
        userEvent.type(vanillaInput, '2');
        // expect to have total 4
        expect(grandTotal).toHaveTextContent('4.00');
    });
});
