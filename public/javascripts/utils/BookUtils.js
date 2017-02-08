import fetch from 'isomorphic-fetch';
import { dispatch } from 'redux';
import { receiveBooks } from '../actions/LibraryActions';
import { requestSearch, receiveSearch, throwSearchError } from '../actions/NavigatorActions';
import { goodreadsJSON } from './FetchUtils';
import { isEmpty, notEmpty } from './ArrayUtils';
export const BOOK_SEARCH_URL = '/goodreads?page=https://www.goodreads.com/search/index.xml?key=GFPTphT7xVUhrarWQztUtg&q=';

export function getBooks(query) {
  if (typeof query === 'undefined') {
    throw("No Argument");
  }

  const convertedQuery = encodeURIComponent(query);
  const fullUrl = `${BOOK_SEARCH_URL}${convertedQuery}`;

  return goodreadsJSON(fullUrl).then(rawData => {
    const searchResults = rawData['GoodreadsResponse']['search'][0]['results'][0]['work'];
    const convertedResults = searchResults.reduce((res, book) => {
      let id = parseInt(book['best_book'][0]['id'][0]['_']);
      res[id] = {
        id: book['best_book'][0]['id'][0]['_'],
        year: book['original_publication_year'][0]['_'],
        rating: book['average_rating'][0],
        author: book['best_book'][0]['author'][0]['name'][0],
        image_url: book['best_book'][0]['image_url'][0],
        title: book['best_book'][0]['title'][0],
        query: query
      };
      return res;
    }, {});

    return (convertedResults);
  });
}

export function cachedSearch(query, searches) {
  return searches.filter((search) => {
    return search.query === query && notEmpty(search.books);
  });
}

function fetchBooks(query) {
  let convertData = (data, query) => {
    let searches = {};
    searches[query] = Object.keys(data).map(key => parseInt(key));
    return {searches: searches, books: data};
  }

  return (dispatch, getState) => {
    dispatch(requestSearch(query));
    return getBooks(query)
      .then(data => {
        const convertedData = convertData(data, query)
        dispatch(receiveBooks(convertedData, query));
        dispatch(receiveSearch(query));
      })
      .catch(ex => dispatch(throwSearchError(query)));
  }
}

function shouldFetchBooks(state, query) {
  const { isFetching } = state.navigator;
  const searches = state.library.searches || {};
  if (query in searches) {
    return false;
  } else if (isFetching) {
    return false;
  } else {
    return true;
  }
}

export function fetchBooksIfNeeded(query) {
  return (dispatch, getState) => {
    if (shouldFetchBooks(getState(), query)) {
      return dispatch(fetchBooks(query));
    } else {
      return Promise.resolve(dispatch(receiveSearch(query)));
    }
  }
}
