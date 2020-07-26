import React, { useState } from 'react';
import { TextInput, Button, Row, Col, Icon } from 'react-materialize';
import { searchTypes } from '../helpers/constants';
import { Fade } from 'react-reveal';

function MobileSearch (props) {

    const { onSearch, viewMode, isSearchExpanded, toggleSearch } = props;
    const [text, setText] = useState('');
    const [type, setType] = useState(searchTypes.passages);

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(text, type);
        setText('');
    }

    return (
        <div className="mobile-search-container">
            <Row className="navigator-row">
                <Col s={1}>
                    <Icon>chevron_left</Icon>
                </Col>
                <Col s={10} className="search-toggle-col">
                    <div className="search-toggle-btn" onClick={toggleSearch}>
                        <Icon>{isSearchExpanded ? 'keyboard_arrow_down' : 'search'}</Icon>
                    </div>
                </Col>
                <Col s={1}>
                    <Icon>chevron_right</Icon>
                </Col>
            </Row>
            <Fade top duration={500} when={isSearchExpanded}>
                <div className={type === searchTypes.passages ? "wrapper passages": "wrapper keyword"}>
                    <Row className="type-row">
                        <Col s={10} m={8} className="type-col center-align" offset="s1 m2">
                            <Button
                                className={type === searchTypes.passages ? "type-btn passage-btn active" : "type-btn passage-btn"}
                                onClick={() => setType(searchTypes.passages)}
                            >
                                <Icon>bookmark_border</Icon>
                                {type === searchTypes.passages && "Passages"} 
                            </Button>
                            <Button
                                className={type === searchTypes.keyword ? "type-btn keyword-btn active" : "type-btn keyword-btn"}
                                onClick={() => setType(searchTypes.keyword)}
                            >
                                <Icon>all_inclusive</Icon>
                                {type === searchTypes.keyword && "Keyword"}
                            </Button>
                        
                            <form onSubmit={handleSearch}>
                                <Row>
                                    <Col s={10} offset="s1">
                                        <TextInput 
                                            s={12}
                                            value={text}
                                            placeholder={type === searchTypes.keyword ? "Repent" : "John 3:1-10"}
                                            onChange={(e) => setText(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col s={12} className="btn-wrapper">
                                        <Button 
                                            className="search-btn"
                                            type="submit"
                                            waves="light"
                                        >
                                            Search
                                        </Button>
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                    </Row>
                </div>
            </Fade>
        </div>
    );
}

export default MobileSearch;
