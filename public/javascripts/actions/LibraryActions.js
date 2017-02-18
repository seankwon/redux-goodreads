export const STORE_BOOKS_DATA = 'STORE_BOOKS_DATA'
export const RECEIVE_DETAILED_BOOK = 'RECEIVE_DETAILED_BOOK'

export const storeBooksData = (data, query) => ({
  type: STORE_BOOKS_DATA,
  data,
  query
})

export const receiveDetailedBook = (data, id) => ({
  type: RECEIVE_DETAILED_BOOK,
  data,
  id
})
