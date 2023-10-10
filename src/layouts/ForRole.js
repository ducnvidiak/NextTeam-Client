import { useContext } from 'react'
import { RoleContext } from './Decentralization'
import { useRouter } from 'next/router'
import Error404 from 'src/pages/404'

function return404Error(router) {
	if (router.isFallback) router.fallback(404)
}

function ForRole(props) {
	const roleContext = useContext(RoleContext)
	const router = useRouter()

	if (
		(props.guest && roleContext.systemRole == -1) ||
		(props.user && roleContext.systemRole == 0 && props.user == roleContext?.clubRole) ||
		(props.admin && userData.isAdmin == true) ||
		props.all
	)
		return props.children
	return404Error(router)

	return <Error404 />
}

export default ForRole
