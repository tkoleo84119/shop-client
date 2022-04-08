import _ from 'lodash'

import {
  CREATE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from '../actions/type'

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ..._.mapKeys(action.payload.data.products, '_id') }
    case GET_PRODUCT:
      return { ...state, [action.payload.data.product._id]: action.payload.data.product }
    case CREATE_PRODUCT:
      return { ...state, [action.payload.data.product._id]: action.payload.data.product }
    case UPDATE_PRODUCT:
      return { ...state, [action.payload.data.product._id]: action.payload.data.product }
    case DELETE_PRODUCT:
      return _.omit(state, [action.id])
    default:
      return state
  }
}
