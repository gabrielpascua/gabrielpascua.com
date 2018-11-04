import React from 'react';
import Link from 'gatsby-link';
import PageTitle from '../components/page-title';

const NavLink = props => {
  if (!props.test) {
    return (
      <Link to={props.url} className={props.className}>
        {props.text}
      </Link>
    );
  } else {
    return null;
  }
};

const IndexPage = ({ data, pageContext }) => {
  const {
    group,
    index,
    first,
    last,
    pageCount,
    additionalContext,
    pathPrefix,
  } = pageContext;

  const previousUrl =
    index - 1 === 1 ? `/${additionalContext.category}` : (index - 1).toString();
  const nextUrl = `/${pathPrefix}/${index + 1}`;

  return (
    <div>
      <div className="container content">
        <PageTitle text={additionalContext.category} />
        <ul className="inline-block">
          {group.map(({ node }) => (
            <li key={node.fields.slug}>
              <Link to={'/' + node.fields.slug}>{node.frontmatter.title}</Link>
            </li>
          ))}
        </ul>
        <br />
        <br />
        <p>
          <NavLink
            className="mr-1 muted"
            test={first}
            url={previousUrl}
            text="Previous"
          />
          <NavLink className="muted" test={last} url={nextUrl} text="Next" />
          <br />
          <small className="muted">
            Page {index} of {pageCount}
          </small>
        </p>
      </div>
    </div>
  );
};
export default IndexPage;
