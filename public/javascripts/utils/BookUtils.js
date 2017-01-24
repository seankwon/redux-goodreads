import { escape } from 'querystring';
import fetch from 'isomorphic-fetch';
import convert from 'xml-to-json-promise'

const BOOK_SEARCH_URL = 'https://www.goodreads.com/search/index.xml?key=' + process.env.GOODREADS_API_KEY + '&q=';

//TODO move function to universal file
function goodreadsJSON(url) {
  function fetchGoodreadsXml(url) {
    return fetch(url)
      .then(response => response.text())
      .then(data => Promise.resolve(data));
  }
  //TODO perhaps Promise.resolve(convert...);
  return fetchGoodreadsXml(url)
    .then(data => convert.xmlDataToJSON(data)
      .then(json => {
        return json;
      }));
}

export function getBooks(query) {
  if (typeof query === 'undefined') {
    throw("No Argument");
  }

  const convertedQuery = escape(query);
  const fullUrl = `${BOOK_SEARCH_URL}${convertedQuery}`;

  return goodreadsJSON(fullUrl).then(rawData => {
    const searchResults = rawData['GoodreadsResponse']['search'][0]['results'][0]['work'];
    searchResults.map((book) => {
      console.log(book['id'][0]['_']);
      //XXX Left off in this parsing mess.
      return {
        id: book['id'][0]['_'],
        year: book.original_publication_year,
        rating: book.average_rating,
        author: book.best_book.author.name,
        image_url: book.best_book.image_url
      }
    });
  });
}
