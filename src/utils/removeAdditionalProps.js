import $ from 'jquery';

export default (props, AdditionalProps)=> {
	props = $.extend(true, {}, props);
	for (let prop in AdditionalProps) {
		if (typeof props[prop] != 'undefined') {
			delete props[prop];
		}
	}
	return props;
};