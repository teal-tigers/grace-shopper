import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, addUserThunk, saveGuestCartThunk} from '../store'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Card from 'react-bootstrap/Card'

/**
 * COMPONENT
 */

const AuthForm = props => {
  const {name, displayName, handleSubmit, error, cartItems} = props

  return (
    <Card style={{width: '30rem'}}>
      <Card.Header>Welcome</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit} name={name}>
          {displayName === 'Sign Up' && (
            <React.Fragment>
              <Form.Label>Full Name</Form.Label>
              <FormControl
                name="fullname"
                type="text"
                required
                style={{marginBottom: '1.5rem'}}
              />

              <Form.Label>Address</Form.Label>
              <FormControl
                name="address"
                type="text"
                style={{marginBottom: '1.5rem'}}
              />
            </React.Fragment>
          )}

          <Form.Label>Email</Form.Label>
          <FormControl
            name="email"
            type="text"
            required
            style={{marginBottom: '1.5rem'}}
          />

          <Form.Label>Password</Form.Label>
          <FormControl
            name="password"
            type="password"
            required
            style={{marginBottom: '1.5rem'}}
          />

          <Button
            block
            type="submit"
            variant="info"
            style={{marginBottom: '1.5rem', marginTop: '1.5rem'}}
          >
            {displayName}
          </Button>

          {error && error.message && <div> {error.message} </div>}
        </Form>
        <a href="/auth/google">{displayName} with Google</a>
      </Card.Body>
    </Card>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatchLogin = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password))
    }
  }
}

const mapDispatchSignup = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const fullname = evt.target.fullname.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      const address = evt.target.address.value
      dispatch(addUserThunk(fullname, email, password, address))
    }
  }
}

export const Login = connect(mapLogin, mapDispatchLogin)(AuthForm)
export const Signup = connect(mapSignup, mapDispatchSignup)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
