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
	Chip,
	FormControl,
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
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

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

export function convertToTimestamp(inputString) {
	const [datePart, timePart] = inputString.split('TT')
	const [year, month, day] = datePart.split('-')
	const [hours, minutes] = timePart.split(':')
	const newDateString = `${year}-${month}-${day} ${hours}:${minutes}:00.000`

	return newDateString
}

export default function CreateInterview({
	applicationDetail,
	handleClose,
	openCreateInterviewDialog,
	setOpenCreateInterviewDialog,
	dispatch,
	statusObj
}) {
	// ** Hook
	const theme = useTheme()
	const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'
	const [locationList, setLocationList] = useState([])

	const [interview, setInterview] = useState({
		startTime: '',
		endTime: '',
		engagementId: '',
		location: '',
		note: ''
	})

	// Hàm xử lý khi thay đổi DatePicker
	const handleDateChange = date => {
		const formattedDate = dayjs(date).format('YYYY-MM-DDTHH:mm')
		const startString = `${formattedDate.substring(0, 11)}T${interview.startTime.slice(-5)}`
		const endString = `${formattedDate.substring(0, 11)}T${interview.endTime.slice(-5)}`
		setInterview({
			...interview,
			startTime: startString,
			endTime: endString
		})
	}

	const handleStartTimeChange = time => {
		const formattedTime = dayjs(time).format('YYYY-MM-DDTHH:mm')
		const combinedString = `${interview.startTime.substring(0, 11)}T${formattedTime.slice(-5)}`
		setInterview({
			...interview,
			startTime: combinedString
		})
	}

	const handleEndTimeChange = time => {
		const formattedTime = dayjs(time).format('YYYY-MM-DDTHH:mm')
		const combinedString = `${interview.endTime.substring(0, 11)}T${formattedTime.slice(-5)}`
		setInterview({
			...interview,
			endTime: combinedString
		})
	}
	useEffect(() => {
		fetch(`http://localhost:8080/location`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				setLocationList(data)
			})
			.catch(error => console.error('Error:', error))
	}, [])

	const fullname = applicationDetail?.user.firstname + ' ' + applicationDetail?.user.lastname

	const handleSubmit = async () => {
		fetch(
			'http://localhost:8080/engagement?action=set-interview&club=' +
				applicationDetail?.club.subname +
				'&name=' +
				fullname +
				'&location=' +
				interview?.location +
				'&note=' +
				interview?.note +
				'&email=' +
				applicationDetail?.user.email,
			{
				method: 'POST',
				body: JSON.stringify({
					...interview,
					startTime: new Date(convertToTimestamp(interview.startTime)),
					endTime: new Date(convertToTimestamp(interview.endTime)),
					engagementId: applicationDetail?.engagement.id
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			}
		)
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				toast.success('Tạo lịch phỏng vấn thành công')
				setOpenCreateInterviewDialog(false)
				dispatch({ type: 'trigger' })
			})
			.catch(error => {
				console.error('Error:', error)

				toast.error('Có lỗi xảy ra khi tạo lịch phỏng vấn, vui lòng thử lại')
			})
			.finally(() => {
				setOpenCreateInterviewDialog(false)
			})
	}

	return (
		<div>
			<ToastContainer></ToastContainer>
			<Dialog open={openCreateInterviewDialog} onClose={handleClose} scroll='paper' maxWidth='lg' fullWidth>
				<DialogTitle id='scroll-dialog-title'>
					<strong>
						Tạo lịch phỏng vấn cho {applicationDetail?.user?.firstname} {applicationDetail?.user?.lastname}
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
									<CardHeader title='Tạo lịch phỏng vấn' />
									<CardContent>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<Stack direction={'row'} gap={4}>
												<DatePicker
													disablePast
													label='Ngày'
													slotProps={{
														textField: {
															helperText: 'MM/DD/YYYY'
														}
													}}
													onChange={handleDateChange}
													sx={{ flex: 1 }}
												/>
												<TimePicker
													sx={{ flex: 1 }}
													label='Bắt đầu'
													onChange={handleStartTimeChange}

													// defaultValue={dayjs('2022-04-17T15:30')}
												/>
												<TimePicker
													sx={{ flex: 1 }}
													label='Kết thúc'
													onChange={handleEndTimeChange}

													// defaultValue={dayjs('2022-04-17T20:30')}
												/>
											</Stack>
										</LocalizationProvider>
										<Autocomplete
											id='location'
											fullWidth
											options={locationList}
											autoHighlight
											getOptionLabel={option => option.name}
											onChange={e => setInterview({ ...interview, location: e.target.value })}
											renderOption={(props, option) => (
												<Box
													component='li'
													sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
													{...props}
													value={option.id}
												>
													{option.name}
												</Box>
											)}
											renderInput={params => (
												<TextField
													{...params}
													label='Địa điểm'
													inputProps={{
														...params.inputProps,
														autoComplete: 'new-password' // disable autocomplete and autofill
													}}
												/>
											)}
										/>

										<TextField
											sx={{ marginTop: 5 }}
											fullWidth
											id='outlined-multiline-static'
											label='Lưu ý cho ứng viên'
											multiline
											rows={10}
											onChange={event => setInterview({ ...interview, note: event.target.value })}
										/>
										<DialogActions>
											<Button variant='contained' onClick={handleSubmit}>
												Xác nhận
											</Button>
											<Button variant='outlined'>Hủy</Button>
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
