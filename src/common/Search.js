import React, { useState } from 'react';
import { TextInput, Button, Row, Col, Icon } from 'react-materialize';
import { searchTypes } from '../helpers/constants';

function Search (props) {

    const { type, onSearch, viewMode } = props;
    const [text, setText] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(text, type);
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
