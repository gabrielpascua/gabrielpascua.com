import React from 'react';

export default ({ text }) => {
  return (
    <div className="title-container">
      <h1 className="title">
        {text}
      </h1>
    </div>
  );
};