import { storeBooksData, receiveDetailedBook } from '../actions/LibraryActions'
import { receiveVisibleBooks, emptyShelf } from '../actions/ShelfActions'
import {
  requestSearch,
  receiveSearch,
  requestInfo,
  receiveInfo,
  throwSearchError,
  throwFetchInfoError } from '../actions/NavigatorActions'
import { goodreadsJSON } from './FetchUtils'
export const BOOK_SEARCH_URL = '/goodreads?torequest=https://www.goodreads.com/search/index.xml?key=GFPTphT7xVUhrarWQztUtg&q='
export let BOOK_REVIEWS_URL = '/goodreads?torequest=https://www.goodreads.com/book/show/'

export function getBooks (query, page) {
  if (typeof query === 'undefined') {
    throw Error('No Argument')
  }
  const convertedQuery = encodeURIComponent(query)
  const pageQuery = (typeof page !== undefined) ? ("&page=" + page) : ""
  const fullUrl = `${BOOK_SEARCH_URL}${convertedQuery}${pageQuery}`


  return goodreadsJSON(fullUrl).then(rawData => {
    if (rawData['GoodreadsResponse']['search'][0]['total-results'][0] === '0') {
      return {status: 'done'}
    }

    const searchResults = rawData['GoodreadsResponse']['search'][0]['results'][0]['work']
    const convertedResults = searchResults.reduce((res, book) => {
      let id = parseInt(book['best_book'][0]['id'][0]['_'])
      res[id] = {
        id: book['best_book'][0]['id'][0]['_'],
        year: book['original_publication_year'][0]['_'],
        rating: book['average_rating'][0],
        author: book['best_book'][0]['author'][0]['name'][0],
        image_url: book['best_book'][0]['image_url'][0],
        title: book['best_book'][0]['title'][0],
        query: query
      }
      return res
    }, {})

    return (convertedResults)
  })
}

function convertData (data, query, page) {
  let searches = {}
  searches[query] = {
    booksById: Object.keys(data).map(key => parseInt(key)),
    page: page
  }
  return {searches: searches, books: data}
}

function convertSearchIdsToBooks(searchIds, books) {
  return (searchIds || []).map(id => books[id])
}

function fetchBooks (query, page) {
  return (dispatch, getState) => {
    const convertedPage = page || 1

    if (getState().navigator.currentQuery !== query) {
      dispatch(emptyShelf())
    }

    dispatch(requestSearch(query))

    getBooks(query, convertedPage)
      .then(data => {
        if (data.status === 'done') {
          // FIXME: perhaps create an action for this
          dispatch(receiveSearch(query, convertedPage-1))
          return
        }

        const idsToBooks = convertData(data, query, convertedPage)
        const booksToDisplay = convertSearchIdsToBooks(
          idsToBooks.searches[query]['booksById'],
          idsToBooks.books
        )

        dispatch(receiveVisibleBooks(booksToDisplay))
        dispatch(storeBooksData(idsToBooks, query))
        dispatch(receiveSearch(query, convertedPage))
      })
      .catch(ex => {
        dispatch(throwSearchError(query))
      })
  }
}

function shouldFetchBooks (state, query, page) {
  const { isFetching } = state.navigator
  const searches = state.library.searches || {}
  if (query in searches && page === searches[query].page) {
    return false
  } else if (isFetching) {
    return false
  }
  return true
}

export function fetchBooksIfNeeded (query, page) {
  return (dispatch, getState) => {
    if (shouldFetchBooks(getState(), query, page)) {
      dispatch(fetchBooks(query, page))
    } else {
      const { searches, books } = getState().library
      const { currentQuery } = getState().navigator
      const pageNum = page || ((searches[query] && searches[query].page) || 1)
      const booksToDisplay = convertSearchIdsToBooks(searches[query]['booksById'], books)

      if (currentQuery !== query) {
        dispatch(emptyShelf())
      }

      dispatch(receiveVisibleBooks(booksToDisplay))
      Promise.resolve(dispatch(receiveSearch(query, pageNum)))
    }
  }
}

export function getBook (id) {
  if (typeof id === 'undefined' || id === null) {
    throw Error('Bad Argument')
  }
  const fullUrl = `${BOOK_REVIEWS_URL}${id}` + '.xml?key=GFPTphT7xVUhrarWQztUtg'

  return goodreadsJSON(fullUrl).then(rawData => {
    const bookRes = rawData['GoodreadsResponse']['book']
    const id = bookRes[0]['id'][0]
    const title = bookRes[0]['title'][0]
    const isbn = bookRes[0]['isbn'][0]
    const imageUrl = bookRes[0]['image_url'][0]
    const description = bookRes[0]['description'][0]
    const numPages = bookRes[0]['num_pages'][0]
    const author = bookRes[0]['authors'][0]['author'][0]['name'][0]
    const popularShelves = bookRes[0]['popular_shelves'][0]['shelf'].map(shelf => {
      return shelf['$']
    })
    const buyLinks = bookRes[0]['buy_links'][0]['buy_link'].map(buyLink => {
      return {id: buyLink['id'][0], name: buyLink['name'][0], link: buyLink['link'][0]}
    })
    const similarBooks = bookRes[0]['similar_books']

    return {
      id: id,
      title: title,
      isbn: isbn,
      imageUrl: imageUrl,
      description: description,
      numPages: numPages,
      author: author,
      popularShelves: popularShelves,
      buyLinks: buyLinks,
      similarBooks: similarBooks
    }
  })
}

export function shouldFetchBook (id, isFetching, state) {
  let bookAlreadyFetched = (id) => {
    const library = state.library || {bookPage: {}}
    return parseInt(library.bookPage['id']) === parseInt(id)
  }

  if (bookAlreadyFetched(id)) {
    return false
  }
  return !isFetching
}

export function fetchBookInfo (id) {
  return (dispatch, getState) => {
    dispatch(requestInfo(id))
    getBook(id).then(data => {
      dispatch(receiveDetailedBook(data, id))
      dispatch(receiveInfo(id))
    })
    .catch(error => dispatch(throwFetchInfoError(id)))
  }
}

export function fetchBookInfoIfNeeded (id) {
  return (dispatch, getState) => {
    const { isFetching } = getState().navigator
    if (shouldFetchBook(id, isFetching, getState())) {
      dispatch(fetchBookInfo(id))
    }
  }
}
