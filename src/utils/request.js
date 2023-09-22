const root = 'http://localhost:8080/'

async function post(link, json, contentType = 'application/x-www-form-urlencoded; charset=UTF-8') {
	if (!(link.startsWith`https://` || link.startsWith`http://`)) {
		if (link.startsWith`/`) link = link.substr(1)
		link = root + link
	}
	const formData = new URLSearchParams()
	for (const key in json) {
		formData.append(key, json[key])
	}
	const response = await fetch(link, {
		method: 'POST',
		headers: {
			'Content-Type': contentType
		},
		body: formData
	})
	return response.json()
}

async function get(link, json, contentType = 'application/html; charset=UTF-8') {
	if (!(link.startsWith`https://` || link.startsWith`http://`)) {
		if (link.startsWith`/`) link = link.substr(1)
		link = root + link
	}
	function jsonToQueryString(json) {
		if (!json) return ''
		const params = new URLSearchParams()
		for (const key in json) {
			if (json.hasOwnProperty(key)) {
				params.append(key, json[key])
			}
		}
		return '?' + params.toString()
	}
	const response = await fetch(link + jsonToQueryString(json), {
		method: 'GET',
		headers: {
			'Content-Type': contentType
		}
	})
	return response.text()
}

export { post, get }
