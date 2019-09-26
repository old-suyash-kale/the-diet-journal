import history from 'utils/history';

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
		signUpService(data).then(({ s, d })=> {
			if (s === 's') {
				dispatch(setUser(d, remember));
				history.push('/');
			}
		});
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
		signInService(data, remember).then(({ s, d })=> {
			if (s === 's') {
				dispatch(setUser(d, remember));
				history.push('/');
			}
		});
	};
};