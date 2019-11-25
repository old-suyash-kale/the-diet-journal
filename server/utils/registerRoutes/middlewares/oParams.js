/**
 * 
 * @param {Function} props: service config;
 * @param {Object} req: service's request;
 * @param {Object} res: service's request;
 * @param {Function} next: completing middleware;
 */
module.exports = function(props, req, res, next) {
	let { expect, auth } = props, // service config;
		oParams = {}; // will be added expected api params;

	if (!expect) { expect = {}; } // defaulting expect;

	expect.platform = { // defaulting platform in required params;
		label: 'Platform',
		required: true
	};

	if (auth) { // auth is required for api;
		expect.token = { // expecting jwt token;
			label: 'Tokens',
			required: true
		}
		oParams.token = req.headers['x-the-diet-journal']; // adding token value from header;
	}

	for (let k in expect) { // looping all expected params for api;
		let oParam = expect[k], // props for param;
			pVal = ((req.body[k] || req.query[k]) || req.params[k] || oParam.default); // trying to fetching key from multiple objects;

		if (typeof pVal !== 'undefined') {
			oParams[k] = pVal;
		}

	};
	req.oParams = oParams; // assigning expected params to 'req' object;

    next();

};