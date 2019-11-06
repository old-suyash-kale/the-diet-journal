import { ACTION_BUSY_SHOW, ACTION_BUSY_HIDE } from 'store/busy/index.js';

export function show(payload) {
	return {
		type: ACTION_BUSY_SHOW,
		payload
	};
};

export function hide(payload) {
	return {
		type: ACTION_BUSY_HIDE,
		payload
	};
};

export default {
	show,
	hide
};