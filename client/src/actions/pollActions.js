import * as types from '../constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

export function loadPollsSuccess(polls){
  return { type: types.LOAD_POLLS_SUCCESS, polls};
}

export function voteSuccess(poll){
  return { type: types.VOTE_SUCCESS, poll};
}

export function createPollSuccess(poll){
  return { type: types.CREATE_POLL_SUCCESS, poll};
}

export function deletePollSuccess(id){
  return { type: types.DELETE_POLL_SUCCESS, id};
}

// example of a thunk using the redux-thunk middleware
export function loadPolls() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    axios.get(`${ROOT_URL}/getAllPolls`)
      .then(response =>{
        dispatch(loadPollsSuccess(response.data));
      }).catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
  };
}

export function vote(pollId, optionFieldName) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios.post(`${ROOT_URL}/vote`, {id: pollId, optionFieldName})
      .then(response =>{
        localStorage.getItem('user') ? localStorage.setItem(localStorage.getItem('user') + pollId, true) : localStorage.setItem(pollId, true);
        dispatch(voteSuccess(response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
  };
}

export function createPoll(poll) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios.post(`${ROOT_URL}/addPoll`, { poll }, { headers: { authorization: localStorage.getItem('token') } })
      .then(response =>{
      dispatch(createPollSuccess(response.data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
    });
  };
}

export function deletePoll(id) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios.post(`${ROOT_URL}/deletePoll`, { id, user: localStorage.getItem('user') }, { headers: { authorization: localStorage.getItem('token') } })
      .then(response => {
        dispatch(deletePollSuccess(response.data.id));
      }).catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
  };
}
