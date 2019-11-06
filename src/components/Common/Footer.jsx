import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

class Footer extends Component {
	render() {
		return(
			<CSSTransition
				classNames={'transition-footer'}
				in={true}
				appear={true}
				mountOnEnter={true}
				timeout={{
					appear: 0,
					enter: 100
				}}>
				<footer
					className={'container-fluid'}>
					<div
						className={'row'}>
						<div
							className={'col-md-6 p-2 pb-2'}>
							{`Copyright ${(new Date()).getFullYear()}. All Rights Reserved`}
						</div>
						<div
							className={'col-md-6 p-2 pb-2 text-right'}>
							{'Work in progress'}
							<span className={'mx-2'}>|</span>
							{'Please be awares of bugs'}
						</div>
					</div>
				</footer>
			</CSSTransition>
		);
	};
};

export default Footer;