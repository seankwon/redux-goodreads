export const REQUEST_BOOKS = 'REQUEST_BOOKS';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';

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
  //TODO finish implmentation of function
  return (dispatch, getState) => {
    return undefined;
  }
}

function shouldFetchBooks(books) {
  return (books.length < 0);
}

export function fetchBooksIfNeeded(query) {
  return (dispatch, getState) => {
    const { books } = getState();
    if (shouldFetchBooks(books)) {
      return dispatch(fetchBooks(query));
    }
  }
}
