/**
 * 
 * @param {Function} props: service config;
 * @param {Object} req: service's request;
 * @param {Object} res: service's request;
 * @param {Function} next: completing middleware;
 */
module.exports = function(props, req, res, next) {
	let { expect } = props, // service config;
		{ oParams } = req,
		eMessage = []; // error message;

		for (let k in expect) { // looping all expected params for api;
		let oParam = expect[k], // props for param;
			pVal = oParams[k]; // trying to fetching key from multiple objects;

		if (!pVal && oParam.required) { // required;
			eMessage.push(oParam.required_message || `${oParam.label || k} is required!`);
		}

	};

	if (eMessage.length) {
		res.warningToUi({ m: eMessage });
	} else {
		next();
	}

};