import React, { useState, useEffect } from 'react'

import store from '../store'
import { increase, decrease } from '../store/actions/counter'
import { changeFlag } from '../store/actions/flag'

export default function Counter() {
  const [count, setCount] = useState(store.getState().counter)
  const [flag, setFlag] = useState(store.getState().flag)

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCount(store.getState().counter)
      setFlag(store.getState().flag)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const handleIncrease = () => {
    store.dispatch(increase())
  }
  const handleDecrease = () => {
    store.dispatch(decrease())
  }
  const handleAsyncDecrease = () => {
    store.dispatch(dispatch => {
      setTimeout(() => {
        dispatch(increase())
      }, 1000)
    })
  }

  const handleChangeFlag = () => store.dispatch(changeFlag())

  return (
    <div style={{ border: '1px solid' }}>
      <h2>counterPage1: {count}</h2>
      <button onClick={handleIncrease}>+1</button>
      <button onClick={handleDecrease}>-1</button>
      <button onClick={handleAsyncDecrease}>async +1</button>
      <hr />
      <h2>flag: {flag + ''}</h2>
      <button onClick={handleChangeFlag}>change flag</button>
    </div>
  )
}
