
import fetch from 'isomorphic-fetch';

import { goodreadsJSON } from './FetchUtils';

const BOOK_SEARCH_URL = '/goodreads?page=https://www.goodreads.com/search/index.xml?key=GFPTphT7xVUhrarWQztUtg&q=';

export function getBooks(query) {
  if (typeof query === 'undefined') {
    throw("No Argument");
  }

  const convertedQuery = encodeURIComponent(query);
  const fullUrl = `${BOOK_SEARCH_URL}${convertedQuery}`;

  return goodreadsJSON(fullUrl).then(rawData => {
    const searchResults = rawData['GoodreadsResponse']['search'][0]['results'][0]['work'];
    const convertedResults = searchResults.map((book) => {
      return {
        id: book['id'][0]['_'],
        year: book['original_publication_year'][0]['_'],
        rating: book['average_rating'][0],
        author: book['best_book'][0]['author'][0]['name'][0],
        image_url: book['best_book'][0]['image_url'][0]
      }
    });
    
    return (convertedResults);
  });
}
