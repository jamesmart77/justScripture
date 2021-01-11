import React, { useState } from 'react';
import { Autocomplete, TextInput, Button, Row, Col, Icon, Switch } from 'react-materialize';
import { searchTypes } from '../../helpers/constants';
import ExactPhraseTip from '../../common/ExactPhraseTip';
import bibleBooks from '../../utils/bibleBooks.json';

function Search (props) {

    const { type, onSearch } = props;
    const [text, setText] = useState('');
    const [isExact, setIsExact] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        let updatedText = text;
        
        if (isExact) {
            updatedText = `"${text}"`;
        };
        
        const query = updatedText.trim().replace(/ /g, '+');
        
        onSearch(query, type, true, text);
        setText('');
    }

    const handleAutocomplete = (value) => {
        setText(value);
        document.getElementById("passage-auto-id").focus();
    }

    return (
        <div className="search-container">
            <form onSubmit={handleSearch}>
                {type === searchTypes.passages ? (
                    <Autocomplete
                        id="passage-auto-id"
                        className="passage-autocomplete"
                        s={12}
                        placeholder="Jn 3:1-10"
                        value={text}
                        onChange={(e) => setText(e.target.value)} // typing change
                        options={{
                            data: bibleBooks,
                            onAutocomplete: handleAutocomplete, // autocomplete change
                        }}
                  />
                ) : (
                    <TextInput 
                        s={12}
                        value={text}
                        placeholder="Repent"
                        onChange={(e) => setText(e.target.value)}
                    />
                )}

                { type === searchTypes.keyword &&
                    <Col s={12} className="switch-wrapper">
                        <Switch 
                            id="exact-switch"
                            offLabel="Loose Phrase"
                            onChange={() => setIsExact(!isExact)}
                            onLabel="Exact Phrase"
                            value={isExact ? 'Exact Phrase' : 'Loose Phrase'}
                        />
                        <Button
                            tooltip={ExactPhraseTip}
                            className="info-btn"
                        >
                            <Icon>info_outline</Icon>
                        </Button>
                    </Col>
                }
                <Row>
                    <Col s={12} className="btn-wrapper">
                        <Button 
                            className="search-btn"
                            type="submit"
                            waves="light"
                        >
                            <Icon className="icon">search</Icon>
                            Search
                        </Button>
                    </Col>
                </Row>
            </form>
        </div>
    );
}

export default Search;
