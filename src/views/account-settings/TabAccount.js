// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

const axios = require('axios')

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

import { updateUserAvatar, updateUserInfo } from '../../utils/apiUtils'
import { validateEmail, validateName } from '../../input-validation/index'
import { ConsoleLine } from 'mdi-material-ui'
import { ToastContainer, toast } from 'react-toastify'

import { useSettings } from 'src/@core/hooks/useSettings'

const ImgStyled = styled('img')(({ theme }) => ({
	width: 120,
	height: 120,
	marginRight: theme.spacing(6.25),
	borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
	[theme.breakpoints.down('sm')]: {
		width: '100%',
		textAlign: 'center'
	}
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
	marginLeft: theme.spacing(4.5),
	[theme.breakpoints.down('sm')]: {
		width: '100%',
		marginLeft: 0,
		textAlign: 'center',
		marginTop: theme.spacing(4)
	}
}))

const TabAccount = ({ userInfo, setUserInfo }) => {
	const { settings, saveSettings } = useSettings()

	// ** State
	const [openAlert, setOpenAlert] = useState(false)

	const [imgSrc, setImgSrc] = useState('')
	const [currentUserInfo, setCurrentUserInfo] = useState({ ...userInfo })

	const [firstnameError, setFirstnameError] = useState({ status: false, message: '' })
	const [lastnameError, setLastnameError] = useState({ status: false, message: '' })
	const [emailError, setEmailError] = useState({ status: false, message: '' })

	useEffect(() => {
		setCurrentUserInfo({ ...userInfo })
	}, [userInfo])

	const onChange = file => {
		const reader = new FileReader()
		const { files } = file.target
		if (files && files.length !== 0) {
			reader.onload = () => setImgSrc(reader.result)
			reader.readAsDataURL(files[0])
		}
	}

	const handleSubmit = event => {
		event.preventDefault()
		if (imgSrc != '')
			updateUserAvatar(imgSrc, userInfo?.id).then(response => {
				const avatarURL = response.avatarURL

				if (response.message == 'success') {
					setTimeout(() => {
						setImgSrc('')
						setUserInfo({ ...currentUserInfo, avatarURL: `${avatarURL}?${Date.now()}` })
						toast.success('Success upload avatar!', {
							position: toast.POSITION.TOP_RIGHT
						})
						saveSettings(settings => ({ ...settings, avatarURL: `${avatarURL}?${Date.now()}` }))
					}, 3000)
				} else {
					toast.error('Fail to upload avatar!')
				}
			})

		if (lastnameError.status || firstnameError.status || emailError.status) {
			toast.error('Vui lòng điền thông tin còn thiếu.')
		} else {
			updateUserInfo(currentUserInfo).then(response => {
				if (response.message == 'success') {
					setUserInfo({ ...currentUserInfo })
					toast.success('Success change info!', {
						position: toast.POSITION.TOP_RIGHT
					})
				} else {
					toast.error('Email not available!')
				}
			})
		}
	}

	const handleResetAvatar = event => {
		event.preventDefault()

		setImgSrc('')
		setUserInfo({ ...userInfo, avatarURL: userInfo.avatarURL })
	}

	const handleResetAccountInfo = event => {
		event.preventDefault()

		setEmailError(false)
		setFirstnameError(false)
		setLastnameError(false)
		setUserInfo({ ...userInfo, avatarURL: currentUserInfo.avatarURL })
	}

	return (
		<CardContent>
			<form>
				<Grid container spacing={7}>
					<Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<ImgStyled
								src={
									imgSrc !== ''
										? imgSrc
										: currentUserInfo?.avatarURL
										? currentUserInfo.avatarURL
										: currentUserInfo.gender == '0'
										? '/images/avatars/5.png'
										: currentUserInfo.gender == '1'
										? '/images/avatars/6.png'
										: null
								}
								alt='Profile Pic'
							/>
							<Box>
								<ButtonStyled
									component='label'
									variant='contained'
									htmlFor='account-settings-upload-image'
								>
									Tải ảnh đại diện
									<input
										hidden
										type='file'
										onChange={onChange}
										accept='image/png, image/jpeg'
										id='account-settings-upload-image'
									/>
								</ButtonStyled>
								<ResetButtonStyled color='error' variant='outlined' onClick={handleResetAvatar}>
									Hủy
								</ResetButtonStyled>
								<Typography variant='body2' sx={{ marginTop: 5 }}>
									Cho phép PNG hoặc JPEG.{' '}
									<span style={{ color: 'grey', fontSize: '12px' }}>(kích thước tối đa 800K)</span>
								</Typography>
							</Box>
						</Box>
					</Grid>

					{/* <Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label='Username'
							placeholder='johnDoe'
							value={currentUserInfo?.username || ''}
							onChange={event => {
								setCurrentUserInfo(current => {
									return { ...current, username: event.target.value }
								})
							}} 
						/>
					</Grid> */}
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label='Họ và tên đệm'
							placeholder='Bùi Thiên'
							value={currentUserInfo?.firstname || ''}
							error={firstnameError.status}
							onChange={event => {
								const validFirstname = validateName(event.target.value)
								if (!validFirstname.valid) {
									setFirstnameError({ status: true, message: validFirstname.message })
								} else {
									setFirstnameError({ status: false, message: validFirstname.message })
								}
								setCurrentUserInfo(current => {
									return { ...current, firstname: event.target.value }
								})
							}}
							helperText={firstnameError.status && firstnameError.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label='Tên'
							placeholder='Ân'
							value={currentUserInfo?.lastname || ''}
							error={lastnameError.status}
							onChange={event => {
								const validLastname = validateName(event.target.value)
								if (!validLastname.valid) {
									setLastnameError({ status: true, message: validLastname.message })
								} else {
									setLastnameError({ status: false, message: validLastname.message })
								}
								setCurrentUserInfo(current => {
									return { ...current, lastname: event.target.value }
								})
							}}
							helperText={lastnameError.status && lastnameError.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							type='email'
							label='Email'
							placeholder='ducns@example.com'
							value={currentUserInfo?.email || ''}
							error={emailError.status}
							onChange={event => {
								const validEmail = validateEmail(event.target.value)
								if (!validEmail.valid) {
									setEmailError({ status: true, message: validEmail.message })
								} else {
									setEmailError({ status: false, message: validEmail.message })
								}
								setCurrentUserInfo(current => {
									return { ...current, email: event.target.value }
								})
							}}
							helperText={emailError.status && emailError.message}
						/>
					</Grid>

					{/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label='Role' defaultValue='admin'>
                <MenuItem value='admin' selected={userInfo.role == 'admin'}>
                  Admin
                </MenuItem>
                <MenuItem value='author' selected={userInfo.role == 'author'}>
                  Author
                </MenuItem>
                <MenuItem value='editor' selected={userInfo.role == 'editor'}>
                  Editor
                </MenuItem>
                <MenuItem value='maintainer' selected={userInfo.role == 'maintainer'}>
                  Maintainer
                </MenuItem>
                <MenuItem value='subscriber' selected={userInfo.role == 'subscriber'}>
                  Subscriber
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label='Status' defaultValue='active'>
                <MenuItem value='active' selected={userInfo.status == 'active'}>
                  Active
                </MenuItem>
                <MenuItem value='inactive' selected={userInfo.status == 'inactive'}>
                  Inactive
                </MenuItem>
                <MenuItem value='pending' selected={userInfo.status == 'pending'}>
                  Pending
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Company' placeholder='ABC Pvt. Ltd.' defaultValue='ABC Pvt. Ltd.' />
          </Grid> */}

					{/* {openAlert ? (
						<Grid item xs={12} sx={{ mb: 3 }}>
							<Alert
								severity='warning'
								sx={{ '& a': { fontWeight: 400 } }}
								action={
									<IconButton
										size='small'
										color='inherit'
										aria-label='close'
										onClick={() => setOpenAlert(false)}
									>
										<Close fontSize='inherit' />
									</IconButton>
								}
							>
								<AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
								<Link href='/' onClick={e => e.preventDefault()}>
									Resend Confirmation
								</Link>
							</Alert>
						</Grid>
					) : null} */}

					<Grid item xs={12}>
						<Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleSubmit}>
							LƯU THAY ĐỔI
						</Button>
						<Button type='reset' variant='outlined' color='secondary' onClick={handleResetAccountInfo}>
							HỦY
						</Button>
					</Grid>
				</Grid>
			</form>
		</CardContent>
	)
}

export default TabAccount
