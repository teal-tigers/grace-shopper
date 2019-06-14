import React from 'react'
import {connect} from 'react-redux'
import user from '../store/user'
import submitOrderThunk from '../store/cart'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullName: '',
      address: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      fullName: this.fullName,
      address: this.address
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateTotalThunk(this.state)
    submitOrderThunk(this.state.order.id, this.state.status)
  }

  render() {
    const {orderTotal, updateTotalThunk} = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="fullname">Your Name</label>
        <input
          name="fullname"
          type="text"
          value={this.state.fullName}
          onChange={this.handleChange}
        />

        <label htmlFor="address">Add Shipping Address</label>
        <input
          name="address"
          type="text"
          value={this.state.adddres}
          onChange={this.handleChange}
        />
        <p>`Total: $${orderTotal.toFixed(2)}`</p>
        <button type="button">Complete Purchase</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  submitOrderThunk: (orderId, status) =>
    dispatch(submitOrderThunk(orderId, status))
})

export default connect(null, mapDispatch)(Checkout)
