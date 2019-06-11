const router = require('express').Router()
const {Product, Item} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let products = await Product.findAll({
      include: [{model: Item}]
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let product = await Product.findOne({
      where: {id: req.params.id},
      include: [{model: Item}]
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})
