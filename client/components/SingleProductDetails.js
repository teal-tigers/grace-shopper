import React from 'react'
import {getProductStyleThunk} from '../store/product'
import {addItemThunk, getOrderAndItemsThunk, addedItem} from '../store/cart'
import FormAddToCart from './FormAddToCart'
import {connect} from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

class SingleProductDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      // quantity: '',
      // size: '',
      // show: false,
      // validated: false
    }
  }
  // this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
  // this.handleChangeSize = this.handleChangeSize.bind(this)
  // this.handleSubmit = this.handleSubmit.bind(this)
  // // this.handleClose = this.handleClose.bind(this)
  // // this.handleShow = this.handleShow.bind(this)
  // this.handleSubmitValidation = this.handleSubmitValidation.bind(this)

  componentDidMount() {
    let params = new URLSearchParams(document.location.search)
    let productName = params.get('name')
    this.props.getProductStyleThunk(productName)
    if (this.props.userId) {
      this.props.getOrderAndItemsThunk()
    }
  }

  componentDidUpdate(prev) {
    if (this.props.userId && this.props.userId !== prev.userId) {
      this.props.getOrderAndItemsThunk()
    }
  }
  // // handleShow() {
  // //   this.setState({show: true})
  // // }
  // // handleClose() {
  // //   this.setState({show: false})
  // }
  // handleSubmitValidation(event) {
  //   const form = event.currentTarget
  //   if (form.checkValidity() === false) {
  //     event.preventDefault()
  //     event.stopPropagation()
  //   }
  //   this.setState({validated: true})
  // }

  // handleSubmit(event) {
  //   event.preventDefault()
  //   if (this.props.userId && !!this.state.quantity && !!this.state.size) {
  //     this.props.addItemThunk(
  //       this.props.order.id,
  //       this.state.size,
  //       this.state.quantity
  //     )
  //   } else if (!!this.state.quantity && !!this.state.size) {
  //     let item = {}
  //     this.props.productStyle.forEach(product => {
  //       if (product.id === parseInt(this.state.size, 10)) {
  //         item = product
  //       }
  //     })
  //     this.props.addedItem({
  //       ...item,
  //       order_products: {quantity: this.state.quantity}
  //     })
  //   }
  //   this.handleSubmitValidation(event)
  //   // this.handleShow()
  // }

  // handleChangeQuantity(event) {
  //   event.preventDefault()
  //   this.setState({quantity: event.target.value})
  // }

  // handleChangeSize(event) {
  //   event.preventDefault()
  //   this.setState({size: event.target.value})
  // }

  render() {
    // const {validated} = this.state
    let {productStyle} = this.props
    return this.props.loading ? (
      <div>LOADING...</div>
    ) : productStyle.length < 1 ? (
      ''
    ) : (
      <Row>
        <Col>
          <Image src={productStyle[0].imageUrl} style={{width: '90%'}} />
        </Col>
        <Col>
          <Card style={{border: 'none'}}>
            <Card.Title>{productStyle[0].name}</Card.Title>
            <Card.Text>${productStyle[0].price}</Card.Text>
            <Card.Text>{productStyle[0].description}</Card.Text>
            <FormAddToCart
              productStyle={this.props.productStyle}
              order={this.props.order}
              userId={this.props.userId}
            />
          </Card>
        </Col>
      </Row>
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
  getOrderAndItemsThunk: userId => dispatch(getOrderAndItemsThunk(userId))
  // addItemThunk: (orderId, productId, quantity) =>
  //   dispatch(addItemThunk(orderId, productId, quantity)),
  // addedItem: item => dispatch(addedItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleProductDetails
)
