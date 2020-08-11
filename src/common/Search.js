import React, { useState } from 'react';
import { TextInput, Button, Row, Col, Icon, Switch } from 'react-materialize';
import { searchTypes } from '../helpers/constants';

function Search (props) {

    const { type, onSearch, viewMode } = props;
    const [text, setText] = useState('');
    const [isExact, setIsExact] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        const addToHistory = true;
        let updatedText = text;
        
        if (isExact) {
            updatedText = `"${text}"`;
        }    
        
        onSearch(updatedText, type, addToHistory);
        setText('');
    }

    return (
        <div className="search-container">
            <form onSubmit={handleSearch}>
                <TextInput 
                    s={12}
                    value={text}
                    placeholder={type === searchTypes.keyword ? "Repent" : "John 3:1-10"}
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
