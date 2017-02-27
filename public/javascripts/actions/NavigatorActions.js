import * as types from '../constants/ActionTypes'

export const requestSearch = (query) => ({
  type: types.REQUEST_SEARCH,
  query
})

export const receiveSearch = (query) => ({
  type: types.RECEIVE_SEARCH,
  query
})

export const throwSearchError = (query) => ({
  type: types.THROW_SEARCH_ERROR,
  query
})

export const requestInfo = (id) => ({
  type: types.REQUEST_INFO,
  id
})

export const receiveInfo = (id) => ({
  type: types.RECEIVE_INFO,
  id
})

export const throwFetchInfoError = (id) => ({
  type: types.THROW_FETCH_INFO_ERROR,
  id
})

export const enterCheckoutStepOne = () => ({
  type: types.ENTER_CHECKOUT_STEP_ONE
})

export const finishCheckout = () => ({
  type: types.FINISH_CHECKOUT
})
