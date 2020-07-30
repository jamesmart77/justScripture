import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

const config = {
    proxy: false,
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Token ',
    },
};

const getPassageResults = async (query) => {
    const { data }  = await axios.get(`https://api.esv.org/v3/passage/html/?q=${query}`, config);
    
    if (data.passages.length === 0 ) throw new Error(`Invalid search. Query: ${query}`);
    
    data.passages = ReactHtmlParser(data.passages[0]);
    return data;
}

const getKeywordResults = async (query) => {
    const { data } = await axios.get(`https://api.esv.org/v3/passage/search/?q=${query}&page-size=100`, config);
    
    if (data.results.length === 0 ) throw new Error(`Invalid search. Query: ${query}`);
    
    return data;
}

export { getPassageResults, getKeywordResults};