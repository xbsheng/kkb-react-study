import React, { useReducer } from 'react'

import { BrowserRouter, NavLink, Route, Switch, Prompt, Redirect } from '../my-react-router-dom'

// import Home from './Home'
import Login from './Login'
import NotFound from './NotFound'
// import Product from './Product'
import User from './User'

export default function App() {
  return (
    <div>
      <h2>my-react-router</h2>
      <hr />
      <BrowserRouter>
        <NavLink exact to="/">
          home
        </NavLink>
        <NavLink exact to="/user">
          user
        </NavLink>
        <NavLink exact to="/login">
          login
        </NavLink>
        <NavLink exact to="/product">
          product
        </NavLink>
        <NavLink exact to="/product/123">
          /product/123
        </NavLink>
        <NavLink exact to="/zxc123">
          404
        </NavLink>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user" component={User}>
            <h1>user children</h1>
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/product" component={Product} />
          <Route path="/product/:id" component={Product} />
          <Route path="/zxc" children={() => <h1>children fn</h1>} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

function Product() {
  return <h3>Product</h3>
}
function Home() {
  const [flag, setFlag] = useReducer(flag => !flag, true)
  const [isLogin, setIsLogin] = useReducer(flag => !flag, true)
  return (
    <>
      <Prompt when={flag} message="确认离开？" />
      {!isLogin && <Redirect to="/user" />}
      <h3>Home</h3>
      <button onClick={setFlag}>{flag + ''}</button>
      <button onClick={setIsLogin}>{'isLogin: ' + isLogin}</button>
    </>
  )
}
