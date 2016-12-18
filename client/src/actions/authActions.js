import * as types from '../constants/actionTypes';
import axios from 'axios';
import { browserHistory } from 'react-router';
import toastr from 'toastr';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server

    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch(authUser());
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', email);
        // - redirect to the route '/polls'
        browserHistory.push('/polls');
      })
      .catch((error) => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server

    return axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch(authUser());
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', email);
      })
      .catch((error) => {
        // If request is bad...
        // - Show an error to the user
        throw(error);
      });
  }
}


export function signoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return { type: types.UNAUTH_USER };
}

export function authUser() {
  return {
    type: types.AUTH_USER,
  };
}


export function authError(error) {
  return {
    type: types.AUTH_ERROR,
    payload: error
  };
}



