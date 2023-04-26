import { combineReducers } from 'redux';

const initialState = {
    user: null,
    token: null,
    error: null
  };

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
      case SIGNUP_SUCCESS:
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          error: null
        };
      case LOGIN_FAILURE:
      case SIGNUP_FAILURE:
        return {
          ...state,
          user: null,
          token: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  const rootReducer = combineReducers({
    auth: authReducer
  });
  
  export default rootReducer;
  