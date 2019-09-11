import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import { oFormChange } from 'utils/';
import { change } from 'utils/Form';

import Button from 'components/Common/Button';
import Input from 'components/Common/Input';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.change = change.bind(this);
		this.state = {
			oForm: {
				fname: {
					Type: 'Input',
					value: '',
					required: true,
					NoSpace: true,
					NoSpecialCharacter: true,
					onChange: ({ target })=> {
						this.change('oForm', 'fname', target.value);
					}
				},
				lname: {
					Type: 'Input',
					value: '',
					NoSpace: true,
					NoSpecialCharacter: true,
					onChange: ({ target })=> {
						this.change('oForm', 'lname', target.value);
					}
				},
				mobile: {
					Type: 'Input',
					value: '',
					required: true,
					onChange: ({ target })=> {
						this.change('oForm', 'mobile', target.value);
					}
				},
				email: {
					Type: 'Input',
					value: '',
					onChange: ({ target })=> {
						this.change('oForm', 'email', target.value);
					}
				},
				password: {
					Type: 'Input',
					value: '',
					required: true,
					onChange: ({ target })=> {
						this.change('oForm', 'password', target.value);
					}
				},
				cPassword: {
					Type: 'Input',
					value: '',
					required: true,
					onChange: ({ target })=> {
						this.change('oForm', 'cPassword', target.value);
					}
				}
			}
		};
	};
	render() {
		let { oForm } = this.state;
		return(
			<div
				className={'row'}>
				<div
					className={'col-md-4 offset-md-4'}>
					<div
						className={'card shadow'}>
						<div
							className={'card-body'}>
							<h4
								className={'card-title mb-0'}>
								{'SignUp'}
							</h4>
							<small
								className={'text-muted mb-0'}>
								{'We promise not to share/ span your contact.'}
							</small>
							<form
								className={'mt-2 pt-3 border-top'}>

								<div
									className={'form-row'}>
									<Input
										{...oForm.fname}
										InputWrapper={'form-group col-md-6'}
										placeholder={'First Name'}
										className={'form-control'}
										type={'text'}
									/>
									<Input
										{...oForm.lname}
										InputWrapper={'form-group col-md-6'}
										placeholder={'Last Name'}
										className={'form-control'}
										type={'text'}
									/>
								</div>

								<Input
									{...oForm.email}
									placeholder={'Email Address'}
									className={'form-control'}
									type={'email'}
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
										type={'number'}
										InputWrapper={''}
										InputWrapperProps={{
											style: { flex: '1 1 auto' }
										}}
									/>
								</div>

								<div
									className={'form-group'}>
									<Input
										{...oForm.password}
										placeholder={'Password'}
										className={'form-control'}
										type={'password'}
									/>
								</div>

								<div
									className={'form-group'}>
									<Input
										{...oForm.cPassword}
										placeholder={'Confirm Password'}
										className={'form-control'}
										type={'password'}
									/>
								</div>

								<Button
									className={'btn btn-primary'}
									type={'submit'}>
									{'Join In'}
								</Button>

							</form>
						</div>
					</div>
					<Link
						className={'d-block w-100 my-3 text-center'}
						to={'/SignIn'}>
						{'Already have an Account? Sign in here!'}
					</Link>
				</div>
			</div>
		);
	};
};

export default SignUp;