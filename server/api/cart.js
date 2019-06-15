const router = require('express').Router()
const {Product, OrderProduct, Order, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let items = await Order.findOne({
      where: {userId: req.user.id, status: 'pending'},
      include: [{model: Product}]
    })
    res.json(items)
  } catch (error) {
    next(error)
  }
})

//SSW: updates total amount, shipping address (if any), and status to "completed" when user submits their order, and creates a new order entry for the user's next "pending" order.
router.post('/total', async (req, res, next) => {
  try {
    let {orderId, address, total} = req.body
    let order = await Order.findOrCreate({
      where: {
        id: orderId
      }
    })

    if (address.length < 1) {
      order = await order[0].update({
        total: total,
        status: 'complete'
      })
    } else {
      order = await order[0].update({
        total: total,
        shippingAddress: address,
        status: 'complete'
      })
    }

    //create new pending order for user
    let user = await User.findOne({where: {id: req.user.id}})
    user.newOrder()

    res.status(201).json(order)
  } catch (error) {
    next(error)
  }
})

router.put('/newUserOrder', async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: {userId: req.user.id, status: 'pending'}
    })
    //populate order with items in cart
    req.body.cartItems.forEach(async item => {
      try {
        //if product exists in order, increment quantity
        //else add product
        // let product = await Product.findOne({where: {id: item.id}})
        let [orderProductEntry] = await OrderProduct.findOrCreate({
          where: {
            productId: item.id,
            orderId: order.id
          }
        })
        // let orderProductEntry = await OrderProduct.findOne({
        //   where: {orderId: order.id, productId: item.id}
        // })
        let newQuantity =
          orderProductEntry.quantity +
          parseInt(item.order_products.quantity, 10)
        await orderProductEntry.update({quantity: newQuantity})
      } catch (error) {
        next(error)
      }
    })
    order = await Order.findOne({
      where: {userId: req.user.id, status: 'pending'},
      include: [{model: Product}]
    })
    res.status(201).json(order)
  } catch (error) {
    next(error)
  }
})
router.post('/', async (req, res, next) => {
  try {
    let {orderId, productId} = req.body
    // console.log('This is the productId: ', productId)
    // console.log('This is the orderId ', orderId)
    let [orderProductEntry] = await OrderProduct.findOrCreate({
      where: {
        productId: productId,
        orderId: orderId
      }
    })

    let oldQuantity = orderProductEntry.quantity
    console.log('REQ BODY QUANTITY', req.body.quantity)
    console.log('oldquantity', oldQuantity)
    console.log('Typeof oldquant', typeof oldQuantity)
    let newQuantity = oldQuantity + parseInt(req.body.quantity, 10)
    console.log('NEW QUANTITY', newQuantity)
    await orderProductEntry.update({
      quantity: newQuantity
    })
    let {products} = await Order.findOne({
      where: {id: orderId},
      include: [{model: Product, where: {id: productId}}]
    })
    let addedItem = products[0]
    res.status(201).json(addedItem)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    let {orderId, productId} = req.body
    let updatedQuantity = await OrderProduct.findOne({
      where: {
        productId: req.body.productId,
        orderId: req.body.orderId
      }
    })
    await updatedQuantity.update({
      quantity: parseInt(req.body.quantity, 10)
    })

    let {products} = await Order.findOne({
      where: {id: orderId},
      include: [{model: Product, where: {id: productId}}]
    })
    let updatedQuantityItem = products[0]
    res.status(201).json(updatedQuantityItem)
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    await OrderProduct.destroy({
      where: {
        productId: req.query.productId,
        orderId: req.query.orderId
      }
    })
    res.status(204)
  } catch (error) {
    next(error)
  }
})
