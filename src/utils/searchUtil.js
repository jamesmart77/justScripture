import axios from 'axios';
import parse from 'html-react-parser';
import { replace } from './htmlTransform';

const config = {
    proxy: false,
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Token ',
    },
};

const passageParams = (isForCrossRef) => {
    if (isForCrossRef) {
        return `&include-short-copyright=false&include-first-verse-numbers=false&include-chapter-numbers=false
        &include-footnotes=false&include-headings=false&include-subheadings=false&include-audio-link=false`
    }

    return '&include-short-copyright=false&include-first-verse-numbers=false&include-chapter-numbers=false&include-crossrefs=true'
}

const getPassageResults = async (query, isForCrossRef = false) => {
    const additionalParams = passageParams(isForCrossRef)
    const { data }  = await axios.get(`https://api.esv.org/v3/passage/html/?q=${query}${additionalParams}`, config);
    
    if (data.passages.length === 0 ) throw new Error(`Invalid search. Query: ${query}`);
    
    data.passages = data.passages.map(passage => {
        const res = parse(passage, { 
            replace 
        });

        console.log({res});
        return res
    }) 

    console.log(data.passages);
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