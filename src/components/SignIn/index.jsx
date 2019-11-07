import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faPaperPlane } from '@fortawesome/fontawesome-free-solid';
import { CSSTransition } from 'react-transition-group';

import { change, submit, extract } from 'utils/form.js';
import { signIn } from 'store/user/actions.js';
import { ACTION_SIGN_IN } from 'store/user/index.js';
import { TIMEOUT } from 'configs/transition.js';

import Button from 'components/common/Button.jsx';
import Input from 'components/common/Input.jsx';
import Busy from 'components/common/Busy.jsx';

const SIGN_IN_FORM_KEY = 'oForm';

class SignIn extends Component {
	state = {
		[SIGN_IN_FORM_KEY]: {
			mobile: {
				Type: 'Input',
				type: 'number',
				value: '8889744426',
				required: true,
				Pattern: /^[0-9]{10,10}$/,
				PatternMessage: 'Mobile number not valid.',
				onChange: ({ target: {value} })=> {
					change.call(this, SIGN_IN_FORM_KEY, 'mobile', value);
				}
			},
			password: {
				Type: 'Input',
				type: 'password',
				value: 'suyash1!',
				required: true,
				MinLength: 4,
				MaxLength: 40,
				onChange: ({ target: {value} })=> {
					change.call(this, SIGN_IN_FORM_KEY, 'password', value);
				}
			}
		}
	};
	/**
	 * handling signin form submit;
	 */
	onSubmit = (e)=> {
		e.preventDefault();
		submit.call(this, SIGN_IN_FORM_KEY)
		.then(()=> {
			this.props.signIn(
				extract.call(this, SIGN_IN_FORM_KEY, ['mobile', 'password'])
			);
		}, ()=> {
			toast.error(`Please validate.`);
		});
	};
	render() {
		let { state, onSubmit } = this,
			{ [SIGN_IN_FORM_KEY]: signInForm } = state;
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
						type={ACTION_SIGN_IN}
						className={'col-md-4 offset-md-4 mt-5'}>
						<div
							className={'card shadow'}>
							<div
								className={'card-body'}>
								<h4
									className={'card-title text-primary mb-0 text-shadow'}>
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
											{...signInForm.mobile}
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
											{...signInForm.password}
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

								</form>
							</div>
						</div>
						<Link
							className={'d-block w-100 my-3 text-center text-shadow'}
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

export {
	SIGN_IN_FORM_KEY
};