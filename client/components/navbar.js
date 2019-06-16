import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, clearCart} from '../store'
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

const Navbar = ({handleClick, isLoggedIn, fullName}) => (
  <NavBar bg="light justify-content-between" expand="lg" sticky="top">
    <Nav className="justify-content-start">
      <Nav.Link as={Link} to="/home">
        Home
      </Nav.Link>
      <Nav.Link as={Link} to="/home">
        Western Boots
      </Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link as={Link} to="/">
        MADE FOR WALKING
      </Nav.Link>
    </Nav>
    <Nav className="justify-content-end">
      <React.Fragment>
        {isLoggedIn ? (
          <Nav.Link href="#" onClick={handleClick}>
            {fullName} / Logout
          </Nav.Link>
        ) : (
          <React.Fragment>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Sign Up
            </Nav.Link>
          </React.Fragment>
        )}
      </React.Fragment>
      <Nav.Link as={Link} to="/cart">
        Cart
      </Nav.Link>
    </Nav>
  </NavBar>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    fullName: state.user.fullName
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      //SSW: clearCart action will restore the local
      //redux cart state to empty after a user logs out
      dispatch(clearCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
