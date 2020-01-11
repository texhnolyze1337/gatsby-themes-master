import { graphql } from "gatsby"

export const fragment = graphql`
  fragment PodcastFragment on Podcast {
    name
    description
    social {
      name
      url
    }
    image {
      full: childImageSharp {
        fluid(maxWidth: 960, cropFocus: ATTENTION, quality: 100) {
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
        fluid(maxWidth: 960, cropFocus: ATTENTION, quality: 100) {
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
          base64
          width
          height
          src
          srcSet
        }
      }
    }
  }
`
