import { CHANGE_FLAG } from '../constant'

export default function flag(state = false, { type }) {
  switch (type) {
    case CHANGE_FLAG:
      return !state
    default:
      return state
  }
}
