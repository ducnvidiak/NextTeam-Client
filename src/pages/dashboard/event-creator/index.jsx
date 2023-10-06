import {
	Box,
	Button,
	Container,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Tooltip,
	Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EventList from './EventList'
import { useEffect, useState } from 'react'
import EventCreator from './EventCreator'
import { useCookies } from 'react-cookie'
import { getUserInfo } from 'src/utils/info'

export function convertFormat(inputString) {
	const [datePart, timePart] = inputString.split(' ')
	const [year, month, day] = datePart.split('-')
	const newDay = new Date(year, month - 1, day - 1)
	const newTime = timePart.slice(0, 5)

	const result = `${newDay.getFullYear()}-${String(newDay.getMonth() + 1).padStart(2, '0')}-${String(
		newDay.getDate()
	).padStart(2, '0')}TT${newTime}`

	return result
}

function EventCreatorPage() {
	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const [openEventCreatorModal, setOpenEventCreatorModal] = useState(false)
	const [eventList, setEventList] = useState()
	const [userData, setUserData] = useState()
	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	useEffect(() => {
		fetch(`http://localhost:8080/events?cmd=list&?userId=${userData?.id}`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				console.log('fetch')
				console.log(data)
				setEventList(data)
			})
			.catch(error => console.error('Error:', error))
	}, [userData])

	return (
		<Container maxWidth='lg' style={{ padding: 0 }}>
			<EventCreator
				openEventCreatorModal={openEventCreatorModal}
				setOpenEventCreatorModal={setOpenEventCreatorModal}
				setEventList={setEventList}
			></EventCreator>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'} marginBottom={10}>
				<Button variant='contained' onClick={() => setOpenEventCreatorModal(true)}>
					<AddIcon fontSize='small'></AddIcon>
					Thêm mới
				</Button>
				<Stack direction={'row'} alignItems={'center'} gap={4}>
					<Typography fontSize={32} fontWeight={600}>
						DANH SÁCH SỰ KIỆN
					</Typography>
				</Stack>
				<FormControl variant='outlined' size='small'>
					<InputLabel>Bộ lọc</InputLabel>
					<Select label='Status' defaultValue='active'>
						<MenuItem value='active'>Tất cả</MenuItem>
						<MenuItem value='inactive'>Đã Đăng ký</MenuItem>
						<MenuItem value='pending'>Sự kiện đã qua</MenuItem>
					</Select>
				</FormControl>
			</Stack>
			<EventList eventList={eventList} setEventList={setEventList}></EventList>
		</Container>
	)
}

export default EventCreatorPage
