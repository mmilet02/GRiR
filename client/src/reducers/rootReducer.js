import { combineReducers } from 'redux';
import tableTypesReducer from './tableTypesReducer.js';
import floorPlanReducer from './floorPlanReducer.js';
import errorReducer from './errorReducer.js';
import authReducer from './authReducer.js';
import reservationReducer from './reservationReducer.js';

export default combineReducers({
  tableTypes: tableTypesReducer,
  floorPlan: floorPlanReducer,
  error: errorReducer,
  auth: authReducer,
  reservation: reservationReducer,
});
