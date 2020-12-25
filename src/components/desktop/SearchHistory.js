import React from 'react';
import { Slide } from 'react-reveal';
import { Row, Icon } from 'react-materialize';
import { searchTypes } from '../../helpers/constants';

export default function SearchHistory (props) {
  const { previousSearches, onSearch } = props

  return (
    <div className="search-history-container">
      {previousSearches.length > 0 &&
        <Slide duration={750} left>
          <h5 className="header">Search History</h5>

          {previousSearches.map(search => (
            <Row 
              key={search.query}
              role="button"
              tab={0}
              className="search-item"
              onClick={() => {onSearch(search.query, search.type)}}
              onKeyPress={() => {onSearch(search.query, search.type)}}
            >
              <h6 className="truncate">{search.title}</h6>
              {search.type === searchTypes.keyword ? (
                <Icon className="keyword-icon">short_text</Icon>
              ) : (
                <Icon className="passage-icon">bookmark_border</Icon>
              )}
            </Row>
          ))}
        </Slide>
      }
    </div>
  );
}