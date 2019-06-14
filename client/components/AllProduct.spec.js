/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from './AllProducts'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Front-End-Component', () => {
  let allProductsTest

  beforeEach(() => {
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
    it('renders all products in testProducts', () => {})

    it('renders a <Single Product /> component in a div', () => {})

    it('renders an <h1> element', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(allProductsTest.find('h1').getElement()).to.exist
    })

    it('passes a prop called `product` to a <SingleProduct /> components', () => {})
  })
})
