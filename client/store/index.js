import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import product from './product'
import cart from './cart'
import account from './account'

const reducer = combineReducers({user, product, cart, account})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

store.subscribe(() => {
  let cartItems = store.getState().cart.cartItems
  if (cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  } else {
    localStorage.setItem('cartItems', JSON.stringify([]))
  }
})

export default store
export * from './user'
export * from './product'
export * from './cart'
export * from './account'
