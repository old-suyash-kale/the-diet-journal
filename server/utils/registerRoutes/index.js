let services = require('@configs/services.js');
let oParams = require('@utils/registerRoutes/middlewares/oParams.js');
let toUi = require('@utils/registerRoutes/middlewares/toUi.js');
let log_api = require('@utils/registerRoutes/middlewares/log_api.js');
let validation = require('@utils/registerRoutes/middlewares/validation.js');
let connection = require('@utils/registerRoutes/middlewares/connection.js');
let auth = require('@utils/registerRoutes/middlewares/auth.js');
let role = require('@utils/registerRoutes/middlewares/role.js');

/**
 * handling regestration for api endpoint;
 * @param {Object}: {app: ExpressApp, url: '*', type: 'get/put/post/delete'}
 */
function registerRoute({ app, url, type, props }) {
	let rArr = [
			url, // endpoint url;
			oParams.bind(this, props),
			toUi,
			connection,
			log_api,
			validation.bind(this, props)
		],
		{ execute } = props;

	if (props.auth || props.roles) { // middleware for authorising user's jwt token;
		rArr.push(auth);
	}

	if (props.roles) { // role middleware;
		rArr.push(role.bind(this, props));
	}

	rArr.push((req, res)=> { // main execute assigned to route;
		if (execute) {
			try {
				execute(req, res);
			} catch(m) {
				res.errorToUi({ m });
			}
		} else {
			res.errorToUi({ m: [`No execute assign to route!`] });
		}
	});

	app[type].apply(app, rArr); // adding to express route;

};

/**
 * regestring all api endpoints;
 * @param {Object}: {app: ExpressApp, BASE_URL: '*'}
 */
module.exports =  function({ app, BASE_URL }) {
	for (let k in services) { // looping all endpoints;
		let url = `${BASE_URL}/${k}`; // api url;
		let types = services[k]; // all api methods for endpoints;
		for (let type in types) {
			let props = types[type];
			registerRoute({ app, url, type, props });
		};
	};
};