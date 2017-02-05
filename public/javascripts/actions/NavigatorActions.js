export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';
export const THROW_SEARCH_ERROR = 'THROW_SEARCH_ERROR';

export const requestSearch = (query) => ({
  type: REQUEST_SEARCH,
  query
});

export const receiveSearch = (query) => ({
  type: RECEIVE_SEARCH,
  query
});

export const throwSearchError = (query) => ({
  type: THROW_SEARCH_ERROR,
  query
});
