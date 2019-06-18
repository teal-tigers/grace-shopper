import React from 'react'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {
  faCheckSquare,
  faCoffee,
  faHeart,
  faHome,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons'
import {Navbar} from './components'
import Routes from './routes'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Footer />
    </div>
  )
}

library.add(fab, faCheckSquare, faCoffee, faHeart, faHome, faShoppingCart)
export default App
