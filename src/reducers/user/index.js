import { setProperty, getProperty } from 'utils/lsHelper.js';

export default function(state = getProperty('remember'), action) {
	switch (action.type) {
		case 'SET_USER': {
			let { payload, remember } = action;
			if (remember && payload.token) {
				setProperty('remember', payload);
			} else {
				setProperty('remember', false);
			}
			return payload;
		}
		default: {
			return state;
		}
	}
};