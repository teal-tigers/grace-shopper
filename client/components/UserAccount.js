import React from 'react'
import {connect} from 'react-redux'
import {getUserAccountThunk} from '../store/account'
import OrderHistory from './OrderHistory'

class UserAccount extends React.Component {
  componentDidMount() {
    this.props.getUserAccountThunk()
  }

  render() {
    const {userAccount} = this.props // userAccount.fullName, userAccount.address, userAccount.email, userAccount.orders (array)
    // const orders = props.userAccount.details.orders;

    return (
      <div>
        <div>
          <div>
            <h2>Account Information</h2>
          </div>
          <div>
            <strong>Name:</strong> {userAccount.fullName}
          </div>
          <div>
            <strong>Email:</strong> {userAccount.email}
          </div>
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
        <OrderHistory orders={userAccount.orders} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userAccount: state.account.accountDetails,
  loading: state.account.loading
})

const mapDispatchToProps = dispatch => ({
  getUserAccountThunk: () => dispatch(getUserAccountThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount)
