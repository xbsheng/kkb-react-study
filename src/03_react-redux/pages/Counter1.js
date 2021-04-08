import React, { Component } from 'react'

import store from '../store'

// import { bindActionCreators } from 'redux'
import { bindActionCreators } from '../my-react-redux'
// import { connect } from 'react-redux'
import { connect } from '../my-react-redux'

// @connect(state => ({ count: state }), {
//   increase: () => ({ type: 'INCREASE' }),
//   decrease: () => ({ type: 'DECREASE' })
// })
@connect(
  state => ({ count: state }),
  dispatch => {
    let creators = {
      increase: () => ({ type: 'INCREASE' }),
      decrease: () => ({ type: 'DECREASE' })
    }
    creators = bindActionCreators(creators, dispatch)
    return {
      dispatch,
      ...creators
    }
  }
)
class Counter1 extends Component {
  increase() {}
  render() {
    const { count, increase, decrease } = this.props
    return (
      <div>
        <h2>Counter1: {count}</h2>
        <button onClick={increase}>+1</button>
        <button onClick={decrease}>-1</button>
        <button onClick={() => console.log(store.getState())}>show</button>
      </div>
    )
  }
}

export default Counter1
