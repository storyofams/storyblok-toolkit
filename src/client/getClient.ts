import { GraphQLClient } from 'graphql-request';

export interface ClientOptions {
  /**
   * Which GraphQL endpoint to use (override default endpoint).
   *
   * @default 'https://gapi.storyblok.com/v1/api'
   **/
  endpoint?: string;
  /**
   * Custom fetch init parameters, `graphql-request` version.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters
   */
  additionalOptions?: ConstructorParameters<typeof GraphQLClient>[1];
  /** Storyblok API token (preview or publish) */
  token: string;
  /**
   * Which version of the story to load. Defaults to `'draft'` in development,
   * and `'published'` in production.
   *
   * @default `process.env.NODE_ENV === 'development' ? 'draft' : 'published'`
   */
  version?: 'draft' | 'published';
}

export const getClient = ({
  endpoint,
  additionalOptions,
  token: Token,
  version,
}: ClientOptions) =>
  new GraphQLClient(endpoint ?? 'https://gapi.storyblok.com/v1/api', {
    ...(additionalOptions || {}),
    headers: {
      Token,
      Version:
        version ||
        (process.env.NODE_ENV === 'development' ? 'draft' : 'published'),
      ...(additionalOptions?.headers || {}),
    },
  });
