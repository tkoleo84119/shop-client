import { shop } from '../apis/shopApi'

import { SUCCESS_STATUS, ERROR_STATUS } from '../actions/type'

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
