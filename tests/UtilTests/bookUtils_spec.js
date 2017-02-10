import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { readFileSync } from 'fs'
import fetchMock from 'fetch-mock'
// Required Modules

import { ENDERS_GAME_RESPONSE	} from '../Stubs/bookResponse.js'
import {
  REQUEST_SEARCH,
  RECEIVE_SEARCH,
  THROW_SEARCH_ERROR
} from '../../public/javascripts/actions/NavigatorActions'
import {
    RECEIVE_BOOKS
} from '../../public/javascripts/actions/LibraryActions'
import {
  getBook,
  getBooks,
  fetchBooksIfNeeded,
  shouldFetchBook
} from '../../public/javascripts/utils/BookUtils'
// Functions that are being tested

const answer1 = {
  id: '375802',
  year: '1985',
  rating: '4.29',
  author: 'Orson Scott Card',
  image_url: '\r\nhttps://images.gr-assets.com/books/1408303130m/375802.jpg\r\n',
  title: 'Ender\'s Game (Ender\'s Saga, #1)',
  query: 'Enders Game'
}

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

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
      let state = {library: {bookPage: {id: '11741'}}}
      expect(shouldFetchBook(EXAMPLE_ID, false, state)).to.equal(false)
    })
  })

  describe('fetchBooksIfNeeded', () => {
    it('creates RECEIVE_BOOKS when fetching books', () => {
      const query = 'Enders Game'
      const expectedActions = [
        { type: REQUEST_SEARCH, query: query },
        { type: RECEIVE_BOOKS, query: query, data: ENDERS_GAME_RESPONSE },
        { type: RECEIVE_SEARCH, query: query }
      ]

      const store = mockStore({library: {}, navigator: {}})

      return store.dispatch(fetchBooksIfNeeded('Enders Game'))
        .then(() => {
          expect(store.getActions()).to.deep.equals(expectedActions)
        })
    })

    it('should not call another request if search is cached', () => {
      const query = 'Enders Game'
      const store = mockStore({
        library: {
          books: ENDERS_GAME_RESPONSE['books'],
          searches: { 'Enders Game': Object.keys(ENDERS_GAME_RESPONSE['searches']).map(key => parseInt(key)) }
        },
        navigator: { currentQuery: 'Enders Game', isFetching: false }
      })
      const expectedActions = [
        { type: RECEIVE_SEARCH, query: query }
      ]
      return store.dispatch(fetchBooksIfNeeded(query))
        .then(() => {
          expect(store.getActions()).to.deep.equals(expectedActions)
        })
    })

    it('should throw an error when the request fails', () => {
      fetchMock.restore()
      fetchMock.get('*', Error)
      const query = 'BAD_INPUT'
      const expectedActions = [
        { type: REQUEST_SEARCH, query: query },
        { type: THROW_SEARCH_ERROR, query: query }
      ]
      const store = mockStore({library: {}, navigator: {}})
      return store.dispatch(fetchBooksIfNeeded(query))
        .then(() => {
          expect(store.getActions()).to.deep.equals(expectedActions)
        })
    })
  })
})
