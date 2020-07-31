import React from 'react';
import { Fade } from 'react-reveal';
import { searchTypes } from '../helpers/constants';

function KeywordResult (result) {
  const { content, reference, search } = result
  const chapter = reference.split(":")[0];

  return (
    <Fade bottom duration={500}>
      <div className="keyword-result-container">
        <h5 className="title">{reference}</h5>
        <div className="text">{content}</div>
        <div 
          role="button"
          tabIndex={0}
          className="read-chapter"
          title={`Read ${chapter}`}
          onClick={() => search(chapter, searchTypes.passages)}
          onKeyPress={() => search(chapter, searchTypes.passages)}
        >
          Read Chapter
        </div>
      </div>
    </Fade>
  );
}

export default KeywordResult;
