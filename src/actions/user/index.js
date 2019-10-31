import history from 'utils/history';

import { setBusy } from '../busy/index.js';
import { signUp as signUpService, signIn as signInService } from 'services/user.js';

function setUser(payload, remember = true) {
	return {
		type: 'SET_USER',
		payload,
		remember
	};
};

export function signUp(data, remember) {
	return (dispatch)=> {
		dispatch(setBusy('USER_SIGNUP', true));
		setTimeout(()=> {
			signUpService(data).then(({ s, d })=> {
				dispatch(setBusy('USER_SIGNUP', false));
				if (s === 's') {
					dispatch(setUser(d, remember));
					history.push('/');
				}
			});
		}, 400);
	};
};

export function signOut() {
	return (dispatch)=> {
		dispatch(setUser(false));
		history.push('/SignIn');
	};
};

export function signIn(data, remember) {
	return (dispatch)=> {
		dispatch(setBusy('USER_SIGNIN', true));
		setTimeout(()=> {
			signInService(data, remember).then(({ s, d })=> {
				dispatch(setBusy('USER_SIGNIN', false));
				if (s === 's') {
					dispatch(setUser(d, remember));
					history.push('/');
				}
			});
		}, 400);
	};
};