import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import Error404 from 'src/pages/404'
import { getUserInfo } from 'src/utils/info'

function return404Error(router) {
	if (router.isFallback) router.fallback(404)
}

function Decentralization(props) {
	const [cookies] = useCookies(['userData'])
	const router = useRouter()

	const [userData, setUserData] = useState()

	useEffect(() => {
		;(async () => {
			const res = await getUserInfo(cookies.userData)

			setUserData(res)
		})()
	}, [cookies])
	if (userData) {
		if (
			(props.forGuest && userData.isAdmin == undefined) ||
			(props.forUser && userData.isAdmin == false) ||
			(props.forAdmin && userData.isAdmin == true) ||
			props.forAll
		)
			return <React.Fragment>{props.children}</React.Fragment>
	} else if (userData == undefined) return <></>

	return404Error(router)

	return <Error404 />
}

export default Decentralization
