import {
  RESTORAUNT_LOADED,
  RESTORAUNT_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types.js';
import { returnErrors } from './errorActions';
import axios from 'axios';

export const loadRestoraunt = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: RESTORAUNT_LOADING });

  axios
    .get('/api/auth/restoraunts', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: RESTORAUNT_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = ({
  Name,
  Email,
  Description,
  WorkingHours,
  RestorauntPage,
  Phone,
  MaxNumbOfSeats,
  MaxNumbOfTables,
  Password
}) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({
    Name,
    Email,
    Description,
    WorkingHours,
    RestorauntPage,
    Phone,
    MaxNumbOfSeats,
    MaxNumbOfTables,
    Password
  });

  axios
    .post('/api/restoraunts', body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login User
export const login = ({ Email, Password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ Email, Password });

  axios
    .post('/api/auth/restoraunts', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
