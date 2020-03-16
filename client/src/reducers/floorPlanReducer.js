import { SAVE_FLOOR_PLAN, GET_FLOOR_PLANS, LOADING } from '../actions/types.js';

const initialState = {
  floorPlanList: [],
  load: false
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
        // tables: [...state.tables, ...action.payload2]
      };
    case LOADING:
      return {
        ...state,
        load: true
      };
    default:
      return state;
  }
}
