const { TumbleDryer } = require('mdi-material-ui')

const validateName = name => {
	const regex = /^[\p{L}\p{M}\s,'-]{1,}$/u
	const valid = regex.test(name)
	const message = valid ? 'success' : 'Họ và tên đệm phải chứa ít nhất 2 kí tự (chỉ bao gồm chữ cái).'

	return { valid, message }
}

const validateEmail = email => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	const valid = String(email).toLowerCase().match(regex)
	const message = valid ? 'success' : 'Email phải chứ ký tự @, tên miền và ít nhất 1 chữ cái phía trước @.'

	return { valid, message }
}

const validatePassword = password => {
	//At least 1 lowercase, 1 uppercase, 1 number, 1 special character, >=8 in total
	const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*/.])(?=.{8,30})')

	//At least 1 lowercase, 1 uppercase || 1 lowercase, 1 number || 1 uppercase, 1 number && >=6 in total
	const mediumRegex = new RegExp(
		'^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
	)

	const valid = strongRegex.test(password)

	const message = valid
		? 'success'
		: 'Mật khẩu phải chứa 8 đến 30 ký tự bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt !@#$%^&*/. (mỗi loại ít nhất một ký tự).'

	return { valid, message }
}

const validatePhone = phone => {
	const regex = /^(?:\+?84|0)(?:\d{9}|\d{10})$/

	const valid = regex.test(phone)
	const message = valid ? 'success' : 'Số điện thoại phải chứa (+84|0) 9|10 chữ số tiếp theo.'

	return { valid, message }
}

const validateStudentCode = stuCode => {
	const regex = /^[HhDdSsQqCc][AaEeSs][0-9]{6}$/

	const valid = regex.test(stuCode)

	const message = valid
		? 'success'
		: 'Mã sinh viên phải bắt đầu bằng 2 chữ cái mã ngành [HhDdSsQqCc][AaEeSs] và 6 chữ số tiếp theo.'

	return { valid, message }
}

const validateBirthOfDate = bod => {
	const yearGap = 7 // The minimum of years old to assign
	const currentDate = new Date()
	const inputDate = new Date(bod)
	inputDate.setFullYear(inputDate.getFullYear() + yearGap)

	const valid = inputDate < currentDate
	const message = valid ? 'success' : 'Ngày sinh của bạn phải đủ 7 tuổi trở lên'

	return { valid, message }
}

module.exports = {
	validateName,
	validateEmail,
	validatePassword,
	validatePhone,
	validateStudentCode,
	validateBirthOfDate
}
