import { expect } from 'chai';
//TODO: convert to es6 syntax
var fetchMock = require('fetch-mock');
import { 
  requestSearch,
  receiveSearch,
  requestInfo,
  receiveInfo,
  throwFetchInfoError,
  throwSearchError
} from '../../public/javascripts/actions/NavigatorActions';
import navigator from '../../public/javascripts/reducers/NavigatorReducer';

describe('navigator reducer', () => {
  it('should return an empty state object if the action is undefined', () => {
    expect(navigator(undefined, undefined)).to.deep.equal({isFetching: false, currentQuery: undefined, id: undefined});
  })

  describe('request search', () => {
    it ('should return fetch state on request', () => {
      expect(navigator(undefined, requestSearch('test'))).to.deep.equal({isFetching: true, currentQuery: 'test', id: undefined});
    });

    it('should set fetch state off when application receives request', () => {
      expect(navigator(undefined, receiveSearch('test'))).to.deep.equal({isFetching: false, currentQuery: 'test', id: undefined});
    })
  });

  describe('request info', () => {
    it('should populate id key with correct id', () => {
      expect(navigator(undefined, requestInfo('2'))).to.deep.equal({isFetching: true, currentQuery: undefined, id: '2'})
    })
  })

  describe('receiveInfo', () => {
    it('turn fetch off and also populate id key with the id argument', () => {
      expect(navigator(undefined, receiveInfo('2'))).to.deep.equal({isFetching: false, currentQuery: undefined, id: '2'})
    })
  })

  describe('throwSearchError and throwFetchInfoError', () => {
    it('should just return previous state when a request to search fails', () => {
      expect(navigator(undefined, throwSearchError('bad'))).to.deep.equal({isFetching: false, currentQuery: undefined, id: undefined})
    })

    it('should just return previous state when fetching a book\'s info fails', () => {
      expect(navigator(undefined, throwFetchInfoError('bad'))).to.deep.equal({isFetching: false, currentQuery: undefined, id: undefined})
    })
  })
});