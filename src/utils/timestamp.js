function reformatTimestamp(timestamp) {
	const date = new Date(timestamp)

	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	const seconds = String(date.getSeconds()).padStart(2, '0')

	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const year = date.getFullYear()

	return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`
}

function spaceTimestamp(startTime, endTime) {
	const start = new Date(startTime)
	const end = new Date(endTime)

	const now = Date.now()

	if (start <= now && now <= end) return 0
	if (start > now) return -1
	else return 1
}

export { reformatTimestamp, spaceTimestamp }
