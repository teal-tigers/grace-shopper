import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, clearCart} from '../store'
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Badge from 'react-bootstrap/Badge'

const Navbar = ({handleClick, isLoggedIn, fullName}) => (
  <NavBar
    bg="light justify-content-between"
    expand="lg"
    sticky="top"
    style={{marginBottom: '2rem'}}
  >
    <NavBar.Brand
      as={Link}
      to="/"
      style={{font: 'Yatra One', color: '#D2691E'}}
    >
      MADE FOR WALKING
    </NavBar.Brand>
    <NavBar.Toggle aria-controls="responsive-navbar-nav" />
    <NavBar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/home">
          Western Boots
        </Nav.Link>
      </Nav>
      <Nav>
        <React.Fragment>
          {isLoggedIn ? (
            <React.Fragment>
              <Nav.Link as={Link} to="/account">
                {fullName}
              </Nav.Link>
              <Nav.Link href="#" onClick={handleClick}>
                Logout
              </Nav.Link>
            </React.Fragment>
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
          <FontAwesomeIcon icon="shopping-cart" size="1x" />
          {/* <Badge pill variant="light">
            <p>0</p>
          </Badge> */}
        </Nav.Link>
      </Nav>
    </NavBar.Collapse>
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
