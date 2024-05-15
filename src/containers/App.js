import React, { useState } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'; 
import { useMediaQuery } from 'react-responsive'
import MobileView from './MobileView';
import DesktopView from './DesktopView';
import Footer from '../common/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { searchTypes, keywordSearchResultsInitial, passageSearchResultsInitial } from '../helpers/constants';
import { getPassageResults, getKeywordResults } from '../utils/searchUtil';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialState, setIsInitialState] = useState(true);
  const [keywordSearchResults, setKeywordSearchResults] = useState(keywordSearchResultsInitial);
  const [passageSearchResults, setPassageSearchResults] = useState(passageSearchResultsInitial);
  const [previousSearches, setPreviousSearches] = useState([]);
  const [keywordQuery, setKeywordQuery] = useState('');

  const handleSearchHistory = (title, type, query) => {
    const doesAlreadyExist = previousSearches.filter(item => item.query === query);
    
    if (doesAlreadyExist.length === 0) {
      setPreviousSearches(prevState => [...prevState, {title, type, query}]);
    }
  }

  const handleKeyWordSearch = async(query, addToHistory, text, pageNumber) => {
    const data = await getKeywordResults(query, pageNumber);
    setKeywordSearchResults(data);
    setPassageSearchResults(passageSearchResultsInitial);
    setKeywordQuery(query);

    if (addToHistory) {
      text = text.charAt(0).toUpperCase() + text.slice(1)
      handleSearchHistory(text, searchTypes.keyword, query);
    }
  }

  const handlePassageSearch = async(query, addToHistory) => {
    const data = await getPassageResults(query);

    setPassageSearchResults(data);
    setKeywordSearchResults(keywordSearchResultsInitial);
    setKeywordQuery('');

    if (addToHistory) {
      handleSearchHistory(data.passage_meta[0].canonical, searchTypes.passages, query);
    }
  }

  const onSearch = async (query, type, addToHistory, text, pageNumber) => {
    let successfulSearch = true;
    setIsLoading(true);
    setIsInitialState(false);

    try {
      if (type === searchTypes.keyword) {
        await handleKeyWordSearch(query, addToHistory, text, pageNumber);
      } else {
        await handlePassageSearch(query, addToHistory);
      }

      window.location.hash = `${type}?q=${query}`;
    } catch(error) {
      console.error("ERROR: ", error);
      toast.error("Search failed. Please simplify your search and try again.", {
        autoClose:5000, 
        pauseOnHover: true,
      });
      successfulSearch = false;
    }
    setIsLoading(false);
    return successfulSearch;
  }

  const getPrevChapter = () => {
    const prevChapArr = passageSearchResults.passage_meta[0].prev_chapter;

    if (prevChapArr) return prevChapArr.join('-');
  }

  const getNextChapter = () => {
    const nextChapArr = passageSearchResults.passage_meta[0].next_chapter;

    if (nextChapArr) return nextChapArr.join('-');
  }

    const isDesktop = useMediaQuery({ query: '(min-width: 900px)' });
    
    return (
      <BrowserRouter>
        <div className="app-container">
          <main>
            <Switch>
              <Route 
                exact
                path='/justScripture' 
                render={props =>
                  isDesktop ? (
                    <DesktopView 
                      onSearch={onSearch}
                      getPrevChapter={getPrevChapter}
                      getNextChapter={getNextChapter}
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
                      onSearch={onSearch}
                      getPrevChapter={getPrevChapter}
                      getNextChapter={getNextChapter}
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
              {/* <Route exact path="/justScripture/privacyPolicy" component={PrivacyPolicy} /> */}
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
