module.exports = {
  siteMetadata: {
    title: 'Code Notes',
    description: `Handy code snippets`,
    author: 'Jordan',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-code-notes',
      options: {
        contentPath: 'notes',
        basePath: '/',
        showThemeInfo: true,
        showDescriptionInSidebar: true,
      },
    },
  ],
}
