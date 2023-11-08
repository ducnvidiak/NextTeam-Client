import {
	Autocomplete,
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
	styled
} from '@mui/material'
import axios from 'axios'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Groups2Icon from '@mui/icons-material/Groups2'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'
import CakeIcon from '@mui/icons-material/Cake'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getAPI } from 'src/ultis/requestAPI'
import ClubCategory from 'src/components/ClubCategory'
import moment from 'moment'
import { useCookies } from 'react-cookie'
import { getUserInfo } from 'src/utils/info'
import { useRouter } from 'next/router'
import RegisterClub from './RegisterClub'

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1
})

function ClubItem({ club, index }) {
	const router = useRouter()

	const [open, setOpen] = useState(false)
	const [department, setDepartment] = useState([])
	const [loading, setLoading] = useState(true)
	const [cookies, setCookies] = useCookies(['userData'])

	//formData
	const [departmentId, setDepartmentId] = useState('')
	const [clubId, setClubId] = useState()
	const [cv, setCv] = useState()
	const [userId, setUserId] = useState()

	useEffect(() => {
		(async () => setUserId((await getUserInfo(cookies['userData'])).id))()
	}, [cookies])

	const handleClick = () => {
		router.push(`/clubs/${club.subname}`)
	}

	
	const handleClickOpen = clubId => {
		if (userId) {
			setClubId(clubId)
			setOpen(true)
		} else {
			router.push('/auth/login')
		}
	}

	const handleClose = () => {
		setOpen(false)
	}

	const [age, setAge] = useState('')

	const handleChange = event => {
		setAge(event.target.value)
	}

	const dateString = club.createdAt

	// Create Date object from the string
	const date = new Date(dateString)

	// Define options for toLocaleDateString
	const options = { year: 'numeric', month: 'short', day: 'numeric' }

	// Format the date
	const formattedDate = date.toLocaleDateString('en-US', options)

	return (
		<>
			


			<RegisterClub clubId={clubId} userId={userId} isOpen={open} handleClose={handleClose} />

			<Stack direction={'row'} justifyContent={'space-between'} mb={10}>
				<Stack direction={'column'} width={'5%'}>
					<Typography variant='h5'>{index + 1}.</Typography>
				</Stack>
				<Card sx={{ width: '95%', display: 'flex' }} mb={10}>
					<img
						src={club.avatarUrl}
						alt=''
						style={{
							width: '300px',
							height: '300px',
							objectFit: 'cover'
						}}
					/>
					<CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
						<Typography variant='h7' sx={{ opacity: 0.7 }}>
							{club?.subname}
						</Typography>
						<Typography variant='h5' fontWeight={700} sx={{}} textTransform={'uppercase'}>
							{club?.name}
						</Typography>
						<Box sx={{ display: 'flex', gap: 4, marginBottom: 4 }}>
							<ClubCategory categoryId={club?.categoryId}></ClubCategory>
						</Box>
						<Box sx={{ height: '86px' }}>
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
						<Stack direction={'row'} gap={12}>
							<Box sx={{ display: 'flex', gap: 4 }}>
								<Groups2Icon></Groups2Icon>
								<Typography variant='body1'>{club.numberOfMembers} thành viên</Typography>
							</Box>

							<Box sx={{ display: 'flex', gap: 4 }}>
								<CakeIcon></CakeIcon>

								<Typography variant='body1'>{formattedDate}</Typography>
							</Box>
						</Stack>

						<Stack direction={'row'} gap={4}>
							{/* <Link passHref href={`${club.subname}`}> */}
							<Button onClick={handleClick} variant='contained' sx={{ marginTop: 4, width: '50%' }}>
								Xem chi tiết
							</Button>
							{/* </Link> */}

							{club?.isJoined ? (
								<Button
									variant='outlined'
									color='secondary'
									sx={{ marginTop: 4, width: '50%' }}
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
					</CardContent>
				</Card>
			</Stack>
		</>
	)
}

function ClubList() {
	const [clubs, setClubs] = useState([])
	const [loading, setLoading] = useState(true)
	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const [userData, setUserData] = useState()
	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	const callAPI = async () => {
		if (userData)
			try {
				setLoading(true)
				const uid = userData?.id
				if (uid == undefined) {
					const res = await getAPI(`${process.env.NEXT_PUBLIC_API_URL}/api/club?cmd=list-res`)
					setClubs(res)
					setLoading(false)
				} else {
					const res = await getAPI(`${process.env.NEXT_PUBLIC_API_URL}/api/club?cmd=list-res&userId=${userData?.id}`)
					setClubs(res)
					setLoading(false)
				}
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
	}

	useEffect(() => {
		callAPI()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData])

	return (
		<>
		<Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 100 }} open={loading}>
                <CircularProgress color='inherit' />
            </Backdrop>
			<Container maxWidth={'lg'} sx={{ padding: '0 60px !important' }}>
				{clubs?.map((club, index) => (
					<ClubItem key={index} club={club} index={index}></ClubItem>
				))}
			</Container>
		</>
	)
}

export default ClubList
