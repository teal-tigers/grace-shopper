import React from 'react'
import {connect} from 'react-redux'
import {submitOrderThunk, clearCart} from '../store/cart'
import {Signup} from './auth-form'
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: this.props.user.address
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
      this.props.total
    )
    this.props.clearCart()
    this.setState({address: this.props.user.address})
  }

  render() {
    return !this.props.user.id ? (
      <div>
        <span>Please sign up to checkout:</span>
        <Link to="/signup">
          <p>Signup</p>
        </Link>
      </div>
    ) : (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Label>
            {this.props.user.fullName}, please complete checkout
          </Form.Label>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Shipping Address</Form.Label>
            <FormControl
              as="input"
              name="address"
              defaultValue={this.state.address}
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Button variant="info" type="submit">
          Complete Purchase
        </Button>
      </Form>
    )
  }
}

const mapDispatch = dispatch => ({
  submitOrderThunk: (orderId, address, total) =>
    dispatch(submitOrderThunk(orderId, address, total)),
  clearCart: () => dispatch(clearCart())
})

export default connect(null, mapDispatch)(Checkout)
