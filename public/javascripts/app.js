import React, { Component } from 'react'
import { createStore, applyMiddleware, Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import VisibleBookList from './containers/VisibleBookList'
import VisibleCheckoutPage from './containers/VisibleCheckoutPage'
import Layout from './containers/Layout'
import configureStore from './configureStore'
import VisibleBookPage from './containers/VisibleBookPage'
import { saveState, loadState } from './localStorage'

const store = configureStore(loadState())
const history = syncHistoryWithStore(browserHistory, store)
/*
store.subscribe(() => {
  saveState(store.getState())
})
*/

const root = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/app" component={Layout}>
        <Route path="books" component={VisibleBookList}></Route>
        <Route path="book/:bookid" component={VisibleBookPage}></Route>
        <Route path="checkout/stepone" component={VisibleCheckoutPage}></Route>
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(
  root,
  document.getElementById('root')
)

