module.exports = themeOptions => ({
  feedUrl: null,
  basePath: `/podcast`,
  episodesPerPage: 10,
  ...themeOptions,
  podcast: {
    name: null,
    description: null,
    image: null,
    social: null,
    ...themeOptions.podcast,
  },
})
