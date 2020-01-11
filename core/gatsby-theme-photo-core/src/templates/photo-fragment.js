import { graphql } from "gatsby"

export const fragment = graphql`
  fragment PhotoFragment on Photo {
    id
    title
    date(formatString: "MMMM DD, YYYY")
    excerpt
    body
    slug
    image {
      full: childImageSharp {
        fluid(maxWidth: 960, maxHeight: 540, cropFocus: CENTER, quality: 100) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
      thumbnail: childImageSharp {
        fluid(maxWidth: 456, maxHeight: 325, cropFocus: CENTER, quality: 100) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
      fixed: childImageSharp {
        fixed(width: 960, quality: 100) {
          src
        }
      }
    }
  }
`
