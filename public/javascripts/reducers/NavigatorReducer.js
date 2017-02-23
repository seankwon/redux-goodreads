import * as types from '../constants/ActionTypes'

export default function navigator(state = {
  isFetching: false,
  currentQuery: undefined,
  id: undefined
}, action) {

  if (typeof action === 'undefined' || action === null)
    return state;

  switch(action.type) {
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
    default: 
      return state;
  }

}
