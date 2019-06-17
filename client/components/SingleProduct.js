import React from 'react'
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const SingleProduct = props => {
  const product = props.product
  const productName = product.name.split(' ').join('-')
  return (
    <Card style={{width: '21rem', marginBottom: '1rem', border: 'none'}}>
      <Card.Img src={product.imageUrl} variant="top" />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        <Button
          variant="outline-warning"
          as={Link}
          to={`products?name=${productName}`}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  )
}

export default SingleProduct
