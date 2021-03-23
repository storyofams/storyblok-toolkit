import type { ParsedUrlQuery } from 'querystring';
import { GraphQLClient } from 'graphql-request';
import type { GetStaticPropsResult, GetStaticPropsContext } from 'next';

interface ClientOptions {
  additionalOptions?: ConstructorParameters<typeof GraphQLClient>[1];
  token: string;
  version?: 'draft' | 'published';
}

type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;
type GetSdk<T> = (client: GraphQLClient, withWrapper?: SdkFunctionWrapper) => T;

type GetStaticPropsWithSdk<
  R,
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = (
  context: GetStaticPropsContext<Q> & { sdk: R },
) => Promise<GetStaticPropsResult<P>>;

export const getClient = ({
  additionalOptions,
  token: Token,
  version,
}: ClientOptions) =>
  new GraphQLClient('https://gapi.storyblok.com/v1/api', {
    ...(additionalOptions || {}),
    headers: {
      Token,
      Version:
        version || process.env.NODE_ENV === 'development'
          ? 'draft'
          : 'published',
      ...(additionalOptions?.headers || {}),
    },
  });

export const getStaticPropsWithSdk = <T>(
  getSdk: GetSdk<T>,
  client: GraphQLClient,
  storyblokToken?: string,
  additionalClientOptions?: ClientOptions['additionalOptions'],
) => (getStaticProps: GetStaticPropsWithSdk<T>) => async (
  context: GetStaticPropsContext,
) => {
  const sdk = getSdk(
    storyblokToken && context?.preview
      ? getClient({
          additionalOptions: additionalClientOptions,
          token: storyblokToken,
          version: 'draft',
        })
      : client,
  );

  const res = await getStaticProps({ ...context, sdk });

  return {
    ...res,
    props: {
      ...((res as any)?.props || {}),
      __storyblok_toolkit_preview: !!context?.preview,
    },
  };
};
