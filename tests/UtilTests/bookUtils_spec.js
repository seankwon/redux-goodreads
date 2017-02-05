import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { readFileSync } from 'fs';
import nock from 'nock';
import fetchMock from 'fetch-mock';
//Required Modules

import { getBooks, fetchBooksIfNeeded, BOOK_SEARCH_URL } from '../../public/javascripts/utils/BookUtils';
import library from '../../public/javascripts/reducers/LibraryReducer';
import { ENDERS_GAME_RESPONSE	} from '../Stubs/bookResponse.js';
import {
  REQUEST_SEARCH,
  RECEIVE_SEARCH,
  THROW_SEARCH_ERROR
} from '../../public/javascripts/actions/NavigatorActions';
import {
    receiveBooks,
    RECEIVE_BOOKS,
} from '../../public/javascripts/actions/LibraryActions';
//Functions that are being tested

const answer1 = {
  id: '375802',
  year: '1985',
  rating: '4.29',
  author: 'Orson Scott Card',
  image_url: '\nhttps://images.gr-assets.com/books/1408303130m/375802.jpg\n',
  title: 'Ender\'s Game (Ender\'s Saga, #1)',
  query: 'Enders Game'
};

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('BookUtils', () => {
  beforeEach(() => {
    fetchMock.get('*', readFileSync('tests/Stubs/bookResponse.xml').toString());
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('getBooks', () => {
    it('should return a list of converted objects for a search', () => {
      return getBooks('Enders Game').then((data) => {
        expect(data['375802']).to.deep.equal(answer1);
      });
    });

    it('creates RECEIVE_BOOKS when fetching books', () => {
      const query = 'Enders Game'
      const expectedActions = [
        { type: REQUEST_SEARCH, query: query },
        { type: RECEIVE_BOOKS, query: query, books: ENDERS_GAME_RESPONSE },
        { type: RECEIVE_SEARCH, query: query }
      ];

      const store = mockStore({library: {}, navigator: {}});

      return store.dispatch(fetchBooksIfNeeded('Enders Game'))
        .then(() => {
          expect(store.getActions()).to.deep.equals(expectedActions);
      });
    });

    it('should throw an error when the request fails', () => {
      fetchMock.restore();
      fetchMock.get('*', Error);
      const query = 'BAD_INPUT';
      const expectedActions = [
        { type: REQUEST_SEARCH, query: query },
        { type: THROW_SEARCH_ERROR, query: query}
      ];
      const store = mockStore({library: {}, navigator: {}});
      return store.dispatch(fetchBooksIfNeeded(query))
        .then(() => {
          expect(store.getActions()).to.deep.equals(expectedActions);
      });
    });
  });

  describe('getBooks with LibraryReducer', () => {
    it('should return readable data to the reducer', () => {
      return getBooks('Enders Game').then((data) => {
        expect(library(undefined, receiveBooks(data, 'Enders Game'))['books']['375802'])
          .deep.equal(answer1);
      });
    });
  });

});
