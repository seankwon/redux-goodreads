export const REQUEST_BOOKS = 'REQUEST_BOOKS';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';
import { getBooks } from '../utils/BookUtils';
import { dispatch } from 'redux';

//TODO: [] - need action to grab info for individual pages

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

//TODO: transfer utility functions somewhere else
export function notEmpty(array) {
  return array.length > 0;
}

export function isEmpty(array) {
  return array.length === 0;
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
