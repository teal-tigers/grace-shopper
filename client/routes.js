import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserAccount,
  AllProducts,
  SingleProductDetails,
  Cart,
  ThankYou
} from './components'
import {me} from './store'
import Container from 'react-bootstrap/Container'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Container className="w-responsive mx-auto p-3 mt-2">
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route
            path="/home"
            render={props => (
              <AllProducts
                {...props}
                userId={this.props.userId}
                isLoggedIn={isLoggedIn}
              />
            )}
          />
          <Route
            path="/products"
            render={props => (
              <SingleProductDetails {...props} userId={this.props.userId} />
            )}
          />
          <Route path="/thankyou" component={ThankYou} />
          <Route
            path="/cart"
            render={props => (
              <Cart
                {...props}
                userId={this.props.userId}
                isLoggedIn={isLoggedIn}
              />
            )}
          />
          {isLoggedIn && <Route path="/account" component={UserAccount} />}
          {/* Displays our AllProducts component as a fallback */}

          <Route path="/" component={AllProducts} />
        </Switch>
      </Container>
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
  loadInitialData: () => dispatch(me())
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
