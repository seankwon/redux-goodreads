export const REQUEST_BOOKS = 'REQUEST_BOOKS';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';
import { getBooks } from '../utils/BookUtils';
import { dispatch } from 'redux';

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
  return (dispatch, getState) => {
    getBooks(query).then(data => dispatch(receiveBooks(data, query)));
  }
}

function shouldFetchBooks(searches, activePage, isFetching) {
  //TODO configure this

  function noActivePages(activePage) {
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
