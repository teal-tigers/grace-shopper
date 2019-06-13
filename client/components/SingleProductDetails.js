import React from 'react'
import {getProductStyleThunk} from '../store/product'
import {connect} from 'react-redux'

class SingleProductDetails extends React.Component {
  componentDidMount() {
    let params = new URLSearchParams(document.location.search)
    let productName = params.get('name')
    this.props.getProductStyleThunk(productName)
  }

  render() {
    if (this.props.loading) {
      return <div>LOADING...</div>
    }
    let {productStyle} = this.props
    return (
      <div>
        <h1>{productStyle[0].name}</h1>
        <img src={productStyle[0].imageUrl} width="75px" height="75px" />
        <p>{productStyle[0].description}</p>
        <p>${productStyle[0].price}</p>
        <div>
          <label>Quantity: </label>
          <select name="Quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label>Size: </label>
          <select name="Size">
            {productStyle.map(product => (
              <option key={product.id} value={product.id}>
                {product.size}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  productStyle: state.product.productStyle,
  loading: state.product.loading
})

const mapDispatchToProps = dispatch => ({
  getProductStyleThunk: name => dispatch(getProductStyleThunk(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleProductDetails
)
