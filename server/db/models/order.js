const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('pending', 'complete'),
    defaultValue: 'pending'
  },
  shippingAdress: {
    type: Sequelize.STRING
  },
  total: {
    type: Sequelize.DECIMAL,
    defaultValue: '0'
  }
})

module.exports = Order