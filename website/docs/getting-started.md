---
title: Getting Started
slug: /
---

## Purpose

The aim of this library is to make integrating Storyblok in a React frontend easy.

We provide wrappers to abstract away the setup process (implementing the Storyblok JS Bridge, making the app work with the Visual Editor). We also provide an easy way to configure a GraphQL client, an optimized image component and some utility functions.

## Installation

```bash npm2yarn
npm install @storyofams/storyblok-toolkit
```

## Features

The following API's are included:

- `withStory()` and `StoryProvider`: `withStory` wraps a component/page where a story is loaded, and makes sure to keep it in sync with the Visual Editor. `StoryProvider` is a global provider that provides the context to make `withStory` work.
- `useStory()`: alternative to `withStory`, gets the synced story.
- `getClient()`: properly configures a `graphql-request` client to interact with Storyblok's GraphQL API.
- `Image`: automatically optimized and responsive images using Storyblok's image service. With LQIP (Low-Quality Image Placeholders) support.
- `getImageProps()`: get optimized image sizes without using `Image`.
- `getExcerpt()`: get an excerpt text from a richtext field.
- `getPlainText()`: get plaintext from a richtext field.

Next.js specific:
- `getStaticPropsWithSdk()`: provides a properly configured `graphql-request` client, typed using `graphql-code-generator` to interact with Storyblok's GraphQL API, as a prop inside of `getStaticProps`.
- `nextPreviewHandlers()`: API handlers to implement Next.js's preview mode.


## Example

Please see [the example](https://github.com/storyofams/storyblok-toolkit/edit/master/example) to see how this library can be used.
