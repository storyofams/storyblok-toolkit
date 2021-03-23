import { nextPreviewHandlers } from '@storyofams/storyblok-toolkit';

export default nextPreviewHandlers({
  previewToken: process.env.PREVIEW_TOKEN,
  storyblokToken: process.env.STORYBLOK_PREVIEW_TOKEN,
});
