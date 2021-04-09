import React from 'react'
import { Link, Route } from 'react-router-dom'
import Detail from './Detail'

export default function Product(props) {
  console.log(props)
  const {
    match: { url }
  } = props
  return (
    <div>
      <h3>Product</h3>
      <Link to={url + '/detail'}>detail</Link>
      <Route path={url + '/detail'} component={Detail} />
    </div>
  )
}
