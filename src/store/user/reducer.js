import { setProperty, getProperty } from 'utils/lsHelper.js';
import { ACTION_SET_USER, ACTION_SIGN_OUT } from 'store/user/index.js';

export default function(state = getProperty('THE-USER'), action) {
	switch (action.type) {
		case ACTION_SET_USER: {
			let { payload } = action;
			setProperty('THE-USER', payload);
			return payload;
		}
		case ACTION_SIGN_OUT: {
			setProperty('THE-USER', false);
			return false;
		}
		default: {
			return state;
		}
	}
};