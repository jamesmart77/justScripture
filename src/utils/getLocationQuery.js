import { searchTypes } from '../helpers/constants';

export default function () {
    const queryString = window.location.search;
    const path = window.location.pathname;
    
    const queryArr = queryString.split('q=');
    console.log("query: ", queryArr)
    
    if (path === '/bibleApp' || queryArr.length === 1) return
    
    if (path.includes('passage')) {
        return {
            type: searchTypes.passages,
            query: queryArr[1],
        }
    } else {
        return {
            type: searchTypes.keyword,
            query: queryArr[1],
        }
    }
}