import { expect } from 'chai';
//TODO: convert to es6 syntax
var fetchMock = require('fetch-mock');
import { requestSearch, receiveSearch } from '../../public/javascripts/actions/NavigatorActions';
import navigator from '../../public/javascripts/reducers/NavigatorReducer';

describe('navigator reducer', () => {
  it('should return an empty state object if the action is undefined', () => {
    expect(navigator(undefined, undefined)).to.deep.equal({isFetching: false, currentQuery: undefined});
  })
  describe('request search', () => {
    it ('should return fetch state on request', () => {
      expect(navigator(undefined, requestSearch('test'))).to.deep.equal({isFetching: true, currentQuery: 'test'});
    });

    it('should set fetch state off when application receives request', () => {
      expect(navigator(undefined, receiveSearch('test'))).to.deep.equal({isFetching: false, currentQuery: 'test'});
    })
  });
});