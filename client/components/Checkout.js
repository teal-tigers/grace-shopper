import React from 'react'
import {connect} from 'react-redux'
import {submitOrderThunk, clearCart} from '../store/cart'
import {Signup} from './auth-form'
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form'

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
      <form onSubmit={this.handleSubmit}>
        <h2>{this.props.user.fullName}</h2>
        <label htmlFor="address">Add Shipping Address</label>
        <input
          name="address"
          type="text"
          value={this.state.address}
          onChange={this.handleChange}
        />
        <button type="submit">Complete Purchase</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  submitOrderThunk: (orderId, address, total) =>
    dispatch(submitOrderThunk(orderId, address, total)),
  clearCart: () => dispatch(clearCart())
})

export default connect(null, mapDispatch)(Checkout)
