import {
	Box,
	Button,
	CircularProgress,
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
import { toast } from 'react-toastify'

export function convertFormat(inputString) {
	if (!inputString) return

	const [datePart, timePart] = inputString?.split(' ')
	const [year, month, day] = datePart?.split('-')
	const newDay = new Date(year, month - 1, day - 1)
	const newTime = timePart.slice(0, 5)

	const result = `${newDay.getFullYear()}-${String(newDay.getMonth() + 1).padStart(2, '0')}-${String(
		newDay.getDate()
	).padStart(2, '0')}TT${newTime}`

	return result
}

function EventCreatorPage() {
	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const [clubCookies, setClubCookie] = useCookies(['clubData'])
	const [openEventCreatorModal, setOpenEventCreatorModal] = useState(false)
	const [eventList, setEventList] = useState()
	const [eventListFiltered, setEventListFiltered] = useState()
	const [userData, setUserData] = useState()
	const [loading, setLoading] = useState(false)
	const [filter, setFilter] = useState('all')
	const [filterType, setFilterType] = useState('all')

	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	useEffect(() => {
		setLoading(true)
		fetch(`${process.env.NEXT_PUBLIC_API_URL}//manager-events?clubId=${clubCookies['clubData'].clubId}&cmd=list`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				
				setEventList(data)
				setEventListFiltered(data)
				setLoading(false)
			})
			.catch(error => {
				console.error('Error:', error)
				toast.error('Có lỗi xảy ra, vui lòng thử lại!!!')
				setLoading(false)
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData])

	useEffect(() => {
		switch (filter) {
			case 'all':
				setEventListFiltered(eventList)

				return
			case 'approved':
				setEventListFiltered(eventList?.filter(event => event?.isApproved == 'accepted'))

				return
			case 'pending':
				setEventListFiltered(eventList?.filter(event => event?.isApproved == 'pending'))

				return
			case 'upcoming':
				setEventListFiltered(eventList?.filter(event => new Date() < new Date(event?.startTime)))

				return
			case 'past':
				setEventListFiltered(eventList?.filter(event => new Date() > new Date(event?.endTime)))

				return
			default:
				return
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter])

	useEffect(() => {
		setEventListFiltered(eventList)
	}, [eventList])

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
				<Stack direction={'row'} gap={2}>
					<FormControl variant='outlined' size='small'>
						<InputLabel>Trạng thái</InputLabel>
						<Select label='Status' defaultValue='all' onChange={e => setFilter(e.target.value)}>
							<MenuItem value='all'>Tất cả</MenuItem>
							<MenuItem value='approved'>Đã duyệt</MenuItem>
							<MenuItem value='pending'>Chưa duyệt</MenuItem>
							<MenuItem value='upcoming'>Sắp diễn ra</MenuItem>
							<MenuItem value='past'>Đã qua</MenuItem>
						</Select>
					</FormControl>
					<FormControl variant='outlined' size='small'>
						<InputLabel>Thể loại</InputLabel>
						<Select label='Thể loại' defaultValue='all' onChange={e => setFilterType(e.target.value)}>
							<MenuItem value='all'>Tất cả</MenuItem>
							<MenuItem value='public'>Toàn trường</MenuItem>
							<MenuItem value='internal'>Nội bộ</MenuItem>
						</Select>
					</FormControl>
				</Stack>
			</Stack>
			<EventList filterType={filterType} eventList={eventListFiltered} setEventList={setEventList}></EventList>
		</Container>
	)
}

export default EventCreatorPage
