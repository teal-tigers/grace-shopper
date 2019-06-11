import React from 'react'
import {getSingleProductThunk} from '../store/product'
import {connect} from 'react-redux'

class SingleProductDetails extends React.Component {
  componentDidMount() {
    this.props.getSingleProductThunk(this.props.match.params.id)
  }

  render() {
    if (this.props.loading) {
      return <div>LOADING...</div>
    }
    let {product} = this.props
    return (
      <div>
        <h1>{product.name}</h1>
        <img src={product.imageUrl} width="75px" height="75px" />
        <p>{product.description}</p>
        <p>${product.price}</p>
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
      </div>
    )
  }
}
const mapStateToProps = state => ({
  product: state.product.product,
  loading: state.product.loading
})

const mapDispatchToProps = dispatch => ({
  getSingleProductThunk: id => dispatch(getSingleProductThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleProductDetails
)
