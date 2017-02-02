export const REQUEST_BOOKS = 'REQUEST_BOOKS';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';

//TODO: [] - need action to grab info for individual pages

export const receiveBooks = (books, query) => ({
  type: RECEIVE_BOOKS,
  books,
  query
});
