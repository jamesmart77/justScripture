import React, { useState, useEffect } from 'react';
import { Row, Col, Collapsible, CollapsibleItem, Icon } from 'react-materialize';
import { searchTypes, keywordSearchResultsInitial, passageSearchResultsInitial } from '../helpers/constants';
import { Fade } from 'react-awesome-reveal';
import getLocationQuery from '../utils/getLocationQuery';
import Title from '../common/Title';
import Loader from '../common/Loader';
import Search from '../components/desktop/Search';
import Copyright from '../common/Copyright';
import KeywordResult from '../common/KeywordResult';
import ReadingTimeSvg from '../images/readingTime.svg';
import SearchHistory from '../components/desktop/SearchHistory';
import ReactPaginate from 'react-paginate';

export default function DesktopView(props) {
  const {
    onSearch,
    getNextChapter,
    getPrevChapter,
    isLoading,
    passageSearchResults,
    keywordSearchResults,
    isInitialState,
    previousSearches,
    keywordQuery,
    location,
  } = props;

  const [isPassageExpanded, setIsPassageExpanded] = useState(true);
  const [isKeywordExpanded, setIsKeywordExpanded] = useState(false);

  useEffect(() => {
    document.addEventListener('click', shouldUpdateAudio, false);
    document.addEventListener('keypress', shouldUpdateAudio, false);

    return () => {
      document.removeEventListener('click', shouldUpdateAudio, false);
      document.removeEventListener('keypress', shouldUpdateAudio, false);
    }
  }, []);

  useEffect(() => {
    const data = getLocationQuery(location);

    if (data && isInitialState) {
      onSearch(data.query, data.type);
    }
  }, [location, isInitialState, onSearch]);

  const shouldUpdateAudio = (e) => {
    if (!e.target.matches('.audio-icon')) return;
  }

  const handlePassageOptionClick = () => {
    setIsKeywordExpanded(false);
    setIsPassageExpanded(!isPassageExpanded);
  }

  const handleKeywordOptionClick = () => {
    setIsPassageExpanded(true);
    setIsKeywordExpanded(!isKeywordExpanded);
  }

  const prevChapRef = getPrevChapter();
  const nextChapRef = getNextChapter();

  return (
    <div className="desktop-container">
      <Row className="row-wrapper">
        <Col xl={3} m={4} className="col-wrapper search-col">
          <Title />
          <Collapsible>
            <CollapsibleItem
              header="Passages"
              expanded={true}
              node="div"
              onClick={handlePassageOptionClick}
              icon={isPassageExpanded ? <Icon>keyboard_arrow_down</Icon> : <Icon>keyboard_arrow_right</Icon>}
            >
              <Search
                type={searchTypes.passages}
                onSearch={onSearch}
              />
            </CollapsibleItem>
            <CollapsibleItem
              header="Keyword"
              node="div"
              onClick={handleKeywordOptionClick}
              icon={isKeywordExpanded ? <Icon>keyboard_arrow_down</Icon> : <Icon>keyboard_arrow_right</Icon>}
            >
              <Search
                type={searchTypes.keyword}
                onSearch={onSearch}
              />
            </CollapsibleItem>
          </Collapsible>
          <Fade direction="left">
            <SearchHistory
              previousSearches={previousSearches}
              onSearch={onSearch}
            />
          </Fade>
        </Col>
        <Col xl={9} m={8} className="col-wrapper display-col">
          {isLoading && !isInitialState &&
            <Loader />
          }

          {isInitialState && !isLoading &&
            <Fade direction="down" duration={2000}>
              <div className="pre-search-msg">
                <p>Welcome to <span className="bold">Just Scripture</span>, a Bible app. Search passages, verses, and keywords in the ESV Bible.</p>
                <img src={ReadingTimeSvg} alt="woman sitting under lamp reading book" />
              </div>
            </Fade>
          }

          {!isInitialState &&
            !isLoading &&
            passageSearchResults !== passageSearchResultsInitial &&
            passageSearchResults.passages &&
            passageSearchResults.passages.length > 0 &&

            <Row>
              <Col s={1}>
                {prevChapRef && (
                  <div
                    className="chapter-nav nav-left"
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
              <Col s={10}>
                <div className="passage-text">{passageSearchResults.passages}</div>
              </Col>
              <Col s={1}>
                {nextChapRef && (
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

              <Col s={12}>
                <Copyright />
              </Col>
            </Row>
          }

          {!isInitialState &&
            !isLoading &&
            keywordSearchResults !== keywordSearchResultsInitial &&
            keywordSearchResults.results &&
            keywordSearchResults.results.length > 0 && (
              <Row>
                <Col s={12}>
                  <div className="results-count">{keywordSearchResults.total_results} results found</div>
                </Col>
                <Col s={12}>
                  {keywordSearchResults.results.map(result => (
                    <KeywordResult
                      key={`key-${result.reference}`}
                      search={onSearch}
                      {...result}
                    />
                  ))}
                  <ReactPaginate
                    containerClassName="pagination"
                    activeClassName="active"
                    pageCount={keywordSearchResults.total_pages}
                    pageRangeDisplayed={4}
                    marginPagesDisplayed={2}
                    initialPage={keywordSearchResults.page - 1}
                    disableInitialCallback
                    onPageChange={data => {
                      const pageNumber = data.selected + 1;
                      onSearch(keywordQuery, searchTypes.keyword, false, null, pageNumber)
                    }}
                  />
                </Col>

                <Col s={12}>
                  <Copyright />
                </Col>
              </Row>
            )}
        </Col>
      </Row>
    </div>
  );
}
