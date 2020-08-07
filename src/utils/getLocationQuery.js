import { searchTypes } from '../helpers/constants';

export default function (location) {
    const { hash } = location;
    const { keyword, passages } = searchTypes;

    const queryArr = hash.split('q=');
    
    if (hash === '' || queryArr.length === 1) return
    
    let response = {
        type: passages,
        query: queryArr[1],
    };
    
    if (hash.includes(keyword)) {
        response.type = keyword;
    }

    return response;
}