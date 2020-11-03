import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { Box } from "rebass";
import styled from "styled-components";
import TransitionLink from "gatsby-plugin-transition-link";

import { Description } from "../components/project-header";
import Layout from "../components/layout";

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${props => props.theme.space[3]}px;
`;

const ProjectGridItem = ({ project }) => {
  return (
    <TransitionLink
      style={{ textDecoration: "none" }}
      fade
      to={`/projects/${project.slug}`}
      duration={0.2}
    >
      <Box>
        <Img fluid={project.localImage.childImageSharp.fluid} />
        <Box mt={3}>
          <Description>{project.title}</Description>
        </Box>
      </Box>
    </TransitionLink>
  );
};

const Home = ({ data }) => {
  const projects = data.projects.edges;
  return (
    <Layout>
      <Grid>
        {projects.map(project => (
          <ProjectGridItem key={project.node.title} project={project.node} />
        ))}
      </Grid>
    </Layout>
  );
};

// export const query = graphql`
//   {
//     projects: allDatoCmsProject {
//       edges {
//         node {
//           slug
//           title
//           featuredPhoto {
//             fluid {
//               ...GatsbyDatoCmsFluid
//             }
//           }
//         }
//       }
//     }
//   }
// `;

export const query = graphql`
  {
    projects: allContentJson {
      edges {
        node {
          slug
          title
          localImage {
            childImageSharp {
              fluid(maxWidth: 1000, maxHeight: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;

export default Home;
