import { combineReducers } from 'redux';

import user from './user/';
import busy from './busy/';

export default combineReducers({
	user,
	busy
});