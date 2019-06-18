import React from 'react'
import {addItemThunk, addedItem} from '../store/cart'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import Form from 'react-bootstrap/Form'

class FormAddToCart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: '',
      size: '',
      show: false,
      validated: false
    }
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
    this.handleChangeSize = this.handleChangeSize.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleSubmitValidation = this.handleSubmitValidation.bind(this)
  }

  handleShow() {
    this.setState({show: true})
  }
  handleClose() {
    this.setState({show: false})
  }
  // to use with select validation
  handleSubmitValidation(event) {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    this.setState({validated: true})
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
    this.handleSubmitValidation(event)
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
    const {validated} = this.state
    let {productStyle} = this.props
    return productStyle.length < 1 ? (
      ''
    ) : (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit} noValidate validated={validated}>
          <h6>SIZE: </h6>
          <Form.Control
            as="select"
            required
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
          </Form.Control>
          <h6>QTY: </h6>
          <Form.Control
            as="select"
            required
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
          </Form.Control>

          <Button
            block
            style={{marginBottom: '2rem'}}
            type="submit"
            variant="warning"
          >
            Add To Cart
          </Button>
        </Form>
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
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  productStyle: state.product.productStyle,
  loading: state.product.loading,
  order: state.cart.order
})

const mapDispatchToProps = dispatch => ({
  addItemThunk: (orderId, productId, quantity) =>
    dispatch(addItemThunk(orderId, productId, quantity)),
  addedItem: item => dispatch(addedItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormAddToCart)
