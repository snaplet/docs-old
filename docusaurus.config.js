const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Snaplet',
  tagline: 'Work with your database as easily as your code',
  url: 'https://snaplet.netlify.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'snaplet', // Usually your GitHub org/user name.
  projectName: 'snaplet', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Documentation',
      logo: {
        alt: 'Snaplet Logo',
        src: 'https://uploads-ssl.webflow.com/605b054afe05f848015d3a1a/605b0c673432779b9908e447_Snaplet%20logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/snaplet/docs',
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
              label: 'Docs',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/snaplet',
            },
            {
              label: 'Discord',
              href: 'https://discord.com/invite/aNSMaWtjKx',
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
              href: 'https://github.com/snaplet/snaplet',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Snaplet, Inc. All rights reserved.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/snaplet/docs',
          routeBasePath: '/'
        }
      },
    ],
  ],
};
