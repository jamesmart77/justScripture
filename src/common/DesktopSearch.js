import React, { useState } from 'react';
import { TextInput, Button, Row, Col, Icon, Switch } from 'react-materialize';
import { searchTypes } from '../helpers/constants';
import ExactPhraseTip from './ExactPhraseTip';

function Search (props) {

    const { type, onSearch, viewMode } = props;
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

    return (
        <div className="search-container">
            <form onSubmit={handleSearch}>
                <TextInput 
                    s={12}
                    value={text}
                    placeholder={type === searchTypes.keyword ? "Repent" : "Jn 3:1-10"}
                    onChange={(e) => setText(e.target.value)}
                />

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
                            className={`${viewMode} search-btn`}
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
