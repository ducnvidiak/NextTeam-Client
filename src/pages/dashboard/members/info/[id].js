// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Box, Grid, Avatar, Paper, Typography, Button, TextField, InputAdornment } from '@mui/material'
import { styled } from '@mui/material/styles'

import 'react-datepicker/dist/react-datepicker.css'

import { getUserInfo, getAllMajors } from '../../../../api-utils/apiUtils'
import { Country, State, City } from 'country-state-city'
import Link from 'next/link'

import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import FacebookIcon from '@mui/icons-material/Facebook'
import CakeIcon from '@mui/icons-material/Cake'
import TransgenderIcon from '@mui/icons-material/Transgender'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import SchoolIcon from '@mui/icons-material/School'

const ImgStyled = styled('img')(({ theme }) => ({
	width: 100,
	height: 100,
	marginRight: theme.spacing(6.25),
	borderRadius: 100
}))

const UserInfoView = () => {
	// ** State
	const [userInfo, setUserInfo] = useState(null)
	const [majors, setMajors] = useState(null)
	const [majorName, setMajorName] = useState('người dùng chưa cập nhật')

	const [country, setCountry] = useState('')
	const [state, setState] = useState('')

	const router = useRouter()

	useEffect(() => {
		if (userInfo?.major !== undefined && userInfo?.major !== null && majors != null) {
			setMajorName(majors.find(major => major.id == userInfo?.major))
		}
	}, [userInfo, majors])

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}
	useEffect(() => {
		getAllMajors().then(response => {
			setMajors(response)
		})
	}, [])

	useEffect(() => {
		if (router.query.id) {
			getUserInfo(router.query.id).then(response => {
				setUserInfo(response)
			})
			if (userInfo?.homeTown != '' && userInfo?.homeTown != null)
				setCountry(Country.getCountryByCode(userInfo?.homeTown.split('-')[0]))
			if (userInfo?.homeTown != '' && userInfo?.homeTown != null && userInfo.homeTown.includes('-'))
				setState(
					State.getStateByCodeAndCountry(userInfo.homeTown.split('-')[1], userInfo.homeTown.split('-')[0])
				)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query.id])

	return (
		<Paper sx={{ width: '100%', height: '100%' }}>
			<Box
				sx={{
					borderBottom: '3px solid #f27123',
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
					height: '60px',
					padding: '0 20px'
				}}
			>
				<Typography variant='h6'>Thông tin tài khoản</Typography>
			</Box>
			<Box sx={{ height: '100%', padding: '50px 80px 30px' }}>
				<Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '40px' }}>
					<Avatar
						src={userInfo?.avatarURL}
						sizes='large'
						sx={{ width: '120px', height: '120px', border: '2px solid #f27123' }}
					/>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							justifyContent: 'center',
							gap: '10px'
						}}
					>
						<Typography variant='h5'>
							{userInfo?.firstname} {userInfo?.lastname}
						</Typography>
						<Typography
							sx={{
								marginLeft: '0px',
								backgroundColor: '#f27123',
								color: '#fff',
								padding: '3px 15px',
								borderRadius: '10px'
							}}
							variant='p'
						>
							{userInfo?.username.toUpperCase()}
						</Typography>
					</Box>
				</Box>
				<Grid container sx={{ marginTop: '20px', padding: '0 10px' }} spacing={6}>
					<Grid item xs={6}>
						<TextField
							fullWidth
							id='email-readonly'
							label='Email'
							value={userInfo?.email}
							InputProps={{
								readOnly: true,
								startAdornment: (
									<InputAdornment position='start'>
										<EmailIcon />
									</InputAdornment>
								)
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							id='major-readonly'
							label='Major'
							value={majorName?.name || 'Chưa cập nhật'}
							InputProps={{
								readOnly: true,
								startAdornment: (
									<InputAdornment position='start'>
										<SchoolIcon />
									</InputAdornment>
								)
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							id='phone-readonly'
							label='Phone'
							value={userInfo?.phoneNumber}
							InputProps={{
								readOnly: true,
								startAdornment: (
									<InputAdornment position='start'>
										<LocalPhoneIcon />
									</InputAdornment>
								)
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							id='dob-readonly'
							label='Date of birth'
							value={userInfo?.dob}
							InputProps={{
								readOnly: true,
								startAdornment: (
									<InputAdornment position='start'>
										<CakeIcon />
									</InputAdornment>
								)
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							id='address-readonly'
							label='Hometown'
							value={`${country?.name} - ${state.name}`}
							InputProps={{
								readOnly: true,
								startAdornment: (
									<InputAdornment position='start'>
										<LocationCityIcon />
									</InputAdornment>
								)
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							id='gender-readonly'
							label='Gender'
							value={userInfo?.gender == '1' ? 'Female' : 'Male'}
							InputProps={{
								readOnly: true,
								startAdornment: (
									<InputAdornment position='start'>
										<TransgenderIcon />
									</InputAdornment>
								)
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							id='facebook-readonly'
							label='Facebook'
							value={userInfo?.facebookUrl}
							InputProps={{
								readOnly: true,
								startAdornment: (
									<InputAdornment position='start'>
										<FacebookIcon />
									</InputAdornment>
								)
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							id='linkedin-readonly'
							label='LinkedIn'
							value={userInfo?.linkedInUrl}
							InputProps={{
								readOnly: true,
								startAdornment: (
									<InputAdornment position='start'>
										<LinkedInIcon />
									</InputAdornment>
								)
							}}
						/>
					</Grid>
				</Grid>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '50px' }}>
					<Link passHref href={'/dashboard/members/'}>
						<Button variant='contained'>Quay trở lại</Button>
					</Link>
				</Box>
			</Box>
		</Paper>
	)

	// return (
	// 	<div className={classes.containerPage}>
	// 		<h1>Thông tin cá nhân</h1>
	// 		<Box className={classes.containerBox}>
	// 			<Box className={classes.info}>
	// 				<ImgStyled src={userInfo?.avatarURL || '/images/avatars/1.png'} alt='Profile Pic' />
	// 				<div>
	// 					<p className={classes.name}>
	// 						{userInfo?.firstname} {userInfo?.lastname}
	// 					</p>
	// 					<p className={classes.stcode}>{userInfo?.studentCode}</p>
	// 				</div>
	// 			</Box>
	// 			<Box className={classes.mainInfo}>
	// 				<div className={classes.info__list}>
	// 					<div className={classes.info__item}>
	// 						<span className={classes.info__itemtitle}>Email</span> <p>{userInfo?.email}</p>
	// 					</div>

	// 					<div className={classes.info__item}>
	// 						<span className={classes.info__itemtitle}>Major</span> <p>{userInfo?.major}</p>
	// 					</div>
	// 					<div className={classes.info__item}>
	// 						<span className={classes.info__itemtitle}>Phone number</span> <p>{userInfo?.phoneNumber}</p>
	// 					</div>
	// 					<div className={classes.info__item}>
	// 						<span className={classes.info__itemtitle}>Date of birth</span> <p>{userInfo?.dob}</p>
	// 					</div>
	// 					<div className={classes.info__item}>
	// 						<span className={classes.info__itemtitle}>Home Town</span> <p>{userInfo?.homeTown}</p>
	// 					</div>
	// 					<div className={classes.info__item}>
	// 						<span className={classes.info__itemtitle}>Gender</span> <p>{userInfo?.gender}</p>
	// 					</div>
	// 					<div className={classes.info__item}>
	// 						<span className={classes.info__itemtitle}>Facebook Url</span> <p>{userInfo?.facebookUrl}</p>
	// 					</div>
	// 					<div className={classes.info__item}>
	// 						<span className={classes.info__itemtitle}>LinkedIn Url</span> <p>{userInfo?.linkedInUrl}</p>
	// 					</div>
	// 				</div>
	// 			</Box>
	// 		</Box>
	// 	</div>
	// )
}

export default UserInfoView
