import { shop } from '../apis/shopApi'

import { GET_ALL_ORDERS, SUCCESS_STATUS, ERROR_STATUS } from '../actions/type'

export const getAllOrders = token => async dispatch => {
  let res
  try {
    res = await shop.get('/orders', { headers: { Authorization: `Bearer ${token}` } })
    dispatch({ type: GET_ALL_ORDERS, payload: res.data })
  } catch (err) {
    dispatch({ type: ERROR_STATUS, payload: err.response.data })
  }
}
