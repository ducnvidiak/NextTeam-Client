import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

const createData = (index, name, studentCode, email, phone, time) => {
	return { index, name, studentCode, email, phone, time }
}

function RegisteredTable({event}) {
	const [cookies, setCookie, removeCookie] = useCookies(['clubData'])
	const [eventRegistrations, setEventRegistrations] = useState([])

	useEffect(() => {
		fetch(`http://localhost:8080/event-registration?eventId=${event?.id}`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				console.log('data')
				console.log(data)
				setEventRegistrations(data)
			})
			.catch(error => console.error('Error:', error))
	}, [cookies])

	const rows = eventRegistrations.map((item, index) =>
		createData(index+1, `${item.firstName} ${item.lastName}`, item.studentCode, item.email, item.phoneNumber, moment(item.createdAt).format('L'))
	)

	return (
		<Container maxWidth={'lg'} sx={{ padding: '0 60px !important' }}>
			<TableContainer component={Paper} sx={{ marginX: 'auto' }}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell align='center' width={'120px'}>
								STT
							</TableCell>
							<TableCell align='center'>Họ và tên</TableCell>
							<TableCell align='center'>MSSV</TableCell>
							<TableCell align='center' width={'150px'}>
								Email
							</TableCell>
							<TableCell align='center'>Số điện thoại</TableCell>
							<TableCell align='center'>Thời gian (MM/DD/YY)</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, index) => (
							<TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell align='center'>{row.index}</TableCell>
								<TableCell align='left'>{row.name}</TableCell>
								<TableCell align='center'>{row.studentCode}</TableCell>
								<TableCell align='left'>{row.email}</TableCell>
								<TableCell align='center'>{row.phone}</TableCell>
								<TableCell align='center'>{row.time}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	)
}

export default RegisteredTable