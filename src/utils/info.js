const { useCookies } = require('react-cookie')
const { postAPI } = require('./request')

async function getUserInfo(data) {
	const res = await postAPI('/info-utils', { cmd: 'user', data: data })
	if (!res || !res.id) return {}

	return res
}

export { getUserInfo }
