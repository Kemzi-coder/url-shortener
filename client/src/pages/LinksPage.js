import React, {useCallback, useContext, useEffect, useState} from 'react'
import useHttp from '../hooks/http.hook'
import AuthContext from '../context/AuthContext'
import Loader from '../components/Loader'
import LinksList from '../components/LinksList'

const LinksPage = () => {
	const {token} = useContext(AuthContext)
	const [links, setLinks] = useState([])
	const {request, loading} = useHttp()

	const fetchLinks = useCallback(async () => {
		try {
			const fetched = await request('/api/link', 'GET', null, {
				Authorization: `Bearer ${token}`
			})
			setLinks(fetched)
		} catch (e) {}
	}, [token, request])

	useEffect(() => {
		fetchLinks()
	}, [fetchLinks])

	if (loading) {
		return <Loader />
	}

	return (
		<div>
			{!loading && <LinksList links={links} />}
		</div>
	)
}

export default LinksPage
