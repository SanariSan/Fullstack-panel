import { combineReducers } from 'redux';
import { userInfo } from './user-info';
import { userAuth } from './user-auth';

const user = combineReducers({
  userInfo,
  userAuth,
});

export { user };
