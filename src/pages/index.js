import React from 'react';
import {Helmet} from 'react-helmet';
import graphql from 'graphql';

export default class HomePage extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    const data = this.props.data.allHistoryJson.edges.pop().node;
    const {bio, history} = data;
    return (
      <div>
        <MetaData title="Gabriel Pascua" />
        <h1>{bio.first_name} {bio.last_name}</h1>
        <h3>Work History</h3>
        <ul>
          {
            history.map((w, index) => {
              return(
                <li key={index}>
                  {w.company.name}- {w.company.address} <br />
                  {w.position}<br />
                  {w.description}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }

}

const MetaData = function(props){
  return (
    <Helmet>
      <title>{props.title}</title>
    </Helmet>
  );
};

export const workHistoryQuery = graphql`
  query ResumeQuery {
    allHistoryJson {
      edges {
        node {
          bio {
            first_name
            last_name
            email
            phone
          },
          history {
            company {
              name
              address
              city
              state
              zip
              country
            },
            position,
            description,
            start_date {
              month
              day
              year
            },
            javascript,
            client_side,
            microsoft,
            version_control,
            devops,
            end_date {
              month
              day
              year
            },
            php,
            databases,        
          }
        }
      }
    }
  }
`;