import { combineReducers } from 'redux';
import tableTypesReducer from './tableTypesReducer.js';
import floorPlanReducer from './floorPlanReducer';

export default combineReducers({
  tableTypes: tableTypesReducer,
  floorPlan: floorPlanReducer
});
