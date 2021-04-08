import React from 'react'

// import { useSelector, useDispatch } from 'react-redux'
import { useSelector, useDispatch } from '../my-react-redux'

export default function Counter3() {
  const count = useSelector(state => state)
  const dispatch = useDispatch()
  return (
    <div>
      <h2>Counter1: {count}</h2>
      <button onClick={() => dispatch({ type: 'INCREASE' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREASE' })}>-1</button>
    </div>
  )
}
