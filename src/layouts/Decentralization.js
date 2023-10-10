import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { createContext } from 'react'
import { useCookies } from 'react-cookie'
import Error404 from 'src/pages/404'
import { getUserInfo, getUserSubrole } from 'src/utils/info'

export const RoleContext = createContext({})

function return404Error(router) {
	if (router.isFallback) router.fallback(404)
}

function Decentralization(props) {
	const [cookies] = useCookies(['userData', 'clubData'])
	const router = useRouter()

	const [userData, setUserData] = useState()
	const [userSubrole, setUserSubrole] = useState()
	var contextValue = {}

	useEffect(() => {
		;(async () => {
			const res = await getUserInfo(cookies.userData)

			setUserData(res)
		})()
	}, [cookies])

	useEffect(() => {
		if (cookies['clubData'])
			(async () => {
				const res = await getUserSubrole(cookies.userData, cookies.clubData.clubId)
				setUserSubrole(res)
			})()
	}, [cookies, userData])

	if (!userData || userData.isAdmin == undefined) {
		contextValue = { ...contextValue, systemRole: -1 }
	} else if (userData.isAdmin == false) {
		contextValue = { ...contextValue, systemRole: 0, clubRole: userSubrole.roleId }
	} else if (userData.isAdmin == true) {
		contextValue = { ...contextValue, systemRole: 1 }
	}

	// if (userData) {
	// 	if (
	// 		(props.forGuest && userData.isAdmin == undefined) ||
	// 		(props.forUser && userData.isAdmin == false && props.forUser == userSubrole?.roleId) ||
	// 		(props.forAdmin && userData.isAdmin == true) ||
	// 		props.forAll
	// 	)
	// 		return <React.Fragment>{props.children}</React.Fragment>
	// } else if (userData == undefined) return <></>

	// return404Error(router)

	// return <Error404 />

	return <RoleContext.Provider value={contextValue}>{props.children}</RoleContext.Provider>
}

export default Decentralization
