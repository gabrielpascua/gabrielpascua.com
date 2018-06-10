import * as React from "react";

export default class extends React.Component<any, {}> {
  constructor(props:any, context: any){
    super(props, context);
  }
  public render() {
    return(
      <div>
        <h1>Gabriel Pascua</h1>
        <h3>Work History</h3>
        <ul>
          {
            this.props.data.allDataJson.edges[0].node
              .work.map((w:any, index:number) => {
                return <li key={index}>{w.company}</li>
              })
          }
        </ul>
      </div>
    );
  }
}

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
`