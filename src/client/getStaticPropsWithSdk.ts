import type { ParsedUrlQuery } from 'querystring';
import { GraphQLClient } from 'graphql-request';
import type { GetStaticPropsResult, GetStaticPropsContext } from 'next';

import { getClient, ClientOptions } from './getClient';

type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;
type GetSdk<T> = (client: GraphQLClient, withWrapper?: SdkFunctionWrapper) => T;

type GetStaticPropsWithSdk<
  R,
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = (
  context: GetStaticPropsContext<Q> & { sdk: R },
) => Promise<GetStaticPropsResult<P>>;

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
