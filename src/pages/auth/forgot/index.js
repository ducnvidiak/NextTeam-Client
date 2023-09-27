// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { post } from 'src/utils/request'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
	[theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const OtpInput = styled('input')(({ theme }) => ({
	outlineColor: theme.palette.primary.main
}))

const LinkStyled = styled('a')(({ theme }) => ({
	fontSize: '0.875rem',
	textDecoration: 'none',
	color: theme.palette.primary.main
}))

const ErrorParagraph = styled('p')(() => ({
	textAlign: 'center',
	color: 'red'
}))

const RecoverPassword = () => {
	const myRef = useRef()
	const router = useRouter()

	// ** State
	const [values, setValues] = useState({
		email: '',
		password: '',
		type: ''
	})
	const [step, setStep] = useState(1)
	const [error, setError] = useState(null)

	// ** Hook
	const theme = useTheme()

	const handleChange = prop => event => {
		setError(null)
		setValues({ ...values, [prop]: event.target.value })
	}

	const handleSubmitForm = async event => {
		event.preventDefault()
		if (!values.email) {
			toast.error('Không được để trống email!')
		}
		event.target.disabled = true

		const timeout = setTimeout(() => {
			event.target.disabled = false
			clearTimeout(timeout)
		}, 2000)

		var res = await post('forgot-password', { command: 1, email: values.email })
		if (res.code == 0) {
			setValues({ ...values, type: res.result.type })
			setStep(2)

			// myRef.current.focus()
			setTimeout(() => {
				myRef.current.focus()
			}, 420)
		} else {
			toast.error(res.msg)
		}
	}

	const handleInputOtp = async ({ target }) => {
		// console.log(target.value)
		const numberCodeForm = document.querySelector('[data-number-code-form]')
		const numberCodeInputs = [...numberCodeForm.querySelectorAll('[data-number-code-input]')]
		if (!target.value.length) {
			return (target.value = null)
		}

		const inputLength = target.value.length
		let currentIndex = Number(target.dataset.numberCodeInput)

		if (inputLength > 1) {
			const inputValues = target.value.split('')

			inputValues.forEach((value, valueIndex) => {
				const nextValueIndex = currentIndex + valueIndex

				if (nextValueIndex >= numberCodeInputs.length) {
					return
				}

				numberCodeInputs[nextValueIndex].value = value
			})

			currentIndex += inputValues.length - 2
		}

		const nextIndex = currentIndex + 1

		if (nextIndex < numberCodeInputs.length) {
			numberCodeInputs[nextIndex].focus()
		}

		var data = ''
		numberCodeInputs.forEach(input => {
			data += input.value
		})
		if (data.length == 6) {
			const res = await post('forgot-password', { command: 2, code: data, type: values.type })
			console.log(res)
			if (res.code == 0) {
				setStep(3)
				setError(null)
			} else {
				if (res.res == 0) {
					toast.error('Mã xác minh đã bị khóa!')
				} else toast.error(res.msg.replace('__res', res.res))
			}
		}
	}

	const handleKeyDown = e => {
		const numberCodeForm = document.querySelector('[data-number-code-form]')
		const numberCodeInputs = [...numberCodeForm.querySelectorAll('[data-number-code-input]')]
		const { code, target } = e

		const currentIndex = Number(target.dataset.numberCodeInput)
		const previousIndex = currentIndex - 1
		const nextIndex = currentIndex + 1

		const hasPreviousIndex = previousIndex >= 0
		const hasNextIndex = nextIndex <= numberCodeInputs.length - 1

		switch (code) {
			case 'ArrowLeft':
			case 'ArrowUp':
				if (hasPreviousIndex) {
					numberCodeInputs[previousIndex].focus()
				}
				e.preventDefault()
				break

			case 'ArrowRight':
			case 'ArrowDown':
				if (hasNextIndex) {
					numberCodeInputs[nextIndex].focus()
				}
				e.preventDefault()
				break
			case 'Backspace':
				if (!e.target.value.length && hasPreviousIndex) {
					numberCodeInputs[previousIndex].value = null
					numberCodeInputs[previousIndex].focus()
				}
				break
			default:
				break
		}
	}

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
		var res = await post('forgot-password', { command: 3, password: values.password, email: values.email })
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
		<Box className='content-center'>
			<Card sx={{ zIndex: 1 }}>
				<CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
					<a href={'/'} style={{ textDecoration: 'none' }}>
						<Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<svg
								width={35}
								height={29}
								version='1.1'
								viewBox='0 0 30 23'
								xmlns='http://www.w3.org/2000/svg'
								xmlnsXlink='http://www.w3.org/1999/xlink'
							>
								<g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
									<g id='Artboard' transform='translate(-95.000000, -51.000000)'>
										<g id='logo' transform='translate(95.000000, 50.000000)'>
											<path
												id='Combined-Shape'
												fill={theme.palette.primary.main}
												d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
											/>
											<polygon
												id='Rectangle'
												opacity='0.077704'
												fill={theme.palette.common.black}
												points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
											/>
											<polygon
												id='Rectangle'
												opacity='0.077704'
												fill={theme.palette.common.black}
												points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
											/>
											<polygon
												id='Rectangle'
												opacity='0.077704'
												fill={theme.palette.common.black}
												points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
												transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
											/>
											<polygon
												id='Rectangle'
												opacity='0.077704'
												fill={theme.palette.common.black}
												points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
												transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
											/>
											<path
												id='Rectangle'
												fillOpacity='0.15'
												fill={theme.palette.common.white}
												d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
											/>
											<path
												id='Rectangle'
												fillOpacity='0.35'
												fill={theme.palette.common.white}
												transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
												d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
											/>
										</g>
									</g>
								</g>
							</svg>
							<ToastContainer></ToastContainer>
							<Typography
								variant='h6'
								sx={{
									ml: 3,
									lineHeight: 1,
									fontWeight: 600,
									textTransform: 'uppercase',
									fontSize: '1.5rem !important'
								}}
							>
								{themeConfig.templateName}
							</Typography>
						</Box>
					</a>
					{error && <ErrorParagraph>{error}</ErrorParagraph>}
					<div className='slider-container'>
						<div className={`slider step${step}`}>
							<div className='step'>
								<Box sx={{ mb: 6 }}>
									<Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
										Lead you back to the journey! 👈🏼
									</Typography>
									<Typography variant='body2'>
										Please enter your email so that we can send you a code to reset your password!
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

									<Button
										fullWidth
										size='large'
										variant='contained'
										type='submit'
										sx={{ marginBottom: 7 }}
									>
										Next
									</Button>
								</form>
							</div>

							<div className='step'>
								<Box sx={{ mb: 6 }}>
									<Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
										We sent you a verification code
									</Typography>
									<Typography variant='body2'>
										Please check your email for the verification code
									</Typography>
								</Box>
								<form
									noValidate
									autoComplete='off'
									onSubmit={e => {
										e.preventDefault()
									}}
								>
									<fieldset
										name='number-code'
										data-number-code-form
										style={{ border: 'none' }}
										onInput={handleInputOtp}
										onKeyDown={handleKeyDown}
									>
										<legend style={{ fontSize: 0 }}>Number Code</legend>
										{/* <TextField className={classes.input} /> */}
										<OtpInput
											className='otp-code'
											type='number'
											min='0'
											max='9'
											name='number-code-0'
											data-number-code-input='0'
											required
											ref={myRef}
										/>
										<OtpInput
											className='otp-code'
											type='number'
											min='0'
											max='9'
											name='number-code-1'
											data-number-code-input='1'
											required
										/>
										<OtpInput
											className='otp-code'
											type='number'
											min='0'
											max='9'
											name='number-code-2'
											data-number-code-input='2'
											required
										/>
										<OtpInput
											className='otp-code'
											type='number'
											min='0'
											max='9'
											name='number-code-3'
											data-number-code-input='3'
											required
										/>
										<OtpInput
											className='otp-code'
											type='number'
											min='0'
											max='9'
											name='number-code-4'
											data-number-code-input='4'
											required
										/>
										<OtpInput
											className='otp-code'
											type='number'
											min='0'
											max='9'
											name='number-code-5'
											data-number-code-input='5'
											required
										/>
									</fieldset>
									{/* <Button fullWidth size='large' variant='contained' type='submit' sx={{ marginBottom: 7 }}>
												Next
											</Button> */}
								</form>
							</div>
							<div className='step'>
								<Box sx={{ mb: 6 }}>
									<Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
										Successfully Verification
									</Typography>
									<Typography variant='body2'>Enter your new password!</Typography>
								</Box>
								<form noValidate autoComplete='off' onSubmit={handleSubmit2}>
									<FormControl fullWidth>
										<InputLabel htmlFor='auth-login-password'>Password</InputLabel>
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

									<Button
										fullWidth
										size='large'
										variant='contained'
										type='submit'
										sx={{ marginBottom: 7 }}
									>
										Confirm
									</Button>
								</form>
							</div>
						</div>
					</div>

					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							flexWrap: 'wrap',
							justifyContent: 'center'
						}}
					>
						<Typography variant='body2' sx={{ marginRight: 2 }}>
							Remember your password?
						</Typography>
						<Typography variant='body2'>
							<Link passHref href='/auth/login/'>
								<LinkStyled>Go back to login</LinkStyled>
							</Link>
						</Typography>
					</Box>
				</CardContent>
			</Card>
			<FooterIllustrationsV1 />
		</Box>
	)
}
RecoverPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RecoverPassword
