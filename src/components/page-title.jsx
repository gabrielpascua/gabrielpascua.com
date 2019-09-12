import React from 'react';

export default ({ text, url }) => {
  return (
    <div className="title-container">
      <h1 className="title">{text}</h1>
      { url && <p className="mt-1">
        <a href={url} target="_blank">
          More About this Post
        </a>
      </p>}
    </div>
  );
};
