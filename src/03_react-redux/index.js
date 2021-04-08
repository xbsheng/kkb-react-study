import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import { Provider } from './my-react-redux'

import App from './App'
import store from './store'

// import { Context } from './my-react-redux'

ReactDOM.render(
  <Provider store={store}>
    {/* <Provider store={store} context={Context}> */}
    <App />
  </Provider>,
  document.getElementById('root')
)
