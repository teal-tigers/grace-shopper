import React from 'react'
import {connect} from 'react-redux'
import {submitOrderThunk, clearCart} from '../store/cart'
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: this.props.user.address,
      promo: '',
      promoUsed: false,
      total: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.promoHandler = this.promoHandler.bind(this)
  }
  componentDidMount() {
    let total = this.props.cartItems.reduce((acc, val) => {
      return acc + val.order_products.quantity * val.price
    }, 0)
    this.setState({
      total
    })
  }
  componentDidUpdate(prev) {
    if (this.props.cartItems !== prev.cartItems) {
      let total = this.props.cartItems.reduce((acc, val) => {
        return acc + val.order_products.quantity * val.price
      }, 0)
      total = this.state.promoUsed ? total / 2 : total
      this.setState({total})
    }
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.submitOrderThunk(
      this.props.orderId,
      this.state.address,
      this.state.total,
      this.state.promoUsed
    )
    this.props.clearCart()
    this.setState({
      address: this.props.user.address,
      promoUsed: false,
      promo: ''
    })
  }

  promoHandler(event) {
    event.preventDefault()
    if (this.state.promo === 'ranchlife' && !this.state.promoUsed) {
      let halfTotal = this.state.total / 2
      this.setState({total: halfTotal, promoUsed: true})
    }
  }

  render() {
    return !this.props.user.id ? (
      <React.Fragment>
        Please <Link to="/signup">Sign up </Link>
        to complete checkout
      </React.Fragment>
    ) : (
      <React.Fragment>
        <h3>{`Total: $${this.state.total.toFixed(2)}`}</h3>
        <Form onSubmit={this.promoHandler}>
          <Form.Label style={{marginTop: '2rem', marginBottom: '2rem'}}>
            <strong>{this.props.user.fullName}</strong>, please complete
            checkout
          </Form.Label>
          <Form.Label>Enter Promo Code</Form.Label>
          <FormControl
            name="promo"
            type="text"
            value={this.state.promo}
            onChange={this.handleChange}
            style={{marginBottom: '2rem'}}
          />
          <Button
            type="submit"
            variant="outline-info"
            block
            style={{marginBottom: '2rem'}}
          >
            Add Promo
          </Button>
        </Form>
        <Form onSubmit={this.handleSubmit}>
          <Form.Label>Shipping Address</Form.Label>
          <FormControl
            name="address"
            type="text"
            value={this.state.address}
            onChange={this.handleChange}
            style={{marginBottom: '2rem'}}
          />
          <Button type="submit" variant="info" block>
            Complete Purchase
          </Button>
        </Form>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  cartItems: state.cart.cartItems,
  user: state.user
})

const mapDispatch = dispatch => ({
  submitOrderThunk: (orderId, address, total, promoUsed) =>
    dispatch(submitOrderThunk(orderId, address, total, promoUsed)),
  clearCart: () => dispatch(clearCart())
})

export default connect(mapState, mapDispatch)(Checkout)
