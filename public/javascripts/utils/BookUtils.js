import { escape } from 'querystring';
import fetch from 'isomorphic-fetch';
import convert from 'xml-to-json-promise';
import { goodreadsJSON } from './BookUtils';

const BOOK_SEARCH_URL = 'https://www.goodreads.com/search/index.xml?key=GFPTphT7xVUhrarWQztUtg&q=';

export function getBooks(query) {
  if (typeof query === 'undefined') {
    throw("No Argument");
  }

  const convertedQuery = escape(query);
  const fullUrl = `${BOOK_SEARCH_URL}${convertedQuery}`;

  return goodreadsJSON(fullUrl).then(rawData => {
    const searchResults = rawData['GoodreadsResponse']['search'][0]['results'][0]['work'];
    searchResults.map((book) => {
      //XXX Left off in this parsing mess.
      return {
        id: book['id'][0]['_'],
        year: book['original_publication_year'][0]['_'],
        rating: book['average_rating'][0],
        author: book['best_book'][0]['author'][0]['name'][0],
        image_url: book['best_book'][0]['image_url'][0]
      }
    });
  });
}
