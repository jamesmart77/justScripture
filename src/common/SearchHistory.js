import React from 'react';
import { Slide } from 'react-reveal';

export default function SearchHistory (props) {
  const { previousSearches } = props

  return (
    <div className="search-history-container">
      {previousSearches.length > 0 &&
        <Slide duration={750} left>
          <h5 className="header">Search History</h5>

          {previousSearches.map(search => (
            <div className="search-item">
              <h6>{search.text}</h6>
              <div>{search.type}</div>
            </div>
          ))}
          {/* <div className="text">{content}</div>
          <div 
            role="button"
            tabIndex={0}
            className="read-chapter"
            title={`Read ${chapter}`}
            onClick={() => search(chapter, searchTypes.passages)}
            onKeyPress={() => search(chapter, searchTypes.passages)}
          >
            Read Chapter
          </div> */}
        </Slide>
      }
    </div>
  );
}