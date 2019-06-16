import React from 'react'
import {getAllProductsThunk} from '../store/product'
import {connect} from 'react-redux'
import SingleProduct from './SingleProduct'
import {saveGuestCartThunk} from '../store/cart'
import CardColumns from 'react-bootstrap/CardColumns'
import Container from 'react-bootstrap/Container'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllProductsThunk()
  }

  render() {
    if (this.props.loading) {
      return <div>LOADING...</div>
    }
    let {products} = this.props

    return (
      <Container className="w-responsive text-center mx-auto p-3 mt-2">
        <CardColumns>
          {products.map(product => (
            <div key={product.id}>
              <SingleProduct product={product} />
            </div>
          ))}
        </CardColumns>
      </Container>
    )
  }
}
const mapStateToProps = state => ({
  products: state.product.products,
  loading: state.product.loading,
  cartItems: state.cart.cartItems
})

const mapDispatchToProps = dispatch => ({
  getAllProductsThunk: () => dispatch(getAllProductsThunk()),
  saveGuestCartThunk: cartItems => dispatch(saveGuestCartThunk(cartItems))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
