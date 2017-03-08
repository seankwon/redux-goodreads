import { expect } from 'chai';
//TODO: convert to es6 syntax
var fetchMock = require('fetch-mock');
import {
  requestSearch,
  receiveSearch,
  requestInfo,
  receiveInfo,
  throwFetchInfoError,
  throwSearchError,
  enterCheckoutStepOne,
  finishCheckout,
  resetCheckout
} from '../../public/javascripts/actions/NavigatorActions';
import navigator from '../../public/javascripts/reducers/NavigatorReducer';

describe('navigator reducer', () => {
  it('should handle REQUEST_SEARCH', () => {
    expect(navigator(undefined, requestSearch('John Doe')))
      .to.deep.equals({
        isFetching: true,
        id: undefined,
        currentQuery: 'John Doe',
        checkoutStep: 0,
        checkoutDone: false
      })
  })

  it('should handle RECEIVE_SEARCH', () => {
    expect(navigator(undefined, receiveSearch('John Doe')))
      .to.deep.equals({
        isFetching: false,
        id: undefined,
        currentQuery: 'John Doe',
        checkoutStep: 0,
        checkoutDone: false
      })
  })

  it('should handle THROW_SEARCH_ERROR', () => {
    expect(navigator(undefined, throwSearchError('John Doe')))
      .to.deep.equals({
        isFetching: false,
        id: undefined,
        currentQuery: undefined,
        checkoutStep: 0,
        checkoutDone: false
      })
  })

  it('should handle REQUEST_INFO', () => {
    expect(navigator(undefined, requestInfo('5')))
      .to.deep.equals({
        isFetching: true,
        id: '5',
        currentQuery: undefined,
        checkoutStep: 0,
        checkoutDone: false
      })
  })

  it('should handle RECEIVE_INFO', () => {
    expect(navigator(undefined, receiveInfo('5')))
      .to.deep.equals({
        isFetching: false,
        id: '5',
        currentQuery: undefined,
        checkoutStep: 0,
        checkoutDone: false
      })
  })

  it('should handle THROW_FETCH_INFO_ERROR', () => {
    expect(navigator(undefined, throwFetchInfoError('5')))
      .to.deep.equals({
        isFetching: false,
        id: undefined,
        currentQuery: undefined,
        checkoutStep: 0,
        checkoutDone: false
      })
  })

  it('should handle ENTER_CHECKOUT_STEP_ONE', () => {
    expect(navigator(undefined, enterCheckoutStepOne()))
      .to.deep.equals({
        isFetching: false,
        id: undefined,
        currentQuery: undefined,
        checkoutStep: 1,
        checkoutDone: false
      })
  })

  it('should handle FINISH_CHECKOUT', () => {
    expect(navigator({
      isFetching: false,
      id: undefined,
      currentQuery: undefined,
      checkoutStep: 1,
      checkoutDone: false
    }, finishCheckout()))
    .to.deep.equals({
      isFetching: false,
      id: undefined,
      currentQuery: undefined,
      checkoutStep: 0,
      checkoutDone: true
    })
  })

  it('should handle RESET_CHECKOUT', () => {
    expect(navigator({
      isFetching: false,
      id: undefined,
      currentQuery: undefined,
      checkoutStep: 0,
      checkoutDone: true
    }, resetCheckout()))
    .to.deep.equals({
      isFetching: false,
      id: undefined,
      currentQuery: undefined,
      checkoutStep: 0,
      checkoutDone: false
    })
  })
})
