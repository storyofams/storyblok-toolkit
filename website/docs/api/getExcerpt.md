---
id: getExcerpt
title: getExcerpt
sidebar_label: getExcerpt
hide_title: true
---

# `getExcerpt`

A utility function that converts Storyblok Richtext to plain text, cut off after a specified amount of characters.

## Parameters

`getExcerpt` accepts a richtext object and a configuration object parameter, with the following options:

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

interface GetExcerptOptions extends GetPlainTextOptions {
  /**
   * After how many characters the text should be cut off.
   *
   * @default 320
   */
  maxLength?: number;
}

const getExcerpt = (
  richtext: Richtext,
  options?: GetExcerptOptions,
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

const excerpt = getExcerpt(richtext, { maxLength: 50 });

// console.log(excerpt);
// Lorem ipsum dolor sit amet, consectetur adipiscing…
```
