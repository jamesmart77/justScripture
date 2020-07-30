import React, { Component } from 'react';
import { Row, Col, Icon } from 'react-materialize';
import { searchTypes, keywordSearchResultsInitial, passageSearchResultsInitial } from '../helpers/constants';
import { getPassageResults, getKeywordResults } from '../utils/searchUtil';
import { toast } from 'react-toastify';
import { Fade } from 'react-reveal';
import getLocationQuery from '../utils/getLocationQuery';
import Title from '../common/Title';
import MobileSearch from '../common/MobileSearch';
import Copyright from '../common/Copyright';
import KeywordResult from '../common/KeywordResult';

class MobileView extends Component {
  state = {
    isSearchExpanded: false,
    isInitialState: true,
    isEnteringInput: false,
    keywordSearchResults: keywordSearchResultsInitial,
    passageSearchResults: passageSearchResultsInitial,
  }

  componentDidMount(){
    const { location } = this.props;
    const data = getLocationQuery(location);
    
    if (data) {
      this.onSearch(data.query, data.type);
    } else {
      this.setState({isSearchExpanded: true});
    }
    this.handleInputListener();
  }

  toggleSearch = () => {
    const { isSearchExpanded } = this.state;
    this.setState({ isSearchExpanded: !isSearchExpanded });
  }

  onSearch = async (text, type) => {
    const { history } = this.props;
    const cleanedValue = text.trim().replace(/ /g, '+');

    await this.setState({isSearchExpanded: false});

    try {
      if (type === searchTypes.keyword) {
        const data = await getKeywordResults(cleanedValue);
        await this.setState({
          keywordSearchResults: data,
          passageSearchResults: passageSearchResultsInitial,
        });
      } else {
        const data = await getPassageResults(cleanedValue);
        await this.setState({
          passageSearchResults: data,
          keywordSearchResults: keywordSearchResultsInitial,
        });
      }
      history.push(`/bibleApp/${type}?q=${cleanedValue}`);
  
      this.setState({isInitialState: false});
    } catch(error) {
      console.error("ERROR: ", error);
      toast.error("Search failed. Please simplify your search and try again.");
    }
  }

  getPrevChapter = () => {
    const { passageSearchResults } = this.state;
    const prevChapArr = passageSearchResults.passage_meta[0].prev_chapter;

    return prevChapArr.join('-');
  }

  getNextChapter = () => {
    const { passageSearchResults } = this.state;
    const nextChapArr = passageSearchResults.passage_meta[0].next_chapter;

    return nextChapArr.join('-');
  }

  handleInputListener = () => {
    if (window.screen.height > 700) return;
    
    const _this = this;
  
    // wait for DOM to paint before running listener dependent code.
    window.requestAnimationFrame(function() {
      const searchInput = document.getElementById('search');

      if (searchInput) {
        searchInput.addEventListener('focus', () => {
            _this.setState({isEnteringInput: true});  
          });
          
          searchInput.addEventListener('blur', () => {
            _this.setState({isEnteringInput: false});  
        });
      }
    })
  }


  render() {
    const { 
      isSearchExpanded, 
      passageSearchResults,
      keywordSearchResults,
      isInitialState,
      isEnteringInput,
    } = this.state;

    const prevChapRef = this.getPrevChapter();
    const nextChapRef = this.getNextChapter();
    const shouldDisplayNavBtn = !isSearchExpanded && passageSearchResults !== passageSearchResultsInitial;

    return (
      <div className="mobile-container">
        <Title isMobileView toggleSearch={this.toggleSearch} />
        <Row className="content-row">
          <Col s={12} className="col-wrapper display-col">

            {/* TODO make more DRY */}
            { isInitialState && 
              <Fade top duration={2000}>
                <div className="pre-search-msg">
                  <p>Welcome to the Bible App. Search passages, verses, and keywords in the ESV Bible.</p>
                </div>
              </Fade>
            }

            { !isInitialState && 
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
              keywordSearchResults !== keywordSearchResultsInitial &&
              keywordSearchResults.results &&
              keywordSearchResults.results.length > 0 &&

               <Row>
                 <Col s={12}>
                   <div className="results-count">{keywordSearchResults.total_results} results found</div>
                 </Col>
                 <Col s={12}>
                    {keywordSearchResults.results.map(result => (
                      <KeywordResult key={`key-${result.reference}`} search={this.onSearch} {...result} />
                    ))}
                 </Col>

                 <Col s={12}>
                   <Copyright isMobileView />
                 </Col>
               </Row>
            } 
          </Col>
        </Row>
        <Row className="navigator-row">
            { isSearchExpanded &&
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
              <Fade bottom duration={750} when={isSearchExpanded}>
                {isSearchExpanded &&
                  <MobileSearch 
                    isEnteringInput={isEnteringInput}
                    onSearch={this.onSearch} 
                  />
                }
              </Fade>
            </Col>
            <Col s={3}>
                {shouldDisplayNavBtn &&
                  <div
                    className="chapter-nav"
                    role="button"
                    tabIndex={0}
                    onClick={() => this.onSearch(prevChapRef, searchTypes.passages)}
                    onKeyPress={() => this.onSearch(prevChapRef, searchTypes.passages)}
                    title="Previous Chapter"
                  >
                    <Icon>chevron_left</Icon>
                  </div>
                }
            </Col>
            <Col s={6} className="search-toggle-col">
                <div className="search-toggle-btn" onClick={this.toggleSearch}>
                    <Icon>{isSearchExpanded ? 'keyboard_arrow_down' : 'search'}</Icon>
                </div>
            </Col>
            <Col s={3}>
                {shouldDisplayNavBtn ? (
                  <div
                    className="chapter-nav nav-right"
                    role="button"
                    tabIndex={0}
                    onClick={() => this.onSearch(nextChapRef, searchTypes.passages)}
                    onKeyPress={() => this.onSearch(nextChapRef, searchTypes.passages)}
                    title="Next Chapter"
                  >
                    <Icon>chevron_right</Icon>
                  </div>
                ) : (
                  <></>
                )}
            </Col>
        </Row>
      </div>
    );
  }
}

export default MobileView;
