import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import counter from './counter'
import thunk from 'redux-thunk'
import { routerReducer } from 'react-router-redux'

const reducers = {
    counter
    // Add reducers here
}

export default createStore(combineReducers({...reducers, routing: routerReducer}), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
))
