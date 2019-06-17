import React from 'react'
import {getAllProductsThunk} from '../store/product'
import {connect} from 'react-redux'
import SingleProduct from './SingleProduct'
import CardDeck from 'react-bootstrap/CardDeck'
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
      <CardDeck className="w-responsive text-center mx-auto">
        {products.map(product => (
          <div key={product.id}>
            <SingleProduct product={product} />
          </div>
        ))}
      </CardDeck>
    )
  }
}
const mapStateToProps = state => ({
  products: state.product.products,
  loading: state.product.loading,
  cartItems: state.cart.cartItems
})

const mapDispatchToProps = dispatch => ({
  getAllProductsThunk: () => dispatch(getAllProductsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
