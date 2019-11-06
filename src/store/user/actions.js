import history from 'utils/history.js';
import { DELAY } from 'configs/transition.js';
import { ACTION_SET_USER, ACTION_SIGN_UP, ACTION_SIGN_IN, ACTION_SIGN_OUT } from 'store/user/index.js';
import busy from 'store/busy/actions.js';
import { signUp as signUpService, signIn as signInService } from 'services/user.js';

function setUser(payload) {
	return {
		type: ACTION_SET_USER,
		payload
	};
};

function signUp({ fname, lname, mobile, email, password }) {
	return (dispatch)=> {
		dispatch(busy.show(ACTION_SIGN_UP));
		setTimeout(()=> {
			signUpService({ fname, lname, mobile, email, password }).then(({ s, d })=> {
				if (s === 's') {
					dispatch(setUser(d));
					history.push('/');
				} else {
					dispatch(busy.hide(ACTION_SIGN_UP));
				}
			});
		}, DELAY);
	};
};

function signIn({ mobile, password }) {
	return (dispatch)=> {
		dispatch(busy.show(ACTION_SIGN_IN));
		setTimeout(()=> {
			signInService({ mobile, password }).then(({ s, d })=> {
				if (s === 's') {
					dispatch(setUser(d));
					history.push('/');
				} else {
					dispatch(busy.hide(ACTION_SIGN_IN));
				}
			});
		}, DELAY);
	};
};

function signOut() {
	return (dispatch)=> {
		dispatch({type: ACTION_SIGN_OUT});
		history.push('/');
	};
};

export {
	signUp,
	signIn,
	signOut
};