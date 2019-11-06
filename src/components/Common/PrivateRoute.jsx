import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { PRIVATE_ROUTE_REDIRECT } from 'configs/path.js';

class PrivateRoute extends Component {
	middleware = (props)=> {
		let { component: Component, user } = this.props;
		if (!user) {
			return(
				<Redirect
					to={{pathname: PRIVATE_ROUTE_REDIRECT, state: {from: props.location}}}
				/>
			);
		}
		return(
			<Component
				{...props}
				user={user}
			/>
		);
	};
	render() {
		let { props, middleware } = this, { path } = props;
		return(
			<Route
				path={path}
				render={middleware}
			/>
		);
	};
};

export default PrivateRoute;