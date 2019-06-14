import React from 'react'
import {connect} from 'react-redux'
import {submitOrderThunk} from '../store/cart'

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
    console.log('AKJHDFJKSHFJDKSDKF', this.props)
    this.props.submitOrderThunk(
      this.props.orderId,
      this.state.address,
      this.props.total
    )
  }

  render() {
    return (
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
    dispatch(submitOrderThunk(orderId, address, total))
})

export default connect(null, mapDispatch)(Checkout)
