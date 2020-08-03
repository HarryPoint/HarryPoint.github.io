const repo = "https://github.com/HarryPoint/HarryPoint.github.io";
module.exports = {
  title: "notes",
  tagline: "my notes",
  url: "https://harrypoint.github.io",
  baseUrl: "/",
  favicon: "img/avatar.jpg",
  organizationName: "HarryPoint", // Usually your GitHub org/user name.
  projectName: "HarryPoint.github.io", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "My Site",
      logo: {
        alt: "My Site Logo",
        src: "img/avatar.jpg",
      },
      links: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        { to: "blog", label: "Blog", position: "left" },
        {
          href: repo,
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Style Guide",
              to: "docs/",
            },
            {
              label: "Second Doc",
              to: "docs/doc2/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
            {
              label: "GitHub",
              href: repo,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built by HarryPoint.`,
    },
    // algolia: {
    //   apiKey: "api-key",
    //   indexName: "index-name",
    //   appId: "app-id", // Optional, if you run the DocSearch crawler on your own
    //   algoliaOptions: {}, // Optional, if provided by Algolia
    // },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: "doc1",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: `${repo}/edit/documentation/`,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: `${repo}/edit/documentation/`,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
