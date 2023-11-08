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

// **Toasify Imports
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import CakeIcon from '@mui/icons-material/Cake'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getAPI } from 'src/ultis/requestAPI'
import ClubCategory from 'src/components/ClubCategory'
import moment from 'moment'

require('moment/locale/vi')
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
	const [loading, setLoading] = useState(false)
	const [cookies, setCookies] = useCookies(['userData', 'clubData'])

	//formData
	const [departmentId, setDepartmentId] = useState('')
	const [clubId, setClubId] = useState()
	const [cv, setCv] = useState()
	const [userId, setUserId] = useState()

	useEffect(() => {
		;(async () => setUserId((await getUserInfo(cookies['userData'])).id))()
	}, [cookies])

	const handleClick = (id, subname) => () => {
		cookies['clubData']?.clubId == 'none' ? '' : router.push('/dashboard')
		setCookies('clubData', JSON.stringify({ clubId: id, subname: subname }), { path: '/' })
		toast.success('Bạn đang được chuyển tới trang của câu lạc bộ.')
	}

	const callAPIDepartment = async clubId => {
		try {
			setLoading(true)
			const res = await getAPI('/department?action=list-dept&clubId=' + clubId)
			setDepartment(res)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const handleClickOpen = clubId => {
		if (userId) {
			setClubId(clubId)
			callAPIDepartment(clubId)
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
			<Stack direction={'row'} justifyContent={'space-between'} marginBottom={10}>
				<Stack direction={'column'} width={'5%'}>
					<Typography variant='h5'>{index + 1}.</Typography>
				</Stack>
				<Card sx={{ width: '95%', display: 'flex' }} marginBottom={10}>
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
							<Button
								variant='contained'
								sx={{ marginTop: 4, width: '100%' }}
								onClick={handleClick(club?.id, club?.subname)}
							>
								Truy cập
							</Button>
							{/* </Link> */}

							{/* <Button variant='contained'>Truy cập</Button> */}
						</Stack>
					</CardContent>
				</Card>
			</Stack>
		</>
	)
}

function ClubList() {
	const [clubs, setClubs] = useState([])
	const [loading, setLoading] = useState(false)
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
				} else {
					const res = await getAPI(
						`${process.env.NEXT_PUBLIC_API_URL}/api/club?cmd=list-res&userId=${userData?.id}`
					)
					setClubs(res)
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
			<Container maxWidth={'lg'} sx={{ padding: '0 60px !important' }}>
				{clubs
					?.filter(club => club.isJoined)
					.map((club, index) => (
						<ClubItem key={index} club={club} index={index}></ClubItem>
					))}
			</Container>
		</>
	)
}

export default ClubList
