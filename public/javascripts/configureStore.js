import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {combineReducers, compose} from 'redux';
import {routerReducer} from 'react-router-redux';
import library from './reducers/LibraryReducer';
import cart from './reducers/CartReducer';
import DevTools from './DevTools'

const loggerMiddleware = createLogger();
const reducers = combineReducers({
  library,
  cart,
  routing: routerReducer
});

const enhancer = compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default function configureStore(preloadedState) {
  return createStore(reducers, preloadedState, enhancer);
}
