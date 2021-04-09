import React, { useState, useEffect } from 'react'
import { Redirect, Prompt } from 'react-router-dom'

export default function Home(props) {
  console.log(props)
  const [isLogin, setIsLogin] = useState(true)
  const [count, setCount] = useState(0)
  useEffect((...args) =>console.log('useEffect', args))
  return (
    <div>
      <h1 onClick={() => setCount(count + 1)}>{count}</h1>
      <Prompt when={true} message="Are you sure you want to leave?" />
      {!isLogin && <Redirect to="login" />}
      <h3>Home</h3>
    </div>
  )
}
