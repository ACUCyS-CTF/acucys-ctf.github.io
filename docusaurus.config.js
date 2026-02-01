// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  // TODO: Update the base config
  title: 'ACUCyS',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/ACUCyS_Logo.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://acucys-ctf.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ACUCyS-CTF', // Usually your GitHub org/user name.
  projectName: 'acucys-ctf.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        // ----------
        // BLOG: Uncomment to enable blogs to navbar.
        // -----
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ['rss', 'atom'],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: 'warn',
        //   onInlineAuthors: 'warn',
        //   onUntruncatedBlogPosts: 'warn',
        // },
        // ----------
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/ACUCyS_Logo.png',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'ACUCyS',
        logo: {
          alt: 'ACUCyS Logo',
          src: 'img/ACUCyS_Logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'ctfSidebar',
            position: 'left',
            label: 'Capture The Flag',
          },
          {
            type: 'docSidebar',
            sidebarId: 'hackathonSidebar',
            position: 'left',
            label: 'Hackathon',
          },
          {
            type: 'docSidebar',
            sidebarId: 'conferenceSidebar',
            position: 'left',
            label: 'Conference',
          },
          // ----------
          // BLOG: Uncomment to add blogs to navbar.
          // -----
          // { to: '/blog', label: 'Blog', position: 'left' },
          // ----------
        ],
      },

      footer: {
        style: 'dark',
        links: [
          {
            title: 'Site',
            items: [
              {
                label: 'ACUCyS homepage',
                href: 'https://www.acucys.org/',
              },
              {
                label: 'About ACUCyS',
                href: 'https://www.acucys.org/about-acucys',
              },
            ],
          },
          {
            title: 'Write-ups',
            items: [
              {
                label: 'CTF',
                to: '/docs/ctf/intro',
              },
              {
                label: 'Hackathon',
                to: '/docs/hackathon/intro',
              },
            ],
          },
          {
            title: 'Connect',
            items: [
              {
                label: 'Cyber Security Education Australia (CySEA)',
                href: 'https://www.cysea.org.au/',
              },
              {
                label: 'Contact ACUCyS',
                href: 'https://www.acucys.org/contact',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Australian Council of University Cyber Societies (ACUCyS).`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
