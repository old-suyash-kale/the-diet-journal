import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/fontawesome-free-solid';

import { removeAdditionalProps } from 'utils/';

class Button extends Component {
	render() {
		let { props } = this,
			{ children, Busy, ButtonIcon } = props,
			ButtonProps = removeAdditionalProps(props, oPropTypes);
		if (Busy) {
			ButtonProps.disabled = true;
		}
		return(
			<button
				{...ButtonProps}>
				{ButtonIcon && !Busy &&
					<FontAwesomeIcon
						icon={ButtonIcon}
						className={'mr-2'}
					/>
				}
				{Busy &&
					<FontAwesomeIcon
						icon={faSync}
						className={'mr-2'}
						spin={true}
					/>
				}
				{children}
			</button>
		);
	};
};


const oPropTypes = {
	ButtonIcon: PropTypes.any,
	Busy: PropTypes.bool
}

Button.propTypes = oPropTypes;

Button.defaultProps = {
	ButtonIcon: false,
	Busy: false
};


export default Button;