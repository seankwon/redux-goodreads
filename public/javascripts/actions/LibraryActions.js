export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';

//TODO: [] - need action to grab info for individual pages

export const receiveBooks = (data, query) => ({
  type: RECEIVE_BOOKS,
  data,
  query
});
