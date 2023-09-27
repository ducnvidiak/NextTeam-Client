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
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts'
import StadiumIcon from '@mui/icons-material/Stadium'
import Diversity2Icon from '@mui/icons-material/Diversity2'
import CakeIcon from '@mui/icons-material/Cake'
import Link from 'next/link'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useEffect, useState } from 'react'
import { getAPI } from 'src/ultis/requestAPI'

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

function ClubItem({ information, index }) {
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
						src={'http://res.cloudinary.com/de41uvd76/image/upload/v1694451011/z6jcsotpsznwdwavuklm.png'}
						alt=''
						style={{
							width: '300px',
							height: '300px',
							objectFit: 'cover'
						}}
					/>
					<CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
						<Typography variant='h7' sx={{ opacity: 0.7 }}>
							{information?.subname}
						</Typography>
						<Typography variant='h5' fontWeight={700} sx={{}} textTransform={'uppercase'}>
							{information?.name}
						</Typography>
						<Box sx={{ display: 'flex', gap: 4, marginBottom: 4 }}>
							{information?.categoryId === '1' ? (
								<>
									<AutoStoriesIcon></AutoStoriesIcon>
									<Typography variant='body1'>Học thuật</Typography>
								</>
							) : information?.categoryId === '2' ? (
								<>
									<StadiumIcon></StadiumIcon>
									<Typography variant='body1'>Tài Nẵng</Typography>
								</>
							) : information?.categoryId === '3' ? (
								<>
									<StadiumIcon></StadiumIcon>
									<Typography variant='body1'>Tài Nẵng</Typography>
								</>
							) : (
								<>
									<Diversity2Icon></Diversity2Icon>
									<Typography variant='body1'>Cộng đồng</Typography>
								</>
							)}
						</Box>
						<Box sx={{ height: '86px' }}>
							<Typography
								variant='body1'
								sx={{
									flex: 1,
									overflow: 'hidden',
									display: '-webkit-box',
									WebkitBoxOrient: 'vertical',
									WebkitLineClamp: 3, // start showing ellipsis when 3rd line is reached
									whiteSpace: 'pre-wrap'
								}}
							>
								{/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat architecto ducimus soluta veritatis
              molestias praesentium aperiam non nihil, voluptas fugit iste quo quidem corrupti sunt eius. Quaerat nulla
              maxime facilis? */}
								{information.description}
							</Typography>
						</Box>
						<Stack direction={'row'} gap={12}>
							<Box sx={{ display: 'flex', gap: 4 }}>
								<Groups2Icon></Groups2Icon>
								<Typography variant='body1'>{Math.floor(Math.random() * 10) + 1} thành viên</Typography>
							</Box>
							<Box sx={{ display: 'flex', gap: 4 }}>
								<CakeIcon></CakeIcon>
								<Typography variant='body1'>23/10/2018</Typography>
							</Box>
						</Stack>

						<Stack direction={'row'} gap={4}>
							<Link href={`http://localhost:3000/clubs/${'fu-dever'}`} passHref>
								<Button variant='contained' sx={{ marginTop: 4, width: '50%' }}>
									Xem chi tiết
								</Button>
							</Link>
							<Button variant='outlined' sx={{ marginTop: 4, width: '50%' }} onClick={handleClickOpen}>
								Đăng ký tham gia
							</Button>
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

	const callAPI = async () => {
		try {
			setLoading(true)
			const res = await getAPI('/club_cmd?cmd=list')
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
				{clubs.map((event, index) => (
					<ClubItem key={index} information={event} index={index}></ClubItem>
				))}
			</Container>
		</>
	)
}

export default ClubList
