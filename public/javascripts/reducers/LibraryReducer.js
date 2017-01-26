import { REQUEST_BOOKS, RECEIVE_BOOKS } from '../actions/LibraryActions';

function searches(state, action) {
  function setActive(action, search) {
    // XXX helper function, pattern courtesy of eloquent javascript
    return Object.assign({}, search,
            {active: true, books: action.books});
  }

  switch(action.type) {
    case REQUEST_BOOKS:
      let newsearch = {
        books: [],
        query: action.query,
        active: false
      };
      return [...state.searches, newsearch];
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