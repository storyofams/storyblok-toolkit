---
id: StoryProvider
title: StoryProvider
sidebar_label: StoryProvider
hide_title: true
---

# `StoryProvider`

A global provider that provides the context to make `withStory` work, holding the current story. Also makes sure the Storyblok JS Bridge gets loaded when needed.

## Parameters

`StoryProvider` accepts the following properties:

```ts no-transpile
interface ProviderProps {
  children: ReactNode;
  /**
   * Relations that need to be resolved in preview mode, for example:
   * `['Post.author']`
   */
  resolveRelations?: string[];
}

const StoryProvider: (props: ProviderProps) => JSX.Element
```

## Usage

### Basic example

Wrap your entire app in the provider. For example in Next.js, in the render function of `_app`:

```ts
// Other providers
<StoryProvider>
  // The rest of your app
  <Component {...pageProps} />
</StoryProvider>
```
