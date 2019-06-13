/* eslint-disable no-case-declarations */
import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
const GET_ITEMS = 'GET_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'

/**
 * INITIAL STATE
 */
const initialState = {
  cartItems: [],
  order: {},
  loading: true
}

/**
 * ACTION CREATORS
 */
const gotOrder = order => ({type: GET_ORDER, order})
const gotItems = items => ({type: GET_ITEMS, items})
const addedItem = item => ({type: ADD_ITEM, item})
const deletedItem = item => ({type: DELETE_ITEM, item})
const updatedQuantity = item => ({type: UPDATE_QUANTITY, item})

/**
 * THUNK CREATORS
 */

export const getOrderAndItemsThunk = orderId => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart/items', orderId)
    let itemList = data.products
    delete data.products
    let orderInfo = data
    dispatch(gotItems(itemList))
    dispatch(gotOrder(orderInfo))
  } catch (error) {
    console.log('There was an error with getItemsThunk:', error)
  }
}

export const addItemThunk = (
  orderId,
  productId,
  quantity
) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/cart`, {orderId, productId, quantity})
    dispatch(addedItem(data))
  } catch (error) {
    console.log('There was an error with addItemThunk:', error)
  }
}

export const deleteItemThunk = (orderId, productId) => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/cart`, {orderId, productId})
    dispatch(deletedItem(data))
  } catch (error) {
    console.log('There was an error with deleteItemThunk:', error)
  }
}

export const updateQuantityThunk = (
  orderId,
  productId,
  quantity
) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart`, {orderId, productId, quantity})
    dispatch(updatedQuantity(data))
  } catch (error) {
    console.log('There was an error with updateQuantityThunk:', error)
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return {...state, order: action.order}
    case GET_ITEMS:
      //note that each "cartItem" will have quantity at cartItem.order_products.quantity
      return {...state, cartItems: action.items, loading: false}
    case ADD_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems, action.item],
        loading: false
      }
    case DELETE_ITEM:
      let newCartItems = state.cartItems.filter(
        item => item.id !== action.item.id
      )
      return {...state, cartItems: newCartItems, loading: false}
    case UPDATE_QUANTITY:
      let updatedCartItems = state.cartItems.map(
        item => (item.id === action.item.id ? action.item : item)
      )
      return {
        ...state,
        cartItems: updatedCartItems,
        loading: false
      }
    default:
      return state
  }
}

export default reducer
