import { useState } from 'react';
import { Row, Col, Icon } from 'react-materialize';
import { Fade } from 'react-awesome-reveal';
import Search from './Search';
import SearchHistory from './SearchHistory';
import { searchTypes } from '../../helpers/constants';

export default function NavigationBar(props) {
  const {
    onSearch,
    toggleSearch,
    isEnteringInput,
    isSearchExpanded,
    shouldDisplayNavBtn,
    prevChapRef,
    nextChapRef,
    isInitialState,
    previousSearches,
    handleInputListener,
  } = props;

  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  const handleSearchToggle = () => {
    if (isHistoryExpanded) setIsHistoryExpanded(false);
    toggleSearch();
  }

  const handleSearchHistoryToggle = () => {
    if (isSearchExpanded) toggleSearch();
    setIsHistoryExpanded(!isHistoryExpanded);
  }

  return (
    <Row className="navigator-row">
      {isSearchExpanded &&
        <Col s={12} className="author-col">
          <small>{'Created by '}
            <a
              href="https://jamesmart77.github.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              James Martineau
            </a>
          </small>
        </Col>
      }
      <Col s={12} className="mobile-search-wrapper">
        {isSearchExpanded &&
          <Fade direction="up" duration={750}>
            <Search
              isEnteringInput={isEnteringInput}
              onSearch={onSearch}
              handleInputListener={handleInputListener}
            />
          </Fade>
        }
      </Col>

      <SearchHistory
        previousSearches={previousSearches}
        isHistoryExpanded={isHistoryExpanded}
        onSearch={onSearch}
        setIsHistoryExpanded={setIsHistoryExpanded}
      />

      <Col s={3}>
        {shouldDisplayNavBtn && prevChapRef && (
          <div
            className="chapter-nav"
            role="button"
            tabIndex={0}
            onClick={() => onSearch(prevChapRef, searchTypes.passages)}
            onKeyDown={() => onSearch(prevChapRef, searchTypes.passages)}
            title="Previous Chapter"
          >
            <Icon>chevron_left</Icon>
          </div>
        )}
      </Col>
      <Col s={previousSearches.length > 0 ? 3 : 6} className="search-toggle-col">
        {!isInitialState &&
          <div
            role="button"
            tabIndex={0}
            className="search-toggle-btn"
            onKeyDown={handleSearchToggle}
            onClick={handleSearchToggle}
          >
            <Icon>{isSearchExpanded ? 'keyboard_arrow_down' : 'search'}</Icon>
          </div>
        }
      </Col>
      {previousSearches.length > 0 && (
        <Col s={3} className="search-history-col">
          <div
            role="button"
            tabIndex={0}
            className="search-history-btn"
            onClick={handleSearchHistoryToggle}
            onKeyDown={handleSearchHistoryToggle}
          >
            <Icon>{isHistoryExpanded ? 'keyboard_arrow_down' : 'history'}</Icon>
          </div>
        </Col>
      )}
      <Col s={3}>
        {shouldDisplayNavBtn && nextChapRef && (
          <div
            className="chapter-nav nav-right"
            role="button"
            tabIndex={0}
            onClick={() => onSearch(nextChapRef, searchTypes.passages)}
            onKeyDown={() => onSearch(nextChapRef, searchTypes.passages)}
            title="Next Chapter"
          >
            <Icon>chevron_right</Icon>
          </div>
        )}
      </Col>
    </Row>
  );
}
