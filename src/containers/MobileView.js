import React, { Component } from 'react';
import { Row, Col, Preloader } from 'react-materialize';
import { keywordSearchResultsInitial, passageSearchResultsInitial } from '../helpers/constants';
import { Fade } from 'react-reveal';
import getLocationQuery from '../utils/getLocationQuery';
import Title from '../common/Title';
import NavigationBar from '../components/mobile/NavigationBar';
import Copyright from '../common/Copyright';
import KeywordResult from '../common/KeywordResult';
import ReactPaginate from 'react-paginate';
import { searchTypes } from '../helpers/constants';

class MobileView extends Component {
  state = {
    isSearchExpanded: false,
    isEnteringInput: false,
  }

  componentDidMount(){
    const { location, onSearch } = this.props;
    const data = getLocationQuery(location);
    
    if (data) {
      onSearch(data.query, data.type);
    } else {
      this.setState({isSearchExpanded: true});
    }
    this.handleInputListener();
  }

  toggleSearch = () => {
    const { isSearchExpanded } = this.state;
    this.setState({ isSearchExpanded: !isSearchExpanded });
  }

  handleSearch = async (text, type, addToHistory) => {
    const { onSearch } = this.props;

    const query = text.trim().replace(/ /g, '+');
    const wasSuccessful = await onSearch(query, type, addToHistory, text);

    this.setState({
      isSearchExpanded: !wasSuccessful,
      isEnteringInput: false,
    });
  }

  handleInputListener = () => {
    if (window.screen.height > 700) return;
    
    const _this = this;
  
    /* 
    wait for DOM to paint before running listener dependent code.
    need to modify CSS for devices < 700 px high for input visibility
    */
    window.requestAnimationFrame(function() {
      const searchInput = document.getElementById('search');

      if (searchInput) {
        searchInput.addEventListener('focus', () => {
            _this.setState({isEnteringInput: true});  
          });
      }
    })
  }


  render() {
    const { isSearchExpanded, isEnteringInput } = this.state;

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
    } = this.props;

    const prevChapRef = getPrevChapter();
    const nextChapRef = getNextChapter();

    const shouldDisplayNavBtn = !isSearchExpanded && passageSearchResults !== passageSearchResultsInitial;

    return (
      <div className="mobile-container">
        <Title isMobileView toggleSearch={this.toggleSearch} />
        <Row className="content-row">
          <Col s={12} className="col-wrapper display-col">

            { isLoading && 
              <Col s={12} className="loading-spinner-col">
                <Preloader />
              </Col>
            }

            {/* TODO make more DRY */}
            { isInitialState && !isLoading &&
              <Fade top duration={2000}>
                <div className="pre-search-msg">
                  <p>Welcome to the Bible App. Search passages, verses, and keywords in the ESV Bible.</p>
                </div>
              </Fade>
            }

            { !isInitialState && 
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

            { !isInitialState && 
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
          onSearch={this.handleSearch}
          toggleSearch={this.toggleSearch}
          isInitialState={isInitialState}
          isEnteringInput={isEnteringInput}
          previousSearches={previousSearches}
        />
      </div>
    );
  }
}

export default MobileView;
