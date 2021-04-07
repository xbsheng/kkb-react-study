let state
let cbList = []

export const createStore = (reducer, enhancer) => {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
  const getState = () => state
  const subscribe = cb => {
    cbList.push(cb)
    return () => {
      console.log('执行unsubscribe')
      cbList = cbList.filter(item => item !== cb)
    }
  }
  const dispatch = action => {
    state = reducer(state, action)
    cbList.forEach(cb => cb())
  }
  dispatch({ type: Symbol() })
  return {
    getState,
    subscribe,
    dispatch
  }
}

export const applyMiddleware = (...middlewares) => {
  return createStore => (...args) => {
    const store = createStore(...args)
    const middlewareAPI = {
      getState: store.getState
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    const dispatch = compose(...chain)(store.dispatch)
    return { ...store, dispatch }
  }
}

export const combineReducers = reducers => {
  const finalReducerKeys = Object.keys(reducers).filter(key => typeof reducers[key] === 'function')
  const finalReducers = finalReducerKeys.reduce((prev, key) => ({ ...prev, [key]: reducers[key] }), {})
  return (state = {}, action) => {
    const nextState = {}
    let hasChanged = false
    finalReducerKeys.forEach(key => {
      const currentStateForKey = state[key]
      const nextStateForKey = finalReducers[key](currentStateForKey, action)
      hasChanged = hasChanged || currentStateForKey !== nextStateForKey
      nextState[key] = nextStateForKey
    })
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state)
    return hasChanged ? nextState : state
  }
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
