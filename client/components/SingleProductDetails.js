import React from 'react'
import {getProductStyleThunk} from '../store/product'
import {addItemThunk, getOrderAndItemsThunk} from '../store/cart'
import {connect} from 'react-redux'

class SingleProductDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: '',
      size: ''
    }
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
    this.handleChangeSize = this.handleChangeSize.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    let params = new URLSearchParams(document.location.search)
    let productName = params.get('name')
    this.props.getOrderAndItemsThunk(this.props.userId)
    this.props.getProductStyleThunk(productName)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addItemThunk(
      this.props.order.id,
      this.state.size,
      this.state.quantity
    )
  }

  handleChangeQuantity(event) {
    event.preventDefault()
    this.setState({quantity: event.target.value})
    console.log(this.state)
  }

  handleChangeSize(event) {
    event.preventDefault()
    this.setState({size: event.target.value})
    console.log(this.state)
  }

  render() {
    console.log(this)
    if (this.props.loading) {
      return <div>LOADING...</div>
    }
    let {productStyle, order} = this.props
    return productStyle.length < 1 ? (
      ''
    ) : (
      <div>
        <h1>{productStyle[0].name}</h1>
        <img src={productStyle[0].imageUrl} width="75px" height="75px" />
        <p>{productStyle[0].description}</p>
        <p>${productStyle[0].price}</p>
        <div>
          <label>Quantity: </label>
          <select onChange={this.handleChangeQuantity} name="Quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label>Size: </label>
          <select onChange={this.handleChangeSize} name="Size">
            {productStyle.map(product => (
              <option key={product.id} value={product.id}>
                {product.size}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit" onClick={this.handleSubmit}>
            Add To Cart
          </button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  productStyle: state.product.productStyle,
  loading: state.product.loading,
  order: state.cart.order
})

const mapDispatchToProps = dispatch => ({
  getProductStyleThunk: name => dispatch(getProductStyleThunk(name)),
  getOrderAndItemsThunk: userId => dispatch(getOrderAndItemsThunk(userId)),
  addItemThunk: (orderId, productId, quantity) =>
    dispatch(addItemThunk(orderId, productId, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleProductDetails
)
