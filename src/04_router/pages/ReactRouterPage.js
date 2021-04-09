import React from 'react'

import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom'

import Home from './Home'
import Login from './Login'
import NotFound from './NotFound'
import Product from './Product'
import User from './User'

export default function App() {
  return (
    <div>
      <h2>react-router</h2>
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
        <NavLink exact to="/zxc">
          404
        </NavLink>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user" component={User} />
          <Route path="/login" component={Login} />
          <Route path="/product" component={Product} />
          <Route path="/product/:id" component={Product} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
