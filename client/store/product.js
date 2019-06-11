import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = {
  products: [],
  product: {},
  loading: true
}

/**
 * ACTION CREATORS
 */
const gotAllProducts = products => ({type: GET_ALL_PRODUCTS, products})
const gotSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})

/**
 * THUNK CREATORS
 */

export const getAllProductsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(gotAllProducts(data))
  } catch (error) {
    console.log('There was an error with getAllProductsThunk:', error)
  }
}

export const getSingleProductThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(gotSingleProduct(data))
  } catch (error) {
    console.log('There was an error with getSingleProductThunk:', error)
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, products: action.products, loading: false}
    case GET_SINGLE_PRODUCT:
      return {...state, product: action.product, loading: false}
    default:
      return state
  }
}

export default reducer
