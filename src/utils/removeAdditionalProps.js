import $ from 'jquery';

/**
 * removing properties from object;
 * @param {Object} prop: Original Object;
 * @param {Object} AdditionalProps: object's properties will be removed from original object;
 */
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