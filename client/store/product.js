import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
// const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const GET_PRODUCT_STYLE = 'GET_PRODUCT_STYLE'

/**
 * INITIAL STATE
 */
const initialState = {
  products: [],
  productStyle: [],
  loading: true
}

/**
 * ACTION CREATORS
 */
const gotAllProducts = products => ({type: GET_ALL_PRODUCTS, products})
const gotProductStyle = product => ({type: GET_PRODUCT_STYLE, product})

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

export const getProductStyleThunk = name => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products?name=${name}`)
    dispatch(gotProductStyle(data))
  } catch (error) {
    console.log('There was an error with getProductStyleThunk:', error)
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, products: action.products, loading: false}
    case GET_PRODUCT_STYLE:
      return {...state, productStyle: action.product, loading: false}
    default:
      return state
  }
}

export default reducer
