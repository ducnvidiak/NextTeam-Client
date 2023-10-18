import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { Avatar, Box, Card, CardContent, CardHeader, Chip, Grid, Typography } from '@mui/material'
import Link from 'next/link'

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import { styled, useTheme } from '@mui/material/styles'
import { DotsVertical } from 'mdi-material-ui'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'

// Import the main component
import { Worker } from '@react-pdf-viewer/core'
import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core'

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

export default function ViewInfo({ applicationDetail, handleClose, open, statusObj }) {
	// ** Hook
	const theme = useTheme()
	const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

	return (
		<div>
			<Dialog open={open} onClose={handleClose} scroll='paper' maxWidth='lg' fullWidth>
				<DialogTitle id='scroll-dialog-title'>
					<strong>
						Thông tin đơn tham gia của {applicationDetail?.user?.firstname}{' '}
						{applicationDetail?.user?.lastname}
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
												<Link passHref target='_blank' href={`${applicationDetail?.user.facebookUrl}`}>
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
									<CardHeader title='Thông tin phỏng vấn' />
									<CardContent>
										{applicationDetail?.interview ? (
											<div>
												<Typography variant='body1'>
													<strong>Thời gian bắt đầu: </strong>
													{applicationDetail?.interview.startTime}
												</Typography>
												<Typography variant='body1'>
													<strong>Thời gian kết thúc: </strong>
													{applicationDetail?.interview.endTime}
												</Typography>
												<Typography variant='body1'>
													<strong>Nhận xét: </strong>
													{applicationDetail?.interview.comment}
												</Typography>
												<Typography variant='body1'>
													<strong>Trạng thái: </strong>
													{applicationDetail?.interview.isApproved ? (
														<CheckCircleIcon sx={{ color: 'green' }}></CheckCircleIcon>
													) : (
														<CancelIcon sx={{ color: 'red' }}></CancelIcon>
													)}
												</Typography>
												<Typography variant='body1'>
													<strong>Phê duyệt bởi: </strong>
													{applicationDetail?.interview.approvedBy}
												</Typography>
												<Typography variant='body1'>
													<strong>Ngày cập nhật: </strong>
													{applicationDetail?.interview.updatedAt}
												</Typography>
											</div>
										) : (
											'Chưa có thông tin'
										)}
									</CardContent>
								</Card>
								<Card sx={{ marginTop: 5 }}>
									<CardHeader title='CV của ứng viên' />
									<CardContent>
										<Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
											<Viewer
												fileUrl={`http://localhost:8080${applicationDetail?.engagement.cvUrl}`}
												defaultScale={SpecialZoomLevel.PageFit}
											/>
										</Worker>
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
