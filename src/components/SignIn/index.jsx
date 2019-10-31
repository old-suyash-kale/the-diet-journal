import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faPaperPlane } from '@fortawesome/fontawesome-free-solid';
import { CSSTransition } from 'react-transition-group';

import Button from 'components/Common/Button.jsx';
import Input from 'components/Common/Input.jsx';
import Busy from 'components/Common/Busy.jsx';

import { change, submit, extract } from 'utils/Form.js';
import { signIn } from 'actions/user/index.js';

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.change = change.bind(this);
		this.state = {
			oForm: {
				mobile: {
					Type: 'Input',
					type: 'number',
					value: '8889644426',
					required: true,
					Pattern: /^[0-9]{10,10}$/,
					PatternMessage: 'Mobile number not valid.',
					onChange: ({ target })=> {
						this.change('oForm', 'mobile', target.value);
					}
				},
				password: {
					Type: 'Input',
					type: 'password',
					value: 'suyash',
					required: true,
					MinLength: 4,
					MaxLength: 40,
					onChange: ({ target })=> {
						this.change('oForm', 'password', target.value);
					}
				},
				remember: true
			}
		};
	};
	onSubmit = (e)=> {
		e.preventDefault();
		submit.call(this, 'oForm')
		.then(()=> {
			this.props.signIn(extract.call(this, 'oForm', ['mobile', 'password']));
		}, ()=> {
			toast.error(`Please validate.`);
		});
	};
	render() {
		let { state, onSubmit } = this,
			{ oForm } = state;
		return(
			<div
				className={'row'}>
				<CSSTransition
					classNames={'transition-scale'}
					in={true}
					appear={true}
					mountOnEnter={true}
					timeout={{
						appear: 200,
						enter: 400
					}}>
					<Busy
						type={'USER_SIGNIN'}
						className={'col-md-4 offset-md-4 mt-5'}>
						<div
							className={'card shadow'}>
							<div
								className={'card-body'}>
								<h4
									className={'card-title text-primary mb-0'}>
									<FontAwesomeIcon
										icon={faSignInAlt}
										className={'mr-2'}
									/>
									{'SignIn'}
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
										className={'form-group input-group'}>
										<div
											className={'input-group-prepend'}>
											<div
												className={'input-group-text'}>
												{'+91'}
											</div>
										</div>
										<Input
											{...oForm.mobile}
											placeholder={'Mobile Number'}
											className={'form-control'}
											InputWrapper={''}
											InputWrapperProps={{
												style: { flex: '1 1 auto' }
											}}
											ErrorProps={{style: {left: '-5px'}}}
										/>
									</div>

									<div
										className={'form-group'}>
										<Input
											{...oForm.password}
											placeholder={'Password'}
											className={'form-control'}
											ErrorProps={{style: {left: '-5px'}}}
										/>
									</div>

									<Button
										className={'btn btn-primary'}
										Type={'USER_SIGNIN'}
										type={'submit'}
										ButtonIcon={faPaperPlane}>
										{'Get In!'}
									</Button>

									<span
										className={'form-check d-inline-block ml-3'}>
										<input
											checked={oForm.remember}
											onChange={e=> {
												let oForm = $.extend(true, {}, this.state.oForm);;
												oForm.remember = !oForm.remember; 
												this.setState({ oForm });
											}}
											className={'form-check-input'}
											type={'checkbox'}
										/>
										<small
											className={'form-check-label'}
											htmlFor="input-remember-me">
											{'Remember me'}
										</small>
									</span>

								</form>
							</div>
						</div>
						<Link
							className={'d-block w-100 my-3 text-center'}
							to={'/SignUp'}>
							{`Don't have an Account yet? Join in here!`}
						</Link>
					</Busy>
				</CSSTransition>
			</div>
		);
	};
};

export default connect(null, {
	signIn
})(SignIn);