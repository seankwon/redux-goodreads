export const REQUEST_BOOKS = 'REQUEST_BOOKS';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';

export const requestBooks = (query) => ({
  type: REQUEST_BOOKS,
  query
});

export const receiveBooks = (books) => ({
  type: RECEIVE_BOOKS,
  books
})

function fetchBooks() {
  //TODO
  return (dispatch, getState) => {
    return undefined;
  }
}

function shouldFetchBooks(books) {
  return (!books.isFetching || books.length < 0);
}

export function fetchBooksIfNeeded(query) {
  return (dispatch, getState) => {
    const { books } = getState();
    if (shouldFetchBooks(books)) {
      return dispatch(fetchbooks(query));
    }
  }
}
