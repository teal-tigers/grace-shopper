const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('order_products', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = OrderProduct
