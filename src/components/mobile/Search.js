import React, { useState } from 'react';
import { Autocomplete, TextInput, Button, Row, Col, Icon } from 'react-materialize';
import { searchTypes } from '../../helpers/constants';
import bibleBooks from '../../utils/bibleBooks.json';

function Search (props) {

    const { onSearch, isEnteringInput, handleInputListener } = props;
    const [text, setText] = useState('');
    const [type, setType] = useState(searchTypes.passages);

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(text, type, true);
        setText(''); 
    }

    const handleAutocomplete = (value) => {
        setText(value);

        // needed to bring input above keyboard on mobile devices
        handleInputListener();
        document.getElementById("passage-auto-id").focus();
    }

    return (
        <div className="mobile-search-container">
            <div className={type === searchTypes.passages ? "wrapper passages": "wrapper keyword"}>
                <Row className={isEnteringInput ? "type-row no-padding-bottom" : "type-row"}>
                    <Col 
                        className={isEnteringInput ? "type-col no-padding-bottom" : "type-col"} 
                        s={10} 
                        m={8} 
                        offset="s1 m2"
                    >
                        <Button
                            className={type === searchTypes.passages ? "type-btn passage-btn active" : "type-btn passage-btn"}
                            onClick={() => setType(searchTypes.passages)}
                            onKeyPress={() => setType(searchTypes.passages)}
                        >
                            {type === searchTypes.passages &&
                                <Icon>bookmark_border</Icon>
                            }
                            Passages
                        </Button>
                        <Button
                            className={type === searchTypes.keyword ? "type-btn keyword-btn active" : "type-btn keyword-btn"}
                            onClick={() => setType(searchTypes.keyword)}
                            onKeyPress={() => setType(searchTypes.keyword)}
                        >
                            {type === searchTypes.keyword &&
                                <Icon>search</Icon>
                            }
                            Keyword
                        </Button>
                    
                        <form onSubmit={handleSearch}>
                            <Row>
                                <Col s={10} offset="s1">
                                {type === searchTypes.passages ? (
                                    <Autocomplete
                                        id="passage-auto-id"
                                        s={12}
                                        placeholder="Jn 3:1-10"
                                        className="passage-autocomplete"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        options={{
                                            data: bibleBooks,
                                            onAutocomplete: handleAutocomplete, // autocomplete change
                                        }}
                                    />
                                ) : (
                                    <TextInput 
                                        id="search"
                                        s={12}
                                        value={text}
                                        placeholder={type === searchTypes.keyword ? "Repent" : "John 3:1-10"}
                                        onChange={(e) => setText(e.target.value)}
                                    />
                                )}
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
        </div>
    );
}

export default Search;
