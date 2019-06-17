/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from './AllProducts'
import {SingleProduct} from './SingleProduct'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('<AllProducts /> component', () => {
  let allProductsTest

  beforeEach('Create component', () => {
    allProductsTest = shallow(<AllProducts />)
  })

  const testProducts = [
    {
      name: 'My Amazing Boots',
      description: 'Handmade genuine leather cowboy boots',
      price: 150,
      size: 8
    },
    {
      name: 'My Western-Style Boots',
      description: 'Statement western style boots',
      price: 135,
      size: 7
    }
  ]

  describe('<AllProducts /> component', () => {
    it('has a `products` field initialized to be an empty array', () => {
      expect(allProductsTest.state().products).to.be.an('array')
    })

    it('has a `productStyle` field initialized to be an empty array', () => {
      expect(allProductsTest.state().productStyle).to.be.an('array')
    })

    it('renders an <h1> element', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(allProductsTest.find('h1').getElement()).to.exist
    })

    it('renders a <SingleProduct /> component', () => {
      expect(allProductsTest.find(SingleProduct).length).to.be.equal(1)
    })

    it('passes a prop called `product` to the <SingleProduct /> component', () => {
      expect(
        allProductsTest
          .find('#product')
          .find(SingleProduct)
          .props().product
      ).to.be.deep.equal(testProducts[0])
    })
  })
})
