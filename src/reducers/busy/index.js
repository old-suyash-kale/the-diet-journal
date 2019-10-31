import $ from 'jquery';

export default function(state = [], action) {
	let { type }  = action,
		remove = (busys, i)=> {
			busys.splice(i, 1);
			return busys;
		};
	switch (type) {
		case "SET_BUSY": {
			let { Key, bool } = action.payload,
				busys = $.extend(true, [], state),
				i = busys.indexOf(type);
			if (bool && i < 0) { // add;
				busys.push(Key);
			}
			if (!bool || i >= 0) { // remove
				busys = remove(busys, i);
			}
			return busys;
		}
		default: {
			return state;
		}
	}
};