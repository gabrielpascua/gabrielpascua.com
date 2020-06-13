import React from 'react';
import Link from 'gatsby-link';
import PageTitle from '../components/page-title';
import Layout from '../components/layout';

const formatDate = (date) => {
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
      <PageTitle text={additionalContext.category} />
      <ul className="inline-block two-column list-type-none mt-3">
        {group.map(({ node }) => (
          <li key={node.fields.slug}>
            <Link to={'/' + node.fields.slug}>{node.frontmatter.title}</Link>
            <small className="muted ml-1">
              {formatDate(
                new Date(node.frontmatter.read || node.frontmatter.date)
              )}
            </small>
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
    </Layout>
  );
};
export default IndexPage;
