import {
  SAVE_FLOOR_PLAN,
  GET_FLOOR_PLANS,
  LOADING,
  GET_RESTORAUNTS,
  GET_CUSTOMERS,
  GET_GRADES,
  ADD_GRADE,
} from '../actions/types.js';

const initialState = {
  floorPlanList: [],
  restoraunts: [],
  customers: [],
  grades: [],
  load: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FLOOR_PLANS:
      return {
        ...state,
        floorPlanList: action.payload,
        loading: false,
      };

    case GET_GRADES:
      return {
        ...state,
        grades: action.payload,
        loading: false,
      };

    case ADD_GRADE:
      return {
        ...state,
        grades: [...state.grades, action.payload],
      };
    case SAVE_FLOOR_PLAN:
      return {
        ...state,
        floorPlanList: [...state.floorPlanList, action.payload],
      };
    case GET_RESTORAUNTS:
      return {
        ...state,
        restoraunts: action.payload,
        load: false,
      };
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
        load: false,
      };
    case LOADING:
      return {
        ...state,
        load: true,
      };
    default:
      return state;
  }
}
