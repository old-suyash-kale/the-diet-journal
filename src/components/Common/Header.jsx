import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faCog, faSignOutAlt } from '@fortawesome/fontawesome-free-solid';

class Header extends Component {
	render() {
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

					</ul>
					
					<ul
						className={'navbar-nav'}>
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
					</ul>
					
				</div>
			</nav>
		);
	};
};

export default Header;