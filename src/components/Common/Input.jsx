import React, { Component } from 'react';
import PropTypes from 'prop-types';

import removeAdditionalProps from 'utils/removeAdditionalProps.js';
import anythingToArray from 'utils/anythingToArray.js';

class Input extends Component {
	render() {
		let { props } = this,
			{ Busy, InputWrapperClassName, InputWrapperProps, Error, ErrorProps, PreRender, PostRender } = props,
			InputProps = removeAdditionalProps(props, oPropTypes);
		if (Busy) {
			InputProps.disabled = true;
		}
		InputWrapperClassName = [InputWrapperClassName];
		InputWrapperClassName.push('position-relative');
		if (Error) {
			InputProps.className = [...anythingToArray(InputProps.className), 'border-danger'].join(' ');
		}
		ErrorProps.className = [...anythingToArray(ErrorProps.className), 'input-message'].join(' ');
		InputWrapperClassName = InputWrapperClassName.filter((c)=> { return c; }).join(' ');
		return(
			<div
				className={InputWrapperClassName}
				{...InputWrapperProps}>
				{PreRender}
				<input
					{...InputProps}
				/>
				{PostRender}
				{Error &&
					<div {...ErrorProps}>{Error}</div>
				}
			</div>
		);
	};
};


const oPropTypes = {
	Busy: PropTypes.bool,
	InputWrapperClassName: PropTypes.string,
	InputWrapperProps: PropTypes.object,
	Error: PropTypes.any,
	ErrorProps: PropTypes.object,
	PreRender: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.node]),
	PostRender: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.node]),
	Type: PropTypes.string,
	Required: PropTypes.bool,
	RequiredMessage: PropTypes.string,
	NumberMessage: PropTypes.string,
	EmailMessage: PropTypes.string,
	NoSpace: PropTypes.bool,
	NoSpaceMessage: PropTypes.string,
	NoSpecialCharacter: PropTypes.bool,
	NoSpecialCharacterMessage: PropTypes.string,

	Min: PropTypes.number,
	MinMessage: PropTypes.string,
	Max: PropTypes.number,
	MaxMessage: PropTypes.string,
	MinLength: PropTypes.number,
	MinLengthMessage: PropTypes.string,
	MaxLength: PropTypes.number,
	MaxLengthMessage: PropTypes.string,
	Pattern: PropTypes.any,
	PatternMessage: PropTypes.string,
	CustomPromise: PropTypes.func

};

Input.propTypes = oPropTypes;

Input.defaultProps = {
	InputWrapperProps: {},
	Busy: false,
	InputWrapperClassName: 'form-group',
	className: 'form-control',
	ErrorProps: {},
	PreRender: null,
	PostRender: null,
	Type: 'Input',
	Required: false,
	NoSpace: false,
	NoSpecialCharacter: false
};

export default Input;