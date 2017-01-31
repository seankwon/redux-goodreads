import { REQUEST_BOOKS, RECEIVE_BOOKS} from '../actions/LibraryActions';
import { cachedSearch } from '../utils/BookUtils';
import { notEmpty } from '../utils/ArrayUtils';

function searches(state, action) {
  /* XXX HELPER FUNCTIONS */
  let setActive = (action, search) => {
    return Object.assign({}, search, {active: true, books: action.books});
  }

  let isCached = (cachedSearch) => {
    return notEmpty(cachedSearch)
  }

  let wasRequested = (action, query) => {
    return action.query === query;
  }
  
  /* BODY OF CODE */
  switch(action.type) {
    case REQUEST_BOOKS:
      let newsearch = { books: [], query: action.query, active: false };
      let currentSearch = cachedSearch(action.query, state.searches);

      if (isCached(currentSearch)) {
        return state.searches
      }
      return [...state.searches, newsearch];
    case RECEIVE_BOOKS:
      return state.searches.map((search) => {
        if (wasRequested(action, search.query)) {
          return setActive(action, search);
        }
        return search;
      });
  }
}

export default function library(
  state = {
    activePage: {},
    isFetching: false,
    searches: []
  },
  action) {

  if (typeof action === 'undefined' || action === null) {
    return state;
  }

  switch (action.type) {
    case REQUEST_BOOKS:
      return Object.assign({}, state, 
        { isFetching: true, searches: searches(state, action) 
      });
    case RECEIVE_BOOKS:
      return Object.assign({}, state, {
        activePage: {books: action.books, query: action.query},
        isFetching: false,
        searches: searches(state, action)
      });
    default:
      return state;
  }
}