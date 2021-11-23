import React, {useContext} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext.js'

const Navbar = () => {
	const navigate = useNavigate()
	const auth = useContext(AuthContext)

	const logoutHandler = (e) => {
		e.preventDefault()
		auth.logout()
		navigate('/')
	}

	return (
		<nav>
			<div className="nav-wrapper deep-purple darken-4" style={{padding: "0 2rem"}}>
				<span className="brand-logo">Url shortener</span>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li>
						<NavLink to="/create">Create</NavLink>
					</li>
					<li>
						<NavLink to="/links">Links</NavLink>
					</li>
					<li>
						<a href="/" onClick={logoutHandler}>Logout</a>
					</li>
				</ul>
			</div>
	 	</nav>
	)
}

export default Navbar
