import { combineReducers } from 'redux';
import tableTypesReducer from './tableTypesReducer.js';

export default combineReducers({
  tableTypes: tableTypesReducer
});
