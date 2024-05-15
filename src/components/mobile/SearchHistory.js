import React from 'react';
import { Row, Col, Icon } from 'react-materialize';
import { searchTypes } from '../../helpers/constants';
import { Fade } from 'react-awesome-reveal';

function SearchHistory (props) {

    const { 
        onSearch, 
        isHistoryExpanded,
        previousSearches,
        setIsHistoryExpanded,
    } = props;

    return (
        <Row className={isHistoryExpanded ? "mobile-search-history-row" : "mobile-search-history-row no-display"}>
            <Col s={12} className="wrapper">
              <Fade bottom duration={750} when={isHistoryExpanded}>
                {isHistoryExpanded && (
                  <>
                    <h5 className="header">Search History</h5>
                    {previousSearches.map(search => (
                      <Row 
                        key={`mobile-${search.query}`}
                        role="button"
                        tabIndex={0}
                        className="search-item"
                        onClick={() => {
                          setIsHistoryExpanded(false);
                          onSearch(search.query, search.type);
                        }}
                        onKeyPress={() => {
                          setIsHistoryExpanded(false);
                          onSearch(search.query, search.type);
                        }}
                      >
                        <h6 className="truncate">{search.title}</h6>
                        {search.type === searchTypes.keyword ? (
                          <Icon className="keyword-icon">short_text</Icon>
                        ) : (
                          <Icon className="passage-icon">bookmark_border</Icon>
                        )}
                      </Row>
                    ))}
                  </>
                )}
              </Fade>
            </Col>
        </Row>
    );
}

export default SearchHistory;
