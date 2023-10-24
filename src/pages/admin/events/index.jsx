import { useState, useEffect, Fragment } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import classes from './styles.module.scss'
import { useCookies } from 'react-cookie'

import {
	Card,
	Box,
	CardContent,
	Container,
	Stack,
	Typography,
	Button,
	Divider,
	SwipeableDrawer,
	Drawer,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Chip
} from '@mui/material'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'

import InfoIcon from '@mui/icons-material/Info'
import Groups2Icon from '@mui/icons-material/Groups2'
import CakeIcon from '@mui/icons-material/Cake'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CloseIcon from '@mui/icons-material/Close'

import { getAllEvents, updateEventStatus } from 'src/api-utils/apiUtils'
import { toast } from 'react-toastify'

export default function EventDashboard() {
	const [events, setEvents] = useState([])
	const [selectedEvent, setSelectedEvent] = useState(null)
	const [cookies, setCookie] = useCookies(['clubData'])

	console.log('club id: ', cookies['clubData']?.clubId)
	const clubId = cookies['clubData']?.clubId

	useEffect(() => {
		getAllEvents().then(response => {
			setEvents(response)
			console.log(response)
		})
	}, [])

	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false
	})

	const filteredEvents = events.filter(event => event.clubId == clubId)

	const toggleDrawer = (anchor, open) => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}

		setState({ ...state, [anchor]: open })
	}

	const list = anchor => (
		<Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500, padding: 4 }} role='presentation'>
			<Stack direction={'row'} marginBottom={2}>
				<Button variant='text'>
					<CloseIcon onClick={toggleDrawer(anchor, false)}></CloseIcon>
				</Button>
			</Stack>
			{/* <Divider /> */}
			<Card sx={{ padding: 2 }}>
				<img
					src={selectedEvent?.bannerUrl}
					alt=''
					style={{
						height: '300px',
						width: '100%',
						objectFit: 'cover',
						borderRadius: 8,
						display: 'block'
					}}
				></img>
				<CardContent sx={{ padding: 4 }}>
					<Typography variant='h6' fontWeight={700} marginBottom={4}>
						{selectedEvent?.name}
					</Typography>
					<Box sx={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 2 }}>
						<Box sx={{ padding: '6px 8px 2px', border: '1px solid #ddd', borderRadius: 1 }}>
							<Groups2Icon></Groups2Icon>
						</Box>
						<Box>
							<Typography variant='body2' fontWeight={500}>
								Tổ chức
							</Typography>
							<Typography variant='body1' fontWeight={600}>
								{selectedEvent?.clubSubname}
							</Typography>
						</Box>
					</Box>
					<Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
						<Box sx={{ padding: '6px 8px 2px', border: '1px solid #ddd', borderRadius: 1 }}>
							<LocationOnIcon></LocationOnIcon>
						</Box>
						<Box>
							<Typography variant='body2' fontWeight={500}>
								Tại
							</Typography>
							<Typography variant='body1' fontWeight={600}>
								{selectedEvent?.locationName}
							</Typography>
						</Box>
					</Box>
				</CardContent>
			</Card>
			<Card sx={{ marginTop: 4 }}>
				<Stack direction={'row'} alignItems={'flex-end'} gap={2} padding={2}>
					<InfoIcon sx={{ marginBottom: 1 }}></InfoIcon>
					<Typography variant='h6' fontWeight={700}>
						Mô tả sự kiện
					</Typography>
				</Stack>
				<Divider sx={{ margin: 0 }}></Divider>
				<CardContent sx={{ padding: 6 }}>
					<Typography sx={'body1'}>{selectedEvent?.description}</Typography>
				</CardContent>
			</Card>
			{/* <Button variant='contained' fullWidth sx={{ marginTop: 4 }}>
				Đăng ký
			</Button> */}
		</Box>
	)

	const handleUpdateStatus = (uevent, status) => {
		updateEventStatus(uevent.id, status).then(response => {
			if (response?.status == 'success') {
				const updateEvents = events.map(event => {
					if (event.id != uevent.id) return event
					else return { ...event, isApproved: status }
				})
				toast.success('Đã cập nhật')
				setEvents(updateEvents)
			} else {
				toast.error('Vui lòng thử lại sau')
			}
		})
	}

	return (
		<Fragment>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Câu lạc bộ</TableCell>
							<TableCell align='left'>Sự kiện</TableCell>

							<TableCell align='center'>Thời gian/ Địa điểm</TableCell>
							<TableCell align='center'>Trạng thái</TableCell>
							<TableCell align='center'>Hành động</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{events?.map(event => (
							<TableRow key={event.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell component='th' scope='row' sx={{ width: '120px' }}>
									{event.clubSubname}
								</TableCell>
								<TableCell align='left'>{event.name}</TableCell>

								<TableCell align='left' sx={{ width: '250px' }}>
									{event.startTime} tới {event.endTime} tại {event.locationName}
								</TableCell>
								<TableCell align='left' sx={{ width: '30px' }}>
									<Chip
										label={event.isApproved}
										color={
											event.isApproved == 'accepted'
												? 'success'
												: event.isApproved == 'rejected'
												? 'error'
												: 'primary'
										}
									/>
								</TableCell>
								<TableCell
									align='center'
									sx={{
										width: '450px',
										gap: '10px'
									}}
								>
									<Button
										variant='contained'
										size='small'
										sx={{ marginRight: '10px' }}
										onClick={e => {
											setSelectedEvent(event)
											toggleDrawer('right', true)(e)
										}}
									>
										Xem chi tiết
									</Button>
									<Button
										variant='contained'
										size='small'
										sx={{ marginRight: '10px' }}
										onClick={() => {
											handleUpdateStatus(event, 'accepted')
										}}
									>
										Chấp nhận
									</Button>
									<Button
										variant='outlined'
										size='small'
										onClick={() => {
											handleUpdateStatus(event, 'rejected')
										}}
									>
										Từ chối
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{['left', 'right', 'top', 'bottom'].map(anchor => (
				<Fragment key={anchor}>
					<Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
						{list(anchor)}
					</Drawer>
				</Fragment>
			))}
		</Fragment>
	)
}
