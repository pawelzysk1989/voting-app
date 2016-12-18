import { combineReducers } from 'redux';
import polls from './pollReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import {routerReducer} from 'react-router-redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';


const rootReducer = combineReducers({
  polls,
  ajaxCallsInProgress,
  form,
  auth: authReducer,
  routing: routerReducer
});

export default rootReducer;

