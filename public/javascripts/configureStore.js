// Required Modules
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { routerReducer } from 'react-router-redux'

// Reducers
import library from './reducers/LibraryReducer'
import cart from './reducers/CartReducer'
import navigator from './reducers/NavigatorReducer'
import shelf from './reducers/ShelfReducer'

// Created Middleware
import DevTools from './DevTools'

const loggerMiddleware = createLogger()

const reducers = combineReducers({
  library,
  cart,
  shelf,
  navigator,
  routing: routerReducer
})

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) : compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)

export default function configureStore(preloadedState) {
  return createStore(reducers, preloadedState, enhancer)
}
