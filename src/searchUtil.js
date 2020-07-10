import axios from 'axios';

const config = {
    proxy: false,
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Token ',
    },
};

const getPassageResults = async (query) => {
    const { data }  = await axios.get(`https://api.esv.org/v3/passage/text/?q=${query}`, config);
    return data;
}

const getKeywordResults = async (query) => {
    console.log("Searching...: ", query)
    const { data } = await axios.get(`https://api.esv.org/v3/passage/search/?q=${query}`, config);
    console.log("Data: ", data)
    return data;
}

export { getPassageResults, getKeywordResults};