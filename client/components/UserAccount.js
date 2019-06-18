import React from 'react'
import {connect} from 'react-redux'
import {getUserAccountThunk} from '../store/account'
import OrderHistory from './OrderHistory'
import {saveGuestCartThunk} from '../store/cart'

class UserAccount extends React.Component {
  componentDidMount() {
    this.props.getUserAccountThunk()
    this.props.saveGuestCartThunk(this.props.cartItems)
  }

  render() {
    const {userAccount} = this.props

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 hidden-xs text-center">
              <div>
                <h2>Account Information</h2>
              </div>
              <div>
                <strong>Name:</strong> {userAccount.fullName}
              </div>
              <div>
                <strong>Email:</strong> {userAccount.email}
              </div>
            </div>

            <div className="col-sm-6 hidden-xs text-center">
              <div>
                <h2>Default Address</h2>
              </div>
              {userAccount.address ? (
                <div>
                  <strong>Address:</strong> {userAccount.address}
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>

        <br />
        <br />
        <div className="container">
          <OrderHistory orders={userAccount.orders} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userAccount: state.account.accountDetails,
  loading: state.account.loading,
  cartItems: state.cart.cartItems
})

const mapDispatchToProps = dispatch => ({
  getUserAccountThunk: () => dispatch(getUserAccountThunk()),
  saveGuestCartThunk: cartItems => dispatch(saveGuestCartThunk(cartItems))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount)
