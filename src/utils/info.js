const { useCookies } = require('react-cookie')
const { postAPI } = require('./request')

async function getUserInfo(data) {
	if (!data) return {}

	const res = await postAPI('/info-utils', { cmd: 'user', data: data })
	if (!res || !res.id) return {}

	return res
}

async function getUserSubrole(data, clubId) {
	if (!clubId || !data) return

	const res = await postAPI('/info-utils', { cmd: 'user.role', data, clubId })
	if (!res || res.roleId < 0) return {}

	return res
}

async function getUserPoints(userId, clubId) {
	if (!userId || !clubId) return 0

	const res = await postAPI('/info-utils', { cmd: 'user.points', userId, clubId })
	if (!res || res.code < 0) return 0

	return res.result
}

async function getUserPointsHistory(userId, clubId) {
	if (!userId || !clubId) return 0

	const res = await postAPI('/info-utils', { cmd: 'user.points.history', userId, clubId })
	if (!res || res.code < 0) return 0

	return res.result
}

export { getUserInfo, getUserSubrole, getUserPoints, getUserPointsHistory }
