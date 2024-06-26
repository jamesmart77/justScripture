import { useState, useEffect } from 'react';
import { Row, Col, Preloader } from 'react-materialize';
import { keywordSearchResultsInitial, passageSearchResultsInitial } from '../helpers/constants';
import getLocationQuery from '../utils/getLocationQuery';
import Title from '../common/Title';
import NavigationBar from '../components/mobile/NavigationBar';
import Copyright from '../common/Copyright';
import KeywordResult from '../common/KeywordResult';
import ReactPaginate from 'react-paginate';
import { searchTypes } from '../helpers/constants';
import Logo from '../images/logo.png';

export default function MobileView(props) {
  const {
    getNextChapter,
    getPrevChapter,
    isLoading,
    passageSearchResults,
    keywordSearchResults,
    isInitialState,
    previousSearches,
    onSearch,
    keywordQuery,
    location
  } = props;

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isEnteringInput, setIsEnteringInput] = useState(false);

  const handleInputListener = () => {
    if (window.screen.height > 700) return;

    /* 
    wait for DOM to paint before running listener dependent code.
    need to modify CSS for devices < 700 px high for input visibility
    */
    window.requestAnimationFrame(function () {
      const searchInput = document.getElementById('search');

      if (searchInput) {
        searchInput.addEventListener('focus', () =>
          setIsEnteringInput(true)
        );
      }
    })
  }

  // TODO: refactor into reusable hook with DesktopView
  useEffect(() => {
    const data = getLocationQuery(location);

    if (data && isInitialState) {
      onSearch(data.query, data.type);
    }
  }, [location, isInitialState, onSearch]);
  
  useEffect(() => {
    setIsSearchExpanded(true);
    handleInputListener();
  }, []);

  const toggleSearch = () => setIsSearchExpanded(!isSearchExpanded);

  const handleSearch = async (text, type, addToHistory) => {
    const query = text.trim().replace(/ /g, '+');
    const wasSuccessful = await onSearch(query, type, addToHistory, text);
    setIsSearchExpanded(!wasSuccessful);
    setIsEnteringInput(false);
  }

  const prevChapRef = getPrevChapter();
  const nextChapRef = getNextChapter();

  const shouldDisplayNavBtn = !isSearchExpanded && passageSearchResults !== passageSearchResultsInitial;

  return (
    <div className="mobile-container">
      <Title isMobileView toggleSearch={toggleSearch} />
      <Row className="content-row">
        <Col s={12} className="col-wrapper display-col">

          {isLoading &&
            <Col s={12} className="loading-spinner-col">
              <Preloader />
            </Col>
          }

          {/* TODO make more DRY */}
          {isInitialState && !isLoading &&
            <div className="pre-search-msg">
              <img className="logo" src={Logo} alt="Just Scripture logo" height="100%" width="100%" />
              <p>Welcome to <span className="bold">Just Scripture</span>, a Bible app. Search passages, verses, and keywords in the ESV Bible.</p>
            </div>
          }

          {!isInitialState &&
            !isLoading &&
            passageSearchResults !== passageSearchResultsInitial &&
            passageSearchResults.passages &&
            passageSearchResults.passages.length > 0 &&

            <Row>
              <Col s={12}>
                <div className="passage-text">{passageSearchResults.passages}</div>
              </Col>

              <Col s={12}>
                <Copyright isMobileView />
              </Col>
            </Row>
          }

          {!isInitialState &&
            !isLoading &&
            keywordSearchResults !== keywordSearchResultsInitial &&
            keywordSearchResults.results &&
            keywordSearchResults.results.length > 0 &&

            <Row>
              <Col s={12}>
                <div className="results-count">{keywordSearchResults.total_results} results found</div>
              </Col>
              <Col s={12}>
                {keywordSearchResults.results.map(result => (
                  <KeywordResult key={`key-${result.reference}`} search={onSearch} {...result} />
                ))}
                <div>
                  <ReactPaginate
                    containerClassName="pagination"
                    activeClassName="active"
                    pageCount={keywordSearchResults.total_pages}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    initialPage={keywordSearchResults.page - 1}
                    disableInitialCallback
                    onPageChange={data => {
                      const pageNumber = data.selected + 1;
                      onSearch(keywordQuery, searchTypes.keyword, false, null, pageNumber)
                    }}
                  />
                </div>
              </Col>

              <Col s={12}>
                <Copyright isMobileView />
              </Col>
            </Row>
          }
        </Col>
      </Row>
      <NavigationBar
        isSearchExpanded={isSearchExpanded}
        shouldDisplayNavBtn={shouldDisplayNavBtn}
        prevChapRef={prevChapRef}
        nextChapRef={nextChapRef}
        onSearch={handleSearch}
        toggleSearch={toggleSearch}
        isInitialState={isInitialState}
        handleInputListener={handleInputListener}
        isEnteringInput={isEnteringInput}
        previousSearches={previousSearches}
      />
    </div>
  );
}