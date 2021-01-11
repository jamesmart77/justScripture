import React, { Component } from 'react';
import { Row, Col, Collapsible, CollapsibleItem, Icon, Preloader } from 'react-materialize';
import { searchTypes, keywordSearchResultsInitial, passageSearchResultsInitial } from '../helpers/constants';
import { Fade } from 'react-reveal';
import getLocationQuery from '../utils/getLocationQuery';
import Title from '../common/Title';
import Search from '../components/desktop/Search';
import Copyright from '../common/Copyright';
import KeywordResult from '../common/KeywordResult';
import ReadingTimeSvg from '../images/readingTime.svg';
import SearchHistory from '../components/desktop/SearchHistory';
import ReactPaginate from 'react-paginate';

class DesktopView extends Component {
  state = {
    isPassageExpanded: true,
    isKeywordExpanded: false,
  }

  componentDidMount(){
    const { location, onSearch } = this.props;
    const data = getLocationQuery(location);
    
    if (data) {
      onSearch(data.query, data.type);
    }
  }

  render() {
    const { 
      isPassageExpanded, 
      isKeywordExpanded, 
    } = this.state;

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
    } = this.props;

    const prevChapRef = getPrevChapter();
    const nextChapRef = getNextChapter();

    return (
      <div className="desktop-container">
        <Row className="row-wrapper">
          <Col xl={3} l={4} className="col-wrapper search-col">
            <Title />
            <Collapsible>
              <CollapsibleItem 
                header="Passages" 
                expanded={true} 
                node="div"
                onClick={() => this.setState({ 
                  isKeywordExpanded: false,
                  isPassageExpanded: !isPassageExpanded,
                })}
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
                onClick={() => this.setState({ 
                  isKeywordExpanded: !isKeywordExpanded,
                  isPassageExpanded: false,
                })}
                icon={isKeywordExpanded ? <Icon>keyboard_arrow_down</Icon> : <Icon>keyboard_arrow_right</Icon>}
              >
                <Search 
                  type={searchTypes.keyword} 
                  onSearch={onSearch}
                />
              </CollapsibleItem>
            </Collapsible>
            <Fade left>
              <SearchHistory
                previousSearches={previousSearches}
                onSearch={onSearch}
              />
            </Fade>
          </Col>
          <Col xl={9} l={8} className="col-wrapper display-col">
            { isLoading && !isInitialState &&
              <Preloader className="loading-spinner" />
            }

            { isInitialState && !isLoading &&
              <Fade top duration={2000}>
                <div className="pre-search-msg">
                  <p>Welcome to Just Scripture - a bible app. Search passages, verses, and keywords in the ESV Bible.</p>
                  <img src={ReadingTimeSvg} alt="woman sitting under lamp reading book" />
                </div>
              </Fade>
            }

            { !isInitialState && 
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
                      onKeyPress={() => onSearch(prevChapRef, searchTypes.passages)}
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
                    onKeyPress={() => onSearch(nextChapRef, searchTypes.passages)}
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
            }
          </Col>
        </Row>
      </div>
    );
  }
}

export default DesktopView;
