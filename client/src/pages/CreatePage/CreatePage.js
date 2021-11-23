import React, {useContext, useEffect, useState} from 'react'
import useHttp from '../../hooks/http.hook'
import AuthContext from '../../context/AuthContext'
import {useNavigate} from 'react-router-dom'
import styles from './CreatePage.module.css'
import useMessage from '../../hooks/message.hook'

const CreatePage = () => {
	const navigate = useNavigate()
	const auth = useContext(AuthContext)
	const message = useMessage()
	const {request, error, clearError} = useHttp()
	const [link, setLink] = useState('')

	useEffect(() => {
		message(error)
		clearError()
	}, [error, message, clearError])

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	const generateLink = async () => {
		try {
			const data = await request('/api/link/generate', 'POST', {from: link}, {
				Authorization: `Bearer ${auth.token}`
			})
			navigate(`/detail/${data.link._id}`)
		} catch (e) {}
	}

	const pressHandler = e => {
		if (e.key === 'Enter') {
			generateLink()
		}
	}

	const clickHandler = async () => {
		generateLink()
	}

	return (
		<div className="row">
			<div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
				<div className="input-field">
					<input
						className={styles.input}
						placeholder="Paste the link"
						id="link"
						type="text"
						value={link}
						onChange={e => setLink(e.target.value)}
						onKeyPress={pressHandler}
					/>
					<label className={styles.label} htmlFor="link">Введите ссылку</label>
				</div>
				<button onClick={clickHandler} className="btn waves-effect waves-light deep-purple darken-4" type="submit" name="action">Shorten
				</button>
			</div>
		</div>
	)
}

export default CreatePage
