export const RECEIVE_BOOKS = 'RECEIVE_BOOKS'
export const RECEIVE_DETAILED_BOOK = 'RECEIVE_DETAILED_BOOK'

export const receiveBooks = (data, query) => ({
  type: RECEIVE_BOOKS,
  data,
  query
})

export const receiveDetailedBook = (data, id) => ({
  type: RECEIVE_DETAILED_BOOK,
  data,
  id
})
