/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as AllProducts} from './AllProducts'
export {default as SingleProductDetails} from './SingleProductDetails'
export {default as Cart} from './Cart'
export {Login, Signup} from './auth-form'
export {default as UserAccount} from './UserAccount'
export {default as ThankYou} from './ThankYou'
