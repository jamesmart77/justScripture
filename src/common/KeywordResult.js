import React from 'react';

function KeywordResult (result) {
  const { content, reference } = result
  return (
    <div 
      key={reference}
      className="keyword-result-container"
    >
      <h5 className="title">{reference}</h5>
      <div className="text">{content}</div>
    </div>
  );
}

export default KeywordResult;
