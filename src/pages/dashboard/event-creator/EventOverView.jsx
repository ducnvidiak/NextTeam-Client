import {
	Backdrop,
	Button,
	ButtonGroup,
	Card,
	CardMedia,
	Container,
	DialogActions,
	FormControl,
	Input,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography
} from '@mui/material'
import { CloudUpload } from 'mdi-material-ui'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import styled from 'styled-components'
import { getAPI } from 'src/ultis/requestAPI'
import { convertToTimestamp } from './EventCreator'
import { useCookies } from 'react-cookie'
import { ToastContainer, toast } from 'react-toastify'
import { convertFormat } from '.'
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

function EventOverView({ event, setEventList }) {
	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const [cookiesClub, setCookieClub, removeCookieClub] = useCookies(['clubData'])
	const [locationList, setLocationList] = useState([])
	const [open, setOpen] = useState(false)
	const [userData, setUserData] = useState()
	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	const [newEvent, setNewEvent] = useState({
		...event,
		startTime: convertFormat(event.startTime),
		endTime: convertFormat(event.endTime),
		locationId: locationList.filter((item, index) => {
			return item.name == event?.locationName
		})[0]?.id
	})

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

	const handleChangeFile = event => {
		setFileName(event.target.files[0].name)
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
					console.log(imageBannerUrl)
					toast.success('Tải lên hình ảnh thành công!!!')
				} else {
					console.log(response)
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

	const handleSubmit = async () => {
		console.log('submmit')
		console.log({
			...newEvent,
			startTime: new Date(convertToTimestamp(newEvent.startTime)),
			endTime: new Date(convertToTimestamp(newEvent.endTime)),
			registeredBy: userData?.id,
			clubId: cookiesClub['clubData']?.clubId
		})
		setOpen(true)
		fetch(`http://localhost:8080/events?cmd=update&eventId=${event.id}&userId=${userData?.id}`, {
			method: 'POST',
			body: JSON.stringify({
				...newEvent,
				startTime: new Date(convertToTimestamp(newEvent.startTime)),
				endTime: new Date(convertToTimestamp(newEvent.endTime)),
				registeredBy: userData?.id,
				clubId: userData?.clubId
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				console.log('update')
				console.log(data)
				setEventList(data)
				toast.success('Chỉnh sửa thông tin sự kiện thành công!!!')
			})
			.catch(error => {
				console.error('Error:', error)

				toast.error('Có lỗi xảy ra khi chỉnh sửa thông tin sự kiện, vui lòng thử lại')
			})
			.finally(() => {
				setOpen(false)
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

	useEffect(() => {
		if (locationList.length > 0) {
			setNewEvent({
				...event,
				startTime: convertFormat(event.startTime),
				endTime: convertFormat(event.endTime),
				locationId: locationList.filter((item, index) => {
					return item.name == event?.locationName
				})[0]?.id
			})
		}
	}, [locationList])

	return (
		<Container maxWidth={'lg'} sx={{ padding: '0 60px !important' }}>
			<ToastContainer></ToastContainer>
			<Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={open}></Backdrop>
			<Stack direction={'column'}>
				<Typography marginY={4} variant='h6'>
					Thông tin cơ bản
				</Typography>
				<TextField
					id='outlined-basic'
					label='Tên sự kiện'
					variant='outlined'
					defaultValue={newEvent.name}
					onChange={event => setNewEvent({ ...newEvent, name: event.target.value })}
					sx={{ mb: 4 }}
				/>
				<TextField
					id='outlined-multiline-static'
					label='Mô tả sự kiện'
					multiline
					rows={10}
					defaultValue={newEvent.description}
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
							label='Ngày'
							slotProps={{
								textField: {
									helperText: 'MM/DD/YYYY'
								}
							}}
							defaultValue={dayjs(newEvent.startTime)}
							sx={{ flex: 1 }}
							onChange={handleDateChange}
						/>
						<TimePicker
							sx={{ flex: 1 }}
							label='Bắt đầu'
							defaultValue={dayjs(newEvent.startTime)}
							onChange={handleStartTimeChange}
						/>
						<TimePicker
							sx={{ flex: 1 }}
							label='Kết thúc'
							defaultValue={dayjs(newEvent.endTime)}
							onChange={handleEndTimeChange}
						/>
					</Stack>
				</LocalizationProvider>
				<Typography marginY={4} variant='h6'>
					Địa điểm
				</Typography>
				<FormControl fullWidth>
					<InputLabel id='demo-simple-select-label'>Chọn địa điểm</InputLabel>
					{locationList.length > 0 && (
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							label='location'
							onChange={e => setNewEvent({ ...newEvent, locationId: e.target.value })}
							defaultValue={
								locationList.filter((item, index) => item.name === newEvent.locationName)[0]?.id
							}
						>
							{locationList?.map(location => (
								<MenuItem key={location?.id} value={location.id}>
									{location.name}
								</MenuItem>
							))}
						</Select>
					)}
				</FormControl>
				<Typography marginY={4} variant='h6'>
					Loại hình tổ chức
				</Typography>
				<ButtonGroup>
					<Button
						key='one'
						variant={newEvent.type === 'public' ? 'contained' : 'outlined'}
						color={'primary'}
						onClick={() => setNewEvent({ ...newEvent, type: 'public' })}
					>
						Toàn trường
					</Button>
					<Button
						key='two'
						variant={newEvent.type === 'internal' ? 'contained' : 'outlined'}
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
					<Button component='label' variant='contained' startIcon={<CloudUploadIcon />} sx={{ width: 180 }}>
						Upload file
						<VisuallyHiddenInput type='file' onChange={e => handleChangeFile(e)} />
					</Button>
					<Typography variant='body'>FES-TECHSpeak.docx</Typography>
				</Stack>
			</Stack>
			<DialogActions sx={{ paddingX: 16, pb: 16, justifyContent: 'center' }}>
				<Button variant='contained' onClick={handleSubmit}>
					Lưu thay đổi
				</Button>
				<Button variant='outlined'>Hủy bỏ sự kiện</Button>
			</DialogActions>
		</Container>
	)
}

export default EventOverView
