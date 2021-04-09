import React, { createContext, useEffect, useState, useContext } from 'react'
import matchPath from './matchPath'
const history = require('history')

const Context = createContext()

const computeRootMatch = pathname => {
  return {
    path: '/',
    url: '/',
    params: {},
    isExact: pathname === '/'
  }
}

const Router = props => {
  const { history, staticContext, children } = props
  const [location, setLocation] = useState(history.location)
  useEffect(() => {
    return history.listen(location => {
      setLocation(location)
      console.log(location)
    })
  }, [history])
  const contextValue = {
    history,
    location,
    match: computeRootMatch(location.pathname),
    staticContext
  }
  console.log('重新render')
  return <Context.Provider value={contextValue} children={children || null} />
}

export const BrowserRouter = props => {
  const browserHistory = history.createBrowserHistory()
  return React.createElement(Router, {
    ...props,
    history: browserHistory
  })
}
export const Route = props => {
  const context = useContext(Context)
  const location = props.location || context.location
  const match = props.path
    ? matchPath(location.pathname, props)
    : props.computedMatch
    ? props.computedMatch
    : context.match
  const newProps = {
    ...context,
    location,
    match
  }
  console.log(props.children, match)
  const { children, component, render } = props
  console.log(component)
  return (
    <Context.Provider value={newProps}>
      {match
        ? children
          ? typeof children === 'function'
            ? children(newProps)
            : children
          : component
          ? // ? component(newProps)
            React.createElement(component, newProps)
          : render
          ? render(newProps)
          : null
        : typeof children === 'function'
        ? children(newProps)
        : null}
    </Context.Provider>
  )
}

export const Link = props => {
  const { to, children } = props
  const context = useContext(Context)
  const { history } = context
  const handleClick = e => {
    e.preventDefault()
    console.log(to, context)
    history.push(to)
  }
  return (
    <a href="/#" onClick={handleClick}>
      {children}
    </a>
  )
}

export const NavLink = props => {
  return <Link {...props} />
}

export const Switch = props => {
  const context = useContext(Context)
  const location = props.location || context.location
  let element, match
  React.Children.forEach(props.children, child => {
    if (match == null && React.isValidElement(child)) {
      element = child
      const path = child.props.path
      match = path ? matchPath(location.pathname, { ...child.props, path }) : context.match
    }
  })
  return match ? React.cloneElement(element, { location, computedMatch: match }) : null
}

const Lifecycle = class extends React.Component {
  componentDidMount() {
    const { onMount } = this.props
    onMount && onMount.call(this, this)
  }
  componentDidUpdate(prevProps) {
    const { onUpdate } = this.props
    onUpdate && onUpdate.call(this, this, prevProps)
  }
  componentWillUnmount() {
    const { onUnmount } = this.props
    onUnmount && onUnmount.call(this, this)
  }
  render = () => null
}

export const Prompt = props => {
  const { when = true, message } = props
  const {
    history: { block: method }
  } = useContext(Context)
  if (!when) return null
  const onMount = _this => (_this.release = method(message))
  const onUpdate = (_this, prevProps) => {
    if (prevProps.message !== message) {
      _this.release()
      _this.release = method(message)
    }
  }
  const onUnmount = _this => _this.release()
  return <Lifecycle {...{ message, onMount, onUpdate, onUnmount }} />
}

export const Redirect = props => {
  const { history } = useContext(Context)
  console.log(history)
  const { to } = props
  const method = history.replace
  const location = require('history').createLocation(to)
  const onMount = () => method(location)
  return <Lifecycle {...{ to, onMount }} />
}

export const useHistory = () => useContext(Context)
