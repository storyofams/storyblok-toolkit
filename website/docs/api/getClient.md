---
id: getClient
title: getClient
sidebar_label: GraphQL Client
hide_title: true
---

# `getClient`

A function that properly configures a `graphql-request` client to interact with the  [Storyblok GraphQL API](https://www.storyblok.com/docs/graphql-api).

This function expects the dependencies `graphql-request` and `graphql` to be installed.

## Parameters

`getClient` accepts a configuration object parameter, with the following options:

```ts no-transpile
interface ClientOptions {
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

type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;
type GetSdk<T> = (client: GraphQLClient, withWrapper?: SdkFunctionWrapper) => T;

const getClient: (options: ClientOptions) => GraphQLClient
```

The Storyblok API `token` is required.

## Usage

### Basic example

```ts
import { gql } from 'graphql-request';

const client = getClient({
  token: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
});

const query = gql`
  {
    ArticleItem(id: "article/article-1") {
      content {
        title
        teaser_image {
          filename
        }
        intro
        _editable
      }
      uuid
    }
  }
`

const result = await client.request(query);
```

### Recommended: with GraphQL Code Generator

In combination with [GraphQL Code Generator](https://www.graphql-code-generator.com/) you can generate a fully typed GraphQL SDK.

The client returned by `getClient` can be wrapped in `getSdk`:

```ts
const sdk = getSdk(client);
```

For a full configuration, please see the [example](https://github.com/storyofams/storyblok-toolkit/edit/master/example). The relevant configuration files are `./.graphqlrc.yaml`, `./lib/graphqlClient.ts` and `./graphql`.

For more information on this configuration of GraphQL Code Generator and its options, [check out the docs](https://www.graphql-code-generator.com/docs/plugins/typescript-graphql-request).
