import { rest } from 'msw';

export const handlers = [
  rest.get('http://127.0.0.1:3000/stock', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(require('../__test__/__mocks__/stock.json')),
    );
  }),
]