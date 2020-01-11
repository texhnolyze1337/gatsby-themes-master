# Development

Notes for developing themes.

### Lerna

1. Adding packages: `lerna add @arshad/gatsby-theme-blog-core --scope=@arshad/gatsby-starter-example`
2. Use `lerna bootstrap` to link local packages together and install remaining package dependencies

### Running starters

Run `yarn starters:name dev`

### Running examples

Run `yarn examples:name dev`

### Publish themes

Run `npm run release` which will run `lerna publish` then sync starters and examples repo using `./scripts/sync.sh`.
