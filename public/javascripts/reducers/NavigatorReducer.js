import * as types from '../constants/ActionTypes'

export default function navigator (state = {
  isFetching: false,
  currentQuery: undefined,
  id: undefined,
  checkoutStep: 0,
  checkoutDone: false
}, action) {
  if (typeof action === 'undefined' || action === null) {
    return state
  }

  switch (action.type) {
    case types.REQUEST_SEARCH:
      return Object.assign({}, state,
        {isFetching: true, currentQuery: action.query})
    case types.RECEIVE_SEARCH:
      return Object.assign({}, state,
        {isFetching: false, currentQuery: action.query})
    case types.REQUEST_INFO:
      return Object.assign({}, state,
        {isFetching: true, id: action.id})
    case types.RECEIVE_INFO:
      return Object.assign({}, state,
        {isFetching: false, id: action.id})
    case types.THROW_SEARCH_ERROR:
      return state
    case types.THROW_FETCH_INFO_ERROR:
      return state
    case types.ENTER_CHECKOUT_STEP_ONE:
      return Object.assign({}, state,
        {checkoutStep: 1})
    case types.FINISH_CHECKOUT:
      return Object.assign({}, state,
        {checkoutStep: 0, checkoutDone: true})
    default:
      return state
  }
}
