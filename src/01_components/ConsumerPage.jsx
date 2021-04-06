import React, { Component } from 'react'
import { ThemeConsumer } from './Context.js'
import GrandsonPage from './GrandsonPage.jsx'

export default class ConsumerPage extends Component {
  render() {
    return (
      <div>
        <h5>ConsumerPage</h5>
        <ThemeConsumer>{context => <div className={context.themeColor}>omg=={context.count}</div>}</ThemeConsumer>
        <GrandsonPage />
      </div>
    )
  }
}
