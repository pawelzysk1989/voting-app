import * as types from '../constants/actionTypes';
//import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function pollReducer(state = initialState.polls, action) {

  let polls;

  switch (action.type) {
    case types.LOAD_POLLS_SUCCESS:
      return action.polls;

    case types.VOTE_SUCCESS:
      polls = JSON.parse(JSON.stringify(state));
      return [ ...polls.filter(poll => poll._id !== action.poll._id), action.poll];

    case types.CREATE_POLL_SUCCESS:
      polls = JSON.parse(JSON.stringify(state));
      return [ ...polls, action.poll];

    case types.DELETE_POLL_SUCCESS:
      polls = JSON.parse(JSON.stringify(state));
      return [ ...polls.filter(poll => poll._id !== action.id)];

    default:
      return state;
  }
}
