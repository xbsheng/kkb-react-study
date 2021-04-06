import { INCREASE, DECREASE } from '../constant'

export default function counter(state = 0, { type }) {
  switch (type) {
    case INCREASE:
      return state + 1
    case DECREASE:
      return state - 1
    default:
      return state
  }
}
