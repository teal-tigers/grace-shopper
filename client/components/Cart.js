import React from 'react'
import {connect} from 'react-redux'
import Checkout from './Checkout'
import {
  getItemsThunk,
  addItemThunk,
  deleteItemThunk,
  updateQuantityThunk
} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getItemsThunk()
  }

  handleSubmit = (event, orderId) => {
    event.preventDefault()
    // this.props.sendOrder(orderId) we need another reducer for order
  }

  render() {
    if (this.props.loading) {
      return <div>LOADING...</div>
    }
    const {cartItems} = this.props

    // helper func to calculate order total
    const orderTotal = cartItems.reduce((acc, val) => {
      return acc + val.quantity * val.product.price
    }, 0)

    return (
      <div>
        <h1>Cart</h1>
        {!cartItems.length && <p>There are no items in your cart</p>}
        {!!cartItems.length &&
          cartItems.map(item => (
            <div key={item.product.id}>
              <p>{`Item: ${item.product.name}`}</p>
              <p>{`Price: ${item.product.price}`}</p>
              <p>
                {`Quantity: ${item.quantity}`}
                <span style={{margin: '10px'}}>
                  <button
                    type="button"
                    // prevent go below 0 quantity
                    disabled={item.quantity <= 1 && 'true'}
                    onClick={() =>
                      this.props.updateQuantityThunk(
                        orderId,
                        item.product.id,
                        item.quantity - 1
                      )
                    }
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      this.props.updateQuantityThunk(
                        orderId,
                        item.product.id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </span>
              </p>
              <p>{`Subtotal: $${(item.quantity * item.product.price).toFixed(
                2
              )}`}</p>
              <button
                type="button"
                onClick={() =>
                  this.props.deleteItemThunk(orderId, item.product.id)
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
              <Checkout
                addItemThunk={addItemThunk}
                // history={this.props.history}
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
  loading: state.cart.loading
})

const mapDispatch = dispatch => ({
  // getItemsThunk
  // addItemThunk,
  // deleteItemThunk,
  // updateQuantityThunk,
})

export default connect(mapState, mapDispatch)(Cart)
