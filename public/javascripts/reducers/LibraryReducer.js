import { REQUEST_BOOKS, RECEIVE_BOOKS, cachedSearch, notEmpty } from '../actions/LibraryActions';

function searches(state, action) {
  let setActive = (action, search) => {
    return Object.assign({}, search, {active: true, books: action.books});
  }

  let isCached = (cachedSearch) => {
    return notEmpty(cachedSearch)
  }

  switch(action.type) {
    case REQUEST_BOOKS:
      let newsearch = {
        books: [],
        query: action.query,
        active: false
      };

      if (isCached(cachedSearch(action.query, state.searches))) {
        return state.searches
      }
      return [...state.searches, newsearch]
    case RECEIVE_BOOKS:
      return state.searches.map((search) => {
        if (search.query === action.query) {
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