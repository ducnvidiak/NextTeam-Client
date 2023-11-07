// ** React Imports
import { useState, Fragment } from 'react'

// ** React Imports
import { useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu from '@mui/material/Menu'
import MuiAvatar from '@mui/material/Avatar'
import MuiMenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'

// ** Icons Imports
import BellOutline from 'mdi-material-ui/BellOutline'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import { getUserInfo } from 'src/utils/info'
import NotificationDetail from 'src/pages/dashboard/notifications/NotificationDetail'
import moment from 'moment/moment'

// ** Styled Menu component
const Menu = styled(MuiMenu)(({ theme }) => ({
	'& .MuiMenu-paper': {
		width: 380,
		overflow: 'hidden',
		marginTop: theme.spacing(4),
		[theme.breakpoints.down('sm')]: {
			width: '100%'
		}
	},
	'& .MuiMenu-list': {
		padding: 0
	}
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
	paddingTop: theme.spacing(3),
	paddingBottom: theme.spacing(3),
	borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
	maxHeight: 349,
	'& .MuiMenuItem-root:last-of-type': {
		border: 0
	}
}

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
	...styles
})

// ** Styled Avatar component
const Avatar = styled(MuiAvatar)({
	width: '2.375rem',
	height: '2.375rem',
	fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)(({ theme }) => ({
	fontWeight: 600,
	flex: '1 1 100%',
	overflow: 'hidden',
	fontSize: '0.875rem',
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
	marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)({
	flex: '1 1 100%',
	overflow: 'hidden',
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis'
})

const NotificationDropdown = () => {
	// ** States
	const [anchorEl, setAnchorEl] = useState(null)
	const [state, dispatch] = useReducer((state, action) => action, 0)
	const router = useRouter()
	const [notificationsData, setNotificationsData] = useState([])
	const [cookies, setCookie] = useCookies(['clubData', 'userData'])
	const [notificationDetail, setNotificationDetail] = useState()

	console.log(notificationsData)

	//modal
	const [open, setOpen] = useState(false)
	const [scroll, setScroll] = useState('paper')

	const [countUnview, setCountUnview] = useState(0)
	const [userData, setUserData] = useState()
	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	for (let i = 0; i < notificationsData.length; i++) {
		if (!notificationsData[i].hasSeen) {
			countUnview++
		}
	}

	// ** Hook
	const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

	const handleDropdownOpen = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleDropdownClose = () => {
		setAnchorEl(null)
	}

	const ScrollWrapper = ({ children }) => {
		if (hidden) {
			return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
		} else {
			return (
				<PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>
					{children}
				</PerfectScrollbar>
			)
		}
	}

	const statusObj = {
		private: { color: 'primary', label: 'Cá nhân' },
		public: { color: 'success', label: 'CLB' },
		wide: { color: 'warning', label: 'Chung' }
	}

	useEffect(() => {
		if (cookies['clubData'] != null) {
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
				})
				.catch(error => console.error('Error:', error))
		} else {
			fetch('http://localhost:8080/notification?action=list-wide-noti', {
				method: 'GET',
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			})
				.then(function (response) {
					return response.json()
				})
				.then(function (data) {
					setNotificationsData(data)
				})
				.catch(error => console.error('Error:', error))
		}
	}, [cookies, userData?.id])

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
			} else {
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

	function handleClickOpen(id, title, content, type, createdAt, hasSeen) {
		console.log('Hi')
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

	return (
		<Fragment>
			<IconButton
				color='inherit'
				aria-haspopup='true'
				onClick={handleDropdownOpen}
				aria-controls='customized-menu'
			>
				<Badge badgeContent={countUnview} color='primary'>
					<BellOutline />
				</Badge>
			</IconButton>

			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleDropdownClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<MenuItem disableRipple>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
						<Typography sx={{ fontWeight: 600 }}>Thông báo</Typography>
						<Chip
							size='small'
							label={countUnview + ' chưa đọc'}
							color='primary'
							sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
						/>
					</Box>
				</MenuItem>
				<NotificationDetail
					notificationDetail={notificationDetail}
					handleClickOpen={handleClickOpen}
					open={open}
					setOpen={setOpen}
					handleClose={handleClose}
				></NotificationDetail>
				<ScrollWrapper>
					{notificationsData.map(notification => {
						return (
							<MenuItem
								key={notification.id}
								onClick={() => {
									handleClickOpen(
										notification?.id,
										notification?.title,
										notification?.content,
										notification?.type,
										notification?.createdAt,
										notification?.hasSeen
									)
								}}
							>
								<Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
									<Box
										sx={{
											mx: 4,
											flex: '1 1',
											display: 'flex',
											overflow: 'hidden',
											flexDirection: 'column'
										}}
									>
										<MenuItemTitle>{notification.title}</MenuItemTitle>
										<MenuItemSubtitle variant='caption'>
											<span>
												{notification.type ? (
													<Chip
														label={statusObj?.[notification.type]?.label}
														color={statusObj?.[notification.type]?.color}
														sx={{
															height: 24,
															fontSize: '0.75rem',
															textTransform: 'capitalize',
															'& .MuiChip-label': { fontWeight: 500 }
														}}
													/>
												) : (
													<Chip
														label='Chung'
														color='warning'
														sx={{
															height: 24,
															fontSize: '0.75rem',
															textTransform: 'capitalize',
															'& .MuiChip-label': { fontWeight: 500 }
														}}
													/>
												)}
											</span>{' '}
											{moment(notification?.createdAt).format('DD/MM/YY, h:mm A')}
										</MenuItemSubtitle>
									</Box>
									<Typography variant='caption' sx={{ color: 'text.disabled' }}></Typography>
								</Box>
							</MenuItem>
						)
					})}
				</ScrollWrapper>
				<MenuItem
					disableRipple
					sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
				>
					{cookies['clubData'] != null ? (
						<Button fullWidth variant='contained' onClick={() => router.push('/dashboard/notifications')}>
							Xem chi tiết thông báo
						</Button>
					) : (
						''
					)}
				</MenuItem>
			</Menu>
		</Fragment>
	)
}

export default NotificationDropdown
