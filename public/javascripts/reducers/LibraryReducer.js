import { RECEIVE_BOOKS } from '../actions/LibraryActions';
import { cachedSearch } from '../utils/BookUtils';
import { notEmpty } from '../utils/ArrayUtils';

export default function library(
  state = {
    books: {},
    searches: {}
  },
  action) {

  if (typeof action === 'undefined' || action === null) {
    return state;
  }

  switch (action.type) {
    case RECEIVE_BOOKS:
      const { data } = action;
      return Object.assign({}, state, {
        books: Object.assign({}, state.books, data.books),
        searches: Object.assign({}, state.searches, data.searches)
      });
    default:
      return state;
  }
}
