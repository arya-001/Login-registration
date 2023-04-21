import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from './reducers';

const API_URL = 'http:localhost:3000';

export const login = (email, password) => dispatch => {
  axios
    .post('/login', {email, password})
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

export const signup =
  (username, email, password, confirmPassword, navigation) =>
  async dispatch => {
    if (password !== confirmPassword) {
      dispatch({
        type: SIGNUP_FAILURE,
        payload: {error: 'Passwords do not match'},
      });
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password,
      });
      console.log('Response:', response);
      if (response && response.data && response.data.token) {
        dispatch({type: SIGNUP_SUCCESS, payload: {token: response.data.token}});
        navigation.navigate('confirmSignup'); // Navigate to confirmSignup screen
      } else {
        dispatch({
          type: SIGNUP_FAILURE,
          payload: {error: error.response.data},
        });
      }
    } catch (error) {
      console.log('Error:', error);
      dispatch({
        type: SIGNUP_FAILURE,
        payload: {error: error.response.data},
      });
    }
  };































// export const signup =
//   (username, email, password, confirmPassword, navigation) =>
//   async dispatch => {
//     if (password !== confirmPassword) {
//       dispatch({
//         type: SIGNUP_FAILURE,
//         payload: {error: 'Passwords do not match'},
//       });
//       return;
//     }

//     try {
//       const response = await axios.post(`${API_URL}/signup`, {
//         username,
//         email,
//         password,
//       });
//       dispatch({type: SIGNUP_SUCCESS, payload: {token: response.data.token}});
//       navigation.navigate('confirmSignup'); // Navigate to confirmSignup screen
//     } catch (error) {
//       dispatch({
//         type: SIGNUP_FAILURE,
//         payload: {error: error.response.data},
//       });
//     }
//   };

// export const signup = (username, email, password, confirmPassword,navigation) => dispatch => {
//   axios.post('/signup', { username, email, password, confirmPassword })
//     .then(response => {
//       const { token } = response.data;
//       const user = jwtDecode(token);
//       dispatch({
//         type: 'SIGNUP_SUCCESS',
//         payload: { user, token }
//       });
//       navigation.navigate('ConfirmSignUp', { email });
//     })
//     .catch(error => {
//       dispatch({ type: 'SIGNUP_FAILURE', payload: error.message });
//     });
// };
