import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { removeAdditionalProps, anythingToArray } from 'utils/';

class Input extends Component {
	render() {
		let { props } = this,
			{ Busy, InputWrapper, InputWrapperProps, Error, ErrorProps } = props,
			InputProps = removeAdditionalProps(props, oPropTypes);
		if (Busy) {
			InputProps.disabled = true;
		}
		InputWrapper = [InputWrapper];
		InputWrapper.push('position-relative');
		if (Error) {
			InputProps.className = [...anythingToArray(InputProps.className), 'border-danger'].join(' ');
		}
		InputWrapper = InputWrapper.filter((c)=> { return c; }).join(' ');
		return(
			<div
				className={InputWrapper}
				{...InputWrapperProps}>
				<input
					{...InputProps}
				/>
				{Error &&
					<div {...ErrorProps}>{Error}</div>
				}
			</div>
		);
	};
};


const oPropTypes = {
	Busy: PropTypes.bool,
	InputWrapper: PropTypes.string,
	InputWrapperProps: PropTypes.object,
	Error: PropTypes.any,
	ErrorProps: PropTypes.object,
	Type: PropTypes.string,
	Required: PropTypes.bool,
	RequiredMessage: PropTypes.string,
	NumberMessage: PropTypes.string,
	EmailMessage: PropTypes.string,
	NoSpace: PropTypes.bool,
	NoSpaceMessage: PropTypes.string,
	NoSpecialCharacter: PropTypes.bool,
	NoSpecialCharacterMessage: PropTypes.string
};

Input.propTypes = oPropTypes;

Input.defaultProps = {
	InputWrapperProps: {},
	Busy: false,
	InputWrapper: 'form-group',
	className: 'form-control',
	ErrorProps: {
		className: 'input-message'
	},
	Type: 'Input',
	Required: false,
	NoSpace: false,
	NoSpecialCharacter: false
};

export default Input;