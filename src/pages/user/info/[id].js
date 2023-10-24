// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Box, Grid, Avatar } from '@mui/material'
import { styled } from '@mui/material/styles'

import 'react-datepicker/dist/react-datepicker.css'

import { getUserInfo, getAllMajors } from '../../../utils/apiUtils'
import classes from './styles.module.scss'

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

	const router = useRouter()

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}
	useEffect(() => {
		getAllMajors().then(response => {
			setMajors(response)
		})
	}, [])

	useEffect(() => {
		if (router.query.id)
			getUserInfo(router.query.id).then(response => {
				setUserInfo(response)
			})
	}, [router.query.id])

	return (
		<div className={classes.containerPage}>
			<h1>Thông tin cá nhân</h1>
			<Box className={classes.containerBox}>
				<Box className={classes.info}>
					<ImgStyled src={userInfo?.avatarURL || '/images/avatars/1.png'} alt='Profile Pic' />
					<div>
						<p className={classes.name}>
							{userInfo?.firstname} {userInfo?.lastname}
						</p>
						<p className={classes.stcode}>{userInfo?.studentCode}</p>
					</div>
				</Box>
				<Box className={classes.mainInfo}>
					<div className={classes.info__list}>
						<div className={classes.info__item}>
							<span className={classes.info__itemtitle}>Email</span> <p>{userInfo?.email}</p>
						</div>

						<div className={classes.info__item}>
							<span className={classes.info__itemtitle}>Major</span> <p>{userInfo?.major}</p>
						</div>
						<div className={classes.info__item}>
							<span className={classes.info__itemtitle}>Phone number</span> <p>{userInfo?.phoneNumber}</p>
						</div>
						<div className={classes.info__item}>
							<span className={classes.info__itemtitle}>Date of birth</span> <p>{userInfo?.dob}</p>
						</div>
						<div className={classes.info__item}>
							<span className={classes.info__itemtitle}>Home Town</span> <p>{userInfo?.homeTown}</p>
						</div>
						<div className={classes.info__item}>
							<span className={classes.info__itemtitle}>Gender</span> <p>{userInfo?.gender}</p>
						</div>
						<div className={classes.info__item}>
							<span className={classes.info__itemtitle}>Facebook Url</span> <p>{userInfo?.facebookUrl}</p>
						</div>
						<div className={classes.info__item}>
							<span className={classes.info__itemtitle}>LinkedIn Url</span> <p>{userInfo?.linkedInUrl}</p>
						</div>
					</div>
				</Box>
			</Box>
		</div>
	)
}

export default UserInfoView
