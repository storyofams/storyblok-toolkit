/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Storyblok Toolkit',
  tagline:
    'Batteries-included toolset for efficient development of React frontends with Storyblok as a headless CMS.',
  url: 'https://storyblok-toolkit.vercel.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'storyofams',
  projectName: 'storyblok-toolkit',
  themeConfig: {
    navbar: {
      title: 'Storyblok Toolkit',
      logo: {
        alt: 'Story of AMS Logo',
        src: 'img/logo.png',
        srcDark: 'img/logo-dark.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: '/docs',
          label: 'Getting Started',
          position: 'right',
        },
        {
          href: '/docs/api/StoryProvider',
          label: 'API',
          position: 'right',
        },
        {
          href: 'https://github.com/storyofams/storyblok-toolkit',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/storyofams/storyblok-toolkit',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://storyofams.com" target="_blank" rel="noopener">Story of AMS<a/>.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/storyofams/storyblok-toolkit/edit/master/website/',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
