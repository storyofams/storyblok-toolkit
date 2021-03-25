import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { getClient } from '..';

const token = '123';

const server = setupServer();

describe('[client] getClient', () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    jest.restoreAllMocks();
  });
  afterAll(() => server.close());

  it('should return a configured GraphQL request client', async () => {
    const client = getClient({ token });

    server.use(
      rest.post(`https://gapi.storyblok.com/v1/api`, async (req, res, ctx) => {
        expect(req.headers).toHaveProperty('map.token', token);
        expect(req.headers).toHaveProperty('map.version', 'published');

        return res(
          ctx.status(200),
          ctx.json({ data: { ArticleItem: { content: { title: 'Title' } } } }),
        );
      }),
    );

    await client.request('');
  });
});
