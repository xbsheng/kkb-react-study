import React, { useReducer } from 'react'

import Counter1 from './pages/Counter1'
// import Counter2 from './pages/Counter2'
import Counter3 from './pages/Counter3-hooks'

export default function App() {
  const [showCounter1, setShowCounter1] = useReducer(flag => !flag, true)
  return (
    <>
      <h2>app: </h2>
      <button onClick={setShowCounter1}>显示/隐藏Counter1</button>
      <hr />
      {showCounter1 && <Counter1 />}
      <hr />
      {/* <Counter2 /> */}
      <Counter3 />
    </>
  )
}
