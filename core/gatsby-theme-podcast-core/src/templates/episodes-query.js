import React from "react"
import { graphql } from "gatsby"
import Episodes from "../components/episodes"

export default ({ pageContext, data }) => (
  <Episodes
    episodes={data.allPodcastEpisode.episodes}
    {...pageContext}
    podcast={data.podcast}
  />
)

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    podcast {
      ...PodcastFragment
    }
    allPodcastEpisode(
      sort: { fields: [date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      episodes: nodes {
        ...PodcastEpisodeFragment
      }
    }
  }
`
