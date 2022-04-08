import _ from 'lodash'

import { GET_ALL_ORDERS, GET_ORDER, DELETE_ORDER } from '../actions/type'

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return { ..._.mapKeys(action.payload.data.orders, '_id') }
    case GET_ORDER:
      return { ...state, [action.payload.data.order._id]: action.payload.data.order }
    case DELETE_ORDER:
      return _.omit(state, [action.id])
    default:
      return state
  }
}
