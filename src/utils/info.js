const { useCookies } = require('react-cookie')
const { postAPI } = require('./request')

async function getUserInfo(data) {
	const res = await postAPI('/info-utils', { cmd: 'user', data: data })
	if (!res || !res.id) return {}

	return res
}

async function getUserSubrole(data, clubId) {
	if (!clubId) return

	const res = await postAPI('/info-utils', { cmd: 'user.role', data, clubId })
	if (!res || res.roleId < 0) return {}

	return res
}

export { getUserInfo, getUserSubrole }
