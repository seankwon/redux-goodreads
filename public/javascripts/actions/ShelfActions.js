import * as types from '../constants/ActionTypes'

export const receiveVisibleBooks = (books) => ({
  type: types.RECEIVE_VISIBLE_BOOKS,
  books
})

export const emptyShelf = () => ({
  type: types.EMPTY_SHELF
})
