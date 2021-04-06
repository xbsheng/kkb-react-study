export default function index({ getState }) {
  console.log(123)
  return dispatch => (...args) => {
    console.log('**********my-logger-start**********')
    const prevState = getState()
    const action = args[0]
    dispatch(...args)
    const nextState = getState()
    console.log('prevState', prevState)
    console.log('nextState', nextState)
    console.log('action', action)
    console.log('**********my-logger-end**********')
  }
}
