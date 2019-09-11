const services = require('@configs/services');
const { default_middleware } = require('@utils/registerRoutes/default_middleware');
let { oMySql } = require('@modules/MySql');
let { oUser } = require('@modules/User');

function registerRoutes({ app, BASE_URL }) {
	for (let k in services) {
		let url = `${BASE_URL}/${k}`;
		let types = services[k];
		for (let type in types) {
			let props = types[type];
			registerRoute({ app, url, type, props });
		};
	};
};

function registerRoute({ app, url, type, props }) {
	let rArr = [url];
	let { connection, auth, roles, expect, execute } = props;

	rArr.push((req, res, next)=> { // default middleware;
		default_middleware(req, res, next, props); // registering default output methods; adding 'oParams'; validation;
	});

	if (connection) { // db connection middleware;
		rArr.push(oMySql.connection_middleware);
	}

	if (auth) { // jwt token middleware;
		if (connection) {
			rArr.push(oUser.auth_middleware);
		} else {
			rArr.splice(2); // removing all other middlewares except default;
			rArr.push((req, res)=> {
				res.errorToUi({m: [`Route must have 'connection' middleware to activate auth middleware!`]});
			});
		}
	}

	if (roles) { // role middleware;
		if (auth) { // auth middleware available;
			rArr.push((req, res, next)=> {
				oUser.role_middleware(req, res, next, roles);
			});
		} else { // auth middleware must be available;
			rArr.splice(2); // removing all other middlewares except default;
			rArr.push((req, res)=> {
				res.errorToUi({m: [`Route must have 'auth' middleware to activate role middleware!`]});
			});
		}
	}

	rArr.push((req, res)=> { // main execute;
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

	app[type].apply(app, rArr);
};

module.exports = {
	registerRoutes
};