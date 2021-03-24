---
id: getPlainText
title: getPlainText
sidebar_label: getPlainText
hide_title: true
---

# `getPlainText`

A utility function that converts Storyblok Richtext to plain text.

## Parameters

`getPlainText` accepts a richtext object and a configuration object parameter, with the following options:

```ts no-transpile
interface GetPlainTextOptions {
  /**
   * Whether to add newlines (`\n\n`) after nodes and instead of hr's and
   * br's.
   *
   * @default true
   */
  addNewlines?: boolean;
}

const getPlainText = (
  richtext: Richtext,
  options?: GetPlainTextOptions,
) => string
```

## Usage

### Basic example

```ts
const richtext = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          type: 'text',
        },
      ],
    },
  ],
};

const text = getPlainText(richtext);

// console.log(text);
// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```
