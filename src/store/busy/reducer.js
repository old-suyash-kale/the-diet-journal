import { ACTION_BUSY_SHOW, ACTION_BUSY_HIDE } from 'store/busy/index.js';

export default function(state = [], action) {
	let { type, payload }  = action,
		remove = (s, k)=> {
			let i = s.indexOf(k);
			if (i >= 0) {
				let ns = [...s];
				ns.splice(i, 1);
				return ns;
			}
			return s;
		};
	switch (type) {
		case ACTION_BUSY_SHOW: {
			return [...state, payload];
		}
		case ACTION_BUSY_HIDE: {
			return remove(state, payload);
		}
		default: {
			return remove(state, type);
		}
	}
};