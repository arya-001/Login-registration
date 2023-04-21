import { signup } from './apiCalls';

export const signUpUser = (username, email, password, confirmPassword, navigation) => {
  return dispatch => {
    signup(username, email, password, confirmPassword, navigation)(dispatch);
  }
}
