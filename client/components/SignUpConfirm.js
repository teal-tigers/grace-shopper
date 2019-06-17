import React from 'react'
import {connect} from 'react-redux'
import {saveGuestCartThunk} from '../store/cart'

class SignUpConfirm extends React.Component {
  componentDidMount() {
    this.props.saveGuestCartThunk(this.props.cartItems)
  }
  render() {
    return (
      <div>
        <h2>{this.props.name}, thank you for signing up!</h2>
      </div>
    )
  }
}

const mapState = state => ({
  cartItems: state.cart.cartItems,
  name: state.user.fullName
})

const mapDispatch = dispatch => ({
  saveGuestCartThunk: cartItems => dispatch(saveGuestCartThunk(cartItems))
})

export default connect(mapState, mapDispatch)(SignUpConfirm)
