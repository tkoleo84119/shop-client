import { shop } from '../apis/shopApi'

import { GET_ALL_REVIEWS, DELETE_REVIEW, SUCCESS_STATUS, ERROR_STATUS } from '../actions/type'

export const createReview = (token, id, content, rating) => async dispatch => {
  let res
  try {
    res = await shop.post(
      `/products/${id}/reviews`,
      { content, rating },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    dispatch({
      type: SUCCESS_STATUS,
      payload: { ...res.data, message: 'create review successfully' }
    })
  } catch (err) {
    const payload = { ...err.response.data, message: 'You have already rated this product' }
    dispatch({
      type: ERROR_STATUS,
      payload: err.response.data.status === 'error' ? err.response.data : payload
    })
  }
}

export const getAllReviews = token => async dispatch => {
  let res
  try {
    res = await shop.get('/reviews', { headers: { Authorization: `Bearer ${token}` } })
    dispatch({ type: GET_ALL_REVIEWS, payload: res.data })
  } catch (err) {
    dispatch({ type: ERROR_STATUS, payload: err.response.data })
  }
}

export const deleteReview = (token, id) => async dispatch => {
  try {
    await shop.delete(`/reviews/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    dispatch({ type: DELETE_REVIEW, id })
    dispatch({
      type: SUCCESS_STATUS,
      payload: { status: 'success', message: 'delete review successfully' }
    })
  } catch (err) {
    dispatch({ type: ERROR_STATUS, payload: err.response.data })
  }
}
