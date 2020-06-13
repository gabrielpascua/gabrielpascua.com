import React from 'react';

export default ({ text, url }) => {
  return (
    <hgroup className="title-container">
      <h1 className="title">{text}</h1>
      {url && (
        <p>
          <a href={url} target="_blank">
            More About this Post
          </a>
        </p>
      )}
    </hgroup>
  );
};
