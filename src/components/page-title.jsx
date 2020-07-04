import React from 'react';

export default ({ text, url, category }) => {
  return (
    <hgroup className="title-container">
      <h1 className="title">{text}</h1>
      {url && (
        <p>
          <a href={url} target="_blank">
            More About this {category}
          </a>
        </p>
      )}
    </hgroup>
  );
};
