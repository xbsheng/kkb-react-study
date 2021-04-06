import React, { Component } from 'react'
import { ThemeConsumer } from './Context.js'

export default class GrandsonPage extends Component {
  render() {
    return (
      <div>
        <p>GrandsonPage</p>
        <ThemeConsumer>
          {context => (
            <div>
              themeColor：{context.themeColor}| count：{context.count}
            </div>
          )}
        </ThemeConsumer>
      </div>
    )
  }
}
