import React, {useContext, useEffect, useState} from 'react'
import useHttp from '../hooks/http.hook'
import useMessage from '../hooks/message.hook'
import AuthContext from '../context/AuthContext'

const AuthPage = () => {
	const auth = useContext(AuthContext)
	const message = useMessage()
	const {loading, error, request, clearError} = useHttp()
	const [form, setForm] = useState({
		email: '',
		password: ''
	})

	useEffect(() => {
		message(error)
		clearError()
	}, [error, message, clearError])

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	const changeHandler = event => {
		setForm({...form, [event.target.name]: event.target.value})
	}

	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', {...form})
			message(data.message)
		} catch (e) {}
	}

	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', {...form})
			auth.login(data.token, data.userId)
		} catch (e) {}
	}

	return (
		<div className="row">
			<div className="col s6 offset-s3">
				<h1>Shorten the link</h1>

				<div className="card deep-purple darken-4">
					<div className="card-content white-text">
						<span className="card-title">Authorization</span>
						<div>
							<div className="input-field">
								<input
									className="yellow-input"
									placeholder="Enter email"
									id="email"
									type="text"
									name="email"
									onChange={changeHandler}
									value={form.email}
								/>
								<label htmlFor="email">Email</label>
							</div>

							<div className="input-field">
								<input
									className="yellow-input"
									placeholder="Enter password"
									id="password"
									type="password"
									name="password"
									onChange={changeHandler}
									value={form.password}
								/>
								<label htmlFor="password">Password</label>
							</div>
						</div>
					</div>
					<div className="card-action">
						<button
							className="btn deep-purple accent-1"
							style={{marginRight: 10}}
							disabled={loading}
							onClick={loginHandler}
						>Login</button>
						<button
							className="btn deep-purple accent-1"
							onClick={registerHandler}
							disabled={loading}
						>Signup</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AuthPage
