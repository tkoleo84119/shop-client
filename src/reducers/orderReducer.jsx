import _ from 'lodash'

import { GET_ALL_ORDERS, GET_ORDER } from '../actions/type'

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return { ..._.mapKeys(action.payload.data.orders, '_id') }
    case GET_ORDER:
      return { [action.payload.data.order._id]: action.payload.data.order }
    default:
      return state
  }
}
