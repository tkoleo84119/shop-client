import _ from 'lodash'

import { GET_ALL_PRODUCTS, GET_PRODUCT } from '../actions/type'

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ..._.mapKeys(action.payload.data.products, '_id') }
    case GET_PRODUCT:
      return { ...state, [action.payload.data.product._id]: action.payload.data.product }
    default:
      return state
  }
}
