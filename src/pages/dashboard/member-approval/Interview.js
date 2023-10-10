import * as React from 'react'
import { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {
	Autocomplete,
	Avatar,
	Box,
	Card,
	CardContent,
	CardHeader,
	Checkbox,
	Chip,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography
} from '@mui/material'
import Link from 'next/link'

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import { styled, useTheme } from '@mui/material/styles'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { ToastContainer, toast } from 'react-toastify'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
	right: 0,
	bottom: 0,
	height: 170,
	position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
	right: 36,
	bottom: 20,
	height: 98,
	position: 'absolute'
})

export default function Interview({
	applicationDetail,
	handleClose,
	openInterviewDialog,
	setOpenInterviewDialog,
	dispatch,
	statusObj,
	userData
}) {
	// ** Hook
	const theme = useTheme()
	const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'
	const [locationList, setLocationList] = useState([])

	const [interviewDetail, setInterviewDetail] = useState({
		id: applicationDetail?.interview.id,
		engagementId: applicationDetail?.interview.engagementId,
		comment: applicationDetail?.interview.comment,
		isApproved: applicationDetail?.interview.isApproved,
		approvedBy: userData?.id
	})

	useEffect(() => {
		setInterviewDetail({
			id: applicationDetail?.interview.id,
			engagementId: applicationDetail?.interview.engagementId,
			comment: applicationDetail?.interview.comment,
			isApproved: applicationDetail?.interview.isApproved,
			approvedBy: userData?.id
		})
	}, [applicationDetail, userData])

	const fullname = applicationDetail?.user.firstname + ' ' + applicationDetail?.user.lastname

	const handleSubmit = async () => {
		fetch('http://localhost:8080/engagement?action=interview', {
			method: 'POST',
			body: JSON.stringify(interviewDetail),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				toast.success('Lưu thông tin phỏng vấn thành công')
				handleClose()
			})
			.catch(error => {
				console.error('Error:', error)

				toast.error('Có lỗi xảy ra khi lưu cuộc phỏng vấn, vui lòng thử lại')
			})
			.finally(() => {
				handleClose()
			})
	}

	return (
		<div>
			<ToastContainer></ToastContainer>
			<Dialog open={openInterviewDialog} onClose={handleClose} scroll='paper' maxWidth='lg' fullWidth>
				<DialogTitle id='scroll-dialog-title'>
					<strong>
						Phỏng vấn {applicationDetail?.user?.firstname} {applicationDetail?.user?.lastname}
					</strong>
					<div>
						<span>
							<Chip
								color={statusObj[applicationDetail?.engagement.status]?.color}
								label={statusObj[applicationDetail?.engagement.status]?.label}
								sx={{
									height: 24,
									fontSize: '0.75rem',
									textTransform: 'capitalize',
									'& .MuiChip-label': { fontWeight: 500 }
								}}
							/>
						</span>
						<span>
							<Chip
								icon={<AccessAlarmIcon />}
								label={applicationDetail?.engagement.createdAt}
								sx={{
									height: 24,
									fontSize: '0.75rem',
									textTransform: 'capitalize',
									'& .MuiChip-label': { fontWeight: 500 },
									marginLeft: 2
								}}
								color='secondary'
							/>
						</span>
					</div>
				</DialogTitle>

				<DialogContent>
					<DialogContentText>
						<Grid container spacing={6}>
							<Grid item xs={12} md={4}>
								<Card sx={{ position: 'relative' }}>
									<CardContent>
										<Avatar
											sx={{ width: '50%', height: '50%' }}
											alt={applicationDetail?.user.username}
											src={applicationDetail?.user.avatarURL}
										/>
										<Typography variant='h6'>
											{applicationDetail?.user.firstname} {applicationDetail?.user.lastname}
										</Typography>
										<Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
											Mã số sinh viên: {applicationDetail?.user.username}
										</Typography>

										<TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
									</CardContent>
								</Card>
								<Card sx={{ position: 'relative', marginTop: 5 }}>
									<CardHeader title='Thông tin cơ bản' />
									<CardContent>
										<Typography variant='body1'>
											<strong>Email: </strong>
											{applicationDetail?.user.email}
										</Typography>
										<Typography variant='body1'>
											<strong>Số điện thoại: </strong>
											{applicationDetail?.user.phoneNumber}
										</Typography>
										<Typography variant='body1'>
											<strong>Giới tính: </strong>
											{applicationDetail?.user.gender}
										</Typography>
										<Typography variant='body1'>
											<strong>Ngày sinh: </strong>
											{applicationDetail?.user.dob}
										</Typography>
										<Typography variant='body1'>
											<strong>Facebook: </strong>
											{applicationDetail?.user.facebookUrl ? (
												<Link target='_blank' href={`${applicationDetail?.user.facebookUrl}`}>
													<Button>Truy cập</Button>
												</Link>
											) : (
												''
											)}
										</Typography>
									</CardContent>
								</Card>
								<Card sx={{ marginTop: 5 }}>
									<CardHeader title='Thông tin ứng tuyển' />
									<CardContent>
										<Typography variant='body1'>
											<strong>Ban ứng tuyển: </strong>
											{applicationDetail?.dept.name}
										</Typography>
										<Typography variant='body1'>
											<strong>Ngày ứng tuyển: </strong>
											{applicationDetail?.engagement.createdAt}
										</Typography>
										<Typography variant='body1'>
											<strong>Ngày cập nhật: </strong>
											{applicationDetail?.engagement.updatedAt}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
							<Grid item xs={12} md={8}>
								<Card>
									<CardHeader title='Phỏng vấn' />
									<CardContent>
										<TextField
											sx={{ marginTop: 5 }}
											fullWidth
											id='outlined-multiline-static'
											label='Nhận xét'
											multiline
											rows={10}
											onChange={event =>
												setInterviewDetail({
													...interviewDetail,
													comment: event.target.value
												})
											}
											value={interviewDetail?.comment}
										/>
										<FormControlLabel
											label='Phê duyệt'
											control={
												<Checkbox
													checked={interviewDetail?.isApproved}
													onChange={event =>
														setInterviewDetail({
															...interviewDetail,
															isApproved: event.target.checked
														})
													}
												/>
											}
										/>

										<DialogActions>
											<Button variant='contained' onClick={handleSubmit}>
												Xác nhận
											</Button>
										</DialogActions>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Đóng</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
