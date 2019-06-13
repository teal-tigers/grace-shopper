const router = require('express').Router()
const {Product, OrderProduct, Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let order = await Order.findOne({where: {id: 1}})
    await order.calculateTotal()
    let items = await Order.findOne({
      where: {id: req.body.orderId},
      include: [{model: Product}]
    })
    res.json(items)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let cartItem = await OrderProduct.findOrCreate({
      where: {
        productId: req.body.productId,
        orderId: req.body.orderId
      }
    })
    let oldQuantity = cartItem.quantity
    let newQuantity = oldQuantity + req.body.quantity
    let newCartItem = await cartItem.update({quantity: newQuantity})
    res.status(201).json(newCartItem)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    let updatedQuantity = await OrderProduct.findOne({
      where: {
        productId: req.body.productId,
        orderId: req.body.orderId
      }
    })
    let newQuantity = await updatedQuantity.update({
      quantity: req.body.quantity
    })
    res.status(201).json(newQuantity)
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    let deleted = await OrderProduct.destroy({
      where: {
        productId: req.body.productId,
        orderId: req.body.orderId
      }
    })
    res.status(204).json(deleted)
  } catch (error) {
    next(error)
  }
})
