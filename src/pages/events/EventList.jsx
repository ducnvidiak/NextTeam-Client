import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
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
import { getUserInfo } from 'src/utils/info'
import { mmddyyToDdmmyy, translateDayOfWeek } from 'src/ultis/dateTime'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

function EventItem({ event, setEventList, eventList, userData }) {
	const [openRegisterModal, setOpenRegisterModal] = useState(false)
	const [openFeedbackModal, setOpenFeedbackModal] = useState(false)
	const router = useRouter()

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
			<FeedbackModal
				openFeedbackModal={openFeedbackModal}
				setOpenFeedbackModal={setOpenFeedbackModal}
				event={event}
				userData={userData}
				setEventList={setEventList}
			></FeedbackModal>
			<RegisterEventModal
				event={event}
				openRegisterModal={openRegisterModal}
				setOpenRegisterModal={setOpenRegisterModal}
				setState={setState}
				state={state}
				setEventList={setEventList}
			></RegisterEventModal>
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
							setOpenFeedbackModal={setOpenFeedbackModal}
							toggleDrawer={toggleDrawer}
							userData={userData}
						></SwipeableDrawerList>
					</SwipeableDrawer>
				</>
			))}
			<Stack direction={'row'} justifyContent={'space-between'} marginBottom={10}>
				<Stack direction={'column'} width={'15%'}>
					<Typography variant='h5'>{mmddyyToDdmmyy(moment(event?.startTime).format('L'))}</Typography>
					<Typography variant='h7'>{translateDayOfWeek(moment(event?.startTime).format('dddd'))}</Typography>

					{new Date() > new Date(event?.endTime) ? (
						<>
							<Typography variant='h7' mt={4}>
								Đánh giá: {event?.avgRating}
							</Typography>
							<Stack direction={'row'}>
								{[1, 2, 3, 4, 5].map((value, index) =>
									value <= event?.avgRating.toFixed() ? (
										<StarIcon key={index} color='primary'></StarIcon>
									) : (
										<StarIcon key={index}></StarIcon>
									)
								)}
							</Stack>
						</>
					) : null}
				</Stack>
				<Card sx={{ width: '75%', display: 'flex', justifyContent: 'space-between' }} marginBottom={10}>
					<CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
						<Typography variant='h7' sx={{ opacity: 0.7 }}>
							{`${moment(event?.startTime).format('LT')} - ${moment(event?.endTime).format('LT')}`}
						</Typography>
						<Typography
							variant='h6'
							fontWeight={700}
							sx={{ flex: 1, cursor: 'pointer' }}
							onClick={toggleDrawer('right', true)}
						>
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
						{new Date() > new Date(event?.endTime) ? (
							<>
								<Button variant='outlined' color='secondary' disabled fullWidth sx={{ marginTop: 4 }}>
									Sự kiện đã kết thúc
								</Button>
							</>
						) : event?.isRegistered == 'true' || event?.isRegistered == true ? (
							<Button variant='outlined' fullWidth sx={{ marginTop: 4 }}>
								Đã đăng ký
							</Button>
						) : (
							<Button
								variant='contained'
								fullWidth
								sx={{ marginTop: 4 }}
								onClick={() => (userData?.id ? setOpenRegisterModal(true) : router.push('/auth/login'))}
							>
								Đăng ký
							</Button>
						)}
					</CardContent>
					<img
						src={event.bannerUrl}
						alt=''
						style={{
							width: '300px',
							objectFit: 'cover',
							cursor: 'pointer'
						}}
						onClick={toggleDrawer('right', true)}
					/>
				</Card>
			</Stack>
		</>
	)
}

function EventList({ filter }) {
	const [eventList, setEventList] = useState()
	const [eventListFiltered, setEventListFiltered] = useState()

	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const [userData, setUserData] = useState()
	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	useEffect(() => {
		if (!userData) return
		fetch(`http://localhost:8080/events?cmd=list&userId=${userData?.id}`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				console.log(data);
				setEventList(data)
			})
			.catch(error => console.error('Error:', error))
	}, [userData])

	useEffect(() => {
		switch (filter) {
			case 'all':
				setEventListFiltered(eventList)

				return
			case 'registered':
				setEventListFiltered(eventList?.filter(event => event?.isRegistered))

				return
			case 'upcoming':
				setEventListFiltered(eventList?.filter(event => new Date() < new Date(event?.startTime)))

				return
			case 'past':
				setEventListFiltered(eventList?.filter(event => new Date() > new Date(event?.endTime)))

				return
			default:
				return
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter])

	useEffect(() => {
		setEventListFiltered(eventList)
	}, [eventList])


	return (
		<>
			<Container maxWidth={'lg'} sx={{ padding: '0 80px !important' }}>
				{eventListFiltered?.map((event, index) => (
					<EventItem
						key={event.id}
						event={event}
						setEventList={setEventList}
						eventList={eventList}
						userData={userData}
					></EventItem>
				))}
			</Container>
		</>
	)
}

export default EventList
