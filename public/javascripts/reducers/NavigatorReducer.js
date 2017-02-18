import { 
  REQUEST_SEARCH, 
  RECEIVE_SEARCH,
  REQUEST_INFO,
  RECEIVE_INFO,
  THROW_SEARCH_ERROR,
  THROW_FETCH_INFO_ERROR
} from '../actions/NavigatorActions';

export default function navigator(state = {
  isFetching: false,
  currentQuery: undefined,
  id: undefined
}, action) {

  if (typeof action === 'undefined' || action === null)
    return state;

  switch(action.type) {
    case REQUEST_SEARCH:
      return Object.assign({}, state, 
        {isFetching: true, currentQuery: action.query})
    case RECEIVE_SEARCH: 
      return Object.assign({}, state, 
        {isFetching: false, currentQuery: action.query})
    case REQUEST_INFO:
      return Object.assign({}, state,
        {isFetching: true, id: action.id})
    case RECEIVE_INFO:
      return Object.assign({}, state,
        {isFetching: false, id: action.id})
    case THROW_SEARCH_ERROR:
      return state
    case THROW_FETCH_INFO_ERROR:
      return state
    default: 
      return state;
  }

}