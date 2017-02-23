import * as types from '../constants/ActionTypes'

function books(state, action) {
  switch(action.type) {
    case types.ADD_BOOK:
      return [...state, action.book]
    case types.DELETE_BOOK:
      return state.filter(book => action.id !== book.id)
    case types.CHECKOUT_ALL_BOOKS:
      return []
  }
  return state
}

export default function cart(state = [], action) {
  if (typeof action === 'undefined' || action === null) {
    return state
  }

  switch(action.type) {
    case types.ADD_BOOK:
      return books(state, action)
    case types.DELETE_BOOK:
      return books(state, action)
    case types.CHECKOUT_ALL_BOOKS:
      return books(state, action)
    default:
      return state
  }
}
