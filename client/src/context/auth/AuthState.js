import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import configClientSubFolder from '../../config/configClientSubFolder';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,    
  USER_LOADED,     
  AUTH_ERROR,       
  LOGIN_SUCCESS,
  LOGIN_FAIL,   
  LOGOUT,          
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {

  const currBaseURL = configClientSubFolder.baseUrl;

  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    // Load token into global headers
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    try {
      const res = await axios.get(`${currBaseURL}/api/auth`);

      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        // payload: err.response.data.msg
        payload: err
      })
    }
  }

  // Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post(`${currBaseURL}/api/users`, formData, config);  // because we have a proxy value

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      // In order to test, clean token from localStorage
      loadUser();  // Gets user from the backend

    } catch (err) {      
        dispatch({
          type: REGISTER_FAIL,
          payload: err
          // payload: err.response.data.msg
        });
    }
  }

  // Login User
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const url = `${currBaseURL}/api/auth`;
      console.log("Url:", url);
      const res = await axios.post(url, formData, config);  // because we have a proxy value
      console.log(res.data, res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      // In order to test, clean token from localStorage
      loadUser();  // Gets user from the backend

    } catch (err) {      
        dispatch({
          type: LOGIN_FAIL,
          payload: err
          // payload: err.response.data.msg
        });
    }
  }

  // Logout
  const logout = () => {
    dispatch({
      type: LOGOUT
    });
  }

  // Clear Errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  }

  return(
    <AuthContext.Provider
      value = {{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;