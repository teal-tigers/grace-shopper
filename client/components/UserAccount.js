import React from 'react'
import {connect} from 'react-redux'
import {getUserAccountThunk} from '../store/account'
import OrderHistory from './OrderHistory'
import {saveGuestCartThunk} from '../store/cart'
import Card from 'react-bootstrap/Card'
import {isNullOrUndefined} from 'util'

class UserAccount extends React.Component {
  componentDidMount() {
    this.props.getUserAccountThunk()
    this.props.saveGuestCartThunk(this.props.cartItems)
  }

  render() {
    const {userAccount} = this.props

    return (
      <React.Fragment>
        <Card border="info" style={{width: '30rem', marginBottom: '4rem'}}>
          <Card.Header>Account Information</Card.Header>
          <Card.Body>
            <Card.Text>Name</Card.Text>
            <Card.Title>{userAccount.fullName}</Card.Title>
            <hr />
            <Card.Text>Email</Card.Text>
            <Card.Title>{userAccount.email}</Card.Title>
            <hr />
            {userAccount.address ? (
              <React.Fragment>
                <Card.Text>Address</Card.Text>
                <Card.Title>{userAccount.address}</Card.Title>
              </React.Fragment>
            ) : (
              ''
            )}
          </Card.Body>
        </Card>
        <OrderHistory orders={userAccount.orders} />
      </React.Fragment>
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
