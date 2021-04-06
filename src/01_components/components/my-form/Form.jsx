import React, { forwardRef } from 'react'
import useForm from './useForm.js'
import FormContext from './FormContext.js'

function Form({ form, children, onFinish, onFinishFailed }, ref) {
  const [formInstance] = useForm(form)
  React.useImperativeHandle(ref, () => formInstance)
  formInstance.setCallbacks({ onFinish, onFinishFailed })
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        formInstance.submit()
      }}
    >
      <h3>start</h3>
      <FormContext.Provider value={formInstance}>{children}</FormContext.Provider>
      <h3>end</h3>
    </form>
  )
}

export default forwardRef(Form)
