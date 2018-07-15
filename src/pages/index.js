import React from 'react';
import {Helmet} from 'react-helmet';
import graphql from 'graphql';
import {TopNav} from '../components/top-nav';

export default ({data}) => (
  <div>
    <Helmet>
      <title>Test</title>
    </Helmet>
    {/* Remove The TopNav */}
    <TopNav />
    <h1>Gabriel Pascua</h1>
    <h3>Work History</h3>
    <ul>
      {
        data.allDataJson.edges[0].node
          .work.map((w, index) => {
            return <li key={index}>{w.company}</li>;
          })
      }
    </ul>
  </div>
);

export const query = graphql`
  query ResumeQuery {
    allDataJson
    {
      edges{
        node {
          work {
            company
            startDate
            endDate
            position
            summary
            website
          }
        }
      }
    }
  }
`;