# Core themes

<a href="https://github.com/arshad/gatsby-themes"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" /></a>

The following themes are Gatsby core themes. They bundle core types and functionality. They include **no styles** and are meant to be **consumed by other themes or sites**.

To learn more about theme composition, check out the [official docs](https://www.gatsbyjs.org/docs/themes/theme-composition/).

## Themes

| Name                                                                                                                          | Version                                                                                                                                                                        | Description                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| [`@arshad/gatsby-theme-core` ](https://github.com/arshad/gatsby-themes/tree/master/core/gatsby-theme-core)                    | <a href="https://www.npmjs.com/package/@arshad/gatsby-theme-core"><img src="https://img.shields.io/npm/v/@arshad/gatsby-theme-blog-core.svg" alt="Version"></a>                | Shared types and helpers for @arshad/gatsby-themes                                                                                   |
| [`@arshad/gatsby-theme-blog-core`](https://github.com/arshad/gatsby-themes/tree/master/core/gatsby-theme-blog-core)           | <a href="https://www.npmjs.com/package/@arshad/gatsby-theme-blog-core"><img src="https://img.shields.io/npm/v/@arshad/gatsby-theme-blog-core.svg" alt="Version"></a>           | Adds a `Post` type that you can use to build a blog. Includes post excerpt, featured image, tags/categories and paginated pages.     |
| [`@arshad/gatsby-theme-page-core`](https://github.com/arshad/gatsby-themes/tree/master/core/gatsby-theme-page-core)           | <a href="https://www.npmjs.com/package/@arshad/gatsby-theme-page-core"><img src="https://img.shields.io/npm/v/@arshad/gatsby-theme-page-core.svg" alt="Version"></a>           | Adds a `Page` type with MDX support. Includes code highlighting with prismjs.                                                        |
| [`@arshad/gatsby-theme-photo-core`](https://github.com/arshad/gatsby-themes/tree/master/core/gatsby-theme-photo-core)         | <a href="https://www.npmjs.com/package/@arshad/gatsby-theme-photo-core"><img src="https://img.shields.io/npm/v/@arshad/gatsby-theme-photo-core.svg" alt="Version"></a>         | Adds a `Photo` type that you can use to build a photography site.                                                                    |
| [`@arshad/gatsby-theme-podcast-core`](https://github.com/arshad/gatsby-themes/tree/master/core/gatsby-theme-podcast-core)     | <a href="https://www.npmjs.com/package/@arshad/gatsby-theme-podcast-core"><img src="https://img.shields.io/npm/v/@arshad/gatsby-theme-podcast-core.svg" alt="Version"></a>     | Adds a `Podcast` and `PodcastEpisode` types that you can use to build a podcast site. Podcast episodes are pulled from podcast feed. |
| [`@arshad/gatsby-theme-portfolio-core`](https://github.com/arshad/gatsby-themes/tree/master/core/gatsby-theme-portfolio-core) | <a href="https://www.npmjs.com/package/@arshad/gatsby-theme-portfolio-core"><img src="https://img.shields.io/npm/v/@arshad/gatsby-theme-portfolio-core.svg" alt="Version"></a> | Adds a `Project` types that you can use to build a portfolio site.                                                                   |

## Usage

You can mix and match core themes to compose your Gatsby site.

### Example

To build a portfolio site with a blog, run the following command in your site.

```shell
yarn add @arshad/gatsby-theme-portfolio-core @arshad/gatsby-theme-blog-core
```

Then enable the themes in your `gatsby-config.js`

```js
// gatsby-config.js
...
  plugins: [
    `@arshad/gatsby-theme-blog-core`,
    `@arshad/gatsby-theme-portfolio-core`
  ]
...
```
