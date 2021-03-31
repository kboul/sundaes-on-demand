import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

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
