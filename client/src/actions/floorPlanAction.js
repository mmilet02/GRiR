import { SAVE_FLOOR_PLAN, GET_FLOOR_PLANS, LOADING } from './types.js';
import axios from 'axios';

export const getFloorPlans = () => dispach => {
  dispach(setLoading());
  axios
    .get('/api/floorPlans')
    .then(res =>
      dispach({
        type: GET_FLOOR_PLANS,
        payload: res.data.data
      })
    )
    .catch(err => console.log('ERROR', err));
};

export const saveFloorPlan = floorPlan => dispach => {
  console.log('uslo....');
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  let temp = {
    RestaurantID: '2',
    NumbOfTables: floorPlan.length,
    TableList: floorPlan
  };
  axios
    .post('/api/floorPlans', temp, config)
    .then(res => {
      dispach({
        type: SAVE_FLOOR_PLAN,
        payload: res.data.data
        // payload2: res.data.data2
      });
    })
    .catch(err => console.log('ERROR', err));
};

export const setLoading = () => dispach => {
  dispach({
    type: LOADING
  });
};
