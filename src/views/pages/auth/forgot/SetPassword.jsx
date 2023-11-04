import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'

import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import { toast } from 'react-toastify'
import { postAPI } from 'src/utils/request'

function SetPassword(props) {
	const handleChange = props.changeProc
	const values = props.values
	const router = props.router
	const setValues = props.setValues

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword })
	}

	const handleMouseDownPassword = event => {
		event.preventDefault()
	}

	const handleSubmit2 = async event => {
		event.preventDefault()
		event.target.disabled = true

		const timeout = setTimeout(() => {
			event.target.disabled = false
			clearTimeout(timeout)
		}, 2000)
		var res = await postAPI('forgot-password', { command: 3, password: values.password, email: values.email })
		if (res.code == 0) {
			toast.success('Khôi phục mật khẩu thành công!')
			setTimeout(() => {
				router.push('/auth/login')
			}, 1000)
		} else {
			toast.error(res.msg)
		}
	}

	return (
		<div className='step'>
			<Box sx={{ mb: 6 }}>
				<Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
					Xác minh thành công
				</Typography>
				<Typography variant='body2'>Hãy nhập mật khẩu mới của bạn!</Typography>
			</Box>
			<form noValidate autoComplete='off' onSubmit={handleSubmit2}>
				<FormControl fullWidth>
					<InputLabel htmlFor='auth-login-password'>Mật khẩu</InputLabel>
					<OutlinedInput
						label='Password'
						value={values.password}
						id='auth-login-password'
						onChange={handleChange('password')}
						type={values.showPassword ? 'text' : 'password'}
						sx={{ marginBottom: 4 }}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton
									edge='end'
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									aria-label='toggle password visibility'
								>
									{values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>

				<Button fullWidth size='large' variant='contained' type='submit' sx={{ marginBottom: 7 }}>
					Xác nhận
				</Button>
			</form>
		</div>
	)
}

export default SetPassword
