import React from "react"
import { graphql } from "gatsby"
import Episode from "../components/episode"

export default ({ data }) => (
  <Episode {...data.episode} podcast={data.podcast} />
)

export const query = graphql`
  query($id: String) {
    podcast {
      ...PodcastFragment
    }
    episode: podcastEpisode(id: { eq: $id }) {
      ...PodcastEpisodeFragment
    }
  }
`
