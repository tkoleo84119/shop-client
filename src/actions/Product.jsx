import { shop } from '../apis/shopApi'
import { GET_ALL_PRODUCTS, ERROR_STATUS, GET_PRODUCT } from './type'

export const getAllProducts = () => async dispatch => {
  let res
  try {
    res = await shop.get('/products')
    dispatch({ type: GET_ALL_PRODUCTS, payload: res.data })
  } catch (err) {
    dispatch({ type: ERROR_STATUS, payload: err.response.data })
  }
}

export const getProduct = id => async dispatch => {
  let res
  try {
    res = await shop.get(`/products/${id}`)
    dispatch({ type: GET_PRODUCT, payload: res.data })
  } catch (err) {
    dispatch({ type: ERROR_STATUS, payload: err.response.data })
  }
}
