---
id: getStaticPropsWithSdk
title: getStaticPropsWithSdk
sidebar_label: getStaticPropsWithSdk
hide_title: true
---

# `getStaticPropsWithSdk`

A wrapper function that injects a client from `getClient`, typed by codegen, into Next.js `getStaticProps`.

It supports Next.js's Preview mode, by making sure to query the correct version (draft or published) of the content.

This function requires that GraphQL Code Generator is already set up, refer to [`getClients` example](/docs/api/getClient#recommended-with-graphql-code-generator) for more information.

## Parameters

`getStaticPropsWithSdk` expects a client from `getClient`, `getSdk` from `graphql-codegen`, and a Storyblok preview API token to be provided. It returns a function that can be wrapper around `getStaticProps`.

```ts no-transpile
type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;
type GetSdk<T> = (client: GraphQLClient, withWrapper?: SdkFunctionWrapper) => T;

type GetStaticPropsWithSdk<
  R,
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = (
  context: GetStaticPropsContext<Q> & { sdk: R },
) => Promise<GetStaticPropsResult<P>>;

const getStaticPropsWithSdk: <T>(getSdk: GetSdk<T>, client: GraphQLClient, storyblokToken?: string, additionalClientOptions?: ConstructorParameters<typeof GraphQLClient>[1]) => (getStaticProps: GetStaticPropsWithSdk<T, {
    [key: string]: any;
}, ParsedUrlQuery>) => (context: GetStaticPropsContext) => Promise<...>
```

## Usage

### Basic example

```ts
import { gql } from 'graphql-request';

const client = getClient({
  token: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
});

const staticPropsWithSdk = getStaticPropsWithSdk(
  getSdk,
  client,
  process.env.STORYBLOK_PREVIEW_TOKEN,
);

export const getStaticProps: GetStaticProps = staticPropsWithSdk(
  async ({ params: { slug }, sdk }) => {
    // Example usage to request a story
    let story;
    let notFound = false;

    try {
      story = (await sdk.articleItem({ slug: `article/${slug}` })).ArticleItem;
    } catch (e) {
      notFound = true;
    }

    return {
      props: {
        story,
      },
      notFound: notFound || !story,
      revalidate: 60,
    };
  },
);
```

For a full configuration, please see the [example](https://github.com/storyofams/storyblok-toolkit/edit/master/example).

For more information on this configuration of GraphQL Code Generator and its options, [check out the docs](https://www.graphql-code-generator.com/docs/plugins/typescript-graphql-request).
