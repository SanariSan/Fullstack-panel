import { combineReducers } from 'redux';
import { userInfo } from './user-info';
import { userSession } from './user-session';
import { userAuth } from './user-auth';

const user = combineReducers({
  userInfo,
  userSession,
  userAuth,
});

export { user };
