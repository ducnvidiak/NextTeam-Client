const { TumbleDryer } = require('mdi-material-ui')

const validateName = name => {
	var nameRegex = /^[\p{L}\p{M}\s,'-]{2,}$/u

	return nameRegex.test(name)
}

const validateEmail = email => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)
}

const validatePassword = password => {
	//At least 1 lowercase, 1 uppercase, 1 number, 1 special character, >=8 in total
	var strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*/.])(?=.{8,})')

	//At least 1 lowercase, 1 uppercase || 1 lowercase, 1 number || 1 uppercase, 1 number && >=6 in total
	var mediumRegex = new RegExp(
		'^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
	)

	return strongRegex.test(password)
}

const validatePhone = phone => {
	var phoneRegex = /^(?:\+?84|0)(?:\d{9}|\d{10})$/

	return phoneRegex.test(phone)
}

const validateStudentCode = stuCode => {
	var stuCodeRegex = /^(?=.*[0-9a-zA-Z]).+$/

	return stuCodeRegex.test(stuCode)
}

const validateBirthOfDate = bod => {
	const yearGap = 7 // The minimum of years old to assign
	const currentDate = new Date()
	const inputDate = new Date(bod)
	inputDate.setFullYear(inputDate.getFullYear() + yearGap)

	if (inputDate < currentDate) return true
	console.log('validate date: ', bod)
	console.log('validate current date: ', currentDate)
	console.log('validate current date: ', inputDate)

	return false
}

module.exports = {
	validateName,
	validateEmail,
	validatePassword,
	validatePhone,
	validateStudentCode,
	validateBirthOfDate
}
