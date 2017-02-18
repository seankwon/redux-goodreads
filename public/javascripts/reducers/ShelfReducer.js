import { RECEIVE_VISIBLE_BOOKS } from '../actions/ShelfActions'

export default function shelf (state = {books: []}, action) {
  if (action === undefined || action === null) {
    return state
  }

  switch (action.type) {
    case RECEIVE_VISIBLE_BOOKS:
      return Object.assign({}, state, {books: action.books})
    default:
      return state
  }
}
