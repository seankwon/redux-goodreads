import { expect } from 'chai'
import * as types from '../../public/javascripts/constants/ActionTypes'
import {
  requestSearch,
  receiveSearch,
  throwSearchError,
  requestInfo,
  receiveInfo,
  throwFetchInfoError,
  enterCheckoutStepOne,
  finishCheckout
} from '../../public/javascripts/actions/NavigatorActions'

describe ('Navigator Actions', () => {
  it ('request search should start a query', () => {
    expect(requestSearch('Test Query')).to.deep.equals({
      type: types.REQUEST_SEARCH,
      query: 'Test Query'
    })
  })

  it ('receive search finish a query', () => {
    expect(receiveSearch('Test Query', 1)).to.deep.equals({
      type: types.RECEIVE_SEARCH,
      query: 'Test Query',
      page: 1
    })
  })

  it ('throw search error should throw an error', () => {
    expect(throwSearchError('Test Query')).to.deep.equals({
      type: types.THROW_SEARCH_ERROR,
      query: 'Test Query'
    })
  })

  it ('request info should request info about a singular book by id', () => {
    expect(requestInfo(2)).to.deep.equals({
      type: types.REQUEST_INFO,
      id: 2
    })
  })

  it ('receive info should finish the request', () => {
    expect(receiveInfo(2)).to.deep.equals({
      type: types.RECEIVE_INFO,
      id: 2
    })
  })

  it ('throw fetch info error should throw an error based on a book\'s id', () => {
    expect(throwFetchInfoError(2)).to.deep.equals({
      type: types.THROW_FETCH_INFO_ERROR,
      id: 2
    })
  })

  it ('enterCheckoutStepOne should start the checkout process', () => {
    expect(enterCheckoutStepOne()).to.deep.equals({
      type: types.ENTER_CHECKOUT_STEP_ONE
    })
  })

  it ('finishCheckout should finish the checkout process', () => {
    expect(finishCheckout()).to.deep.equals({
      type: types.FINISH_CHECKOUT
    })
  })
})
