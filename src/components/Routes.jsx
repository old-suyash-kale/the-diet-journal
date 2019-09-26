import $ from 'jquery';
import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import store from 'utils/store.js';
import history from 'utils/history.js';

import PrivateRoute from 'components/Common/PrivateRoute.jsx';

import Header from 'components/Common/Header.jsx';
import Footer from 'components/Common/Footer.jsx';
import Error from 'components/Error/index.jsx'

import SignUp from 'components/SignUp/index.jsx';
import SignIn from 'components/SignIn/index.jsx';
import Dashboard from 'components/Dashboard/index.jsx';

class Routes extends Component {
	render() {
		let { user } = this.props;
		$('body').css({
			'min-height': window.innerHeight + 'px'
		});
		return(
			<Router
				store={store}
				history={history}>
				<div
					className={'app-root'}>

					<Header user={user} />

					<div
						className={'app-route'}>
						<div
							className={'container-fluid'}>
							<Switch>

								<PrivateRoute
									path={'/'}
									component={Dashboard}
									user={user}
									exact={true}
								/>

								<Route
									path={'/SignIn'}
									render={(props)=> {
										if (user) {
											return (<Redirect to={'/'} />);
										} else {
											return (<SignIn {...props} user={user} />);
										}
									}}
									exact={true}
								/>

								<Route
									path={'/SignUp'}
									render={(props)=> {
										if (user) {
											return (<Redirect to={'/'} />);
										} else {
											return (<SignUp {...props} user={user} />);
										}
									}}
									exact={true}
								/>

								<Route
									path={'/Error'}
									render={(props)=> (<Error {...props} user={user} />)}
									exact={true}
								/>

								<Route
									path={'/Error/:Message'}
									render={(props)=> (<Error {...props} user={user} />)}
									exact={true}
								/>

							</Switch>
						</div>
					</div>

					<Footer user={user} />

				</div>
			</Router>
		);
	};
};

export default connect(state => {
	return {
		user: state.user
	};
})(Routes);