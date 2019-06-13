/* eslint-disable react/button-has-type */
import React from 'react'
import {connect} from 'react-redux'
import Checkout from './Checkout'
import {
  getOrderAndItemsThunk,
  deleteItemThunk,
  updateQuantityThunk
} from '../store/cart'

import {me} from '../store'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    // if (this.props.userId !== oldProps.userId) {
    this.props.getOrderAndItemsThunk(this.props.userId)
    // }
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({quantity: event.target.value})
  }

  // handleSubmit = (event) => {
  //   event.preventDefault()
  //   // const quantity = evt.target.quantity.value

  //   // this.props.sendOrder(orderId) we need another reducer for order
  // }

  render() {
    console.log(this.props)
    if (!this.props.userId) {
      return <div>LOADING</div>
    }
    const {cartItems, order} = this.props

    // helper func to calculate order total
    const orderTotal = cartItems.reduce((acc, val) => {
      return acc + val.order_products.quantity * val.price
    }, 0)

    return (
      <div>
        <h1>Cart</h1>
        {!cartItems.length && <p>There are no items in your cart</p>}
        {cartItems.length > 1 &&
          cartItems.map(item => (
            <div key={item.id}>
              <p>{`Item: ${item.name}`}</p>
              <p>{`Price: ${item.price}`}</p>
              <p>
                {`Quantity: ${item.order_products.quantity}`}
                <span style={{margin: '10px'}}>
                  <label>Edit Quantity: </label>
                  <select onChange={this.handleChange} name="quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button
                    type="submit"
                    onClick={() =>
                      this.props.updateQuantityThunk(
                        order.id,
                        item.id,
                        this.state.quantity
                      )
                    }
                  >
                    Update
                  </button>
                </span>
              </p>
              <p>{`Subtotal: $${(
                item.order_products.quantity * item.price
              ).toFixed(2)}`}</p>
              <button
                type="button"
                onClick={() =>
                  this.props.deleteItemThunk(order.id, item.product.id)
                }
              >
                Remove item
              </button>
            </div>
          ))}
        {!!cartItems.length && (
          <div>
            {/* Convert a number into a string, keeping only two decimals */}
            <p>{`Total: $${orderTotal.toFixed(2)}`}</p>
            <div>
              {/* <Checkout
              // addItemThunk={addItemThunk}
              // history={this.props.history}
              /> */}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  cartItems: state.cart.cartItems,
  order: state.cart.order,
  loading: state.cart.loading
})

const mapDispatch = dispatch => ({
  getOrderAndItemsThunk: orderId => dispatch(getOrderAndItemsThunk(orderId)),
  deleteItemThunk: (orderId, productId) =>
    dispatch(deleteItemThunk(orderId, productId)),
  updateQuantityThunk: (orderId, productId, quantity) => {
    dispatch(updateQuantityThunk(orderId, productId, quantity))
  }
})

export default connect(mapState, mapDispatch)(Cart)
