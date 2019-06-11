const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  size: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Item
