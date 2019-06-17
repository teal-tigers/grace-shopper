const router = require('express').Router()
const {Product, OrderProduct, Order, User} = require('../db/models')
module.exports = router

//express gate checks:

//checks if user sending request is logged in
const isLoggedInGate = (req, res, next) =>
  req.user ? next() : res.send('Please log in!')

//for routes that find order by orderId passed through req.query, checks that orderId belongs to logged in user
const reqQueryOrderBelongsToUser = async (req, res, next) => {
  try {
    let order = await Order.findOne({where: {id: req.query.orderId}})
    order.userId === req.user.id ? next() : res.send('Please log in!')
  } catch (error) {
    next(error)
  }
}

const reqBodyOrderBelongsToUser = async (req, res, next) => {
  try {
    let order = await Order.findOne({where: {id: req.body.orderId}})
    order.userId === req.user.id ? next() : res.send('Please log in!')
  } catch (error) {
    next(error)
  }
}

router.get('/', isLoggedInGate, async (req, res, next) => {
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
router.post('/total', isLoggedInGate, async (req, res, next) => {
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

//after log in, this route adds guest cart items into user's order in the DB
router.put('/newUserOrder', isLoggedInGate, async (req, res, next) => {
  try {
    //get the user's pending order
    let order = await Order.findOne({
      where: {userId: req.user.id, status: 'pending'},
      include: [{model: Product}]
    })
    //for each item in the user's guest cart, check if item is in user's order DB.  If so, increment quantity.  Otherwise, add item to user's order DB.
    req.body.items.forEach(async item => {
      try {
        let [orderProductEntry] = await OrderProduct.findOrCreate({
          where: {
            productId: item.id,
            orderId: order.id
          }
        })
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
router.post(
  '/',
  isLoggedInGate,
  reqBodyOrderBelongsToUser,
  async (req, res, next) => {
    try {
      let {orderId, productId} = req.body
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
  }
)

router.put(
  '/',
  isLoggedInGate,
  reqBodyOrderBelongsToUser,
  async (req, res, next) => {
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
  }
)

router.delete(
  '/',
  isLoggedInGate,
  reqQueryOrderBelongsToUser,
  async (req, res, next) => {
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
  }
)
