import { useRef } from 'react'

class FormStore {
  constructor() {
    this.store = {}
    this.fieldEntities = []
    this.callbacks = {}
  }
  // 注册Item实例
  registerEntity = entity => {
    this.fieldEntities.push(entity)
    return () => {
      this.fieldEntities = this.fieldEntities.filter(item => item !== entity)
      delete this.store[entity.props.name]
    }
  }
  getFieldValue = name => {
    return this.store[name]
  }
  getFieldsValue = () => {
    return this.store
  }
  setFieldValue = newStore => {
    Object.assign(this.store, newStore)
    Object.keys(newStore).forEach(key => {
      this.fieldEntities.forEach(entity => {
        if (entity.props.name === key) {
          entity.onStoreChange()
        }
      })
    })
  }
  setCallbacks = callback => {
    Object.assign(this.callbacks, callback)
  }
  validate = () => {
    const error = []
    this.fieldEntities.forEach(entity => {
      const { name, rules } = entity.props
      const rule = rules && rules[0]
      const value = this.getFieldValue(name)
      if (rule && rule.required && !value) {
        error.push({ [name]: rule.message, value })
        entity.validate(rule.message)
      } else {
        entity.validate()
      }
    })
    return error
  }
  submit = () => {
    const errorList = this.validate()
    const { onFinish, onFinishFailed } = this.callbacks
    if (errorList.length) {
      onFinishFailed(errorList)
    } else {
      onFinish(this.getFieldsValue)
    }
  }
  getForm() {
    return {
      submit: this.submit,
      registerEntity: this.registerEntity,
      getFieldValue: this.getFieldValue,
      setFieldValue: this.setFieldValue,
      setCallbacks: this.setCallbacks
    }
  }
}

export default function useForm(form) {
  const formRef = useRef()
  console.log(formRef)
  // if (!formRef.current) {
  if (form) {
    formRef.current = form
  } else {
    const formStore = new FormStore()
    formRef.current = formStore.getForm()
  }
  // }
  console.log(formRef)
  return [formRef.current]
}
