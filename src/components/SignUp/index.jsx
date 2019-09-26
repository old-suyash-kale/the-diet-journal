import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faPaperPlane } from '@fortawesome/fontawesome-free-solid';

import Button from 'components/Common/Button.jsx';
import Input from 'components/Common/Input.jsx';
import Busy from 'components/Common/Busy.jsx';

import { change, submit, extract } from 'utils/Form.js';
import { signUp } from 'actions/user/index.js';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.change = change.bind(this);
		this.state = {
			oForm: {
				fname: {
					Type: 'Input',
					type: 'text',
					value: 'Suyash',
					required: true,
					NoSpace: true,
					NoSpecialCharacter: true,
					MinLength: 2,
					MaxLength: 20,
					onChange: ({ target })=> {
						this.change('oForm', 'fname', target.value);
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
					onChange: ({ target })=> {
						this.change('oForm', 'lname', target.value);
					}
				},
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
				email: {
					Type: 'Input',
					type: 'email',
					value: 'master.suyashkale@gmail.com',
					onChange: ({ target })=> {
						this.change('oForm', 'email', target.value);
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
				cPassword: {
					Type: 'Input',
					type: 'password',
					value: 'suyash',
					required: true,
					CustomPromise: ({ value })=> {
						return new Promise((resolve, reject)=> {
							let { password } = this.state.oForm;
							if (value === password.value) {
								resolve();
							} else {
								reject('Password not matching.');
							}
						});
					},
					onChange: ({ target })=> {
						this.change('oForm', 'cPassword', target.value);
					}
				}
			}
		};
	};
	onSubmit = (e)=> {
		e.preventDefault();
		submit.call(this, 'oForm')
		.then(()=> {
			this.props.signUp(extract.call(this, 'oForm', ['fname', 'lname', 'mobile', 'email', 'password']))
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
				<Busy
					blur={false}
					className={'col-md-4 offset-md-4'}>
					<div
						className={'card shadow'}>
						<div
							className={'card-body'}>
							<h4
								className={'card-title text-primary mb-0'}>
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
										{...oForm.fname}
										InputWrapper={'form-group col-md-6'}
										placeholder={'First Name'}
										className={'form-control'}
									/>
									<Input
										{...oForm.lname}
										InputWrapper={'form-group col-md-6'}
										placeholder={'Last Name'}
										className={'form-control'}
									/>
								</div>

								<Input
									{...oForm.email}
									placeholder={'Email Address'}
									className={'form-control'}
									ErrorProps={{style: {left: '-5px'}}}
								/>

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


								{oForm.password.value.length > oForm.password.MinLength ?
									<div
										className={'form-group'}>
										<Input
											{...oForm.cPassword}
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
									Busy={false}>
									{'Join In!'}
								</Button>

							</form>
						</div>
					</div>
					<Link
						className={'d-block w-100 my-3 text-center'}
						to={'/SignIn'}>
						{'Already have an Account? Sign in here!'}
					</Link>
				</Busy>
			</div>
		);
	};
};

export default connect(null, {
	signUp
})(SignUp);