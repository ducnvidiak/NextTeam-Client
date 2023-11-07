import axios from 'axios'

export const updateUserAvatar = async (imgSrc, id) => {
	const formData = new FormData()
	if (imgSrc !== '') {
		formData.append('image', imgSrc.split(',')[1])

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}

		const json = await axios
			.put(process.env.NEXT_PUBLIC_API_URL + '/api/userAvatar?id=' + id, formData, config)
			.then(response => {
				return response.data
			})
			.catch(error => {
				console.error(error)

				return null
			})

		return json
	}
}

export const updateUserInfo = async objectData => {
	const data = JSON.stringify(objectData)

	const config = {
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	}

	const json = await axios
		.put(process.env.NEXT_PUBLIC_API_URL + '/api/user', data, config)
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.error(error)

			return null
		})

	return json
}

export const getUserInfo = async id => {
	const json = await axios
		.get(process.env.NEXT_PUBLIC_API_URL + '/api/user?id=' + id)
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

export const changeUserPass = async (authInfo, id) => {
	const data = JSON.stringify(authInfo)

	const config = {
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	}

	const json = await axios
		.put(process.env.NEXT_PUBLIC_API_URL + '/api/userAuth?id=' + id, data, config)
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

export const getAllMajors = async () => {
	const json = await axios
		.get(process.env.NEXT_PUBLIC_API_URL + '/api/allMajors')
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

export const getListOfAllUser = async () => {
	const json = await axios
		.get(process.env.NEXT_PUBLIC_API_URL + '/api/userlist')
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

// module.exports = { updateUserAvatar, updateUserInfo, getUserInfo, changeUserPass, getAllMajors, getListOfAllUser }
