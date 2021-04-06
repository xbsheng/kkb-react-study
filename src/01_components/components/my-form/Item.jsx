import React, { Component } from 'react'
import FormContext from './FormContext.js'

export default class Item extends Component {
  static contextType = FormContext
  state = {
    validateMessage: ''
  }
  componentDidMount() {
    const { registerEntity } = this.context
    console.log(registerEntity)
    this.cancelRegister = registerEntity(this)
  }
  componentWillUnmount() {
    if (this.cancelRegister) {
      this.cancelRegister()
    }
  }
  getControlled() {
    const { name } = this.props
    const { getFieldValue, setFieldValue } = this.context
    return {
      value: getFieldValue(name) || '',
      onChange: e => {
        const newVal = e.target.value
        setFieldValue({ [name]: newVal })
      }
    }
  }
  validate = validateMessage => {
    console.log(validateMessage)
    this.setState({ validateMessage })
  }
  onStoreChange = () => {
    this.forceUpdate()
  }
  render() {
    const { children } = this.props
    const { validateMessage } = this.state
    return (
      <>
        {React.cloneElement(children, this.getControlled())}
        {validateMessage && <p style={{ color: 'red' }}>{validateMessage}</p>}
      </>
    )
  }
}
