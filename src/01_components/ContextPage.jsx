import React, { Component } from 'react'
import ConsumerPage from './ConsumerPage.jsx'
import { ThemeProvider } from './Context.js'

export default class ContextPage extends Component {
  state = {
    theme: {
      themeColor: 'red',
      count: 1
    }
  }
  addCount = () => {
    const { theme } = this.state
    theme.count++
    this.setState({ theme })
  }
  changeThemeColor = () => {
    const { theme } = this.state
    theme.themeColor = theme.themeColor === 'red' ? 'green' : 'red'
    this.setState({ theme })
  }
  render() {
    const { theme } = this.state
    return (
      <div>
        <h3>ContextPage</h3>
        <button onClick={this.addCount}>addCount</button>
        <button onClick={this.changeThemeColor}>changeThemeColor</button>
        <ThemeProvider value={theme}>
          <ConsumerPage />
        </ThemeProvider>
      </div>
    )
  }
}
