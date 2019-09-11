let { register: registerToUi } = require('@utils/registerRoutes/toUi');

module.exports = {
    default_middleware:(req, res, next, props)=> {
			registerToUi(req, res); // registering output methods;

			// adding all params to 'oParam' and validating;
			let { expect, auth } = props;
			if (!expect) { expect = {}; }
			let oParams = {};
			expect.platform = {
				label: 'Platform',
				required: true
			};
			if (auth) {
				expect.token = {
					label: 'Tokens',
					required: true
				}
				let token = req.headers['x-the-diet-journal'];
				if (token) {
					expect.token.default = token;
				}
			}
			let eMessage = [];
			for (let k in expect) {
				let oParam = expect[k];
				let pVal = ((req.body[k] || req.query[k]) || req.params[k] || oParam.default);
				if (typeof pVal !== 'undefined') {
					oParams[k] = pVal;
				}

				if (!pVal && oParam.required) { // required;
					eMessage.push(oParam.required_message || `${oParam.label || k} is required!`);
				}
			};
			req.oParams = oParams;

			if (eMessage.length) {
				res.errorToUi({ m: eMessage });
			} else {
				next();
			}
    }
};