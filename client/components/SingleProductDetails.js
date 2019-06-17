import React from 'react'
import {getProductStyleThunk} from '../store/product'
import {addItemThunk, getOrderAndItemsThunk, addedItem} from '../store/cart'
import {connect} from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'

class SingleProductDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: '',
      size: '',
      show: false
    }
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
    this.handleChangeSize = this.handleChangeSize.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
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
  handleShow() {
    this.setState({show: true})
  }
  handleClose() {
    this.setState({show: false})
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.props.userId && !!this.state.quantity && !!this.state.size) {
      this.props.addItemThunk(
        this.props.order.id,
        this.state.size,
        this.state.quantity
      )
    } else if (!!this.state.quantity && !!this.state.size) {
      let item = {}
      this.props.productStyle.forEach(product => {
        if (product.id === parseInt(this.state.size, 10)) {
          item = product
        }
      })
      this.props.addedItem({
        ...item,
        order_products: {quantity: this.state.quantity}
      })
    }
    this.handleShow()
  }

  handleChangeQuantity(event) {
    event.preventDefault()
    this.setState({quantity: event.target.value})
  }

  handleChangeSize(event) {
    event.preventDefault()
    this.setState({size: event.target.value})
  }

  render() {
    if (this.props.loading) {
      return <div>LOADING...</div>
    }
    let {productStyle, order} = this.props
    return productStyle.length < 1 ? (
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

            <React.Fragment>
              <h6>SIZE: </h6>
              <select
                className="browser-default custom-select"
                style={{width: '8rem', marginBottom: '2rem'}}
                onChange={this.handleChangeSize}
                name="Size"
              >
                <option value="">-</option>
                {productStyle.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.size}
                  </option>
                ))}
              </select>
            </React.Fragment>
            <h6>QTY: </h6>
            <select
              className="browser-default custom-select"
              style={{width: '8rem', marginBottom: '2rem'}}
              onChange={this.handleChangeQuantity}
              name="Quantity"
            >
              <option value="">-</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <Button
              style={{marginBottom: '2rem'}}
              type="submit"
              variant="warning"
              onClick={this.handleSubmit}
            >
              Add To Cart
            </Button>
            <Toast
              onClose={this.handleClose}
              show={this.state.show}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded mr-2"
                  alt=""
                />
                <strong className="mr-auto">Added to your Cart</strong>
              </Toast.Header>
              <Toast.Body>Keep Shopping!</Toast.Body>
            </Toast>
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
  getOrderAndItemsThunk: userId => dispatch(getOrderAndItemsThunk(userId)),
  addItemThunk: (orderId, productId, quantity) =>
    dispatch(addItemThunk(orderId, productId, quantity)),
  addedItem: item => dispatch(addedItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleProductDetails
)
