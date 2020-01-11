<div align="center">
<h1>@arshad/gatsby-theme-portfolio-core</h1>
</div>

<p align="center">
  <a href="https://www.npmjs.com/package/@arshad/gatsby-theme-portfolio-core"><img src="https://img.shields.io/npm/v/@arshad/gatsby-theme-portfolio-core.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@arshad/gatsby-theme-portfolio-core"><img src="https://img.shields.io/npm/l/@arshad/gatsby-theme-portfolio-core.svg" alt="License"></a>
  <a href="https://github.com/arshad/gatsby-themes"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" /></a>
</p>

<p align="center">
This core theme includes a <code>Project</code> type that you can use to build a portfolio site. It includes <strong>no styles</strong>.
</p>

## Installation

### Step 1: In the root of your Gatsby site, run the following command:

```shell
yarn add @arshad/gatsby-theme-portfolio-core
```

### Step 2: Enable it in `gatsby-config.js`

```js
// gatsby-config.js
...
  plugins: [
    `@arshad/gatsby-theme-portfolio-core`
  ]
...
```

## Theme options

| Key           | Default value      | Description                                                    |
| ------------- | ------------------ | -------------------------------------------------------------- |
| `contentPath` | `content/projects` | Location of your projects                                      |
| `basePath`    | `/projects`        | Root url for all projects                                      |
| `pageTitle`   | `Portfolio`        | The title for the portfolio page. Leave blank for no title     |
| `pageExcerpt` | `null`             | The excerpt for the portfolio page. Leave blank for no excerpt |

### Example usage

```js
// gatsby-config.js
...
  plugins: [
    {
      resolve: `@arshad/gatsby-theme-portfolio-core`,
      options: {
        basePath: `/projects`,
      }
    }
  ]
...
```

## Data models

### Photo

```js
type Project implements Node @dontInfer {
  id: ID!
  title: String!
  excerpt(pruneLength: Int = 150): String
  slug: String!
  body: String!
  url: String!
  image: File @fileByRelativePath
}
```

### Example

Place your photos inside `content/projects` as follows:

```
site
  ├── content
  │   └── projects
  │       └── project-1
  │           ├── screenshot.jpg
  │           └── index.mdx
  ├── node_modules
  ├── gatsby-config.js
  └── package.json
```

```md
# site/content/projects/project-1/index.mdx

---

title: Proident enim aliqua
url: https://example.com
excerpt: Consequat consectetur mollit commodo nisi reprehent velit aliqua quis nisi laborum.
image: ./screenshot.jpg

---

Et aliquip labore id minim adipisicing excepteur labore in ex deserunt duis quis cillum in.
```

## Customization

Create the following components in your site to shadow and customize the core components:

```
src
└── @arshad
    └── gatsby-theme-portfolio-core
        └── components
            ├── project-teaser.js
            ├── project.js
            └── projects.js
```

To learn more about component shadowing, check out the [official theme docs](https://www.gatsbyjs.org/docs/themes/shadowing).

## Support

Create an issue on the main repo [@arshad/gatsby-themes](https://github.com/arshad/gatsby-themes/issues).
