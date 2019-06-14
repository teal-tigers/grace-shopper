/* eslint-disable react/button-has-type */
import React from 'react'
import {connect} from 'react-redux'
import Checkout from './Checkout'
import {
  getOrderAndItemsThunk,
  deleteItemThunk,
  updateQuantityThunk,
  guestUpdatedQuantityAction,
  deletedItemAction,
  updateTotalThunk
} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  // componentDidMount() {
  //   if (this.props.userId) {
  //     this.props.getOrderAndItemsThunk(this.props.userId)
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.userId !== prevProps.userId) {
  //     this.props.getOrderAndItemsThunk(this.props.userId)
  //   }
  // }

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
    if (!this.props.loading) {
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
        {cartItems.length > 0 &&
          cartItems.map(item => (
            <div key={item.id}>
              <p>{`Item: ${item.name}`}</p>
              <p>{`Price: ${item.price}`}</p>
              <p>
                {`Quantity: ${item.order_products.quantity}`}
                <span style={{margin: '10px'}}>
                  <label>Edit Quantity: </label>
                  <select onChange={this.handleChange} name="quantity">
                    <option value="">-</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  {this.props.isLoggedIn ? (
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
                  ) : (
                    <button
                      type="submit"
                      onClick={() =>
                        this.props.guestUpdatedQuantityAction({
                          id: item.id,
                          quantity: this.state.quantity
                        })
                      }
                    >
                      Update
                    </button>
                  )}
                </span>
              </p>
              <p>{`Subtotal: $${(
                item.order_products.quantity * item.price
              ).toFixed(2)}`}</p>
              {this.props.loggedIn ? (
                <button
                  type="button"
                  onClick={() => this.props.deleteItemThunk(order.id, item.id)}
                >
                  Remove item
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => this.props.deletedItemAction(item.id)}
                >
                  Remove item
                </button>
              )}
            </div>
          ))}
        {!!cartItems.length && (
          <div>
            {/* Convert a number into a string, keeping only two decimals */}
            <p>{`Total: $${orderTotal.toFixed(2)}`}</p>
            <div>
              <Checkout
                updateTotalThunk={this.props.updateTotalThunk}
                //need to write: (1) submitOrderThunk [should change Order.status to "complete"], (2) maybe getShippingAddressThunk to update Order.shippingAddress?
              />
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
  getOrderAndItemsThunk: () => dispatch(getOrderAndItemsThunk()),
  deleteItemThunk: (orderId, productId) =>
    dispatch(deleteItemThunk(orderId, productId)),
  updateQuantityThunk: (orderId, productId, quantity) => {
    dispatch(updateQuantityThunk(orderId, productId, quantity))
  },
  deletedItemAction: itemId => dispatch(deletedItemAction(itemId)),
  guestUpdatedQuantityAction: item =>
    dispatch(guestUpdatedQuantityAction(item)),
  //to be used on checkout button.  updateTotalThunk will update Order.total to total calculated by frontend component
  updateTotalThunk: (orderId, total) =>
    dispatch(updateTotalThunk(orderId, total))
})

export default connect(mapState, mapDispatch)(Cart)
