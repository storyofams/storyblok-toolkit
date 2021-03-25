import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { createMocks } from 'node-mocks-http';

import { nextPreviewHandlers } from '../previewHandlers';

const EventEmitter = () => {};

EventEmitter.prototype.addListener = function () {};
EventEmitter.prototype.on = function () {};
EventEmitter.prototype.once = function () {};
EventEmitter.prototype.removeListener = function () {};
EventEmitter.prototype.removeAllListeners = function () {};
// EventEmitter.prototype.removeAllListeners = function([event])
EventEmitter.prototype.setMaxListeners = function () {};
EventEmitter.prototype.listeners = function () {};
EventEmitter.prototype.emit = function () {};
EventEmitter.prototype.prependListener = function () {};

const server = setupServer();

const previewToken = 'SECRET';
const storyblokToken = '1234';
const slug = 'article/article-1';

const handlers = nextPreviewHandlers({
  previewToken,
  storyblokToken,
});

describe('[next] nextPreviewHandlers', () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    jest.restoreAllMocks();
  });
  afterAll(() => server.close());

  it('should enable preview mode and redirect if story found', async () => {
    server.use(
      rest.get(
        `https://api.storyblok.com/v1/cdn/stories/${slug}`,
        async (_, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({ story: { uuid: '123', full_slug: slug } }),
          );
        },
      ),
    );

    const setPreviewDataMock = jest.fn();
    EventEmitter.prototype.setPreviewData = setPreviewDataMock;

    const { req, res } = createMocks(
      { method: 'GET', query: { slug, token: previewToken } },
      {
        eventEmitter: EventEmitter,
      },
    );

    await handlers(req as any, res as any);

    expect(res._getRedirectUrl()).toBe(`/${slug}`);
    expect(setPreviewDataMock).toBeCalledWith({});
  });

  it('reject on invalid token', async () => {
    const setPreviewDataMock = jest.fn();
    EventEmitter.prototype.setPreviewData = setPreviewDataMock;

    const { req, res } = createMocks(
      { method: 'GET', query: { slug, token: 'invalid' } },
      {
        eventEmitter: EventEmitter,
      },
    );

    await handlers(req as any, res as any);

    expect(res._getStatusCode()).toBe(401);
    expect(setPreviewDataMock).not.toBeCalled();
  });

  it('reject if story does not exist', async () => {
    server.use(
      rest.get(
        `https://api.storyblok.com/v1/cdn/stories/${slug}`,
        async (_, res, ctx) => {
          return res(ctx.status(404), ctx.json({}));
        },
      ),
    );

    const setPreviewDataMock = jest.fn();
    EventEmitter.prototype.setPreviewData = setPreviewDataMock;

    const { req, res } = createMocks(
      { method: 'GET', query: { slug, token: previewToken } },
      {
        eventEmitter: EventEmitter,
      },
    );

    await handlers(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(setPreviewDataMock).not.toBeCalled();
  });

  it('should exit preview mode on clear route', async () => {
    const clearPreviewData = jest.fn();
    EventEmitter.prototype.clearPreviewData = clearPreviewData;

    const { req, res } = createMocks(
      { method: 'GET', query: { slug: ['clear'] } },
      {
        eventEmitter: EventEmitter,
      },
    );

    await handlers(req as any, res as any);

    expect(res._getRedirectUrl()).toBe(`/`);
    expect(clearPreviewData).toBeCalled();
  });
});
