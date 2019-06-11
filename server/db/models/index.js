const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Item = require('./item')
const OrderDetails = require('./orderdetails')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

// Associations:
Order.belongsTo(User)
User.hasMany(Order)

Item.belongsTo(Product)
Product.hasMany(Item)

OrderDetails.belongsTo(Item)
Item.hasMany(OrderDetails)

OrderDetails.belongsTo(Order)
Order.hasMany(OrderDetails)

module.exports = {
  User,
  Product,
  Order,
  Item,
  OrderDetails
}
