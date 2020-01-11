import React from "react"
import { graphql } from "gatsby"
import Photos from "../components/photos"

export default ({ pageContext, data }) => (
  <Photos photos={data.allPhoto.photos} {...pageContext} />
)

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allPhoto(
      sort: { fields: [date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      photos: nodes {
        ...PhotoFragment
      }
    }
  }
`
