import { shop } from '../apis/shopApi'

import {
  GET_ALL_ORDERS,
  GET_ORDER,
  DELETE_ORDER,
  SUCCESS_STATUS,
  ERROR_STATUS
} from '../actions/type'

export const checkout = (subTotal, token, cart) => async dispatch => {
  let res
  try {
    res = await shop.post(
      '/orders',
      { subTotal, cart },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    return res
  } catch (err) {
    dispatch({ type: ERROR_STATUS, payload: err.response.data })
  }
}

export const getAllOrders = token => async dispatch => {
  let res
  try {
    res = await shop.get('/orders', { headers: { Authorization: `Bearer ${token}` } })
    dispatch({ type: GET_ALL_ORDERS, payload: res.data })
  } catch (err) {
    dispatch({ type: ERROR_STATUS, payload: err.response.data })
  }
}

export const getOrder = (token, id) => async dispatch => {
  let res
  try {
    res = await shop.get(`/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    dispatch({ type: GET_ORDER, payload: res.data })
  } catch (err) {
    dispatch({ type: ERROR_STATUS, payload: err.response.data })
  }
}

export const deleteOrder = (token, id) => async dispatch => {
  try {
    await shop.delete(`/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    dispatch({ type: DELETE_ORDER, id })
    dispatch({
      type: SUCCESS_STATUS,
      payload: { status: 'success', message: 'delete order successfully' }
    })
  } catch (err) {
    dispatch({ type: ERROR_STATUS, payload: err.response.data })
  }
}
