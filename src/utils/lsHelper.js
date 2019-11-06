import { ITEM, DEFAULT_PROPS } from 'configs/ls.js';

/**
 * getting your entire ls;
 */
function get() {
	let item = localStorage.getItem(ITEM);
	if (!item) {
		item = JSON.stringify(set({}));
	}
	return JSON.parse(item);
};

/**
 * setting your entire ls;
 * @param {String} item: value of your entire ls;
 */
function set(item) {
	localStorage.setItem(ITEM, JSON.stringify(item));
	return get();
};

/**
 * fetching property from you ls;
 * @param {String} prop: property need to fetch from you ls;
 */
function getProperty(prop) {
	let item = get()[prop];
	return (typeof item == 'undefined' ? DEFAULT_PROPS[prop] : item);
};

/**
 * setting property in you ls;
 * @param {String} prop: property need to set in you ls;
 */
function setProperty(prop, val) {
	let item = get();
	item[prop] = val;
	return set(item);
};


export {
	getProperty,
	setProperty
};