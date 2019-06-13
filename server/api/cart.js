const router = require('express').Router()
const {Product, OrderProduct, Order, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    //get orderId from userId
    let user = await User.findOne({
      where: {id: req.body.userId},
      include: [{model: Order}]
    })

    let orderId = user.order.id

    // await order.calculateTotal()
    let items = await Order.findOne({
      where: {id: orderId},
      include: [{model: Product}]
    })
    res.json(items)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let {orderId, productId} = req.body
    let [orderProductEntry] = await OrderProduct.findOrCreate({
      where: {
        productId: productId,
        orderId: orderId
      }
    })
    let oldQuantity = orderProductEntry.quantity
    let newQuantity = oldQuantity + req.body.quantity
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
      quantity: req.body.quantity
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
        productId: req.body.productId,
        orderId: req.body.orderId
      }
    })
    res.status(204)
  } catch (error) {
    next(error)
  }
})
