import React from "react"
import { graphql } from "gatsby"
import Projects from "../components/projects"

export default ({ data, pageContext }) => (
  <Projects projects={data.allProject.projects} {...pageContext} />
)

export const query = graphql`
  query {
    allProject(sort: { fields: title, order: ASC }) {
      projects: nodes {
        ...ProjectFragment
      }
    }
  }
`
