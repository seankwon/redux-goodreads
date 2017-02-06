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
      const { books, query } = action;
      let searches = {};
      searches[query] = Object.keys(action.books).map(key => parseInt(key));
      
      return Object.assign({}, state, {
        books: books,
        searches: searches
      });
    default:
      return state;
  }
}
