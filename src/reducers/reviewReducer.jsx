import _ from 'lodash'

import { GET_ALL_REVIEWS } from '../actions/type'

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_REVIEWS:
      return { ..._.mapKeys(action.payload.data.reviews, '_id') }
    default:
      return state
  }
}
