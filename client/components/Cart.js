/* eslint-disable react/button-has-type */
import React from 'react'
import {connect} from 'react-redux'
import Checkout from './Checkout'
import {
  getOrderAndItemsThunk,
  deleteItemThunk,
  updateQuantityThunk,
  guestUpdatedQuantityAction,
  deletedItemAction
} from '../store/cart'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  //SSW: Logic here is that if props.userId loads before component mounts,
  //then componentDidMount will trigger getOrderAndItemsThunk.
  //However, if component mounts before props.userId loads,
  //then componentDidUpdate will trigger getOrderAndItemsThunk
  componentDidMount() {
    if (this.props.userId) {
      this.props.getOrderAndItemsThunk()
    }
  }

  componentDidUpdate(prev) {
    if (this.props.userId !== prev.userId) {
      this.props.getOrderAndItemsThunk()
    }
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({quantity: event.target.value})
  }

  render() {
    //SSW: disabled loading check because it was disrupting loading initial shopping cart for Guests
    //we should consider removing "Loading" from our cart redux state
    // if (this.props.loading) {
    //   return <div>LOADING</div>
    // }
    const {cartItems, order} = this.props

    // helper func to calculate order total

    const orderTotal = cartItems.reduce((acc, val) => {
      return acc + val.order_products.quantity * val.price
    }, 0)

    return (
      <React.Fragment>
        <h2>Cart</h2>
        <Table responsive="sm">
          <thead>
            <tr>
              <th />
              <th>Item</th>
              <th>Item Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Remove Item</th>
            </tr>
          </thead>
          <tbody>
            {!cartItems.length && (
              <tr>
                <td>You Cart is empty...</td>
              </tr>
            )}
            {cartItems.length > 0 &&
              cartItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <Image src={item.imageUrl} style={{width: '8rem'}} />
                  </td>
                  <td>
                    <p>{item.name}</p>
                    <p>{`Size: ${item.size}`}</p>
                  </td>
                  <td>
                    <p>{`$${item.price}`}</p>
                  </td>
                  <td>
                    <select
                      className="browser-default custom-select"
                      style={{width: '5rem', marginRight: '0.5rem'}}
                      onChange={this.handleChange}
                      name="quantity"
                      value={item.order_products.quantity}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>

                    {/* this ternary and the one below triggers different actions
                   depending on whether user is logged in or guest */}
                    {this.props.userId ? (
                      <Button
                        variant="outline-warning"
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
                      </Button>
                    ) : (
                      <Button
                        variant="outline-warning"
                        type="submit"
                        onClick={() =>
                          this.props.guestUpdatedQuantityAction({
                            id: item.id,
                            quantity: this.state.quantity
                          })
                        }
                      >
                        Update
                      </Button>
                    )}
                  </td>
                  <td>
                    <p>{`$${(item.order_products.quantity * item.price).toFixed(
                      2
                    )}`}</p>
                  </td>
                  <td>
                    {this.props.userId ? (
                      <Button
                        variant="outline-danger"
                        type="button"
                        onClick={() =>
                          this.props.deleteItemThunk(order.id, item.id)
                        }
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button
                        variant="outline-danger"
                        type="button"
                        onClick={() => this.props.deletedItemAction(item.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Card border="light" style={{width: '18rem'}}>
          {!!cartItems.length && (
            <div>
              {/* Convert a number into a string, keeping only two decimals */}
              <Card.Header>Order Summary</Card.Header>
              <Card.Body>
                {/* <Card.Text>{`Subtotal:  $${orderTotal.toFixed(2)}`}</Card.Text>
                <Card.Text>Shipping: free</Card.Text>
                <Card.Text>Tax: $0.00</Card.Text> */}
                <h3>{`Total:  $${orderTotal.toFixed(2)}`}</h3>
                <hr />
                <Checkout
                  orderId={this.props.order.id}
                  total={orderTotal}
                  user={this.props.user}
                />
              </Card.Body>
            </div>
          )}
        </Card>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  cartItems: state.cart.cartItems,
  order: state.cart.order,
  loading: state.cart.loading,
  user: state.user
})

const mapDispatch = dispatch => ({
  getOrderAndItemsThunk: () => dispatch(getOrderAndItemsThunk()),
  deleteItemThunk: (orderId, productId) =>
    dispatch(deleteItemThunk(orderId, productId)),
  updateQuantityThunk: (orderId, productId, quantity) => {
    dispatch(updateQuantityThunk(orderId, productId, quantity))
  },
  deletedItemAction: itemId => dispatch(deletedItemAction(itemId)),
  guestUpdatedQuantityAction: item => dispatch(guestUpdatedQuantityAction(item))
  //to be used on checkout button.  updateTotalThunk will update Order.total to total calculated by frontend component
})

export default connect(mapState, mapDispatch)(Cart)
