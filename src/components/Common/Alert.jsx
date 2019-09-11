import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/fontawesome-free-solid';

import { removeAdditionalProps } from 'utils/';

class Alert extends Component {
	render() {
		let { props } = this,
			{ children, Busy, AlertIcon, AlertTheme, Small } = props,
			AlertProps = removeAdditionalProps(props, oPropTypes);
		if (Busy) {
			AlertProps.disabled = true;
		}
		AlertProps.className = [AlertProps.className];
		if (AlertTheme) {
			AlertProps.className.push(`alert alert-${AlertTheme}`);
		}
		if (Small) {
			AlertProps.className.push('small py-1 px-2');
		}
		AlertProps.className = AlertProps.className.filter((c)=> { return c; }).join(' ');
		return(
			<div
				{...AlertProps}>
				{AlertIcon && !Busy &&
					<FontAwesomeIcon
						icon={AlertIcon}
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
			</div>
		);
	};
};


const oPropTypes = {
	Busy: PropTypes.bool,
	AlertIcon: PropTypes.any,
	AlertTheme: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'danger',
		'warning',
		'info',
		'light',
		'dark'
	]),
	Small: PropTypes.bool
};

Alert.propTypes = oPropTypes;

Alert.defaultProps = {
	Busy: false,
	AlertIcon: false,
	AlertTheme: 'primary',
	Small: false
};


export default Alert;