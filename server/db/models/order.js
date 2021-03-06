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
    type: Sequelize.STRING,
    defaultValue: ''
  },
  total: {
    type: Sequelize.DECIMAL,
    defaultValue: 0
  },
  promo: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

Order.prototype.calculateTotal = async function() {
  let orderId = this.id
  let {products} = await Order.findOne({
    where: {id: orderId},
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
