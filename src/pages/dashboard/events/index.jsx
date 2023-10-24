import { Container, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import EventList from 'src/pages/dashboard/events/EventList'
import { getUserInfo } from 'src/utils/info'

function EventDashboard() {
	const [eventList, setEventList] = useState()
	const [filter, setFilter] = useState('all')
	const [eventListFiltered, setEventListFiltered] = useState()

	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const [cookiesClub, setCookieClub, removeCookieClub] = useCookies(['clubData'])
	const [userData, setUserData] = useState()
	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	useEffect(() => {
		fetch(
			`http://localhost:8080/member-events?clubId=${cookiesClub['clubData'].clubId}&userId=${userData?.id}&cmd=list`,
			{
				method: 'GET',
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			}
		)
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				console.log('data')
				console.log(data)
				setEventList(data)
			})
			.catch(error => console.error('Error:', error))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData])

	useEffect(() => {
		console.log(filter)
		switch (filter) {
			case 'all':
				console.log('!!!', eventList)
				setEventListFiltered(eventList)

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
	}, [filter, eventList])

	console.log('!!!')

	return (
		<Container maxWidth='lg' style={{ padding: 0 }}>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'} marginBottom={10}>
				<Typography fontSize={32} fontWeight={600}>
					SỰ KIỆN CỦA CÂU LẠC BỘ
				</Typography>
				<FormControl variant='outlined' size='small'>
					<InputLabel>Bộ lọc</InputLabel>
					<Select label='Status' value={filter} onChange={e => setFilter(e.target.value)}>
						<MenuItem value='all'>Tất cả</MenuItem>
						<MenuItem value='upcoming'>Sắp diễn ra</MenuItem>
						<MenuItem value='past'>Đã qua</MenuItem>
					</Select>
				</FormControl>
			</Stack>
			<EventList
				eventListFiltered={eventListFiltered}
				setEventList={setEventList}
				userData={userData}
			></EventList>
		</Container>
	)
}

export default EventDashboard
