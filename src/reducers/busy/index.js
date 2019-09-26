import $ from 'jquery';

export default function(state = [], action) {
	let { type }  = action,
		busys = $.extend(true, [], state),
		i = busys.indexOf(type),
		remove = (busys, i)=> {
			busys.splice(i, 1);
			return busys;
		};
	if (i >= 0) {
		return remove(busys, i);
	}
	switch (type) {
		case "SET_BUSY": {
			let { Key, bool } = action.payload;
			if (bool && i < 0) { // add;
				busys.push(Key);
			}
			if (!bool && i >= 0) { // remove
				busys = remove(busys, i);
			}
			return busys;
		}
		default: {
			return state;
		}
	}
};