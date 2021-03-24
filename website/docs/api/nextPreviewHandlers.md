---
id: nextPreviewHandlers
title: nextPreviewHandlers
sidebar_label: nextPreviewHandlers
hide_title: true
---

# `nextPreviewHandlers`

A function that provides API handlers to implement Next.js's preview mode.

## Parameters

`nextPreviewHandlers` accepts a configuration object parameter, with the following options:

```ts no-transpile
interface NextPreviewHandlersProps {
  /**
   * A secret token (random string of characters) to activate preview mode.
   */
  previewToken: string;
  /**
   * Storyblok API token with preview access (access to draft versions)
   */
  storyblokToken: string;
}

const nextPreviewHandlers: (options: NextPreviewHandlersProps) => (req: NextApiRequest, res: NextApiResponse) => Promise<void | NextApiResponse<any>>
```

## Usage

### Basic example

Create the file `./pages/api/preview/[[...slug]].ts` with the following contents:

```ts
import { nextPreviewHandlers } from '@storyofams/storyblok-toolkit';

export default nextPreviewHandlers({
  previewToken: process.env.PREVIEW_TOKEN,
  storyblokToken: process.env.STORYBLOK_PREVIEW_TOKEN,
});
```

To open preview mode of a story at `/article/article-1`, go to:
`/api/preview?token=YOUR_PREVIEW_TOKEN&slug=/article/article-1`

You can configure preview mode as a preview URL in Storyblok:
`YOUR_WEBSITE/api/preview?token=YOUR_PREVIEW_TOKEN&slug=/`

If you are using the preview handlers and are on a page configured with `withStory`, you will automatically be shown a small indicator to remind you that you are viewing the page in preview mode. It also allows you to exit preview mode. Alternatively you can go to `/api/preview/clear` to exit preview mode.

![Next.js Preview mode](/img/preview-mode.png)
