'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderProduct} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    await User.create({
      fullName: 'Cody',
      address: '5 Hanover Square, New York, NY',
      isAdmin: false,
      email: 'cody@email.com',
      password: '123'
    }),
    await User.create({
      fullName: 'Murphy',
      address: '5 Hanover Square, New York, NY',
      isAdmin: false,
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const products = await Promise.all([
    await Product.create({
      name: 'High Noon',
      imageUrl: '/img/high-noon.jpeg',
      description:
        'Handmade genuine leather cowboy boots featuring embroidered designs in sparkling thread. Made in the USA.',
      price: '498.00',
      size: '6'
    }),
    await Product.create({
      name: 'High Noon',
      imageUrl: '/img/high-noon.jpeg',
      description:
        'Handmade genuine leather cowboy boots featuring embroidered designs in sparkling thread. Made in the USA.',
      price: '498.00',
      size: '7'
    }),
    await Product.create({
      name: 'High Noon',
      imageUrl: '/img/high-noon.jpeg',
      description:
        'Handmade genuine leather cowboy boots featuring embroidered designs in sparkling thread. Made in the USA.',
      price: '498.00',
      size: '8'
    }),
    await Product.create({
      name: 'High Noon',
      imageUrl: '/img/high-noon.jpeg',
      description:
        'Handmade genuine leather cowboy boots featuring embroidered designs in sparkling thread. Made in the USA.',
      price: '498.00',
      size: '9'
    }),
    await Product.create({
      name: 'Almost Famous Western Boot',
      imageUrl: '/img/almost-famous.jpeg',
      description:
        'Statement western style boots featuring floral embroidery with studded details, and a cool distressed look. Import',
      price: '758.00',
      size: '6'
    }),
    await Product.create({
      name: 'Almost Famous Western Boot',
      imageUrl: '/img/almost-famous.jpeg',
      description:
        'Statement western style boots featuring floral embroidery with studded details, and a cool distressed look. Import',
      price: '758.00',
      size: '7'
    }),
    await Product.create({
      name: 'Almost Famous Western Boot',
      imageUrl: '/img/almost-famous.jpeg',
      description:
        'Statement western style boots featuring floral embroidery with studded details, and a cool distressed look. Import',
      price: '758.00',
      size: '8'
    }),
    await Product.create({
      name: 'Almost Famous Western Boot',
      imageUrl: '/img/almost-famous.jpeg',
      description:
        'Statement western style boots featuring floral embroidery with studded details, and a cool distressed look. Import',
      price: '758.00',
      size: '9'
    }),
    await Product.create({
      name: 'Clover Field Western Boot',
      imageUrl: '/img/clover-field.jpeg',
      description:
        'Italian made leather boots featuring a western-inspired design with a slim ankle silhouette and metallic stitched details. Made in Italy.',
      price: '528.00',
      size: '6'
    }),
    await Product.create({
      name: 'Clover Field Western Boot',
      imageUrl: '/img/clover-field.jpeg',
      description:
        'Italian made leather boots featuring a western-inspired design with a slim ankle silhouette and metallic stitched details. Made in Italy.',
      price: '528.00',
      size: '7'
    }),
    await Product.create({
      name: 'Clover Field Western Boot',
      imageUrl: '/img/clover-field.jpeg',
      description:
        'Italian made leather boots featuring a western-inspired design with a slim ankle silhouette and metallic stitched details. Made in Italy.',
      price: '528.00',
      size: '8'
    }),
    await Product.create({
      name: 'Clover Field Western Boot',
      imageUrl: '/img/clover-field.jpeg',
      description:
        'Italian made leather boots featuring a western-inspired design with a slim ankle silhouette and metallic stitched details. Made in Italy.',
      price: '528.00',
      size: '9'
    }),
    await Product.create({
      name: 'Santa Anas Western Boot',
      imageUrl: '/img/santa-anas.jpeg',
      description:
        'Italian made western-style ankle boots featured in a metallic leather design with floral embroidery, a pointed toe and a block heel. Made in Italy.',
      price: '498.00',
      size: '6'
    }),
    await Product.create({
      name: 'Santa Anas Western Boot',
      imageUrl: '/img/santa-anas.jpeg',
      description:
        'Italian made western-style ankle boots featured in a metallic leather design with floral embroidery, a pointed toe and a block heel. Made in Italy.',
      price: '498.00',
      size: '7'
    }),
    await Product.create({
      name: 'Santa Anas Western Boot',
      imageUrl: '/img/santa-anas.jpeg',
      description:
        'Italian made western-style ankle boots featured in a metallic leather design with floral embroidery, a pointed toe and a block heel. Made in Italy.',
      price: '498.00',
      size: '8'
    }),
    await Product.create({
      name: 'Santa Anas Western Boot',
      imageUrl: '/img/santa-anas.jpeg',
      description:
        'Italian made western-style ankle boots featured in a metallic leather design with floral embroidery, a pointed toe and a block heel. Made in Italy.',
      price: '498.00',
      size: '9'
    }),
    await Product.create({
      name: 'Arizona Western Boot',
      imageUrl: '/img/arizona.jpeg',
      description:
        'Italian made leather ankle boots featured in a western-inspired style with cutout details at the ankle and a fun embroidered design. Made in Italy.',
      price: '538.00',
      size: '6'
    }),
    await Product.create({
      name: 'Arizona Western Boot',
      imageUrl: '/img/arizona.jpeg',
      description:
        'Italian made leather ankle boots featured in a western-inspired style with cutout details at the ankle and a fun embroidered design. Made in Italy.',
      price: '538.00',
      size: '7'
    }),
    await Product.create({
      name: 'Arizona Western Boot',
      imageUrl: '/img/arizona.jpeg',
      description:
        'Italian made leather ankle boots featured in a western-inspired style with cutout details at the ankle and a fun embroidered design. Made in Italy.',
      price: '538.00',
      size: '8'
    }),
    await Product.create({
      name: 'Arizona Western Boot',
      imageUrl: '/img/arizona.jpeg',
      description:
        'Italian made leather ankle boots featured in a western-inspired style with cutout details at the ankle and a fun embroidered design. Made in Italy.',
      price: '538.00',
      size: '9'
    }),
    await Product.create({
      name: 'Vegan Going West Boot',
      imageUrl: '/img/vegan.jpeg',
      description:
        'Textured vegan leather ankle boots featured in a western-inspired silhouette with a stacked heel and pointed toe style.',
      price: '348.00',
      size: '6'
    }),
    await Product.create({
      name: 'Vegan Going West Boot',
      imageUrl: '/img/vegan.jpeg',
      description:
        'Textured vegan leather ankle boots featured in a western-inspired silhouette with a stacked heel and pointed toe style.',
      price: '348.00',
      size: '7'
    }),
    await Product.create({
      name: 'Vegan Going West Boot',
      imageUrl: '/img/vegan.jpeg',
      description:
        'Textured vegan leather ankle boots featured in a western-inspired silhouette with a stacked heel and pointed toe style.',
      price: '348.00',
      size: '8'
    }),
    await Product.create({
      name: 'Vegan Going West Boot',
      imageUrl: '/img/vegan.jpeg',
      description:
        'Textured vegan leather ankle boots featured in a western-inspired silhouette with a stacked heel and pointed toe style.',
      price: '348.00',
      size: '9'
    }),
    await Product.create({
      name: 'Sierra Western Boot',
      imageUrl: '/img/sierra.jpeg',
      description:
        'Spanish made western-inspired boots from Zadig & Voltaire featuring a classic silhouette and a colorful butterfly design.',
      price: '898.00',
      size: '6'
    }),
    await Product.create({
      name: 'Sierra Western Boot',
      imageUrl: '/img/sierra.jpeg',
      description:
        'Spanish made western-inspired boots from Zadig & Voltaire featuring a classic silhouette and a colorful butterfly design.',
      price: '898.00',
      size: '7'
    }),
    await Product.create({
      name: 'Sierra Western Boot',
      imageUrl: '/img/sierra.jpeg',
      description:
        'Spanish made western-inspired boots from Zadig & Voltaire featuring a classic silhouette and a colorful butterfly design.',
      price: '898.00',
      size: '8'
    }),
    await Product.create({
      name: 'Sierra Western Boot',
      imageUrl: '/img/sierra.jpeg',
      description:
        'Spanish made western-inspired boots from Zadig & Voltaire featuring a classic silhouette and a colorful butterfly design.',
      price: '898.00',
      size: '9'
    }),
    await Product.create({
      name: 'Seville Western Boot',
      imageUrl: '/img/seville.jpeg',
      description:
        'Classic western-inspired ankle boots featuring a metallic leather design with distressed details and a stacked wooden heel.',
      price: '348.00',
      size: '6'
    }),
    await Product.create({
      name: 'Seville Western Boot',
      imageUrl: '/img/seville.jpeg',
      description:
        'Classic western-inspired ankle boots featuring a metallic leather design with distressed details and a stacked wooden heel.',
      price: '348.00',
      size: '7'
    }),
    await Product.create({
      name: 'Seville Western Boot',
      imageUrl: '/img/seville.jpeg',
      description:
        'Classic western-inspired ankle boots featuring a metallic leather design with distressed details and a stacked wooden heel.',
      price: '348.00',
      size: '8'
    }),
    await Product.create({
      name: 'Seville Western Boot',
      imageUrl: '/img/seville.jpeg',
      description:
        'Classic western-inspired ankle boots featuring a metallic leather design with distressed details and a stacked wooden heel.',
      price: '348.00',
      size: '9'
    }),
    await Product.create({
      name: 'Gold Rush Western Boot',
      imageUrl: '/img/gold-rush.jpeg',
      description:
        'Italian-made western-inspired boots featuring croc textured accents and a sparkling embroidered velvet back.',
      price: '529.00',
      size: '6'
    }),
    await Product.create({
      name: 'Gold Rush Western Boot',
      imageUrl: '/img/gold-rush.jpeg',
      description:
        'Italian-made western-inspired boots featuring croc textured accents and a sparkling embroidered velvet back.',
      price: '529.00',
      size: '7'
    }),
    await Product.create({
      name: 'Gold Rush Western Boot',
      imageUrl: '/img/gold-rush.jpeg',
      description:
        'Italian-made western-inspired boots featuring croc textured accents and a sparkling embroidered velvet back.',
      price: '529.00',
      size: '8'
    }),
    await Product.create({
      name: 'Gold Rush Western Boot',
      imageUrl: '/img/gold-rush.jpeg',
      description:
        'Italian-made western-inspired boots featuring croc textured accents and a sparkling embroidered velvet back.',
      price: '529.00',
      size: '9'
    }),
    await Product.create({
      name: 'Vancouver Western Boot',
      imageUrl: '/img/vancouver.jpeg',
      description:
        'Italian-made western-inspired boots featuring a croc design with a pointed toe and block heel.',
      price: '478.00',
      size: '6'
    }),
    await Product.create({
      name: 'Vancouver Western Boot',
      imageUrl: '/img/vancouver.jpeg',
      description:
        'Italian-made western-inspired boots featuring a croc design with a pointed toe and block heel.',
      price: '478.00',
      size: '7'
    }),
    await Product.create({
      name: 'Vancouver Western Boot',
      imageUrl: '/img/vancouver.jpeg',
      description:
        'Italian-made western-inspired boots featuring a croc design with a pointed toe and block heel.',
      price: '478.00',
      size: '8'
    }),
    await Product.create({
      name: 'Vancouver Western Boot',
      imageUrl: '/img/vancouver.jpeg',
      description:
        'Italian-made western-inspired boots featuring a croc design with a pointed toe and block heel.',
      price: '478.00',
      size: '9'
    })
  ])

  //seed orders
  let cody = await User.findOne({where: {fullName: 'Cody'}})
  let order = await Order.findOne({where: {userId: cody.id}})
  let boots = await Product.findAll({where: {size: '9'}})

  await order.setProducts(boots)

  boots.forEach(async boot => {
    await OrderProduct.update(
      {quantity: 5},
      {where: {orderId: order.id, productId: boot.id}}
    )
  })

  await order.calculateTotal()

  console.log(`seeded ${users.length} users and ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
