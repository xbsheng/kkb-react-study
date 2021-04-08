import React, { useContext, useReducer, useLayoutEffect } from 'react'

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
// react-redux
export const Context = React.createContext()
export const Provider = props => {
  const { store, children } = props
  return <Context.Provider value={{ store }}>{children}</Context.Provider>
}

export const useStore = () => useContext(Context).store

export const connect = (mapStateToProps, mapDispatchToProps) => Comp => props => {
  console.log(useContext(Context))
  const { getState, dispatch, subscribe } = useStore()
  const stateProps = mapStateToProps(getState())
  const dispatchProps = mapDispatchToProps(dispatch)
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  useLayoutEffect(() => subscribe(forceUpdate), [subscribe])
  return <Comp {...props} {...stateProps} {...dispatchProps} zxc="zxc" />
}

export const useSelector = cb => {
  const { getState, subscribe } = useStore()
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  useLayoutEffect(() => subscribe(forceUpdate), [subscribe])
  return cb(getState())
}

export const useDispatch = () => useStore().dispatch
