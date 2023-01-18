import { useState } from 'react'

import Button from '../button/button.component'
import FormInput from '../form-input/form-input.component'

import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInAuthWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

import './sign-in-form.styles.scss'

const defaultLogin = {
	email: '',
	password: '',
}

const SignInForm = () => {
	const [login, setLogin] = useState(defaultLogin)
	const { email, password } = login

	const resetFormFields = () => {
		setLogin(defaultLogin)
	}

	const signInWithGoogle = async () => {
		await signInWithGooglePopup()
	}

	const handleChange = (event) => {
		const { name, value } = event.target
		setLogin({ ...login, [name]: value })
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const { user } = await signInAuthWithEmailAndPassword(
				email,
				password
			)

			resetFormFields()
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('Incorrect passoword for email')
					break
				case 'auth/user-not-found':
					alert('No user associated with this email')
					break
				default:
					console.log(error)
			}
		}
	}
	return (
		<div className='sign-in-container'>
			<h2>Already have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					type='text'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>
				<FormInput
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>

				<div className='buttons-container'>
					<Button type='submit'>Sign in</Button>

					<Button
						type='button'
						onClick={signInWithGoogle}
						buttonType={'google'}
					>
						Google sign in
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SignInForm
