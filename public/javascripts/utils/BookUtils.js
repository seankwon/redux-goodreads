import fetch from 'isomorphic-fetch';
import { dispatch } from 'redux';
import { requestBooks, receiveBooks } from '../actions/LibraryActions';
import { goodreadsJSON } from './FetchUtils';
import { isEmpty, notEmpty } from './ArrayUtils';
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
        image_url: book['best_book'][0]['image_url'][0],
        title: book['best_book'][0]['title'][0]
      }
    });
    
    return (convertedResults);
  });
}

export function cachedSearch(query, searches) {
  return searches.filter((search) => {
    return search.query === query && notEmpty(search.books);
  });
}

//TODO: Plase fetch functions into different functions.
function fetchBooks(query) {
  return (dispatch, getState) => {
    const cachedBook = cachedSearch(query, getState().library.searches);

    if (isEmpty(cachedBook)) {
      getBooks(query).then(data => dispatch(receiveBooks(data, query)));
      return;
    }
    
    return dispatch(receiveBooks(cachedBook[0].books, query));
  }
}

function shouldFetchBooks(searches, activePage, isFetching) {
  //FIXME: - This needs serveral more cases.
  
  function noActivePages(activePage) {
    //TODO: make exportable later
    return typeof activePage.book === 'undefined';
  }

  return (searches.length < 0 || isFetching || noActivePages(activePage));
}

export function fetchBooksIfNeeded(query) {
  return (dispatch, getState) => {
    const { searches, activePage, isFetching } = getState().library;
    if (shouldFetchBooks(searches, activePage, isFetching)) {
      dispatch(requestBooks(query));
      return dispatch(fetchBooks(query));
    }
  }
}
