import React from 'react'

const reduxContext = React.createContext()

export const ReduxProvider = reduxContext.Provider
export const ReduxConsumer = reduxContext.Consumer
