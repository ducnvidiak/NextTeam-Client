import {
	Backdrop,
	Button,
	ButtonGroup,
	Card,
	CardMedia,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Input,
	InputAdornment,
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
import { EventCreatorSchema } from 'src/ultis/yupValidation/eventManager'
import moment from 'moment'
import { translateDayOfWeek } from 'src/ultis/dateTime'

export const combineDateTime = (datetimeA, datetimeB) => {
	const [date1, time1] = datetimeA.split('T')
	const [date2, time2] = datetimeB.split('T')

	return date1 + 'T' + time2
}

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

function EventOverView({ event, setEventList, setOpenEventManagememntModal }) {
	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const [isValidate, setIsValidate] = useState(true)
	const [locationList, setLocationList] = useState([])
	const [open, setOpen] = useState(false)
	const [userData, setUserData] = useState()
	const [isShowModal, setIsShowModal] = useState(false)
	const [fileName, setFileName] = useState('')
	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	const [newEvent, setNewEvent] = useState({})

	const handleDateChange = date => {
		setNewEvent({
			...newEvent,
			dateTime: date
		})
	}

	const handleStartTimeChange = time => {
		setNewEvent({
			...newEvent,
			startTime: time
		})
	}

	const handleEndTimeChange = time => {
		setNewEvent({
			...newEvent,
			endTime: time
		})
	}

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

	const handleSubmit = async () => {
		try {
			setOpen(true)
			await EventCreatorSchema.validate(newEvent, { abortEarly: false })
			fetch(`http://localhost:8080/admin-events?cmd=update&eventId=${event.id}&userId=${userData?.id}`, {
				method: 'POST',
				body: JSON.stringify({
					...newEvent,
					startTime: combineDateTime(
						moment(new Date(newEvent.dateTime)).format(),
						moment(new Date(newEvent.startTime)).format()
					),
					endTime: combineDateTime(
						moment(new Date(newEvent.dateTime)).format(),
						moment(new Date(newEvent.endTime)).format()
					),
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
		} catch (error) {
			setOpen(false)
			if (error?.name === 'ValidationError') {
				setIsValidate(false)
				error.errors.forEach(err => toast.error(err))
			}
			console.log(error)
		}
	}

	const handleDelete = () => {
		setOpen(true)
		fetch(`http://localhost:8080/admin-events?cmd=delete&eventId=${event.id}&userId=${userData?.id}`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {

				return response.json()
			})
			.then(function (data) {
				setEventList(data)
				
				toast.success('Xóa sự kiện thành công!!!')
			})
			.catch(error => {
				console.error('Error:', error)

				toast.error('Có lỗi xảy ra khi xóa sự kiện, vui lòng thử lại')
			})
			.finally(() => {
				setOpen(false)
				setOpenEventManagememntModal(false)
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
		setNewEvent({
			...event,
			dateTime: dayjs(event?.startTime),
			startTime: dayjs(event?.startTime),
			endTime: dayjs(event.endTime),
			locationId: locationList.filter((item, index) => {
				return item.name == event?.locationName
			})[0]?.id
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [event, locationList])

	return (
		<Container maxWidth={'lg'} sx={{ padding: '0 60px !important' }}>
			<ToastContainer></ToastContainer>
			<Dialog
				open={isShowModal}
				onClose={() => setIsShowModal(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
				maxWidth={'md'}
			>
				<DialogTitle id='alert-dialog-title' sx={{ paddingX: 16, pt: 16 }}>
					<Typography textAlign={'center'} variant='h5' mb={2}>
						Xóa sự kiện
					</Typography>
					<Typography textAlign={'center'} variant='subtitle1' color={'#838383'}>
						Bạn có chắc chắn muốn xóa sự kiện sau đây khỏi hệ thống?
					</Typography>
				</DialogTitle>
				<DialogContent sx={{ paddingX: 16 }}>
					<Stack direction={'row'} gap={2}>
						<Typography marginBottom={1} width={'20%'}>
							Tên sự kiện:
						</Typography>
						<Typography marginBottom={1} width={'80%'}>
							"{event?.name}"
						</Typography>
					</Stack>
					<Stack direction={'row'} gap={2}>
						<Typography marginBottom={1} width={'20%'}>
							Thời gian:
						</Typography>
						<Typography marginBottom={1}>{`${translateDayOfWeek(
							moment(event?.startTime).format('dddd')
						)} ${moment(event?.startTime).format('L')}`}</Typography>
					</Stack>
					<Stack direction={'row'} gap={2}>
						<Typography marginBottom={1} width={'20%'}>
							Địa điểm:
						</Typography>
						<Typography marginBottom={1}>{event?.locationName}</Typography>
					</Stack>
				</DialogContent>
				<DialogActions sx={{ paddingX: 16, pb: 16, justifyContent: 'center' }}>
					<Button variant='contained' onClick={handleDelete}>
						Xác nhận
					</Button>
					<Button variant='outlined' onClick={() => setIsShowModal(false)}>
						Hủy
					</Button>
				</DialogActions>
			</Dialog>
			<Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={open}></Backdrop>
			<Stack direction={'column'}>
				<Typography marginY={4} variant='h6'>
					Thông tin cơ bản
				</Typography>
				<TextField
					id='outlined-basic'
					label='Tên sự kiện'
					variant='outlined'
					value={newEvent.name}
					onChange={event => setNewEvent({ ...newEvent, name: event.target.value })}
					sx={{ mb: 4 }}
					error={newEvent.name === '' && !isValidate}
				/>
				<TextField
					id='outlined-multiline-static'
					label='Mô tả sự kiện'
					multiline
					rows={10}
					defaultValue={newEvent?.description}
					onChange={event => setNewEvent({ ...newEvent, description: event.target.value })}
					error={newEvent.description === '' && !isValidate}
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
							label='Ngày'
							slotProps={{
								textField: {
									helperText: 'MM/DD/YYYY'
								}
							}}
							value={dayjs(newEvent?.startTime)}
							sx={{ flex: 1 }}
							onChange={handleDateChange}
						/>
						<TimePicker
							sx={{ flex: 1 }}
							label='Bắt đầu'
							value={dayjs(newEvent?.startTime)}
							onChange={handleStartTimeChange}
						/>
						<TimePicker
							sx={{ flex: 1 }}
							label='Kết thúc'
							value={dayjs(newEvent?.endTime)}
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
							color={newEvent.planUrl === '' && !isValidate ? 'error' : 'primary'}
						>
							{locationList?.map(location => (
								<MenuItem key={location?.id} value={location.id}>
									{location.name}
								</MenuItem>
							))}
						</Select>
					)}
				</FormControl>
				{/* <Typography marginY={4} variant='h6'>
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
				</ButtonGroup> */}
				<Typography marginY={4} variant='h6'>
					Kế hoạch tổ chức
				</Typography>
				<Stack direction={'row'} alignItems={'center'} gap={4}>
					<Button component='label' variant='contained' startIcon={<CloudUploadIcon />} sx={{ width: 180 }}>
						Upload file
						<VisuallyHiddenInput type='file' onChange={e => handleChangeFile(e)} />
					</Button>
					<Typography variant='body'>{fileName ? fileName : 'Kịch bản club day.xlsx'}</Typography>
				</Stack>
			</Stack>
			<DialogActions sx={{ paddingX: 16, pb: 16, justifyContent: 'center' }}>
				<Button variant='contained' onClick={handleSubmit}>
					Lưu thay đổi
				</Button>
				<Button variant='outlined' onClick={() => setIsShowModal(true)}>
					Hủy bỏ sự kiện
				</Button>
			</DialogActions>
		</Container>
	)
}

export default EventOverView
