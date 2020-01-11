import React from "react"
import { graphql } from "gatsby"
import Photo from "../components/photo"

export default ({ data }) => <Photo {...data.photo} />

export const query = graphql`
  query($id: String) {
    photo(id: { eq: $id }) {
      ...PhotoFragment
    }
  }
`
