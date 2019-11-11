import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faPaperPlane, faEye, faEyeSlash } from '@fortawesome/fontawesome-free-solid';
import { CSSTransition } from 'react-transition-group';

import { change, submit, extract } from 'utils/form.js';
import { signUp } from 'store/user/actions.js';
import { TIMEOUT } from 'configs/transition.js';

import Button from 'components/common/Button.jsx';
import Input from 'components/common/Input.jsx';
import Busy from 'components/common/Busy.jsx';

const SIGN_UP_FORM_KEY = 'oForm';

class SignUp extends Component {
	state = {
		[SIGN_UP_FORM_KEY]: {
			fname: {
				Type: 'Input',
				type: 'text',
				value: 'Suyash',
				required: true,
				NoSpace: true,
				NoSpecialCharacter: true,
				MinLength: 2,
				MaxLength: 20,
				onChange: ({ target: {value} })=> {
					change.call(this, SIGN_UP_FORM_KEY, 'fname', value);
				}
			},
			lname: {
				Type: 'Input',
				type: 'text',
				value: 'Kale',
				NoSpace: true,
				NoSpecialCharacter: true,
				MinLength: 2,
				MaxLength: 20,
				onChange: ({ target: {value} })=> {
					change(SIGN_UP_FORM_KEY, 'lname', value);
				}
			},
			mobile: {
				Type: 'Input',
				type: 'number',
				value: '8889644426',
				required: true,
				Pattern: /^[0-9]{10,10}$/,
				PatternMessage: 'Mobile number not valid.',
				onChange: ({ target: {value} })=> {
					change.call(this, SIGN_UP_FORM_KEY, 'mobile', value);
				}
			},
			email: {
				Type: 'Input',
				type: 'email',
				value: 'master.suyashkale@gmail.com',
				onChange: ({ target: {value} })=> {
					change.call(this, SIGN_UP_FORM_KEY, 'email', value);
				}
			},
			password: {
				Type: 'Input',
				type: 'password',
				value: '',
				required: true,
				MinLength: 4,
				MaxLength: 40,
				onChange: ({ target: {value} })=> {
					change.call(this, SIGN_UP_FORM_KEY, 'password', value);
				}
			},
			cPassword: {
				Type: 'Input',
				type: 'password',
				value: '',
				required: true,
				CustomPromise: ({ value })=> {
					return new Promise((resolve, reject)=> {
						let { password } = this.state[SIGN_UP_FORM_KEY];
						if (value === password.value) {
							resolve();
						} else {
							reject('Password not matching.');
						}
					});
				},
				onChange: ({ target: {value} })=> {
					change.call(this, SIGN_UP_FORM_KEY, 'cPassword', value);
				}
			}
		}
	};

	/**
	 * handling signin form submit;
	 */
	onSubmit = (e)=> {
		e.preventDefault();
		submit.call(this, SIGN_UP_FORM_KEY)
		.then(()=> {
			this.props.signUp(extract.call(this, SIGN_UP_FORM_KEY, ['fname', 'lname', 'mobile', 'email', 'password']))
		}, ()=> {
			toast.error(`Please validate.`);
		});
	};

	/**
	 * handling password's input type change;
	 */
	onChangePasswordType = ()=> {
		let oForm = $.extend(true, {}, this.state[SIGN_UP_FORM_KEY]);
		oForm.cPassword.type = oForm.password.type = oForm.password.type === 'password' ? 'text' : 'password';
		this.setState({[SIGN_UP_FORM_KEY]: oForm});
	};

	render() {
		let { state, onSubmit, onChangePasswordType } = this,
			{ [SIGN_UP_FORM_KEY]: signUpForm } = state;
		return(
			<div
				className={'row'}>
				<CSSTransition
					classNames={'transition-scale'}
					in={true}
					appear={true}
					mountOnEnter={true}
					timeout={TIMEOUT}>
					<Busy
						type={'USER_SIGNUP'}
						className={'col-md-4 offset-md-4'}>
						<div
							className={'card shadow'}>
							<div
								className={'card-body'}>
								<h4
									className={'card-title text-primary mb-0 text-shadow'}>
									<FontAwesomeIcon
										icon={faUserPlus}
										className={'mr-2'}
									/>
									{'SignUp'}
								</h4>
								<small
									className={'text-muted mb-0'}>
									{'We promise not to share/ span your contact.'}
								</small>

								<form
									onSubmit={onSubmit}
									noValidate
									className={'mt-2 pt-3 border-top'}>

									<div
										className={'form-row'}>
										<Input
											{...signUpForm.fname}
											InputWrapperClassName={'form-group col-md-6 pr-2'}
											placeholder={'First Name'}
											className={'form-control'}
										/>
										<Input
											{...signUpForm.lname}
											InputWrapperClassName={'form-group col-md-6 pl-2'}
											placeholder={'Last Name'}
											className={'form-control'}
										/>
									</div>

									<div
										className={'form-group'}>
										<Input
											{...signUpForm.email}
											placeholder={'Email Address'}
											className={'form-control'}
											ErrorProps={{style: {left: '-5px'}}}
										/>
									</div>

									<div
										className={'form-group input-group'}>
										<div
											className={'input-group-prepend'}>
											<div
												className={'input-group-text'}>
												{'+91'}
											</div>
										</div>
										<Input
											{...signUpForm.mobile}
											placeholder={'Mobile Number'}
											className={'form-control'}
											InputWrapperClassName={''}
											InputWrapperProps={{
												style: { flex: '1 1 auto' }
											}}
											ErrorProps={{style: {left: '-5px'}}}
										/>
									</div>

									<div
										className={'form-group'}>
										<Input
											{...signUpForm.password}
											placeholder={'Password'}
											className={'form-control'}
											ErrorProps={{style: {left: '-5px'}}}
											PostRender={<FontAwesomeIcon icon={signUpForm.password.type === 'password' ? faEye : faEyeSlash} className={'input-icon cursor-pointer text-muted'} onClick={onChangePasswordType} />}
										/>
									</div>


									{signUpForm.password.value.length && !signUpForm.password.Error ?
										<div
											className={'form-group'}>
											<Input
												{...signUpForm.cPassword}
												placeholder={'Confirm Password'}
												className={'form-control'}
												ErrorProps={{style: {left: '-5px'}}}
											/>
										</div>
									: null}

									<Button
										className={'btn btn-primary'}
										type={'submit'}
										ButtonIcon={faPaperPlane}
										type={'USER_SIGNUP'}>
										{'Join In!'}
									</Button>

								</form>
							</div>
						</div>
						<Link
							className={'d-block w-100 my-3 text-center text-shadow'}
							to={'/SignIn'}>
							{'Already have an Account? Sign in here!'}
						</Link>
					</Busy>
				</CSSTransition>
			</div>
		);
	};
};

export default connect(null, {
	signUp
})(SignUp);