import * as types from '../constants/ActionTypes'

export const addBook = (book) => ({
  type: types.ADD_BOOK,
  book
})

export const deleteBook = (id) => ({
  type: types.DELETE_BOOK,
  id
})

export const checkoutAllBooks = () => ({
  type: types.CHECKOUT_ALL_BOOKS
})
