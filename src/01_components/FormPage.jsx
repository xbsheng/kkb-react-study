import React, { Component } from 'react'
import Form, { Item, Input } from './components/my-form'

export default class FormPage extends Component {
  state = {
    count: 0
  }
  formRef = React.createRef()
  componentDidMount() {
    this.formRef.current.setFieldValue({ username: 'xbsheng' })
  }
  onFinish = () => {
    console.log('onFinish')
  }
  onFinishFailed = () => {
    console.log('onFinishFailed')
  }
  handleAdd = () => {
    setTimeout(() => {
      console.log(this.state.count)
      this.setState({ count: this.state.count + 1 })
      this.setState({ count: this.state.count + 1 })
      this.setState({ count: this.state.count + 1 })
    })
    this.setState({ count: this.state.count + 1 })
    this.setState({ count: this.state.count + 1 })
  }
  render() {
    console.log('render')
    const nameRules = [{ required: true, message: '请输入姓名！' }]
    const passwordRules = [{ required: true, message: '请输入密码！' }]
    return (
      <div>
        <h1>FormPage</h1>
        <Form ref={this.formRef} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
          <Item name="username" rules={nameRules}>
            <Input placeholder="username" />
          </Item>
          <Item name="password" rules={passwordRules}>
            <Input placeholder="password" />
            {/* <Input placeholder="password" type="password" /> */}
          </Item>
          <button>Submit</button>
        </Form>
        <hr />
        <h3>{this.state.count}</h3>
        <button onClick={this.handleAdd}>+3</button>
      </div>
    )
  }
}
