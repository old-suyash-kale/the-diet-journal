import $ from 'jquery';
import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import store from 'utils/store';
import history from 'utils/history';

import PrivateRoute from 'components/Common/PrivateRoute';

import Header from 'components/Common/Header';
import Footer from 'components/Common/Footer';

import SignUp from 'components/SignUp/';
import SignIn from 'components/SignIn/';
import Dashboard from 'components/Dashboard/';

class Routes extends Component {
	render() {
		let { user } = this.props;
		$('body').css({
			'min-height': window.innerHeight + 'px'
		});
		return(
			<ConnectedRouter
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
									render={(props)=> (<SignIn {...props} user={user} />)}
									exact={true}
								/>

								<Route
									path={'/SignUp'}
									render={(props)=> (<SignUp {...props} user={user} />)}
									exact={true}
								/>

							</Switch>
						</div>
					</div>

					<Footer user={user} />

				</div>
			</ConnectedRouter>
		);
	};
};

export default connect(state => {
	return {
		user: state.user
	};
})(Routes);