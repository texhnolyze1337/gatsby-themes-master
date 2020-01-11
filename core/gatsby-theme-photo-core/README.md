<div align="center">
<h1>@arshad/gatsby-theme-photo-core</h1>
</div>

<p align="center">
  <a href="https://www.npmjs.com/package/@arshad/gatsby-theme-photo-core"><img src="https://img.shields.io/npm/v/@arshad/gatsby-theme-photo-core.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@arshad/gatsby-theme-photo-core"><img src="https://img.shields.io/npm/l/@arshad/gatsby-theme-photo-core.svg" alt="License"></a>
  <a href="https://github.com/arshad/gatsby-themes"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" /></a>
</p>

<p align="center">
This core theme includes a <code>Photo</code> type that you can use to build a photography site. It includes <strong>no styles</strong>.
</p>

## Installation

### Step 1: In the root of your Gatsby site, run the following command:

```shell
yarn add @arshad/gatsby-theme-photo-core
```

### Step 2: Enable it in `gatsby-config.js`

```js
// gatsby-config.js
...
  plugins: [
    `@arshad/gatsby-theme-photo-core`
  ]
...
```

## Theme options

| Key             | Default value    | Description                                                 |
| --------------- | ---------------- | ----------------------------------------------------------- |
| `contentPath`   | `content/photos` | Location of your photos                                     |
| `basePath`      | `/photography`   | Root url for all photo posts                                |
| `photosPerPage` | `9`              | Number of photos to show per page for pagination            |
| `pageTitle`     | `Photography`    | The title for the photos page. Leave blank for no title     |
| `pageExcerpt`   | `null`           | The excerpt for the photos page. Leave blank for no excerpt |

### Example usage

```js
// gatsby-config.js
...
  plugins: [
    {
      resolve: `@arshad/gatsby-theme-photo-core`,
      options: {
        basePath: `/photos`,
        photosPerPage: 10,
      }
    }
  ]
...
```

## Data models

### Photo

```js
type Photo implements Node @dontInfer {
  id: ID!
  title: String!
  date: Date! @dateformat
  image: File @fileByRelativePath
  excerpt(pruneLength: Int = 150): String
  slug: String!
  body: String!
}
```

### Example

Place your photos inside `content/photos` as follows:

```
site
  ├── content
  │   └── photos
  │       └── photo-1
  │           ├── photo.jpg
  │           └── index.mdx
  ├── node_modules
  ├── gatsby-config.js
  └── package.json
```

```md
# site/content/photos/photo-1/index.mdx

---

title: Proident enim aliqua
date: 2019-10-11
excerpt: Consequat consectetur mollit commodo nisi reprehent velit aliqua quis nisi laborum.
image: ./photo.jpg

---

Et aliquip labore id minim adipisicing excepteur labore in ex deserunt duis quis cillum in.
```

## Customization

Create the following components in your site to shadow and customize the core components:

```
src
└── @arshad
    └── gatsby-theme-photo-core
        └── components
            ├── photo-teaser.js
            ├── photo.js
            └── photos.js
```

To learn more about component shadowing, check out the [official theme docs](https://www.gatsbyjs.org/docs/themes/shadowing).

## Support

Create an issue on the main repo [@arshad/gatsby-themes](https://github.com/arshad/gatsby-themes/issues).
