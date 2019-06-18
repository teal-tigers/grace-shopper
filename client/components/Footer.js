import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <div>
      <Navbar bg="light" variant="dark" sticky="bottom">
        <Nav className="w-responsive mx-auto p-3 mt-2">
          <p style={{marginTop: '5rem'}} className="text-center mt-4 mb-4">
            Made with <FontAwesomeIcon icon="heart" size="1x" /> by Nida,
            Stephanie, Alena
          </p>
        </Nav>
      </Navbar>
    </div>
  )
}

export default connect(null, null)(Footer)
