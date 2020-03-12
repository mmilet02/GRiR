import { SAVE_FLOOR_PLAN, GET_FLOOR_PLANS } from './types.js';
import axios from 'axios';

export const getFloorPlans = () => dispach => {
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
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  let temp2 = floorPlan.map(plan => {
    return {
      tableId: plan._id,
      coordX: plan.coordX,
      coordY: plan.coordY,
      imageName: plan.imageName,
      sizeX: plan.sizeX,
      tableType: plan.tableType
    };
  });
  let temp = {
    restaurantID: 2,
    numbOfTables: floorPlan.length,
    tableList: temp2
  };
  console.log(temp);
  axios
    .post('/api/floorPlans', temp, config)
    .then(res => {
      let temp1 = res.data.data;
      let temp2 = res.data.data2;
      temp1.tableList = temp2;
      dispach({
        type: SAVE_FLOOR_PLAN,
        payload: temp1
      });
    })
    .catch(err => console.log('ERROR', err));
};
