import { oUser } from 'services/User';

export default function(state = false, action) {
	switch (action.type) {
		case 'SET_USER': {
			let { payload, remember } = action;
			if (remember) {
				oUser.set(payload);
			}
			return payload;
		}
		default: {
			return state;
		}
	}
};