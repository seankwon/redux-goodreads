import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { readFileSync } from 'fs'
import fetchMock from 'fetch-mock'
// Required Modules

import * as types from '../../public/javascripts/constants/ActionTypes'
import { ENDERS_GAME_RESPONSE	} from '../Stubs/bookResponse.js'
import { ENDERS_GAME_RESPONSE_PAGE_TWO } from '../Stubs/bookResponsePageTwo.js'
import { HOUSEKEEPING_RESPONSE	} from '../Stubs/bookReviewResponse.js'
import {
  getBook,
  getBooks,
  fetchBooksIfNeeded,
  shouldFetchBook,
  fetchBookInfo,
  fetchBookInfoIfNeeded
} from '../../public/javascripts/utils/BookUtils'
// Functions that are being tested

const answer1 = {
  id: '375802',
  year: '1985',
  rating: '4.29',
  author: 'Orson Scott Card',
  image_url: 'https://images.gr-assets.com/books/1408303130m/375802.jpg',
  title: 'Ender\'s Game (Ender\'s Saga, #1)',
  query: 'Enders Game'
}

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
// FIXME: These tests are getting outta hand!

describe('BookUtils', () => {
  beforeEach(() => {
    fetchMock.get('*', readFileSync('tests/Stubs/bookResponse.xml').toString())
  })

  afterEach(() => {
    fetchMock.restore()
  })

  describe('getBooks', () => {
    it('should return a list of converted objects for a search', () => {
      return getBooks('Enders Game').then((data) => {
        expect(data['375802']).to.deep.equal(answer1)
      })
    })
  })

  describe('getBook', () => {
    it('should throw error if given invalid argument', () => {
      expect(() => getBook(undefined)).to.throw(Error)
    })

    it('should return an object representing a books info', () => {
      fetchMock.restore()
      fetchMock.get('*', readFileSync('tests/Stubs/bookReviewResponse.xml').toString())
      return getBook(11741).then(data => {
        expect(data).to.include.keys('id',
          'title',
          'isbn',
          'imageUrl',
          'description',
          'numPages',
          'author',
          'popularShelves',
          'buyLinks',
          'similarBooks'
        )
      })
    })
  })

  describe('shouldFetchBook', () => {
    const EXAMPLE_ID = 11741
    it('should return true if state is not fetching', () => {
      expect(shouldFetchBook(EXAMPLE_ID, false, {})).to.equal(true)
    })

    it('should return false if state is fetching', () => {
      expect(shouldFetchBook(EXAMPLE_ID, true, {})).to.equal(false)
    })

    it('should return false if the bookpage maps to the id - cached', () => {
      let state = {library: {bookPage: {id: `${EXAMPLE_ID}`}}}
      expect(shouldFetchBook(EXAMPLE_ID, false, state)).to.equal(false)
    })

    it('should return true if there is no bookPage', () => {
      let state = {library: {bookPage: {}}}
      expect(shouldFetchBook(EXAMPLE_ID, false, state)).to.equal(true)
    })

    it('should return true if the id and the bookPage id are different', () => {
      let state = {library: {bookPage: {id: '43'}}}
      expect(shouldFetchBook(EXAMPLE_ID, false, state)).to.equal(true)
    })
  })

  describe('fetchBookInfo', () => {
    let store
    let expectedActions
    let id
    const EXAMPLE_ID = 11741

    beforeEach(() => {
      store = mockStore({library: {}, navigator: {}})
      expectedActions = []
    })

    afterEach(() => {
      fetchMock.restore()
      store.clearActions()
    })

    it('should throw catch error if there is a bad argument', () => {
      fetchMock.restore()
      fetchMock.get('*', Error)
      id = '2'
      expectedActions = [
        { type: types.REQUEST_INFO, id: id },
        { type: types.THROW_FETCH_INFO_ERROR, id: id }
      ]
      return store.dispatch(fetchBookInfo('2')).then(data => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
    })

    it('should be able to dispatch receive data', () => {
      fetchMock.restore()
      fetchMock.get('*', readFileSync('tests/Stubs/bookReviewResponse.xml').toString())
      id = EXAMPLE_ID
      expectedActions = [
        { type: types.REQUEST_INFO, id: id },
        { type: types.RECEIVE_DETAILED_BOOK, data: HOUSEKEEPING_RESPONSE, id: id },
        { type: types.RECEIVE_INFO, id: id }
      ]

      return store.dispatch(fetchBookInfo(id)).then(() => {
        let nameTypes = store.getActions().map(action => action.type)
        let expectedActionTypes = expectedActions.map(action => action.type)
        expect(nameTypes).to.deep.equal(expectedActionTypes)
      })
    })
  })

  describe('fetchBooksIfNeeded', () => {
    it('creates STORE_BOOKS_DATA when fetching books', () => {
      const query = 'Enders Game'
      const expectedActions = [
        { type: types.REQUEST_SEARCH, query: query },
        { type: types.RECEIVE_VISIBLE_BOOKS, books: ENDERS_GAME_RESPONSE['searches']['Enders Game']['booksById'].map(id => ENDERS_GAME_RESPONSE['books'][id]) },
        { type: types.STORE_BOOKS_DATA, query: query, data: ENDERS_GAME_RESPONSE },
        { type: types.RECEIVE_SEARCH, query: query, page: 1 }
      ]

      const store = mockStore({library: {}, navigator: {}, shelf: {}})

      return store.dispatch(fetchBooksIfNeeded('Enders Game', 1))
        .then(() => {
          expect(store.getActions()).to.deep.equals(expectedActions)
        })
    })

    it('should not call another request if search is cached and the page num is the same', () => {
      const query = 'Enders Game'
      const store = mockStore({
        library: {
          books: ENDERS_GAME_RESPONSE['books'],
          searches: {
            'Enders Game': {
              booksById: Object.keys(ENDERS_GAME_RESPONSE['searches']).map(key => parseInt(key)),
              page: 1
            }
          }
        },
        navigator: { currentQuery: 'Enders Game', isFetching: false }
      })

      // FIXME: fix this!
      const expectedActions = [
        { type: types.RECEIVE_VISIBLE_BOOKS, books: [undefined] },
        { type: types.RECEIVE_SEARCH, query: query, page: 1 }
      ]

      return store.dispatch(fetchBooksIfNeeded(query, 1))
        .then(() => {
          expect(store.getActions()).to.deep.equals(expectedActions)
        })
    })

    it('should call another request if the search query is the same but the page number is different', () => {
      fetchMock.restore()
      fetchMock.get('*', readFileSync('tests/Stubs/bookResponseTwo.xml').toString())
      const query = 'Enders Game'
      const page = 2
      const mergedBooks = Object.assign({},
        ENDERS_GAME_RESPONSE['books'],
        ENDERS_GAME_RESPONSE_PAGE_TWO['books'])
      const secondPageBookIds = ENDERS_GAME_RESPONSE_PAGE_TWO
        .searches['Enders Game']
        .booksById
        .map(id => ENDERS_GAME_RESPONSE_PAGE_TWO['books'][id])

      const expectedActions = [
        { type: types.REQUEST_SEARCH, query: query },
        { type: types.RECEIVE_VISIBLE_BOOKS, books: secondPageBookIds },
        { type: types.STORE_BOOKS_DATA, query: query, data: ENDERS_GAME_RESPONSE_PAGE_TWO },
        { type: types.RECEIVE_SEARCH, query: query, page: 2 }
      ]

      const store = mockStore({
        library: {
          books: ENDERS_GAME_RESPONSE['books'],
          searches: {
            'Enders Game': {
              booksById: Object.keys(ENDERS_GAME_RESPONSE['searches']).map(key => parseInt(key)),
              page: 1
            }
          }
        },
        navigator: { currentQuery: 'Enders Game', isFetching: false, page: 1 }
      })

      return store.dispatch(fetchBooksIfNeeded(query, page))
        .then(() => {
          expect(store.getActions()).to.deep.equals(expectedActions)
        })
    })

    it('should throw an error when the request fails', () => {
      fetchMock.restore()
      fetchMock.get('*', Error)
      const query = 'BAD_INPUT'
      const expectedActions = [
        { type: types.REQUEST_SEARCH, query: query },
        { type: types.THROW_SEARCH_ERROR, query: query }
      ]
      const store = mockStore({library: {}, navigator: {}})
      return store.dispatch(fetchBooksIfNeeded(query))
        .then(() => {
          expect(store.getActions()).to.deep.equals(expectedActions)
        })
    })
  })
})
