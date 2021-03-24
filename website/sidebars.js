module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Introduction',
      items: ['getting-started'],
    },
    {
      type: 'category',
      label: 'API',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'General',
          items: ['api/StoryProvider', 'api/withStory', 'api/useStory'],
        },
        {
          type: 'doc',
          id: 'api/getClient',
        },
        {
          type: 'category',
          label: 'Images',
          items: ['api/Image', 'api/getImageProps'],
        },
        {
          type: 'category',
          label: 'Utilities',
          items: ['api/getPlainText', 'api/getExcerpt'],
        },
        {
          type: 'category',
          label: 'Next.js Specific',
          items: ['api/getStaticPropsWithSdk', 'api/nextPreviewHandlers'],
        },
      ],
    },
  ],
};
