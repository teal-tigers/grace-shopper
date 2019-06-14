import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  SingleProductDetails,
  Cart
} from './components'
import {getOrderAndItemsThunk} from './store/cart'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
    // await this.props.getOrderAndItemsThunk(this.props.userId)
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={AllProducts} />
        <Route
          path="/products"
          render={props => (
            <SingleProductDetails {...props} userId={this.props.userId} />
          )}
        />
        <Route
          path="/cart"
          render={props => <Cart {...props} userId={this.props.userId} />}
        />
        {/* Displays our AllProducts component as a fallback */}

        <Route path="/" component={AllProducts} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
  getOrderAndItemsThunk: orderId => dispatch(getOrderAndItemsThunk(orderId))
})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
