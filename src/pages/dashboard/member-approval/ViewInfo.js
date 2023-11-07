import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import {
	AppBar,
	Avatar,
	Box,
	Card,
	CardContent,
	CardHeader,
	Chip,
	Grid,
	IconButton,
	Toolbar,
	Typography
} from '@mui/material'
import Link from 'next/link'

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import { styled, useTheme } from '@mui/material/styles'
import { CloseCircleOutline, DotsVertical } from 'mdi-material-ui'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'

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

export default function ViewInfo({ applicationDetail, handleClose, open, statusObj = {} }) {
	// ** Hook
	const theme = useTheme()
	const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'
	const defaultLayoutPluginInstance = defaultLayoutPlugin()
	const scrollModePluginInstance = scrollModePlugin()

	return (
		<div>
			<Dialog open={open} onClose={handleClose} scroll='paper' fullScreen fullWidth>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant='h6' component='div'>
							<strong>
								Thông tin đơn tham gia của {applicationDetail?.user?.firstname}{' '}
								{applicationDetail?.user?.lastname}
							</strong>
						</Typography>
						<span>
							<Chip
								color={statusObj[applicationDetail?.engagement.status]?.color}
								label={'Tình trạng: ' + statusObj[applicationDetail?.engagement.status]?.label}
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
								label={'Gửi lúc: ' + applicationDetail?.engagement.createdAt}
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
									<Card variant='outlined'>
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
												{applicationDetail?.user.facebookUrl ? (
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
									<CardHeader title='Thông tin phỏng vấn' />
									<CardContent>
										{applicationDetail?.interview ? (
											<div>
												<Typography variant='body1'>
													<strong>Thời gian bắt đầu: </strong>
													{applicationDetail?.interview?.startTime}
												</Typography>
												<Typography variant='body1'>
													<strong>Thời gian kết thúc: </strong>
													{applicationDetail?.interview?.endTime}
												</Typography>
												<Typography variant='body1'>
													<strong>Nhận xét: </strong>
													{applicationDetail?.interview?.comment}
												</Typography>
												<Typography variant='body1'>
													<strong>Trạng thái: </strong>
													{applicationDetail?.interview?.isApproved ? (
														<CheckCircleIcon sx={{ color: 'green' }}></CheckCircleIcon>
													) : (
														<CancelIcon sx={{ color: 'red' }}></CancelIcon>
													)}
												</Typography>
												<Typography variant='body1'>
													<strong>Phê duyệt bởi: </strong>
													{applicationDetail?.interview?.approvedBy}
												</Typography>
												<Typography variant='body1'>
													<strong>Ngày cập nhật: </strong>
													{applicationDetail?.interview?.updatedAt}
												</Typography>
											</div>
										) : (
											'Chưa có thông tin'
										)}
									</CardContent>
								</Card>
								<Card sx={{ marginTop: 5 }} variant='outlined'>
									<CardHeader title='CV của ứng viên' />
									<CardContent>
										<Box sx={{ height: '85vh' }}>
											<Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
												<Viewer
													fileUrl={`${process.env.NEXT_PUBLIC_API_URL}${applicationDetail?.engagement?.cvUrl}`}
													plugins={[defaultLayoutPluginInstance, scrollModePluginInstance]}
													scrollMode={ScrollMode.Vertical}
												/>
											</Worker>
										</Box>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</div>
	)
}
