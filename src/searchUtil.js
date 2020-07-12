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
    data.passages = ReactHtmlParser(data.passages[0]);
    return data;
}

const getKeywordResults = async (query) => {
    console.log("Searching...: ", query)
    const { data } = await axios.get(`https://api.esv.org/v3/passage/search/?q=${query}`, config);
    console.log("Data: ", data)
    return data;
}

export { getPassageResults, getKeywordResults};