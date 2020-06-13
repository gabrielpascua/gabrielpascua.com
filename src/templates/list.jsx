import React from 'react';
import Link from 'gatsby-link';
import PageTitle from '../components/page-title';
import Layout from '../components/layout';

const formatDate = (rawDate) => {
  // replace for Safari
  const date = new Date(rawDate.replace(' ', 'T'));
  const padLeft = (datePart) => {
    return datePart.toString().length === 1 ? `0${datePart}` : datePart;
  };

  const year = date.getFullYear();
  const month = padLeft(date.getMonth() + 1);
  const day = padLeft(date.getDate());

  return `${year}-${month}-${day}`;
};

const NavLink = (props) => {
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
    index - 1 === 1
      ? `/${additionalContext.category}`
      : `/${pathPrefix}/${index - 1}`;
  const nextUrl = `/${pathPrefix}/${index + 1}`;

  return (
    <Layout>
      <div className="page-heading">
        <div className="container">
          <PageTitle text={additionalContext.category} />
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <ul className="inline-block two-column list-type-none mt-3">
            {group.map(({ node }) => (
              <li key={node.fields.slug}>
                <small className="muted">
                  {formatDate(node.frontmatter.read || node.frontmatter.date)}
                </small>
                <Link to={'/' + node.fields.slug} className="muted">
                  {node.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
          <br />
          <br />
          <p>
            <NavLink
              className="mr-1"
              test={first}
              url={previousUrl}
              text="Previous"
            />
            <NavLink test={last} url={nextUrl} text="Next" />
            <br />
            <small className="muted">
              Page {index} of {pageCount}
            </small>
          </p>
        </div>
      </div>
    </Layout>
  );
};
export default IndexPage;
