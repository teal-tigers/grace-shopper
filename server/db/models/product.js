const Sequelize = require('sequelize')
const db = require('../db')

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
  },
  size: {
    type: Sequelize.ENUM('6', '7', '8', '9', '10')
  }
})

Product.findUniqueStyle = async function() {
  let allProducts = await Product.findAll()

  let productArr = []
  let obj = {}

  allProducts.forEach(product => {
    if (!obj[product.name]) {
      productArr.push(product)
      obj[product.name] = true
    }
  })
  return productArr
}

module.exports = Product
