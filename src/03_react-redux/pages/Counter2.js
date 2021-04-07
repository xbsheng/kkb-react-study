import React, { Component } from 'react'

import { connect } from 'react-redux'

@connect(state => ({ count: state }), {
  increase: () => ({ type: 'INCREASE' }),
  decrease: () => ({ type: 'DECREASE' })
})
class Counter1 extends Component {
  increase() {}
  render() {
    console.log(this.props)
    const { count, increase, decrease } = this.props
    return (
      <div>
        <h2>Counter2: {count}</h2>
        <button onClick={increase}>+1</button>
        <button onClick={decrease}>-1</button>
      </div>
    )
  }
}

export default Counter1
