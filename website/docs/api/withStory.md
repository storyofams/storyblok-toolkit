---
id: withStory
title: withStory
sidebar_label: withStory
hide_title: true
---

# `withStory`

HOC ([Higher-Order Component](https://reactjs.org/docs/higher-order-components.html)) that wraps a component/page where a story is loaded, and makes sure to that keep that story in sync with the Visual Editor.

## Parameters

`withStory` accepts a component with the `story` in its props:

```ts no-transpile
const withStory: <T extends WithStoryProps = WithStoryProps>(WrappedComponent: React.ComponentType<T>) => {
    ({ story: providedStory, ...props }: T): JSX.Element;
    displayName: string;
}
```

## Usage

### Basic example

Wrap the component where you want to keep the `story` in sync in `withStory`:

```ts
const Article = ({ story }: WithStoryProps) => (
  <SbEditable content={story?.content}>
    <div>
      <h1>
        {story?.content?.title}
      </h1>
      // The rest of the components
    </div>
  </SbEditable>
);

export default withStory(Article);
```
