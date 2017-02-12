export const REQUEST_SEARCH = 'REQUEST_SEARCH'
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH'
export const THROW_SEARCH_ERROR = 'THROW_SEARCH_ERROR'
export const REQUEST_INFO = 'REQUEST_INFO'
export const RECEIVE_INFO = 'RECEIVE_INFO'
export const THROW_FETCH_INFO_ERROR = 'THROW_FETCH_INFO_ERROR'

export const requestSearch = (query) => ({
  type: REQUEST_SEARCH,
  query
})

export const receiveSearch = (query) => ({
  type: RECEIVE_SEARCH,
  query
})

export const throwSearchError = (query) => ({
  type: THROW_SEARCH_ERROR,
  query
})

export const requestInfo = (id) => ({
  type: REQUEST_INFO,
  id
})

export const receiveInfo = (id) => ({
  type: RECEIVE_INFO,
  id
})

export const throwFetchInfoError = (id) => ({
  type: THROW_FETCH_INFO_ERROR,
  id
});