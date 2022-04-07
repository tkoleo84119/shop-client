import { shop } from '../apis/shopApi'
import {
  CREATE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  SUCCESS_STATUS,
  ERROR_STATUS
} from './type'

const createFormData = (formValues, image) => {
  const formData = new FormData()
  for (let key in formValues) {
    formData.append(key, formValues[key])
  }

  if (image) {
    formData.append('image', image)
  }

  return formData
}

export const createProduct = (formValues, image, token) => async dispatch => {
  let res
  const formData = createFormData(formValues, image)

  try {
    res = await shop.post(`/products`, formData, {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
    })
    dispatch({ type: CREATE_PRODUCT, payload: res.data })
    dispatch({
      type: SUCCESS_STATUS,
      payload: { ...res.data, message: 'update product successfully' }
    })
  } catch (err) {
    console.log(err)
    dispatch({ type: ERROR_STATUS, payload: err.response.data })
  }
}

export const getAllProducts =
  (params = {}) =>
  async dispatch => {
    let res
    try {
      res = await shop.get('/products', { params })
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

export const updateProduct = (id, formValues, image, token) => async dispatch => {
  let res
  const formData = createFormData(formValues, image)

  try {
    res = await shop.patch(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
    })
    dispatch({ type: UPDATE_PRODUCT, payload: res.data })
    dispatch({
      type: SUCCESS_STATUS,
      payload: { ...res.data, message: 'update product successfully' }
    })
  } catch (err) {
    dispatch({ type: ERROR_STATUS, payload: err.response.data })
  }
}
