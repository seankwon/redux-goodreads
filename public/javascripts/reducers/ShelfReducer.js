import * as types from '../constants/ActionTypes'

export default function shelf (state = {books: []}, action) {
  if (action === undefined || action === null) {
    return state
  }

  switch (action.type) {
    case types.RECEIVE_VISIBLE_BOOKS:
      return Object.assign({}, state, {books: action.books})
    default:
      return state
  }
}
