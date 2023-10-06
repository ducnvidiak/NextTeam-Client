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

import CakeIcon from '@mui/icons-material/Cake'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getAPI } from 'src/ultis/requestAPI'
import ClubCategory from 'src/components/ClubCategory'
import moment from 'moment'
import { useCookies } from 'react-cookie'
import { getUserInfo } from 'src/utils/info'

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
	const [open, setOpen] = useState(false)
	const [department, setDepartment] = useState([])
	const [loading, setLoading] = useState(false)
	const [userData, setUserData] = useCookies(['userData'])

	//formData
	const [departmentId, setDepartmentId] = useState('')
	const [clubId, setClubId] = useState()
	const [cv, setCv] = useState()
	const userId = userData['userData']?.id

	const handleUpload = () => {
		const formData = new FormData()

		formData.append('cvUrl', cv)

		console.log(formData)

		// Gửi yêu cầu POST để tải lên file PDF lên server
		axios
			.post(
				`http://localhost:8080/engagement?action=add-engagement&userId=${userId}&departmentId=${departmentId}&clubId=${clubId}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			)
			.then(response => {
				console.log(response.data) // Xử lý phản hồi từ server (nếu cần)
			})
			.catch(error => {
				console.error(error)
			})
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
		setClubId(clubId)
		callAPIDepartment(clubId)
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const [age, setAge] = useState('')

	const handleChange = event => {
		setAge(event.target.value)
	}

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>Đăng ký tham gia câu lạc bộ</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description' marginBottom={2}>
						Vui lòng điền những thông tin bên dưới để đăng ký tham gia vào câu lạc bộ này
					</DialogContentText>
					<Box sx={{ maxWidth: '50%', marginBottom: 2 }}>
						<Autocomplete
							id='sendTo'
							fullWidth
							options={department}
							autoHighlight
							getOptionLabel={option => option.name}
							onChange={event => setDepartmentId(event.target.value)}
							renderOption={(props, option) => (
								<Box
									component='li'
									sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
									{...props}
									value={option.id}
								>
									{option.name}
								</Box>
							)}
							renderInput={params => (
								<TextField
									{...params}
									label='Ban đăng ký'
									inputProps={{
										...params.inputProps,
										autoComplete: 'new-password' // disable autocomplete and autofill
									}}
								/>
							)}
						/>
					</Box>
					<Typography marginBottom={1}>Chọn CV: </Typography>
					<Button
						component='label'
						variant='contained'
						startIcon={<CloudUploadIcon />}
						sx={{ marginBottom: 2 }}
					>
						Upload file
						<VisuallyHiddenInput type='file' onChange={e => setCv(e.target.files[0])} />
					</Button>
					{/* <Typography marginBottom={1}>Chọn Ban tham gia:</Typography> */}
				</DialogContent>
				<DialogActions>
					<Button variant='contained' onClick={handleUpload}>
						Xác nhận
					</Button>
					<Button variant='outlined' onClick={handleClose}>
						Hủy
					</Button>
				</DialogActions>
			</Dialog>
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
								<Typography variant='body1'>
									{moment(club.createAt).subtract(10, 'days').calendar()}
								</Typography>
							</Box>
						</Stack>

						<Stack direction={'row'} gap={4}>
							<Link href={`http://localhost:3000/clubs/${club.subname}`} passHref>
								<Button variant='contained' sx={{ marginTop: 4, width: '50%' }}>
									Xem chi tiết
								</Button>
							</Link>
							{club?.isJoined ? (
								<Button
									variant='outlined'
									color='secondary'
									sx={{ marginTop: 4, width: '50%' }}
									onClick={handleClickOpen}
								>
									Đã tham gia
								</Button>
							) : (
								<Button
									variant='outlined'
									sx={{ marginTop: 4, width: '50%' }}
									onClick={handleClickOpen}
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
	const [loading, setLoading] = useState(false)
	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const [userData, setUserData] = useState()
	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])
	

	const callAPI = async () => {
		if(userData)
		try {
			setLoading(true)
			const res = await getAPI(`http://localhost:8080/clubs?cmd=list-res&userId=${userData?.id}`)
			setClubs(res)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	console.log(clubs)
	useEffect(() => {
		callAPI()
	}, [userData])

	return (
		<>
			<Container maxWidth={'lg'} sx={{ padding: '0 60px !important' }}>
				{clubs?.map((club, index) => (
					<ClubItem key={index} club={club} index={index}></ClubItem>
				))}
			</Container>
		</>
	)
}

export default ClubList
