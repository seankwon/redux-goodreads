import React, { Component } from 'react';
import { createStore, applyMiddleware, Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
//import VisibleArticleList from './containers/VisibleArticleList';
//import Layout from './components/layout';
//import VisibleArticle from './containers/VisibleArticle';
//import Editor from './containers/Editor'
//import configureStore from './configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const root = (
  <Provider store={store}>
		<Router history={history}>
      //<Route path="/app" component={Layout}>
      //  <Route path="articles" component={VisibleArticleList}></Route>
      //  <Route path="article/:id" component={VisibleArticle}></Route>
      //  <Route path="newarticle" component={Editor}></Route>
      //</Route>
    </Router>
  </Provider>
);
/*
ReactDOM.render(
  root,
  document.getElementById('root')
);
*/
