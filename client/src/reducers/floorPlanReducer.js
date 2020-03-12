import { SAVE_FLOOR_PLAN, GET_FLOOR_PLANS } from '../actions/types.js';

const initialState = {
  floorPlanList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FLOOR_PLANS:
      return {
        ...state,
        floorPlanList: action.payload,
        loading: false
      };
    case SAVE_FLOOR_PLAN:
      return {
        ...state,
        floorPlanList: [...state.floorPlanList, action.payload]
      };
    default:
      return state;
  }
}
