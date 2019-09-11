import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return(
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
		);
	};
};

export default Footer;