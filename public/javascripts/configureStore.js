import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import library from './reducers/LibraryReducer';
import cart from './reducers/CartReducer';

const loggerMiddleware = createLogger();
const reducers = combineReducers({
  library,
  cart,
  routing: routerReducer
});

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
