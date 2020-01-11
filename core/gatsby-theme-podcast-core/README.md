<div align="center">
<h1>@arshad/gatsby-theme-podcast-core</h1>
</div>

<p align="center">
  <a href="https://www.npmjs.com/package/@arshad/gatsby-theme-podcast-core"><img src="https://img.shields.io/npm/v/@arshad/gatsby-theme-podcast-core.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@arshad/gatsby-theme-podcast-core"><img src="https://img.shields.io/npm/l/@arshad/gatsby-theme-podcast-core.svg" alt="License"></a>
  <a href="https://github.com/arshad/gatsby-themes"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" /></a>
</p>

<p align="center">
This core theme includes a <code>Podcast</code> and <code>PodcastEpisode</code> type that you can use to build a podcast site. Episodes are sourced from a Podcast RSS feed. It includes <strong>no styles</strong>.
</p>

## Installation

### Step 1: In the root of your Gatsby site, run the following command:

```shell
yarn add @arshad/gatsby-theme-podcast-core
```

### Step 2: Enable it in `gatsby-config.js`

```js
// gatsby-config.js
...
  plugins: [
    {
      resolve: `@arshad/gatsby-theme-podcast-core`,
      options: {
        feedUrl: `https://example.com/feed`,
        podcast: {
          name: `Name of Podcast`,
          description: `Eligendi nisi nobis nisi voluptate. Corporis deserunt provident hic numquam. Veritatis vero necessitatibus adipisci cumque voluptate rerum at.`,
          image: `assets/images/podcast.jpg`,
          social: [
            {
              name: `Apple Podcast`,
              url: `https://itunes.apple.com`,
            },
            {
              name: `Google Podcast`,
              url: `https://podcasts.google.com`,
            },
          ],
        },
      },
    },
  ]
...
```

## Theme options

| Key               | Default value | Description                                                                                            |
| ----------------- | ------------- | ------------------------------------------------------------------------------------------------------ |
| `feedUrl`         | null          | The url for the podcast feed                                                                           |
| `basePath`        | `/podcast`    | Root url for all photo posts                                                                           |
| `episodesPerPage` | `10`          | Number of phoepisodestos to show per page for pagination                                               |
| `podcast`         | null          | Configuration for the podcast. Includes `name`, `description`, `image` and `social {name, url}` links. |  |

### Example usage

```js
// gatsby-config.js
// gatsby-config.js
...
  plugins: [
    {
      resolve: `@arshad/gatsby-theme-podcast-core`,
      options: {
        feedUrl: `https://example.com/feed`,
        podcast: {
          name: `Name of Podcast`,
          description: `Eligendi nisi nobis nisi voluptate. Corporis deserunt provident hic numquam. Veritatis vero necessitatibus adipisci cumque voluptate rerum at.`,
          image: `assets/images/podcast.jpg`,
          social: [
            {
              name: `Apple Podcast`,
              url: `https://itunes.apple.com`,
            },
            {
              name: `Google Podcast`,
              url: `https://podcasts.google.com`,
            },
          ],
        },
      },
    },
  ]
...
```

## Data models

### Podcast

```js
type Podcast implements Node @dontInfer {
  id: ID!
  name: String!
  description: String!
  image: File
  social: [PodcastSocialLink]
}
```

### PodcastEpisode

```js
type PodcastEpisode implements Node @dontInfer {
  id: ID!
  guid: String!
  title: String!
  slug: String!
  date: Date! @dateformat
  duration: Int!
  subtitle: String!
  summary: String!
  url: String!
}
```

### PodcastSocialLink

```js
type PodcastSocialLink implements Node @dontInfer {
  name: String!
  url: String!
}
```

## Customization

Create the following components in your site to shadow and customize the core components:

```
src
└── @arshad
    └── gatsby-theme-podcast-core
        └── components
            ├── episode-teaser.js
            ├── episode.js
            ├── episodes.js
            └── podcast.js
```

To learn more about component shadowing, check out the [official theme docs](https://www.gatsbyjs.org/docs/themes/shadowing).

## Support

Create an issue on the main repo [@arshad/gatsby-themes](https://github.com/arshad/gatsby-themes/issues).
