import * as React from 'react'
import { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {
	AppBar,
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
	Tab,
	TextField,
	Toolbar,
	Typography
} from '@mui/material'
import Link from 'next/link'

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import { styled, useTheme } from '@mui/material/styles'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { ToastContainer, toast } from 'react-toastify'
import { TabContext, TabList, TabPanel } from '@mui/lab'

// Import the main component
import { Worker } from '@react-pdf-viewer/core'
import { Viewer, ScrollMode } from '@react-pdf-viewer/core'
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode'

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

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
	statusObj = {},
	userData
}) {
	// ** Hook
	const theme = useTheme()
	const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'
	const [locationList, setLocationList] = useState([])
	const [value, setValue] = React.useState('1')
	const defaultLayoutPluginInstance = defaultLayoutPlugin()
	const scrollModePluginInstance = scrollModePlugin()
	const [status, setStatus] = useState('')

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const [interviewDetail, setInterviewDetail] = useState({
		id: applicationDetail?.interview?.id,
		engagementId: applicationDetail?.interview?.engagementId,
		comment: applicationDetail?.interview?.comment,
		isApproved: applicationDetail?.interview?.isApproved,
		approvedBy: userData?.id
	})

	useEffect(() => {
		setInterviewDetail({
			id: applicationDetail?.interview?.id,
			engagementId: applicationDetail?.interview?.engagementId,
			comment: applicationDetail?.interview?.comment,
			isApproved: applicationDetail?.interview?.isApproved,
			approvedBy: userData?.id
		}),
			setStatus(applicationDetail?.engagement?.status)
	}, [applicationDetail, userData])

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

	const handleStatusSubmit = async () => {
		if (status == '1') {
			fetch(
				'http://localhost:8080/engagement?action=approve-application&id=' + applicationDetail?.engagement?.id,
				{
					method: 'GET',
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				}
			)
				.then(function (response) {
					return response.json()
				})
				.then(function (data) {
					toast.success(data)
					dispatch({ type: 'trigger' })
					handleClose()
				})
				.catch(error => console.error('Error:', error))
		}
		if (status == '3') {
			fetch(
				'http://localhost:8080/engagement?action=reject-application&id=' + applicationDetail?.engagement?.id,
				{
					method: 'GET',
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				}
			)
				.then(function (response) {
					return response.json()
				})
				.then(function (data) {
					toast.success(data)
					dispatch({ type: 'trigger' })
					handleClose()
				})
				.catch(error => console.error('Error:', error))
		}
		if (status == '4') {
			fetch(
				'http://localhost:8080/engagement?action=drop-out-application&id=' + applicationDetail?.engagement?.id,
				{
					method: 'GET',
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				}
			)
				.then(function (response) {
					return response.json()
				})
				.then(function (data) {
					toast.success(data)
					dispatch({ type: 'trigger' })
					handleClose()
				})
				.catch(error => console.error('Error:', error))
		}
	}

	return (
		<div>
			<ToastContainer></ToastContainer>
			<Dialog open={openInterviewDialog} onClose={handleClose} scroll='paper' fullScreen fullWidth>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant='h6' component='div'>
							<strong>
								Phỏng vấn {applicationDetail?.user?.firstname} {applicationDetail?.user?.lastname}
							</strong>
						</Typography>
						<span>
							<Chip
								color={statusObj[applicationDetail?.engagement?.status]?.color}
								label={'Tình trạng: ' + statusObj[applicationDetail?.engagement?.status]?.label}
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
								label={'Gửi lúc: ' + applicationDetail?.engagement?.createdAt}
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
						<Button autoFocus color='inherit' onClick={handleClose}>
							Đóng
						</Button>
					</Toolbar>
				</AppBar>

				<DialogContent>
					<DialogContentText>
						<Grid container spacing={6}>
							<Grid item xs={12} md={4}>
								<div style={{ position: '-webkit-sticky', position: 'sticky', top: 0 }}>
									<Card sx={{ position: 'relative' }} variant='outlined'>
										<CardContent>
											<Avatar
												sx={{ width: '50%', height: '50%' }}
												alt={applicationDetail?.user?.username}
												src={applicationDetail?.user?.avatarURL}
											/>
											<Typography variant='h6'>
												{applicationDetail?.user?.firstname} {applicationDetail?.user?.lastname}
											</Typography>
											<Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
												Mã số sinh viên: {applicationDetail?.user?.username}
											</Typography>

											<TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
										</CardContent>
									</Card>
									<Card sx={{ position: 'relative', marginTop: 5 }} variant='outlined'>
										<CardHeader title='Thông tin cơ bản' />
										<CardContent>
											<Typography variant='body1'>
												<strong>Email: </strong>
												{applicationDetail?.user?.email}
											</Typography>
											<Typography variant='body1'>
												<strong>Số điện thoại: </strong>
												{applicationDetail?.user?.phoneNumber}
											</Typography>
											<Typography variant='body1'>
												<strong>Giới tính: </strong>
												{applicationDetail?.user?.gender}
											</Typography>
											<Typography variant='body1'>
												<strong>Ngày sinh: </strong>
												{applicationDetail?.user?.dob}
											</Typography>
											<Typography variant='body1'>
												<strong>Facebook: </strong>
												{applicationDetail?.user?.facebookUrl ? (
													<Link
														passHref
														target='_blank'
														href={`${applicationDetail?.user?.facebookUrl}`}
													>
														<Button>Truy cập</Button>
													</Link>
												) : (
													''
												)}
											</Typography>
										</CardContent>
									</Card>
									<Card sx={{ marginTop: 5 }} variant='outlined'>
										<CardHeader title='Thông tin ứng tuyển' />
										<CardContent>
											<Typography variant='body1'>
												<strong>Ban ứng tuyển: </strong>
												{applicationDetail?.dept?.name}
											</Typography>
											<Typography variant='body1'>
												<strong>Ngày ứng tuyển: </strong>
												{applicationDetail?.engagement?.createdAt}
											</Typography>
											<Typography variant='body1'>
												<strong>Ngày cập nhật: </strong>
												{applicationDetail?.engagement?.updatedAt}
											</Typography>
										</CardContent>
									</Card>
								</div>
							</Grid>
							<Grid item xs={12} md={8}>
								<Card variant='outlined'>
									<Box sx={{ width: '100%', typography: 'body1' }}>
										<TabContext value={value}>
											<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
												<TabList onChange={handleChange} aria-label='lab API tabs example'>
													<Tab label='Xem CV' value='1' />
													<Tab label='Phỏng vấn' value='2' />
													<Tab label='Cập nhật trạng thái' value='3' />
												</TabList>
											</Box>
											<TabPanel value='1'>
												<CardContent>
													<Box sx={{ height: '70vh' }}>
														<Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
															<Viewer
																fileUrl={`http://localhost:8080${applicationDetail?.engagement?.cvUrl}`}
																plugins={[
																	defaultLayoutPluginInstance,
																	scrollModePluginInstance
																]}
																scrollMode={ScrollMode.Vertical}
															/>
														</Worker>
													</Box>
												</CardContent>
											</TabPanel>
											<TabPanel value='2'>
												<CardContent>
													<Chip
														icon={<AccessAlarmIcon />}
														label={'Tạo vào: ' + applicationDetail?.interview?.createdAt}
														sx={{
															height: 24,
															fontSize: '0.75rem',
															textTransform: 'capitalize',
															'& .MuiChip-label': { fontWeight: 500 }
														}}
														color='secondary'
													/>
													<Chip
														icon={<AccessAlarmIcon />}
														label={
															'Cập nhật vào: ' + applicationDetail?.interview?.updatedAt
														}
														sx={{
															height: 24,
															fontSize: '0.75rem',
															textTransform: 'capitalize',
															'& .MuiChip-label': { fontWeight: 500 },
															marginLeft: 2
														}}
														color='secondary'
													/>
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
													<Typography>
														Chỉ phê duyệt nếu bạn đồng ý cho ứng viên này chính thức trở
														thành thành viên của CLB. Bỏ trống nếu đang còn xem xét sau khi
														phỏng vấn.{' '}
													</Typography>
													<DialogActions>
														<Button variant='contained' onClick={handleSubmit}>
															Xác nhận
														</Button>
													</DialogActions>
												</CardContent>
											</TabPanel>
											<TabPanel value='3'>
												<CardContent>
													<Chip
														icon={<AccessAlarmIcon />}
														label={
															'Cập nhật vào: ' + applicationDetail?.engagement?.updatedAt
														}
														sx={{
															height: 24,
															fontSize: '0.75rem',
															textTransform: 'capitalize',
															'& .MuiChip-label': { fontWeight: 500 },
															marginLeft: 2
														}}
														color='secondary'
													/>
													<FormControl fullWidth sx={{ marginTop: 5 }}>
														<InputLabel id='demo-simple-select-label'>
															Trạng thái
														</InputLabel>
														<Select
															labelId='demo-simple-select-label'
															id='demo-simple-select'
															value={status}
															label='Trạng thái'
															onChange={event => setStatus(event.target.value)}
														>
															<MenuItem disabled value={0}>
																Đăng ký mới
															</MenuItem>
															<MenuItem disabled value={2}>
																Đang phỏng vấn
															</MenuItem>
															<MenuItem value={1}>Duyệt đơn</MenuItem>
															<MenuItem value={3}>Từ chối</MenuItem>
															<MenuItem value={4}>Drop out</MenuItem>
														</Select>
													</FormControl>
													<DialogActions>
														<Button variant='contained' onClick={handleStatusSubmit}>
															Xác nhận
														</Button>
													</DialogActions>
												</CardContent>
											</TabPanel>
										</TabContext>
									</Box>
								</Card>
							</Grid>
						</Grid>
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</div>
	)
}
