import { graphql } from "gatsby"

export const fragment = graphql`
  fragment PodcastEpisodeFragment on PodcastEpisode {
    id
    guid
    title
    slug
    date
    duration
    subtitle
    summary
    url
  }
`
