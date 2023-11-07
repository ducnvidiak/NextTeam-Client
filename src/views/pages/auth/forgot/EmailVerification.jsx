import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { toast } from 'react-toastify'
import { postAPI } from 'src/utils/request'

function EmailVerification(props) {
	const handleChange = props.changeProc
	const values = props.values
	const setValues = props.setValues
	const setStep = props.setStep
	const setLoading = props.setLoading

	const handleSubmitForm = async event => {
		event.preventDefault()
		if (!values.email) {
			toast.error('Không được để trống email!')

			return
		}
		event.target.disabled = true

		const timeout = setTimeout(() => {
			event.target.disabled = false
			clearTimeout(timeout)
		}, 2000)
		setLoading(true)
		var res = await postAPI('forgot-password', { command: 1, email: values.email })

		if (res.code == 0) {
			setValues({ ...values, type: res.result.type })
			setStep(2)

			// myRef.current.focus()
			props.refFnc && props.refFnc()
		} else {
			toast.error(res.msg)
		}
		setLoading(false)
	}

	return (
		<div className='step'>
			<Box sx={{ mb: 6 }}>
				<Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
					Tìm lại chính mình! 👈🏼
				</Typography>
				<Typography variant='body2'>
					Vui lòng nhập email để chúng mình có thể gửi mã để đặt lại mật khẩu của bạn.
				</Typography>
			</Box>

			<form noValidate autoComplete='off' onSubmit={handleSubmitForm}>
				<TextField
					autoFocus
					fullWidth
					id='email'
					label='Email'
					sx={{ marginBottom: 4 }}
					onChange={handleChange('email')}
				/>

				<Button fullWidth size='large' variant='contained' type='submit' sx={{ marginBottom: 7 }}>
					Tiếp
				</Button>
			</form>
		</div>
	)
}

export default EmailVerification
