// ** React Imports
import { useEffect, useState, useReducer } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

// ** MUI Imports
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import CardHeader from '@mui/material/CardHeader'
import TablePagination from '@mui/material/TablePagination'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { Chip } from '@mui/material'
import NotificationDetail from './NotificationDetail'
import { getUserInfo } from 'src/utils/info'
import moment from 'moment/moment'

const Notifications = () => {
	const [state, dispatch] = useReducer((state, action) => action, 0)
	const router = useRouter()
	const [notificationsData, setNotificationsData] = useState([])
	const [cookies, setCookie] = useCookies(['clubData', 'userData'])
	const [notificationDetail, setNotificationDetail] = useState()
	const [countUnview, setCountUnview] = useState(0)
	const [userData, setUserData] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	for (let i = 0; i < notificationsData.length; i++) {
		if (!notificationsData[i].hasSeen) {
			countUnview++
		}
	}

	//modal
	const [open, setOpen] = useState(false)
	const [scroll, setScroll] = useState('paper')

	function handleClickOpen(id, title, content, type, createdAt, hasSeen) {
		setNotificationDetail({
			id: id,
			title: title,
			content: content,
			type: type,
			createdAt: createdAt
		})
		setOpen(true)
		updateView(id, type, hasSeen)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const cardStyle = {
		margin: '10px' // Thiết lập margin 10px
	}

	const handleSubmit = event => {
		router.push('/dashboard/notifications/view-all')
	}

	const statusObj = {
		private: { color: 'primary', label: 'Cá nhân' },
		public: { color: 'success', label: 'CLB' },
		wide: { color: 'warning', label: 'Chung' }
	}

	const updateView = (id, type, hasSeen) => {
		if (hasSeen == 0) {
			if (type == 'private') {
				fetch('http://localhost:8080/notification?action=update-view-private-email&id=' + id, {
					method: 'GET',
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				})
					.then(function (response) {
						return response.json()
					})
					.then(function (data) {
						
						dispatch({ type: 'trigger' })
					})
					.catch(error => console.error('Error:', error))
			}
			if (type == 'public') {
				fetch(
					'http://localhost:8080/notification?action=update-view-public-email&id=' +
						id +
						'&userId=' +
						userData.id,
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
						
						dispatch({ type: 'trigger' })
					})
					.catch(error => console.error('Error:', error))
			}
		}
	}

	useEffect(() => {
		if (userData)
			fetch(
				'http://localhost:8080/notification?action=list-10-noti&clubId=' +
					cookies['clubData']?.clubId +
					'&userId=' +
					userData?.id,
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
					setNotificationsData(data)
					setLoading(false)
				})
				.catch(error => console.error('Error:', error))
	}, [cookies, userData, state])

	return (
		<Grid item xs={12} style={{ height: '100%' }}>
			<Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 100 }} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<NotificationDetail
				notificationDetail={notificationDetail}
				handleClickOpen={handleClickOpen}
				open={open}
				setOpen={setOpen}
				handleClose={handleClose}
			></NotificationDetail>
			<Card style={{ height: '100%' }}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingRight: '10px'
					}}
				>
					<CardHeader title='Thông báo' titleTypographyProps={{ variant: 'h6' }} />

					<Button variant='contained' onClick={e => handleSubmit(e)}>
						Xem tất cả
					</Button>
				</div>
				<CardContent>
					{notificationsData.map(notification => {
						return (
							<Card
								key={notification.id}
								sx={{ ...cardStyle, borderLeft: 4, borderColor: 'primary.main' }}
							>
								<CardContent
									onClick={() =>
										handleClickOpen(
											notification.id,
											notification.title,
											notification.content,
											notification.type,
											notification.createdAt,
											notification.hasSeen
										)
									}
								>
									<Grid container spacing={0}>
										<Grid item xs={4} md={2}>
											{moment(notification.createdAt).format('DD/MM/YY, h:mm A')}
										</Grid>
										<Grid item xs={8} md={10}>
											<Typography variant='body1' style={{ fontWeight: 'bold' }}>
												{notification.title}
												{notification.hasSeen == 0 ? (
													<span>
														<Chip
															label='Mới'
															sx={{
																height: 24,
																fontSize: '0.75rem',
																textTransform: 'capitalize',
																'& .MuiChip-label': { fontWeight: 500 },
																marginLeft: 2
															}}
															color='error'
														/>
													</span>
												) : (
													''
												)}
											</Typography>
											<Chip
												label={statusObj[notification.type].label}
												color={statusObj[notification.type].color}
												sx={{
													height: 24,
													fontSize: '0.75rem',
													textTransform: 'capitalize',
													'& .MuiChip-label': { fontWeight: 500 }
												}}
											/>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						)
					})}
				</CardContent>
			</Card>
		</Grid>
	)
}

export default Notifications
