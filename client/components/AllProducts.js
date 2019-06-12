import React from 'react'
import {getAllProductsThunk} from '../store/product'
import {connect} from 'react-redux'
import SingleProduct from './SingleProduct'

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
      <div>
        <h1>Custom Made Western Boots</h1>
        <div>
          {products.map(product => (
            <div key={product.id}>
              <SingleProduct product={product} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  products: state.product.products,
  loading: state.product.loading
})

const mapDispatchToProps = dispatch => ({
  getAllProductsThunk: () => dispatch(getAllProductsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)