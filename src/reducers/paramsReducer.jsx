import _ from 'lodash'
import { ADD_PARAMS_CATEGORY, REMOVE_PARAMS_CATEGORY } from '../actions/type'

export const paramsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PARAMS_CATEGORY:
      return { ...state, category: action.value }
    case REMOVE_PARAMS_CATEGORY:
      return _.omit(state, ['category'])
    default:
      return state
  }
}
