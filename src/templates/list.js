import React from 'react';
import Link from 'gatsby-link';

const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>;
  } else {
    return <span>{props.text}</span>;
  }
};

const IndexPage = ({ data, pathContext }) => {
  const {
    group,
    index,
    first,
    last,
    pageCount,
    additionalContext,
    pathPrefix
  } = pathContext;

  const previousUrl = index - 1 === 1 ? `/${additionalContext.category}` : (index - 1).toString();
  const nextUrl = `/${pathPrefix}/${index+1}`;

  return (
    <div>
      <h4>{index} of {pageCount} Pages</h4>
      <ol>
        {group.map(({ node }) => (
          <li key={node.fields.slug}>
            <Link to={'/' + node.fields.slug}>
              {node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ol>
      <div className="previousLink">
        <NavLink test={first} url={previousUrl} text="Go to Previous Page" />
      </div>
      <div className="nextLink">
        <NavLink test={last} url={nextUrl} text="Go to Next Page" />
      </div>
    </div>
  );
};
export default IndexPage;