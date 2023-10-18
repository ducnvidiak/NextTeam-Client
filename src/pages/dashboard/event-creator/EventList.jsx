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
import StarIcon from '@mui/icons-material/Star'

import { useEffect, useState } from 'react'
import { getAPI } from 'src/ultis/requestAPI'
import { useCookies } from 'react-cookie'
import moment from 'moment'

import RegisterEventModal from './RegisterEventModal'
import SwipeableDrawerList from './SwipeableDrawerList'
import FeedbackModal from './FeedbackModal'
import EventManagement from './EventManagement'
import { mmddyyToDdmmyy, translateDayOfWeek } from 'src/ultis/dateTime'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

function EventItem({ event, setEventList, eventList, index }) {
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
				event={event}
				setEventList={setEventList}
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
			{new Date() > new Date(eventList[index]?.endTime) &&
				new Date() < new Date(eventList[index - 1]?.endTime) && (
					<Divider sx={{ marginTop: 5, color: 'green' }}>
						<Stack direction={'column'} alignItems={'center'} gap={2}>
							<Chip label='ĐÃ QUA' color='error' />
						</Stack>
					</Divider>
				)}
			<Stack direction={'row'} justifyContent={'space-between'} marginBottom={10}>
				<Stack direction={'column'} width={'15%'}>
					{new Date() > new Date(event?.endTime) && !event?.isApproved ? (
						<Chip label='Quá hạn' sx={{ mb: 4, fontSize: 16 }} color='error' />
					) : event?.isApproved == 'true' || event?.isApproved == true ? (
						<Chip label='Đã duyệt' sx={{ mb: 4, fontSize: 16 }} color='success' />
					) : (
						<Chip label='Đang chờ' sx={{ mb: 4, fontSize: 16 }} color='warning' />
					)}
					<Typography variant='h5'>{mmddyyToDdmmyy(moment(event?.startTime).format('L'))}</Typography>
					<Typography variant='h7'>{translateDayOfWeek(moment(event?.startTime).format('dddd'))}</Typography>
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
							<Typography variant='body1'>{event?.clubSubname}</Typography>
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
							Chi tiết
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

function EventList({ eventList, setEventList }) {
	return (
		<>
			<Container maxWidth={'lg'} sx={{ padding: '0 80px !important' }}>
				{eventList?.map((event, index) => (
					<EventItem
						key={event.id}
						event={event}
						setEventList={setEventList}
						index={index}
						eventList={eventList}
					></EventItem>
				))}
			</Container>
		</>
	)
}

export default EventList
