export const registerToEvent = async data => {
	fetch('http://localhost:8080/event-registration', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		}
	})
		.then(function (response) {
			return response.json()
		})
		.then(function (data) {
			console.log(data)
		})
		.catch(error => {
			console.error('Error:', error)
		})
}
