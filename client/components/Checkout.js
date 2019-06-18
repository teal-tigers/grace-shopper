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
      total: [this.props.total, false]
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.promoHandler = this.promoHandler.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('STATE:', this.state)
    this.props.submitOrderThunk(
      this.props.orderId,
      this.state.address,
      this.state.total
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
    if (this.state.promo === 'ranchlife') {
      let halfTotal = this.props.total / 2
      this.setState({total: [halfTotal, true]})
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
        <h3>{`Total: $${this.state.total[0].toFixed(2)}`}</h3>
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

const mapDispatch = dispatch => ({
  submitOrderThunk: (orderId, address, total) =>
    dispatch(submitOrderThunk(orderId, address, total)),
  clearCart: () => dispatch(clearCart())
})

export default connect(null, mapDispatch)(Checkout)
