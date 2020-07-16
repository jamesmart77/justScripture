import { searchTypes } from '../helpers/constants';

export default function (location) {
    const { search, pathname } = location;
    const { keyword, passages } = searchTypes;

    const queryArr = search.split('q=');
    
    if (pathname === '/bibleApp' || queryArr.length === 1) return
    
    let response = {
        type: passages,
        query: queryArr[1],
    };
    
    if (pathname.includes(keyword)) {
        response.type = keyword;
    }

    return response;
}