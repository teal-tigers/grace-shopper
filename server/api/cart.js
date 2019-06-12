const router = require('express').Router()
const {Product, Item, OrderDetails, Order} = require('../db/models')
module.exports = router

//UserId, OrderId

router.get('/', async (req, res, next) => {
  try {
    let {orderId} = await Order.findOne({where: {userId: req.body.userId}})
    let ItemList = await OrderDetails.findAll({where: {orderId: orderId}})
    res.json(ItemList)
  } catch (error) {
    next(error)
  }
})
router.post('/', async (req, res, next) => {
  try {
    let cartItem = await OrderDetails.findOrCreate({
      where: {
        itemId: req.body.itemId,
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
    let updatedQuantity = await OrderDetails.findOne({
      where: {
        itemId: req.body.itemId,
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
    let deleted = await OrderDetails.destroy({
      where: {
        itemId: req.body.itemId,
        orderId: req.body.orderId
      }
    })
    res.status(204).json(deleted)
  } catch (error) {
    next(error)
  }
})
