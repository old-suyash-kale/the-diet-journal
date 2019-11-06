import $ from 'jquery';
import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import store from 'utils/store.js';
import history from 'utils/history.js';

import PrivateRoute from 'components/common/PrivateRoute.jsx';

import Header from 'components/common/Header.jsx';
import Footer from 'components/common/Footer.jsx';
import Error from 'components/error/index.jsx'

import SignUp from 'components/signUp/index.jsx';
import SignIn from 'components/signIn/index.jsx';
import Dashboard from 'components/dashboard/index.jsx';

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

								<Route
									path={'/SignUp'}
									render={(props)=> {
										return user ? <Redirect to={'/'} /> : <SignUp {...props} user={user} />;
									}}
									exact={true}
								/>

								<Route
									path={'/SignIn'}
									render={(props)=> {
										return user ? <Redirect to={'/'} /> : <SignIn {...props} user={user} />;
									}}
									exact={true}
								/>
								
								<PrivateRoute
									path={'/'}
									component={Dashboard}
									user={user}
									exact={true}
								/>

								<Route
									path={'/Error/:Message?'}
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