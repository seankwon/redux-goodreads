import * as types from '../constants/ActionTypes'

export default function library (
  state = {
    books: {},
    searches: {},
    bookPage: {}
  },
  action) {
  if (typeof action === 'undefined' || action === null) {
    return state
  }

  const { data } = action

  switch (action.type) {
    case types.STORE_BOOKS_DATA:
      return Object.assign({}, state, {
        books: Object.assign({}, state.books, data.books),
        searches: Object.assign({}, state.searches, data.searches)
      })
    case types.RECEIVE_DETAILED_BOOK:
      return Object.assign({}, state, { bookPage: data })
    default:
      return state
  }
}
