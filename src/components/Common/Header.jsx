import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faCog, faSignOutAlt } from '@fortawesome/fontawesome-free-solid';

import { signOut } from 'actions/user/index.js';

class Header extends Component {
	render() {
		let { user } = this.props;
		return(
			<nav
				className={'navbar navbar-expand-lg navbar-primary bg-primary text-light shadow-sm mb-3'}>
				<Link
					to={'/'}
					className={'navbar-brand text-white'}>
					{'The Diet Journal'}
				</Link>
				<div
					className={'collapse navbar-collapse'}>
					<ul
						className={'navbar-nav mr-auto'}>

						{!user ?
							<Fragment>
								<li
									className={'nav-item'}>
									<Link
										to={'/SignIn'}
										className={'nav-link text-white'}>
										<FontAwesomeIcon
											icon={faSignInAlt}
											className={'mr-2'}
										/>
										{'SignIn'}
									</Link>
								</li>

								<li
									className={'nav-item'}>
									<Link
										to={'/SignUp'}
										className={'nav-link text-white'}>
										<FontAwesomeIcon
											icon={faUserPlus}
											className={'mr-2'}
										/>
										{'SignUp'}
									</Link>
								</li>
							</Fragment>
						: null}

					</ul>
					
					<ul
						className={'navbar-nav'}>
						{user ?
							<li>
								<div
									className={'btn-group'}>
									<button
										type={'button'}
										data-toggle={'dropdown'}
										className={'btn btn-primary dropdown-toggle no-after'}>
										<FontAwesomeIcon
											icon={faCog}
										/>
									</button>
									<div
										className={'dropdown-menu dropdown-menu-right p-0'}>
										<button
											onClick={this.props.signOut}
											type={'button'}
											className={'btn btn-default btn-block text-left'}>
											<FontAwesomeIcon
												icon={faSignOutAlt}
												className={'mr-2'}
											/>
											{'SignOut'}
										</button>
									</div>
								</div>
							</li>
						: null}
					</ul>
					
				</div>
			</nav>
		);
	};
};

export default connect(null, { signOut })(Header);