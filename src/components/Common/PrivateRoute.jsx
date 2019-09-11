import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
	middleware(props) {
		let { component: Component, user } = this.props;
		if (!user) {
			return(
				<Redirect
					to={{pathname: '/SignIn', state: {from: props.location}}}
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
		let { path } = this.props;
		return(
			<Route
				path={path}
				render={this.middleware.bind(this)}
			/>
		);
	};
};

export default PrivateRoute;