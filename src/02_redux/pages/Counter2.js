import React, { useState, useEffect } from 'react'

import store from '../store'
import { increase, decrease } from '../store/actions/counter'

export default function Counter() {
  const [count, setCount] = useState(store.getState().counter)

  const handleIncrease = () => {
    store.dispatch(increase())
  }
  const handleDecrease = () => {
    store.dispatch(decrease())
  }

  useEffect(() => {
    store.subscribe(() => setCount(store.getState().counter))
  }, [])
  return (
    <div style={{ border: '1px solid' }}>
      <h2>counterPage2: {count}</h2>
      <button onClick={handleIncrease}>+1</button>
      <button onClick={handleDecrease}>-1</button>
    </div>
  )
}
