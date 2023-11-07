import moment from 'moment'

export const getDotTimelineColor = startTime => {
	const currentDate = new Date()
	const startDate = new Date(startTime)
	console.log(currentDate, '     ', startDate)
	if (moment(new Date(startTime)).format('l') == moment(new Date()).format('l')) {
		return 'success'
	} else if (currentDate < startDate) {
		return 'warning'
	} else return 'secondary'
}
