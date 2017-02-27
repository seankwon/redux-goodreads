import * as types from '../constants/ActionTypes'

export const storeBooksData = (data, query) => ({
  type: types.STORE_BOOKS_DATA,
  data,
  query
})

export const receiveDetailedBook = (data, id) => ({
  type: types.RECEIVE_DETAILED_BOOK,
  data,
  id
})
