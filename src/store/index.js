import { combineReducers } from 'redux';

import user from 'store/user/reducer.js';
import busy from 'store/busy/reducer.js';

export default combineReducers({
	user,
	busy
});