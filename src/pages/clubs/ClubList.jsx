import {
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
	Typography,
	styled
} from '@mui/material'
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

	const handleClickOpen = () => {
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
						<FormControl fullWidth>
							<InputLabel id='demo-simple-select-label'>Ban tham gia</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={age}
								label='Age'
								onChange={handleChange}
								size='medium'
							>
								<MenuItem value={10}>Ban học thuật</MenuItem>
								<MenuItem value={20}>Ban sự kiện</MenuItem>
								<MenuItem value={30}>Ban truyền thông</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<Typography marginBottom={1}>Chọn CV: </Typography>
					<Button
						component='label'
						variant='contained'
						startIcon={<CloudUploadIcon />}
						sx={{ marginBottom: 2 }}
					>
						Upload file
						<VisuallyHiddenInput type='file' onChange={e => console.log(e.target.files[0])} />
					</Button>
					{/* <Typography marginBottom={1}>Chọn Ban tham gia:</Typography> */}
				</DialogContent>
				<DialogActions>
					<Button variant='contained' onClick={handleClose}>
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
	console.log(cookies['userData']);

	const callAPI = async () => {
		try {
			setLoading(true)
			const res = await getAPI(`http://localhost:8080/club_cmd?cmd=list&userId=${cookies['userData']?.id}`)
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
	}, [])

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
