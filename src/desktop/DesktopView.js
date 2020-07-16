import React, { Component } from 'react';
import { Row, Col, Collapsible, CollapsibleItem, Icon, Preloader } from 'react-materialize';
import Title from '../common/Title';
import Search from '../common/Search';
import Copyright from '../common/Copyright';
import { searchTypes } from '../helpers/constants';
import { getPassageResults, getKeywordResults } from '../utils/searchUtil';
import { toast } from 'react-toastify';
import { Fade } from 'react-reveal';
import getLocationQuery from '../utils/getLocationQuery';

class DesktopView extends Component {
  state = {
    isPassageExpanded: true,
    isKeywordExpanded: false,
    isLoading: false,
    isInitialState: true,
    keywordSearchResults: {
      total_results: 0,
      results: [
        {
          reference: "",
          content: ""
        },
      ],
    },
    passageSearchResults: {
      passage_meta: [
        {
          canonical: "",
          chapter_start: [],
          chapter_end: [],
          prev_verse: 0,
          next_verse: 0,
          prev_chapter: [],
          next_chapter: []
        }
      ],
      passages: "",
    },
  }

  componentDidMount(){
    const { location } = this.props;
    const data = getLocationQuery(location);
    
    if (data) {
      this.onSearch(data.query, data.type);
    }
  }

  onSearch = async (text, type) => {
    const { history } = this.props;
    const cleanedValue = text.trim().replace(' ', '+');

    this.setState({
      isLoading: true,
      isInitialState: false,
    });

    try {
      if (type === searchTypes.keyword) {
        const data = await getKeywordResults(cleanedValue);

        await this.setState({keywordSearchResults: data});
      } else {
        const data = await getPassageResults(cleanedValue);
        await this.setState({passageSearchResults: data});
      }
    } catch(error) {
      console.error("ERROR: ", error);
      toast.error("Search failed. Please simplify your search and try again.");
    }

    history.push(`/bibleApp/${type}?q=${cleanedValue}`);

    this.setState({isLoading: false});
  }


  render() {
    const { 
      isPassageExpanded, 
      isKeywordExpanded, 
      isLoading,
      passageSearchResults,
      isInitialState,
    } = this.state;

    return (
      <div className="desktop-container">
        <Row className="row-wrapper">
          <Col xl={3} m={4} className="col-wrapper search-col">
            <Fade left>
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
                  <Search type={searchTypes.passages} onSearch={this.onSearch}/>
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
                  <Search type={searchTypes.keyword} onSearch={this.onSearch}/>
                </CollapsibleItem>
              </Collapsible>
              </Fade>
          </Col>
          <Col xl={9} m={8} className="col-wrapper display-col">
            { isLoading && !isInitialState &&
              <Preloader className="loading-spinner" />
            }

            { isInitialState && !isLoading &&
              <Fade top duration={2000}>
                <div className="pre-search-msg">
                  <p>Welcome to the Bible App. Search passages, verses, and keywords in the ESV Bible.</p>
                  <Icon>search</Icon>
                </div>
              </Fade>
            }

            { !isInitialState && 
              !isLoading && 
              passageSearchResults.passages &&
              passageSearchResults.passages.length > 0 &&

              <Row>
                <Col s={12}>
                  <div className="passage-text">{passageSearchResults.passages}</div>
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
