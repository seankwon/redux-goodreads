import { REQUEST_SEARCH, RECEIVE_SEARCH } from '../actions/NavigatorActions';

export default function navigator(state = {
  isFetching: false,
  currentQuery: undefined
}, action) {

  if (typeof action === 'undefined' || action === null)
    return state;

  switch(action.type) {
    case REQUEST_SEARCH:
      return Object.assign({}, state, 
        {isFetching: true, currentQuery: action.query});
    case RECEIVE_SEARCH: 
      return Object.assign({}, state, 
        {isFetching: false, currentQuery: action.query});
    default: 
      return state;
  }

}