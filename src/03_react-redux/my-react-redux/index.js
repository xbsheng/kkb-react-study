import React, { useContext, useEffect, useReducer } from 'react'

const bindActionCreator = (creator, dispatch) => (...args) => dispatch(creator(...args))

export const bindActionCreators = (creators, dispatch) => {
  if (typeof creators === 'function') {
    return bindActionCreator(creators, dispatch)
  }
  return Object.keys(creators).reduce((result, key) => {
    result[key] = bindActionCreator(creators[key], dispatch)
    return result
  }, {})
}

const Context = React.createContext()
export const Provider = props => {
  const { store, children } = props
  return <Context.Provider value={store}>{children}</Context.Provider>
}

export const connect = (mapStateToProps, mapDispatchToProps) => Comp => props => {
  const { getState, dispatch, subscribe } = useContext(Context)
  const stateProps = mapStateToProps(getState())
  const dispatchProps = mapDispatchToProps(dispatch)
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  useEffect(() => subscribe(forceUpdate), [subscribe])
  return <Comp {...props} {...stateProps} {...dispatchProps} zxc="zxc" />
}
