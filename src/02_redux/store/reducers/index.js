import { combineReducers } from '../../my-redux'

import counter from './counter'
import flag from './flag'

export default combineReducers({ counter, flag })
