import format from 'date-fns/format';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import PageTitle from '../components/page-title';
import '../styles/resume.css';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { bio, history } = this.props.data.allHistoryJson.edges.pop().node;
    const formatDate = (jobDate) => {
      if (!jobDate) {
        return 'this day';
      }

      return format(new Date(jobDate), 'MMMM yyy');
    };

    const duration = function (end, start) {
      return formatDistanceStrict(new Date(end), new Date(start));
    };

    return (
      <Layout>
        <div className="resume">
          <Head title={bio.first_name + ' ' + bio.last_name} />
          <div className="page-heading">
            <div className="container">
              <PageTitle text="Work History" />
            </div>
          </div>
          <div className="page-content">
            <div className="container">
              {history.map((w, idx) => {
                let showLocation = [0, 6, 8].indexOf(idx) >= 0;
                return (
                  <div key={w.position}>
                    <h3 className={showLocation ? 'work-location' : 'hide'}>
                      <span className={ idx ? 'work-location-spacer' : '' }>
                        {w.company.country === 'USA' ? w.company.city + ', ' : ''}
                        {w.company.state}
                        {w.company.country !== 'USA'
                          ? ', ' + w.company.country
                          : ''}
                      </span>
                    </h3>

                    <div className="work-history" key={w.company.name}>
                      <h4>
                        {w.position}{' '}
                        <span className="text-normal">at {w.company.name}</span>
                      </h4>
                      <h5>
                        <span>~ {duration(w.end_date, w.start_date)} </span>
                        <span>from {formatDate(w.start_date)} </span>
                        <span>till {formatDate(w.end_date)}</span>
                      </h5>
                      <p dangerouslySetInnerHTML={{ __html: w.description }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const Head = function (props) {
  return (
    <>
      <title>{props.title}</title>
    </>
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
          }
          history {
            company {
              name
              address
              city
              state
              zip
              country
            }
            position
            description
            start_date
            end_date
            javascript
            client_side
            microsoft
            version_control
            devops
            php
            databases
          }
        }
      }
    }
  }
`;
