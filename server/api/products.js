const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let name = req.query.name.split('-').join(' ')
    console.log(name)
    let product = await Product.findAll({
      where: {name: name}
    })
    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    let products = await Product.findUniqueStyle()
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
})
