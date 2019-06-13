const Sequelize = require('sequelize')
const db = require('../db')
const OrderProduct = require('./orderProduct')
const Product = require('./product')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('pending', 'complete'),
    defaultValue: 'pending'
  },
  shippingAddress: {
    type: Sequelize.STRING
  },
  total: {
    type: Sequelize.DECIMAL,
    defaultValue: 0
  }
})

Order.prototype.calculateTotal = async function() {
  let orderId = this.id
  console.log('ORDERID:', orderId)
  let {products} = await Order.findOne({
    where: {id: 1},
    include: [{model: Product}]
  })
  let total = 0
  products.forEach(product => {
    let price = product.price
    let quantity = product.order_products.quantity
    total = total + price * quantity
  })
  await this.update({total: total})
}

module.exports = Order
