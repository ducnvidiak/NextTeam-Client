import axios from 'axios'

const updateUserAvatar = async (imgSrc, id) => {
	const formData = new FormData()
	if (imgSrc !== '') {
		formData.append('image', imgSrc.split(',')[1])

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}

		const json = await axios
			.put('http://localhost:8080/api/userAvatar?id=' + id, formData, config)
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

const updateUserInfo = async objectData => {
	console.log('data sending: ', objectData)
	const data = JSON.stringify(objectData)

	const config = {
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	}

	const json = await axios
		.put('http://localhost:8080/api/user', data, config)
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.error(error)

			return null
		})

	return json
}

const getUserInfo = async id => {
	const json = await axios
		.get('http://localhost:8080/api/user?id=' + id)
		.then(response => {
			console.log(response.data)

			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const changeUserPass = async (authInfo, id) => {
	const data = JSON.stringify(authInfo)
	console.log(authInfo)

	const config = {
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	}

	const json = await axios
		.put('http://localhost:8080/api/userAuth?id=' + id, data, config)
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const getAllMajors = async () => {
	const json = await axios
		.get('http://localhost:8080/api/allMajors')
		.then(response => {
			console.log(response.data)

			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const getListOfAllUser = async () => {
	const json = await axios
		.get('http://localhost:8080/api/userlist')
		.then(response => {
			console.log(response.data)

			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const createProposal = async (formData, id) => {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data; charset=utf-8'
		}
	}

	const json = await axios
		.post('http://localhost:8080/api/proposal?id=' + id, formData, config)
		.then(response => {
			console.log('response from api: ', response)

			return response.data
		})
		.catch(error => {})

	return json
}

const updateProposal = async (formData, id) => {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data; charset=utf-8'
		}
	}

	const json = await axios
		.put('http://localhost:8080/api/proposal?id=' + id, formData, config)
		.then(response => {
			console.log('response from api: ', response)

			return response.data
		})
		.catch(error => {})

	return json
}

const getProposalByPropId = async id => {
	const json = await axios
		.get('http://localhost:8080/api/proposal?type=byProposalId&id=' + id)
		.then(response => {
			console.log(response.data)

			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const getProposalsByUserId = async id => {
	const json = await axios
		.get('http://localhost:8080/api/proposal?type=byUserId&id=' + id)
		.then(response => {
			console.log(response.data)

			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const deleteProposalById = async id => {
	const json = await axios
		.delete('http://localhost:8080/api/proposal?id=' + id)
		.then(response => {
			console.log(response.data)

			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const getProposalFilesByPropId = async id => {
	const json = await axios
		.get('http://localhost:8080/api/proposal_files?type=one&id=' + id)
		.then(response => {
			console.log(response.data)

			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const getAllProposalFilesByUserId = async id => {
	const json = await axios
		.get('http://localhost:8080/api/proposal_files?type=many&id=' + id)
		.then(response => {
			console.log(response.data)

			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

module.exports = {
	updateUserAvatar,
	updateUserInfo,
	getUserInfo,
	changeUserPass,
	getAllMajors,
	getListOfAllUser,
	getProposalsByUserId,
	getProposalByPropId,
	deleteProposalById,
	createProposal,
	updateProposal,
	getProposalFilesByPropId,
	getAllProposalFilesByUserId
}
