import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Chip,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Drawer,
	FormControl,
	InputLabel,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Stack,
	SwipeableDrawer,
	Typography
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Groups2Icon from '@mui/icons-material/Groups2'

import { useEffect, useState } from 'react'
import { getAPI } from 'src/ultis/requestAPI'
import { useCookies } from 'react-cookie'
import moment from 'moment'

require('moment/locale/vi')

import RegisterEventModal from './RegisterEventModal'
import SwipeableDrawerList from './SwipeableDrawerList'
import FeedbackModal from './FeedbackModal'
import EventManagement from './EventManagement'
import { getUserInfo } from 'src/utils/info'

function EventItem({ event }) {
	const [openRegisterModal, setOpenRegisterModal] = useState(false)
	const [openFeedbackModal, setOpenFeedbackModal] = useState(false)
	const [openEventManagememntModal, setOpenEventManagememntModal] = useState(false)

	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false
	})

	const toggleDrawer = (anchor, open) => event => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}

		setState({ ...state, [anchor]: open })
	}

	return (
		<>
			<RegisterEventModal
				event={event}
				openRegisterModal={openRegisterModal}
				setOpenRegisterModal={setOpenRegisterModal}
			></RegisterEventModal>
			<FeedbackModal
				openFeedbackModal={openFeedbackModal}
				setOpenFeedbackModal={setOpenFeedbackModal}
			></FeedbackModal>
			<EventManagement
				openEventManagememntModal={openEventManagememntModal}
				setOpenEventManagememntModal={setOpenEventManagememntModal}
			></EventManagement>
			{['left', 'right', 'top', 'bottom'].map(anchor => (
				<>
					<SwipeableDrawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
						onOpen={toggleDrawer(anchor, true)}
					>
						<SwipeableDrawerList
							anchor={anchor}
							event={event}
							setOpenRegisterModal={setOpenRegisterModal}
							toggleDrawer={toggleDrawer}
							setOpenFeedbackModal={setOpenFeedbackModal}
						></SwipeableDrawerList>
					</SwipeableDrawer>
				</>
			))}
			<Stack direction={'row'} justifyContent={'space-between'} marginBottom={10}>
				<Stack direction={'column'} width={'15%'}>
					<Chip label='Đã duyệt' sx={{ mb: 4, fontSize: 16 }} color='success' />
					<Typography variant='h5'>{moment(event?.startTime).format('MMM Do YY')}</Typography>
					<Typography variant='h7'>{moment(event?.startTime).format('dddd').toUpperCase()}</Typography>
				</Stack>
				<Card
					sx={{ width: '75%', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
					marginBottom={10}

					// onClick={toggleDrawer('right', true)}
				>
					<CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
						<Typography variant='h7' sx={{ opacity: 0.7 }}>
							{moment(event?.startTime).format('LT')}
						</Typography>
						<Typography variant='h6' fontWeight={700} sx={{ flex: 1 }}>
							{event?.name}
						</Typography>

						<Box sx={{ display: 'flex', gap: 4 }}>
							<Groups2Icon></Groups2Icon>
							<Typography variant='body1'>
								{event?.clubId === 0 ? 'IC-PDPD' : event?.clubSubname}
							</Typography>
						</Box>
						<Box sx={{ display: 'flex', gap: 4 }}>
							<LocationOnIcon></LocationOnIcon>
							<Typography variant='body1'>{event?.locationName}</Typography>
						</Box>

						<Button
							variant='contained'
							fullWidth
							sx={{ marginTop: 4 }}
							onClick={() => setOpenEventManagememntModal(true)}
						>
							Chỉnh sửa
						</Button>
					</CardContent>
					<img
						src={event.bannerUrl}
						alt=''
						style={{
							width: '300px',
							objectFit: 'cover'
						}}
					/>
				</Card>
			</Stack>
		</>
	)
}

function EventList() {
	const [eventList, setEventList] = useState()
	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const [userData, setUserData] = useState()
	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/events?userId=${userData.id}`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				setEventList(data)
			})
			.catch(error => console.error('Error:', error))
	}, [userData])

	return (
		<>
			<Container maxWidth={'lg'} sx={{ padding: '0 80px !important' }}>
				{eventList?.map((event, index) => (
					<EventItem key={event.id} event={event}></EventItem>
				))}
			</Container>
		</>
	)
}

export default EventList
