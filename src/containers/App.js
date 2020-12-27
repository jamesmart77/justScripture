import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import withSizes from 'react-sizes'
import MobileView from './MobileView';
import DesktopView from './DesktopView';
import Footer from '../common/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { searchTypes, keywordSearchResultsInitial, passageSearchResultsInitial } from '../helpers/constants';
import { getPassageResults, getKeywordResults } from '../utils/searchUtil';

class App extends Component {
  state = {
    isLoading: false,
    isInitialState: true,
    keywordSearchResults: keywordSearchResultsInitial,
    passageSearchResults: passageSearchResultsInitial,
    previousSearches: [],
    keywordQuery: '',
  }

  handleSearchHistory = (title, type, query) => {
    const { previousSearches } = this.state;
    const doesAlreadyExist = previousSearches.filter(item => item.query === query);
    
    if (doesAlreadyExist.length === 0) {
      previousSearches.push({title, type, query});
      this.setState({ previousSearches: [...previousSearches] });
    }
  }

  handleKeyWordSearch = async(query, addToHistory, text, pageNumber) => {
    const data = await getKeywordResults(query, pageNumber);
    await this.setState({
      keywordSearchResults: data,
      passageSearchResults: passageSearchResultsInitial,
      keywordQuery: query,
    });

    if (addToHistory) {
      text = text.charAt(0).toUpperCase() + text.slice(1)
      this.handleSearchHistory(text, searchTypes.keyword, query);
    }
  }

  handlePassageSearch = async(query, addToHistory) => {
    const data = await getPassageResults(query);
    await this.setState({
      passageSearchResults: data,
      keywordSearchResults: keywordSearchResultsInitial,
      keywordQuery: '',
    });

    if (addToHistory) {
      this.handleSearchHistory(data.passage_meta[0].canonical, searchTypes.passages, query);
    }
  }

  onSearch = async (query, type, addToHistory, text, pageNumber) => {
    let successfulSearch = true;
    this.setState({
      isLoading: true,
      isInitialState: false,
    });

    try {
      if (type === searchTypes.keyword) {
        await this.handleKeyWordSearch(query, addToHistory, text, pageNumber);
      } else {
        await this.handlePassageSearch(query, addToHistory);
      }

      window.location.hash = `${type}?q=${query}`;

      this.setState({isInitialState: false});
    } catch(error) {
      console.error("ERROR: ", error);
      toast.error("Search failed. Please simplify your search and try again.", {
        autoClose:5000, 
        pauseOnHover: true,
      });
      successfulSearch = false;
    }
    this.setState({isLoading: false});
    return successfulSearch;
  }

  getPrevChapter = () => {
    const { passageSearchResults } = this.state;
    const prevChapArr = passageSearchResults.passage_meta[0].prev_chapter;

    if (prevChapArr) return prevChapArr.join('-');
  }

  getNextChapter = () => {
    const { passageSearchResults } = this.state;
    const nextChapArr = passageSearchResults.passage_meta[0].next_chapter;

    if (nextChapArr) return nextChapArr.join('-');
  }


  render() {
    const { isDesktop } = this.props;
    const {
      isLoading,
      isInitialState,
      keywordSearchResults,
      passageSearchResults,
      previousSearches,
      keywordQuery,
    } = this.state;
    
    return (
      <BrowserRouter>
        <div className="app-container">
          <main>
            <Switch>
              <Route 
                path='/justScripture' 
                render={props =>
                  isDesktop ? (
                    <DesktopView 
                      onSearch={this.onSearch}
                      getPrevChapter={this.getPrevChapter}
                      getNextChapter={this.getNextChapter}
                      isLoading={isLoading}
                      isInitialState={isInitialState}
                      keywordSearchResults={keywordSearchResults}
                      passageSearchResults={passageSearchResults}
                      previousSearches={previousSearches}
                      keywordQuery={keywordQuery}
                      {...props}
                    />
                  ) : (
                    <MobileView 
                      onSearch={this.onSearch}
                      getPrevChapter={this.getPrevChapter}
                      getNextChapter={this.getNextChapter}
                      isLoading={isLoading}
                      isInitialState={isInitialState}
                      keywordSearchResults={keywordSearchResults}
                      passageSearchResults={passageSearchResults}
                      previousSearches={previousSearches}
                      keywordQuery={keywordQuery}
                      {...props}
                    />
                  )
                }
              />
            </Switch>
          </main>

          { isDesktop && 
            <Footer />
          }

          <ToastContainer /> 
        </div>
      </BrowserRouter>
    );
  }
}

const mapSizesToProps = ({ width }) => ({
  isDesktop: width >= 900,
})

export default withSizes(mapSizesToProps)(App);
