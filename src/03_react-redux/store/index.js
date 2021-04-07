import { createStore } from '../my-redux'

const reducer = (state = 0, { type }) => {
  switch (type) {
    case 'INCREASE':
      return state + 1
    case 'DECREASE':
      return state - 1
    default:
      return state
  }
}

export default createStore(reducer)
