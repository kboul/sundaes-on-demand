import { rest } from 'msw';

import { render, screen } from '../../testUtils';

import OrderConfirm from '.';
import client from '../../api/client';
import { server } from '../../mocks/servers';
import { orderConfirmAlertMsg } from '../../components/constants';
import { newOrderBtnLabel } from './constants';

test('error response from submiting order', async () => {
    // ovewrite default msw response for options endpoint with error response
    server.resetHandlers(
        rest.post(`${client.defaults.baseURL}/order`, (req, res, ctx) => {
            return res(ctx.status(500));
        })
    );

    render(<OrderConfirm setOrderPhase={jest.fn()} />);

    const alertMsg = await screen.findByRole('alert');
    expect(alertMsg).toHaveTextContent(orderConfirmAlertMsg);

    const createNewOrderBtn = screen.queryByText(newOrderBtnLabel);
    expect(createNewOrderBtn).not.toBeInTheDocument();
});
