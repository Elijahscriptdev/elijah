import { combineReducers } from 'redux';
import signInReducer from './sign-in';

const index = combineReducers({
  signInInfo: signInReducer,
  
});

export default index;