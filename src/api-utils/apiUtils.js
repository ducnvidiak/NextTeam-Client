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
			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const getListOfAllUser = async cludId => {
	const json = await axios
		.get('http://localhost:8080/api/userlist?type=list&clubId=' + cludId)
		.then(response => {
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
		.put('http://localhost:8080/api/proposal?type=content&id=' + id, formData, config)
		.then(response => {
			return response.data
		})
		.catch(error => {})

	return json
}

const getProposalByPropId = async id => {
	const json = await axios
		.get('http://localhost:8080/api/proposal?type=byProposalId&id=' + id)
		.then(response => {
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
			response.data

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
			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

// ---------- plan -----------

const createPlan = async (formData, id) => {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data; charset=utf-8'
		}
	}

	const json = await axios
		.post('http://localhost:8080/api/plans?id=' + id, formData, config)
		.then(response => {
			return response.data
		})
		.catch(error => {})

	return json
}

const updatePlan = async (formData, id) => {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data; charset=utf-8'
		}
	}

	const json = await axios
		.put('http://localhost:8080/api/plans?type=content&id=' + id, formData, config)
		.then(response => {
			console.log('response from api: ', response)

			return response.data
		})
		.catch(error => {})

	return json
}

const updatePlanStatus = async (id, status, feedback) => {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data; charset=utf-8'
		}
	}
	const formData = new FormData()
	formData.append('feedback', feedback)

	const json = await axios
		.put('http://localhost:8080/api/plans?type=changeStatus&id=' + id + '&status=' + status, formData, config)
		.then(response => {
			console.log('response from api: ', response)

			return response.data
		})
		.catch(error => {})

	return json
}

const updateEventStatus = async (id, status, feedback) => {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data; charset=utf-8'
		}
	}

	const formData = new FormData()
	formData.append('feedback', feedback)

	const json = await axios
		.put('http://localhost:8080/admin-events?id=' + id + '&status=' + status, formData, config)
		.then(response => {
			return response.data
		})
		.catch(error => {})

	return json
}

const getPlanByPlanId = async id => {
	const json = await axios
		.get('http://localhost:8080/api/plans?type=byPlanId&id=' + id)
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const getPlansByClubId = async id => {
	const json = await axios
		.get('http://localhost:8080/api/plans?type=byClubId&id=' + id)
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const deletePlanById = async id => {
	const json = await axios
		.delete('http://localhost:8080/api/plans?id=' + id)
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const getPlanFilesByPlanId = async id => {
	const json = await axios
		.get('http://localhost:8080/api/plan_files?type=one&id=' + id)
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const getAllPlanFilesByClubId = async id => {
	const json = await axios
		.get('http://localhost:8080/api/plan_files?type=many&id=' + id)
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const getAllEvents = async () => {
	const json = await axios
		.get('http://localhost:8080/review-event-servlet?cmd=list')
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const getAllProposalByClubId = async id => {
	const json = await axios
		.get('http://localhost:8080/api/proposal?type=byClubId&id=' + id)
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const getAllProposalFilesByClubId = async id => {
	const json = await axios
		.get('http://localhost:8080/api/proposal_files?type=much&id=' + id)
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const updateProposalStatus = async (id, status) => {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data; charset=utf-8'
		}
	}

	const json = await axios
		.put('http://localhost:8080/api/proposal?type=status&id=' + id + '&status=' + status, config)
		.then(response => {
			return response.data
		})
		.catch(error => {})

	return json
}

const getListOfAllUserForManage = async id => {
	const json = await axios
		.get('http://localhost:8080/api/userlist?type=managelist&clubId=' + id)
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const getDepartmentByClubId = async id => {
	const json = await axios
		.get(`${process.env.NEXT_PUBLIC_API_URL}/department?action=list-dept&clubId=${id}`)
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.log('Error: ', error)

			return null
		})

	return json
}

const changeDepartment = async (memberId, departmentId, clubId) => {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data; charset=utf-8'
		}
	}

	const json = await axios
		.put(
			'http://localhost:8080/department?clubId=' + clubId + '&depId=' + departmentId + '&userId=' + memberId,
			config
		)
		.then(response => {
			return response.data
		})
		.catch(error => {})

	return json
}

const changeMemberStatus = async (memberId, clubId, status) => {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data; charset=utf-8'
		}
	}

	const json = await axios
		.put('http://localhost:8080/engagement?clubId=' + clubId + '&status=' + status + '&userId=' + memberId, config)
		.then(response => {
			return response.data
		})
		.catch(error => {})

	return json
}

const getAllPlansForAdmin = async () => {
	const json = await axios
		.get('http://localhost:8080/api/plans?type=all')
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

const getAllPlanFiles = async () => {
	const json = await axios
		.get('http://localhost:8080/api/plan_files?type=all')
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
	getAllProposalFilesByUserId,
	createPlan,
	updatePlan,
	getPlanByPlanId,
	getPlansByClubId,
	deletePlanById,
	getPlanFilesByPlanId,
	getAllPlanFilesByClubId,
	updatePlanStatus,
	getAllEvents,
	updateEventStatus,
	getAllProposalByClubId,
	getAllProposalFilesByClubId,
	updateProposalStatus,
	getListOfAllUserForManage,
	getDepartmentByClubId,
	changeDepartment,
	changeMemberStatus,
	getAllPlansForAdmin,
	getAllPlanFiles
}
