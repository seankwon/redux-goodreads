export const REQUEST_BOOKS = 'REQUEST_BOOKS';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';
import { getBooks } from '../utils/BookUtils'

export const requestBooks = (query) => ({
  type: REQUEST_BOOKS,
  isFetching: true,
  active: false,
  query
});

export const receiveBooks = (books, query) => ({
  type: RECEIVE_BOOKS,
  books,
  query
});

function fetchBooks(query) {
  dispatch(requestBooks(query));
  
  return (dispatch, getState) => {
    getBooks(query).then(data => dispatch(receiveBooks(data, query)));
  }
}

function shouldFetchBooks(searches, activePage) {
  //TODO case for a search that is active.
  function alreadyFetching(searches) {
    return searches.find((search) => search.ifFetching).length > 0;
  }

  function noActivePages(activePage) {
    return activePage.length < 0;
  } 
  
  return (searches.length < 0 || alreadyFetching(searches) || noActivePages(activePage));
}

export function fetchBooksIfNeeded(query) {
  return (dispatch, getState) => {
    const { searches, activePage } = getState();
    if (shouldFetchBooks(searches)) {
      return dispatch(fetchBooks(query));
    }
  }
}
