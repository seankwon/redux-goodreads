import { REQUEST_BOOKS, RECEIVE_BOOKS } from '../actions/LibraryActions';

function searches(state, action) {
  function setActive(action, search) {
    // helper function, pattern courtesy of eloquent javascript
    return Object.assign({}, search,
            {isFetching: false, active: true, books: action.books});
  }

  switch(action.type) {
    case REQUEST_BOOKS:
      let newsearch = {
        books: [],
        query: action.query,
        active: false,
        isFetching: true
      };
      return [...state.searches, newsearch];
    case RECEIVE_BOOKS:
      return state.searches.map((search) => {
        if (search.isFetching) {
          return setActive(action, search);
        }
        return search;
      });
  }
}

export default function library(
  state = {
    activePage: {},
    searches: []
  },
  action) {

  if (typeof action === 'undefined' || action === null) {
    return state;
  }

  switch (action.type) {
    case REQUEST_BOOKS:
      return Object.assign({}, state, 
        { searches: searches(state, action) 
      });
    case RECEIVE_BOOKS:
      return Object.assign({}, state, {
        activePage: {books: action.books, query: action.query},
        searches: searches(state, action)
      });
    default:
      return state;
  }
}