import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { getClient, getStaticPropsWithSdk } from '..';

const token = '123';
const previewToken = '456';

const server = setupServer();

describe('[client] getStaticPropsWithSdk', () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    jest.restoreAllMocks();
  });
  afterAll(() => server.close());

  it('should inject a configured GraphQL request client', async () => {
    const getSdkMock = jest.fn((v) => v);

    const client = getClient({ token });
    const staticPropsWithSdk = getStaticPropsWithSdk(
      getSdkMock,
      client,
      previewToken,
    );

    server.use(
      rest.post(`https://gapi.storyblok.com/v1/api`, async (req, res, ctx) => {
        expect(req.headers).toHaveProperty('map.token', token);
        expect(req.headers).toHaveProperty('map.version', 'published');

        return res(ctx.status(200), ctx.json({ data: {} }));
      }),
    );

    const res = await staticPropsWithSdk(async ({ sdk }) => {
      expect(sdk).toBeDefined();

      await sdk.request('');

      return { props: { test: true } };
    })({});

    expect(res.props?.__storyblok_toolkit_preview).not.toBeTruthy();
    expect(res.props?.test).toBeTruthy();
  });

  it('should configure for draft in preview mode', async () => {
    const getSdkMock = jest.fn((v) => v);

    const client = getClient({ token });
    const staticPropsWithSdk = getStaticPropsWithSdk(
      getSdkMock,
      client,
      previewToken,
    );

    server.use(
      rest.post(`https://gapi.storyblok.com/v1/api`, async (req, res, ctx) => {
        expect(req.headers).toHaveProperty('map.token', previewToken);
        expect(req.headers).toHaveProperty('map.version', 'draft');

        return res(ctx.status(200), ctx.json({ data: {} }));
      }),
    );

    const res = await staticPropsWithSdk(async ({ sdk }) => {
      expect(sdk).toBeDefined();

      await sdk.request('');

      return {} as any;
    })({ preview: true });

    expect(res.props?.__storyblok_toolkit_preview).toBeTruthy();
    expect(Object.keys(res.props).length).toBe(1);
  });
});
