import {
	AppBar,
	Backdrop,
	Button,
	ButtonGroup,
	Card,
	CardMedia,
	CircularProgress,
	Container,
	Dialog,
	DialogActions,
	Divider,
	FormControl,
	IconButton,
	Input,
	InputLabel,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Select,
	Stack,
	Tab,
	TextField,
	Toolbar,
	Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { TabContext, TabList, TabPanel } from '@mui/lab'

import React, { useEffect, useState } from 'react'
import ClubList from 'src/pages/clubs/ClubList'
import Ranking from 'src/pages/clubs/Ranking'
import EventOverView from './EventOverView'
import RegisteredTable from './RegisteredTable'
import { CloudUpload } from 'mdi-material-ui'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import styled from 'styled-components'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { getAPI, postAPI } from 'src/ultis/requestAPI'
import { ToastContainer, toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import { getUserInfo } from 'src/utils/info'
import { EventCreatorSchema } from 'src/ultis/yupValidation/eventManager'

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

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

export function convertToTimestamp(inputString) {
	const [datePart, timePart] = inputString.split('TT')
	const [year, month, day] = datePart.split('-')
	const [hours, minutes] = timePart.split(':')
	const newDateString = `${year}-${month}-${day} ${hours}:${minutes}:00.000`

	return newDateString
}

function EventCreator({ openEventCreatorModal, setOpenEventCreatorModal, setEventList }) {
	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const [cookiesClub, setCookieClub, removeCookieClub] = useCookies(['clubData'])
	const [isValidate, setIsValidate] = useState(true)
	const [locationList, setLocationList] = useState([])
	const [fileName, setFileName] = useState('')
	const [open, setOpen] = useState(false)
	const [userData, setUserData] = useState()
	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	const [newEvent, setNewEvent] = useState({
		name: '',
		description: '',
		startTime: '2023-10-05T00:35',
		endTime: '2023-10-05T00:35',
		type: 'public',
		bannerUrl: '',
		planUrl: ''
	})

	const handleSubmit = async () => {
		try {
			setOpen(true)
			await EventCreatorSchema.validate(newEvent, { abortEarly: false })
			fetch(`http://localhost:8080/admin-events?cmd=create`, {
				method: 'POST',
				body: JSON.stringify({
					...newEvent,
					startTime: new Date(convertToTimestamp(newEvent.startTime)),
					endTime: new Date(convertToTimestamp(newEvent.startTime)),
					registeredBy: userData?.id,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			})
				.then(function (response) {
					return response.json()
				})
				.then(function (data) {
					console.log('data')
					setEventList(data)
					toast.success('Tạo sự kiện thành công, đang chờ kiểm duyệt...')
					setOpenEventCreatorModal(false)
					setNewEvent({
						name: '',
						description: '',
						startTime: '2023-10-05T00:35',
						endTime: '2023-10-05T00:35',
						type: 'public',
						bannerUrl: '',
						planUrl: ''
					})
					setOpen(false)
				})
				.catch(error => {
					setOpen(false)
					console.error('Error:', error)
					toast.error('Có lỗi xảy ra khi đăng ký sự kiện, vui lòng thử lại')
				})
				.finally(() => {})
		} catch (error) {
			setOpen(false)
			if (error?.name === 'ValidationError') {
				setIsValidate(false)
				error.errors.forEach(err => toast.error(err))
			}
		}
	}

	// Hàm xử lý khi thay đổi DatePicker
	const handleDateChange = date => {
		const formattedDate = dayjs(date).format('YYYY-MM-DDTHH:mm')
		const startString = `${formattedDate.substring(0, 11)}T${newEvent.startTime.slice(-5)}`
		const endString = `${formattedDate.substring(0, 11)}T${newEvent.endTime.slice(-5)}`
		setNewEvent({
			...newEvent,
			startTime: startString,
			endTime: endString
		})
	}

	const handleStartTimeChange = time => {
		const formattedTime = dayjs(time).format('YYYY-MM-DDTHH:mm')
		const combinedString = `${newEvent.startTime.substring(0, 11)}T${formattedTime.slice(-5)}`
		setNewEvent({
			...newEvent,
			startTime: combinedString
		})
	}

	const handleEndTimeChange = time => {
		const formattedTime = dayjs(time).format('YYYY-MM-DDTHH:mm')
		const combinedString = `${newEvent.endTime.substring(0, 11)}T${formattedTime.slice(-5)}`
		setNewEvent({
			...newEvent,
			endTime: combinedString
		})
	}

	const callAPI = async () => {
		try {
			const res = await getAPI(`http://localhost:8080/location`)
			setLocationList(res)
		} catch (error) {
			console.log(error)
		} finally {
		}
	}
	useEffect(() => {
		callAPI()
	}, [])

	const handleChangeFile = event => {
		setFileName(event.target.files[0]?.name)
		const reader = new FileReader()
		const { files } = event.target
		if (files && files.length !== 0) {
			reader.onload = () => setNewEvent({ ...newEvent, planUrl: reader.result })
			reader.readAsDataURL(files[0])
		}
	}

	const changeBanner = async e => {
		const file = e.target.files[0]
		if (file) {
			// Tạo formData để gửi tệp hình ảnh lên imgbb
			const formData = new FormData()
			formData.append('image', file)

			try {
				setOpen(true)

				const response = await fetch('https://api.imgbb.com/1/upload?key=c3ea5cebc2cb4a75e54ef52db0eeabca', {
					method: 'POST',
					body: formData
				})

				if (response.ok) {
					const data = await response.json()
					const imageBannerUrl = data.data.url
					setNewEvent({ ...newEvent, bannerUrl: imageBannerUrl })
					toast.success('Tải lên hình ảnh thành công!!!')
				} else {
					toast.error('Tải lên hình ảnh không thành công')
				}
			} catch (error) {
				console.log(error)
				toast.error('Tải lên hình ảnh không thành công')
			} finally {
				setOpen(false)
			}
		}
	}

	return (
		<Dialog
			fullScreen
			open={openEventCreatorModal}
			onClose={() => setOpenEventCreatorModal(false)}
			TransitionComponent={Transition}
		>
			<ToastContainer></ToastContainer>
			<Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={open}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					<IconButton
						edge='start'
						color='inherit'
						onClick={() => setOpenEventCreatorModal(false)}
						aria-label='close'
					>
						<CloseIcon />
					</IconButton>
					<Typography
						sx={{ ml: 2, flex: 1 }}
						variant='h6'
						component='div'
						color={'#fff'}
						textTransform={'uppercase'}
					>
						Tạo sự kiện mới
					</Typography>
				</Toolbar>
			</AppBar>
			<Container maxWidth={'lg'} sx={{ padding: '0 60px !important' }}>
				<Stack direction={'column'}>
					<Typography marginY={4} variant='h6'>
						Thông tin cơ bản
					</Typography>
					<TextField
						error={newEvent.name === '' && !isValidate}
						id='outlined-basic'
						label='Tên sự kiện'
						variant='outlined'
						onChange={event => setNewEvent({ ...newEvent, name: event.target.value })}
						sx={{ mb: 4 }}
					/>
					<TextField
						error={newEvent.description === '' && !isValidate}
						id='outlined-multiline-static'
						label='Mô tả sự kiện'
						multiline
						rows={10}
						onChange={event => setNewEvent({ ...newEvent, description: event.target.value })}
					/>
					<Stack direction={'row'} justifyContent={'space-between'}>
						<Typography marginY={4} variant='h6'>
							Ảnh sự kiện
						</Typography>
						<label htmlFor='image-upload'>
							<Button
								variant='contained'
								component='span'
								startIcon={<CloudUpload />}
								sx={{ margin: '10px 0' }}
								color={newEvent.bannerUrl === '' && !isValidate ? 'error' : 'primary'}
							>
								Tải lên hình ảnh
							</Button>
						</label>
					</Stack>
					<Input
						accept='image/*'
						id='image-upload'
						type='file'
						style={{ display: 'none' }}
						onChange={e => changeBanner(e)}
					/>
					{newEvent?.bannerUrl && (
						<Card>
							<CardMedia
								component='img'
								alt='Selected Image'
								height='100%'
								width='300px'
								image={newEvent.bannerUrl}
							/>
						</Card>
					)}

					<Typography marginY={4} variant='h6'>
						Thời gian sự kiện
					</Typography>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Stack direction={'row'} gap={4}>
							<DatePicker

								disablePast
								label='Ngày'
								slotProps={{
									textField: {
										helperText: 'MM/DD/YYYY'
									}
								}}
								onChange={handleDateChange}
								sx={{ flex: 1 }}
							/>
							<TimePicker
								sx={{ flex: 1 }}
								label='Bắt đầu'
								onChange={handleStartTimeChange}

								// defaultValue={dayjs('2022-04-17T15:30')}
							/>
							<TimePicker
								sx={{ flex: 1 }}
								label='Kết thúc'
								onChange={handleEndTimeChange}

								// defaultValue={dayjs('2022-04-17T20:30')}
							/>
						</Stack>
					</LocalizationProvider>
					<Typography marginY={4} variant='h6'>
						Địa điểm
					</Typography>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Chọn địa điểm</InputLabel>
						<Select
							error={!newEvent.locationId && !isValidate}
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							label='location'
							onChange={e => setNewEvent({ ...newEvent, locationId: e.target.value })}
							value={newEvent.locationId}
						>
							{locationList?.map(location => (
								<MenuItem key={location?.id} value={location.id}>
									{location.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Typography marginY={4} variant='h6'>
						Loại hình tổ chức
					</Typography>
					<ButtonGroup>
						<Button
							key='one'
							variant={newEvent?.type === 'public' ? 'contained' : 'outlined'}
							color={'primary'}
							onClick={() => setNewEvent({ ...newEvent, type: 'public' })}
						>
							Toàn trường
						</Button>
						<Button
							key='two'
							variant={newEvent?.type === 'internal' ? 'contained' : 'outlined'}
							color={'primary'}
							onClick={() => setNewEvent({ ...newEvent, type: 'internal' })}
						>
							Nội bộ
						</Button>
					</ButtonGroup>
					<Typography marginY={4} variant='h6'>
						Kế hoạch tổ chức
					</Typography>
					<Stack direction={'row'} alignItems={'center'} gap={4}>
						<Button
							component='label'
							variant='contained'
							startIcon={<CloudUploadIcon />}
							sx={{ width: 180 }}
							color={newEvent.planUrl === '' && !isValidate ? 'error' : 'primary'}
						>
							Upload file
							<VisuallyHiddenInput type='file' onChange={e => handleChangeFile(e)} />
						</Button>
						<Typography variant='body'>{fileName}</Typography>
					</Stack>
				</Stack>
				<DialogActions sx={{ paddingX: 16, pb: 16, justifyContent: 'center' }}>
					<Button variant='contained' onClick={handleSubmit}>
						Xác nhận
					</Button>
					<Button variant='outlined'>Hủy</Button>
				</DialogActions>
			</Container>
		</Dialog>
	)
}

export default EventCreator
