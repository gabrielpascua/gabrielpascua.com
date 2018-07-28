import React from 'react';
import {Helmet} from 'react-helmet';
import graphql from 'graphql';
import moment from 'moment';
// import '../../sass/resume.scss';

export default class HomePage extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    const {bio, history} = this.props.data.allHistoryJson.edges.pop().node;
    const formatDate = (dateObj) => {
      if(!dateObj){
        return 'Present';
      }

      const {month, day, year} = dateObj;
      const date = moment([year, month, day].join('-'), 'YYYY-MM-DD');
      return date.format('MMM D, YYYY');
    };

    const getMoment = function(date) {
      if(!date){
        const now = new Date();
        date = {
          month: now.getMonth()+1,
          day: now.getDate(),
          year: now.getFullYear()
        };
      }

      const {month, day, year} = date;
      const momentDate = moment([year, month, day].join('-'), 'YYYY-MM-DD');
      return momentDate;
    };

    const duration = function(endDate, startDate) {
      let startMs = getMoment(startDate);
      let endMs = getMoment(endDate);

      let diff = moment.duration(endMs.diff(startMs)).humanize();
      return diff;
    };

    const getBorderClass = function(index, end, start) {
      let className = 'work-history';

      if(index === 0){
        className += ' border-top';
      }

      if((index+1) < history.length) {
        className += ' border-bottom';
      }

      let x = duration(end, start);
      console.log(x); //eslint-disable-line

      return className;
    };

    return (
      <div className="container resume">
        <MetaData title={bio.first_name + ' ' + bio.last_name} />
        <h1>{bio.first_name} {bio.last_name}</h1>
        {/* <h3>Work History</h3> */}
        {
          history.map((w, index) => {
            return(
              <div key={w.position} className={getBorderClass(index, w.end_date, w.start_date)}>
                <h4>
                  {w.position} <span className="text-normal">at {w.company.name}</span>
                </h4>
                <h5>
                  <span>{w.company.city}, {w.company.state} </span>
                  <span>From {formatDate(w.start_date)} </span>
                  <span>till {formatDate(w.end_date)}</span>
                </h5>
                <p dangerouslySetInnerHTML={{ __html: w.description }} />
              </div>
            );
          })
        }
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