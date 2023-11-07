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
	FormControl,
	InputLabel,
	MenuItem,
	Select
} from '@mui/material'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import Groups2Icon from '@mui/icons-material/Groups2'
import CakeIcon from '@mui/icons-material/Cake'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CloseIcon from '@mui/icons-material/Close'
import InfoIcon from '@mui/icons-material/Info'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import ClubCategory from 'src/components/ClubCategory'
import moment from 'moment'
import { useRouter } from 'next/router'
import { getUserInfo } from 'src/utils/info'
import RegisterClub from './RegisterClub'

require('moment/locale/vi')

function EventItem({ bannerUrl, name, clubSubname, locationName, description, time }) {
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
					src={bannerUrl}
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
						{name}
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
								{clubSubname}
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
								{locationName}
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
					<Typography sx={'body1'}>{description}</Typography>
				</CardContent>
			</Card>
			<Button variant='contained' fullWidth sx={{ marginTop: 4 }}>
				Đăng ký
			</Button>
		</Box>
	)

	return (
		<>
			{['left', 'right', 'top', 'bottom'].map(anchor => (
				<>
					<SwipeableDrawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
						onOpen={toggleDrawer(anchor, true)}
					>
						{list(anchor)}
					</SwipeableDrawer>
				</>
			))}
			<Stack direction={'row'} justifyContent={'space-between'} marginBottom={10}>
				<Stack direction={'column'} width={'15%'}>
					<Typography variant='h5'>{moment(time).format('MMM')}</Typography>
					<Typography variant='h7'>{moment(time).format('dddd').toUpperCase()}</Typography>
				</Stack>
				<Card
					sx={{ width: '75%', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
					marginBottom={10}
					onClick={toggleDrawer('right', true)}
				>
					<CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
						<Typography variant='h7' sx={{ opacity: 0.7 }}>
							{moment(time).format('LT')}
						</Typography>
						<Typography variant='h6' fontWeight={700} sx={{ flex: 1 }}>
							{name}
						</Typography>
						<Box sx={{ display: 'flex', gap: 4 }}>
							<Groups2Icon></Groups2Icon>
							<Typography variant='body1'>{locationName}</Typography>
						</Box>
						<Box sx={{ display: 'flex', gap: 4 }}>
							<LocationOnIcon></LocationOnIcon>
							<Typography variant='body1'>FU-DEVER</Typography>
						</Box>
					</CardContent>
					<img
						src={bannerUrl}
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

function ClubPage() {
	const [club, setClub] = useState({})
	const [events, setEvents] = useState([])
	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const [userData, setUserData] = useState()
	const [open, setOpen] = useState(false)
	const [clubId, setClubId] = useState()
	const [loading, setLoading] = useState(false)

	const formattedDate = moment(club?.createdAt).format('LL')

	const handleClose = () => {
		setOpen(false)
	}

	const [userId, setUserId] = useState()

	useEffect(() => {
		;(async () => setUserId((await getUserInfo(cookies['userData']))?.id))()
	}, [cookies])

	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	const router = useRouter()

	const handleClickOpen = clubId => {
		if (userId) {
			setClubId(clubId)
			callAPIDepartment(clubId)
			setOpen(true)
		} else {
			router.push('/auth/login')
		}
	}

	useEffect(() => {
		let url_query = ''
		console.log('subname', router.query.clubId)
		if (userData?.id == undefined) {
			url_query = `http://localhost:8080/club-detail?subname=${router.query.clubId}`
		} else {
			url_query = `http://localhost:8080/club-detail?subname=${router.query.clubId}&userId=${userData?.id}`
		}
		fetch(url_query, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				setClub(data)
				getAPIEvents()
			})
			.catch(error => console.error('Error:', error))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData, router.query.clubId])

	console.log('Club', club)

	const getAPIEvents = useEffect(() => {
		let url_query = `http://localhost:8080/events-club?clubId=${club.id}`
		console.log('test', url_query)
		fetch(url_query, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				setEvents(data)
			})
			.catch(error => console.error('Error:', error))
	}, [club])

	console.log('events', events)

	return (
		<Container maxWidth='lg' sx={{ marginTop: 20 }}>
			<RegisterClub clubId={club.id} userId={userId} isOpen={open} handleClose={handleClose} />

			<Card>
				<img
					src={club?.bannerUrl}
					alt=''
					style={{
						width: '100%',
						objectFit: 'cover',
						display: 'block'
					}}
				/>
				<CardContent sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
					<Card sx={{ height: '140px', width: '140px' }}>
						<img
							src={club?.avatarUrl}
							alt=''
							width={'100%'}
							height={'100%'}
							style={{ objectFit: 'cover' }}
						/>
					</Card>
					<Stack direction={'column'} flex={1}>
						<Typography variant='h7' sx={{ opacity: 0.7 }}>
							{club?.subname}
						</Typography>
						<Typography variant='h5' fontWeight={700} sx={{}}>
							{club?.name}
						</Typography>
						<ClubCategory categoryId={club?.categoryId}></ClubCategory>
						<Box mt={5}>
							<Typography
								variant='body1'
								sx={{
									flex: 1,
									overflow: 'hidden',
									display: '-webkit-box',
									WebkitBoxOrient: 'vertical',
									WebkitLineClamp: 3,
									whiteSpace: 'pre-wrap'
								}}
							>
								{club.description}
							</Typography>
						</Box>
						<Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
							<Stack direction={'row'} gap={12}>
								<Box sx={{ display: 'flex', gap: 4 }}>
									<Groups2Icon></Groups2Icon>
									<Typography variant='body1'>{club?.numberOfMembers} thành viên</Typography>
								</Box>

								<Box sx={{ display: 'flex', gap: 4 }}>
									<CakeIcon></CakeIcon>
									<Typography variant='body1'>{formattedDate}</Typography>
								</Box>
							</Stack>
							{club?.isJoined ? (
								<Button
									variant='outlined'
									color='secondary'
									sx={{ marginTop: 4, width: '50%' }}
									onClick={() => handleClickOpen(club.id)}
									disabled
								>
									Đã tham gia
								</Button>
							) : (
								<Button
									variant='outlined'
									sx={{ marginTop: 4, width: '50%' }}
									onClick={() => handleClickOpen(club.id)}
								>
									Đăng ký tham gia
								</Button>
							)}
						</Stack>
					</Stack>
				</CardContent>
			</Card>
			<Container maxWidth='lg' sx={{ marginTop: 20 }}>
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'} marginBottom={10}>
					<Typography fontSize={32} fontWeight={600}>
						CÁC SỰ KIỆN
					</Typography>
				</Stack>
				<Container maxWidth={'lg'} sx={{ padding: '0 80px !important' }}>
					{events?.map((event, index) => (
						<EventItem
							key={index}
							bannerUrl={event.bannerUrl}
							name={event.name}
							clubSubname={event.clubSubname}
							locationName={event.locationName}
							description={event.description}
							time={event.startTime}
						></EventItem>
					))}
				</Container>
			</Container>
		</Container>
	)
}

export default ClubPage
