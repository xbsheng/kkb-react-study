import React from 'react'

import ReactRouterPage from './pages/ReactRouterPage'
import MyReactRouterPage from './pages/MyReactRouterPage'
export default function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <ReactRouterPage />
      <MyReactRouterPage />
    </div>
  )
}
