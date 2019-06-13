import React from 'react'
import {connect} from 'react-redux'
import user from '../store/user'

const Checkout = props => {
  const {addItemThunk} = props

  return (
    <form>
      <label htmlFor="fullname">{user.fullName}</label>
      <label htmlFor="fullname">{user.address}</label>
      <button type="button" onClick={addItemThunk()}>
        Complete Purchase
      </button>
    </form>
  )
}

const mapDispatch = dispatch => ({
  addItemThunk: (orderId, itemId, quantity) =>
    dispatch(addItemThunk(orderId, itemId, quantity))
})
export default connect(null, mapDispatch)(Checkout)
