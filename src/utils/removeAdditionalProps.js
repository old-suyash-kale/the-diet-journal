import $ from 'jquery';

export default (props, AdditionalProps)=> {
	props = $.extend(true, {}, props);
	AdditionalProps = $.extend(true, {dispatch: ''}, AdditionalProps);
	for (let prop in AdditionalProps) {
		if (typeof props[prop] != 'undefined') {
			delete props[prop];
		}
	}
	return props;
};