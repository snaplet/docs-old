const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Snaplet',
  tagline: 'Work with your database as easily as your code',
  url: 'https://docs.snaplet.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'snaplet', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  plugins: ['docusaurus-plugin-segment'],
  themeConfig: {
    algolia: {
      appId: 'PPVJZD9QQI',
      apiKey: '221836c058f50b764becd187638295b2',
      indexName: 'snaplet-docs',
    },
    segment: {
      apiKey: 'VY4RrFl2Qu7bCRmxzQ7IIj9dK7MFMzrH',
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      logo: {
        alt: 'Snaplet',
        src: 'img/logo.svg',
      },
      items: [
        {
          label: 'Discord',
          href: 'https://app.snaplet.dev/chat',
          position: 'right',
        },
        {
          label: 'GitHub',
          href: 'https://github.com/snaplet/docs',
          position: 'right',
        },
        {
          href: 'https://app.snaplet.dev',
          label: 'Login',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://app.snaplet.dev/chat',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/_snaplet',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'https://www.snaplet.dev/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/snaplet',
            },
            {
              label: 'Security',
              href: '/security',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Snaplet, Inc. All rights reserved.`,
    },
    prism: {
      theme: darkCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['bash'],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/snaplet/docs/tree/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  scripts: [{ src: 'https://plausible.io/js/script.js', defer: true, 'data-domain': 'snaplet.dev' }],
};
