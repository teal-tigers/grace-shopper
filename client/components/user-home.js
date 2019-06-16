import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {saveGuestCartThunk} from '../store/cart'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount() {
    this.props.saveGuestCartThunk(this.props.cartItems)
  }

  render() {
    return (
      <div>
        <h3>Welcome back, {this.props.name}!</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    name: state.user.fullName,
    cartItems: state.cart.cartItems
  }
}
const mapDispatch = dispatch => ({
  saveGuestCartThunk: cartItems => dispatch(saveGuestCartThunk(cartItems))
})
export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
