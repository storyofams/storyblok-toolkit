<p align="center">
  <a href="https://storyofams.com/" target="_blank" align="center">
    <img src="https://storyofams.com/public/story-of-ams-logo-small@3x.png" alt="Story of AMS" width="120">
  </a>
  <h1 align="center">@storyofams/storyblok-toolkit</h1>
  <p align="center">
    <a aria-label="releases" href="https://github.com/storyofams/storyblok-toolkit/releases/" target="_blank">
      <img src="https://github.com/storyofams/storyblok-toolkit/workflows/Release/badge.svg">
    </a>
    <a aria-label="npm" href="https://www.npmjs.com/package/@storyofams/storyblok-toolkit" target="_blank">
      <img src="https://img.shields.io/npm/v/@storyofams/storyblok-toolkit">
    </a>
    <a aria-label="codecov" href="https://codecov.io/gh/storyofams/storyblok-toolkit" target="_blank">
      <img src="https://codecov.io/gh/storyofams/storyblok-toolkit/branch/master/graph/badge.svg?token=ZV0YT4HU5H">
    </a>
    <a aria-label="stars" href="https://github.com/storyofams/storyblok-toolkit/stargazers/" target="_blank">
      <img src="https://img.shields.io/github/stars/storyofams/storyblok-toolkit.svg?style=social&label=Star&maxAge=86400" />
    </a>
  </p>
  <p align="center">Batteries-included toolset for efficient development of React frontends with Storyblok as a headless CMS.</p>
</p>

---

## Purpose

The aim of this library is to make integrating Storyblok in a React frontend easy.

We provide wrappers to abstract away the setup process (implementing the Storyblok JS Bridge, making the app work with the Visual Editor). We also provide an easy way to configure a GraphQL client, an optimized image component and some utility functions.

## Installation

```sh
yarn add @storyofams/storyblok-toolkit
# or
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
