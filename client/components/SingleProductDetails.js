import React from 'react'
import {getProductStyleThunk} from '../store/product'
import {getOrderAndItemsThunk} from '../store/cart'
import FormAddToCart from './FormAddToCart'
import {connect} from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'

class SingleProductDetails extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    let params = new URLSearchParams(document.location.search)
    let productName = params.get('name')
    this.props.getProductStyleThunk(productName)
    if (this.props.userId) {
      this.props.getOrderAndItemsThunk()
    }
  }

  componentDidUpdate(prev) {
    if (this.props.userId && this.props.userId !== prev.userId) {
      this.props.getOrderAndItemsThunk()
    }
  }

  render() {
    let {productStyle} = this.props
    return this.props.loading ? (
      <div>LOADING...</div>
    ) : productStyle.length < 1 ? (
      ''
    ) : (
      <Row>
        <Col>
          <Image src={productStyle[0].imageUrl} style={{width: '90%'}} />
        </Col>
        <Col>
          <Card style={{border: 'none'}}>
            <Card.Title>{productStyle[0].name}</Card.Title>
            <Card.Text>${productStyle[0].price}</Card.Text>
            <Card.Text>{productStyle[0].description}</Card.Text>
            <FormAddToCart
              productStyle={this.props.productStyle}
              order={this.props.order}
              userId={this.props.userId}
            />
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  productStyle: state.product.productStyle,
  loading: state.product.loading,
  order: state.cart.order
})

const mapDispatchToProps = dispatch => ({
  getProductStyleThunk: name => dispatch(getProductStyleThunk(name)),
  getOrderAndItemsThunk: userId => dispatch(getOrderAndItemsThunk(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleProductDetails
)
