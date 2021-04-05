import { rest } from 'msw';

import client from '../api/client';

export const handlers = [
    rest.get(`${client.defaults.baseURL}/scoops`, (req, res, ctx) => {
        return res(
            ctx.json([
                { name: 'Chocolate', imagePath: '/images/chocolate.png' },
                { name: 'Vanilla', imagePath: '/images/vanilla.png' }
            ])
        );
    }),
    rest.get(`${client.defaults.baseURL}/toppings`, (req, res, ctx) => {
        return res(
            ctx.json([
                { name: 'Cherries', imagePath: '/images/cherries.png' },
                { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
                { name: 'Hot fudge', imagePath: '/images/hot-fudge' }
            ])
        );
    }),
    rest.post(`${client.defaults.baseURL}/order`, (req, res, ctx) => {
        return res(ctx.json({ orderNumber: 1233332536 }));
    })
];
