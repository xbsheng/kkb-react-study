import { createStore, applyMiddleware } from '../my-redux'
// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
import thunk from '../my-redux-thunk'
import logger from '../my-redux-logger'

// import { INCREASE, DECREASE } from './constant'

import reducer from './reducers'

// function reducer(state = 10, { type }) {
//   switch (type) {
//     case INCREASE:
//       return state + 1
//     case DECREASE:
//       return state - 1
//     default:
//       return state
//   }
// }

export default createStore(reducer, applyMiddleware(thunk, logger))
