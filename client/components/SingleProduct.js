import React from 'react'
import {Link} from 'react-router-dom'

const SingleProduct = props => {
  const product = props.product
  return (
    <div>
      <img src={product.imageUrl} width="75px" height="75px" />
      <h2>{product.name}</h2>
      <h3>${product.price}</h3>
      <Link to={`products/${product.id}`}>View Detail</Link>
    </div>
  )
}

export default SingleProduct
