// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Box, Grid, Avatar, Paper, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

import 'react-datepicker/dist/react-datepicker.css'

import { getUserInfo, getAllMajors } from '../../../../api-utils/apiUtils'
import { Country, State, City } from 'country-state-city'
import Link from 'next/link'

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

	console.log(userInfo)
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
	}, [router.query.id, userInfo])

	return (
		<Paper sx={{ width: '100%', height: '100%', borderRadius: '15px' }}>
			<Box
				sx={{
					borderBottom: '3px solid #F8C883',
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
					height: '60px',
					padding: '0 20px'
				}}
			>
				<Typography variant='h5'>Thông tin tài khoản</Typography>
			</Box>
			<Box sx={{ height: '100%', padding: '30px 80px' }}>
				<Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '40px' }}>
					<Avatar
						src={userInfo?.avatarURL}
						sizes='large'
						sx={{ width: '190px', height: '190px', border: '7px solid #f58a38' }}
					/>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
						<Typography variant='h3'>
							{userInfo?.firstname} {userInfo?.lastname}
						</Typography>
						<Typography sx={{ marginLeft: '10px', color: '#f58a38' }} variant='h6'>
							{userInfo?.username.toUpperCase()}
						</Typography>
					</Box>
				</Box>
				<Grid container sx={{ marginTop: '20px', padding: '0 10px' }} spacing={6}>
					<Grid item xs={6}>
						<Grid container sx={{ border: '1px solid #f5bb8e', padding: '5px 25px', borderRadius: '15px' }}>
							<Grid item xs={4}>
								<Typography variant='h6'>Email</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography variant='subtitle1'>{userInfo?.email}</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={6}>
						<Grid container sx={{ border: '1px solid #f5bb8e', padding: '5px 25px', borderRadius: '15px' }}>
							<Grid item xs={4}>
								<Typography variant='h6'>Chuyên ngành</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography variant='subtitle1'>{majorName?.name}</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={6}>
						<Grid container sx={{ border: '1px solid #f5bb8e', padding: '5px 25px', borderRadius: '15px' }}>
							<Grid item xs={4}>
								<Typography variant='h6'>Số điện thoại</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography variant='subtitle1'>{userInfo?.phoneNumber}</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={6}>
						<Grid container sx={{ border: '1px solid #f5bb8e', padding: '5px 25px', borderRadius: '15px' }}>
							<Grid item xs={4}>
								<Typography variant='h6'>Ngày sinh</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography variant='subtitle1'>{userInfo?.dob}</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={6}>
						<Grid container sx={{ border: '1px solid #f5bb8e', padding: '5px 25px', borderRadius: '15px' }}>
							<Grid item xs={4}>
								<Typography variant='h6'>Quê quán</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography variant='subtitle1'>
									{country?.name} - {state.name}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={6}>
						<Grid container sx={{ border: '1px solid #f5bb8e', padding: '5px 25px', borderRadius: '15px' }}>
							<Grid item xs={4}>
								<Typography variant='h6'>Giới tính</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography variant='subtitle1'>
									{userInfo?.gender == '1' ? 'Female' : 'Male'}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={6}>
						<Grid container sx={{ border: '1px solid #f5bb8e', padding: '5px 25px', borderRadius: '15px' }}>
							<Grid item xs={4}>
								<Typography variant='h6'>Link Facebook</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography variant='subtitle1'>{userInfo?.facebookUrl}</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={6}>
						<Grid container sx={{ border: '1px solid #f5bb8e', padding: '5px 25px', borderRadius: '15px' }}>
							<Grid item xs={4}>
								<Typography variant='h6'>Link Linkedin</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography variant='subtitle1'>{userInfo?.linkedInUrl}</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '50px' }}>
					<Link href={'/dashboard/members/'}>
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
