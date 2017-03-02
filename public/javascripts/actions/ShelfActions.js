import * as types from '../constants/ActionTypes'

export const receiveVisibleBooks = (books) => ({
  type: types.RECEIVE_VISIBLE_BOOKS,
  books
})
