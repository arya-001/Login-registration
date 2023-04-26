

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from './reducers';

const API_URL = `http://10.0.2.2:3000`;

export const login = (email, password) => dispatch => {
  axios
    .post(`${API_URL}/login`, {email, password})
    .then(response => {
      const {token} = response.data;
      const user = jwtDecode(token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {user, token},
      });
    })
    .catch(error => {
      dispatch({type: LOGIN_FAILURE, payload: error.message});
    });
};





export const signup = (username, email, password, confirmPassword, navigation) => async dispatch => {
  console.log("calling signup http");
  if (password !== confirmPassword) {
  dispatch({ type: SIGNUP_FAILURE, payload: { error: 'Passwords do not match' } });
  return;
  }
  try {
    const { data } = await axios.post(`${API_URL}/signup`, { username, email, password });
    console.log("data", JSON.stringify(data));
    dispatch({ type: SIGNUP_SUCCESS, payload: { token: data.token } });
  navigation.navigate('confirmSignUp');
  } catch (error) {
  console.log('Error:', error);
  dispatch({ type: SIGNUP_FAILURE, payload: { error: error.response.data } });
  }
  };

