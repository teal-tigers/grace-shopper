const Sequelize = require('sequelize')
const db = require('../db')
const Item = require('./item')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/img/western-boot.jpg'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
})

Product.afterCreate(async product => {
  const item6 = await Item.create({
    size: 6
  })
  await product.addItem(item6)
  const item7 = await Item.create({
    size: 7
  })
  await product.addItem(item7)
  const item8 = await Item.create({
    size: 8
  })
  await product.addItem(item8)
  const item9 = await Item.create({
    size: 9
  })
  await product.addItem(item9)
})

module.exports = Product
