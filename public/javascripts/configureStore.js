import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
//import articles from './reducers/articles';
//import editor from './reducers/editor';
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

const loggerMiddleware = createLogger();
const reducers = {};
//const reducers = combineReducers({
//  editor,
//  articles,
//  routing: routerReducer
//});

export default function configureStore(preloadedState) {
  return createStore(
    reducers,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}
