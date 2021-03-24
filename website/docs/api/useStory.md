---
id: useStory
title: useStory
sidebar_label: useStory
hide_title: true
---

# `useStory`

A hook that wraps a `story`, and returns a version of that story that is in sync with the Visual Editor.

## Parameters

`useStory` expects a `story` as argument:

```ts no-transpile
const useStory: (story: Story) => Story<StoryblokComponent<string> & {
    [index: string]: any;
}>
```

## Usage

### Basic example

Wrap the `story` that you want to keep in sync:

```ts
const Article = ({ providedStory }) => {
  const story = useStory(providedStory);

  // You can use the story like normal:
  return (
    <SbEditable content={story?.content}>
      <div>
        <h1>
          {story?.content?.title}
        </h1>
      </div>
    </SbEditable>
  );
};
```
