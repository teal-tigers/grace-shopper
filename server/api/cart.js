const router = require('express').Router()
const {Product, OrderProduct, Order, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('user: ', req.user)
    let user = await User.findOne({
      where: {id: req.user.id},
      include: [{model: Order}]
    })

    let orderId = user.order.id
    let items = await Order.findOne({
      where: {id: orderId, status: 'pending'},
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
    console.log(`orderid: ${orderId}, address: ${address}, total: ${total}`)
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
    let newQuantity = oldQuantity + parseInt(req.body.quantity, 10)
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
