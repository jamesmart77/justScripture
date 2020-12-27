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
    const additionalParams = '&include-short-copyright=false&include-first-verse-numbers=false&include-chapter-numbers=false'
    const { data }  = await axios.get(`https://api.esv.org/v3/passage/html/?q=${query}${additionalParams}`, config);
    
    if (data.passages.length === 0 ) throw new Error(`Invalid search. Query: ${query}`);
    
    data.passages = ReactHtmlParser(data.passages[0]);
    return data;
}

const getKeywordResults = async (query, pageNumber) => {
    const page = pageNumber || 1;
    const { data } = await axios.get(`https://api.esv.org/v3/passage/search/?q=${query}&page-size=25&page=${page}`, config);
    
    if (data.results.length === 0 ) throw new Error(`Invalid search. Query: ${query}`);
    
    return data;
}

// async function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

export { getPassageResults, getKeywordResults};

/*
 - add pagination for keyword search results and set
 - add search results sort OT/NT --> ASC/DESC
*/