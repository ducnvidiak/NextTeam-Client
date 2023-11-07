import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

const createData = (index, name, username, email, point, content, time) => {
	return { index, name, username, email, point, content, time }
}

function FeedbackTable({ event }) {
	const [cookies, setCookie, removeCookie] = useCookies(['clubData'])
	const [feedbacks, setFeedbacks] = useState([])

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedbacks?cmd=list&eventId=${event?.id}`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				
				setFeedbacks(data)
			})
			.catch(error => console.error('Error:', error))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cookies])

	const rows = feedbacks.map((item, index) =>
		createData(
			index + 1,
			`${item.firstname} ${item.lastname}`,
			item.username,
			item.email,
			item.point,
			item.content,
			moment(item.createdAt).format('L')
		)
	)

	return (
		<Container maxWidth={'lg'} sx={{ padding: '0 60px !important' }}>
			{feedbacks?.length > 0 ? (
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
								<TableCell align='center'>Đánh giá</TableCell>
								<TableCell align='center'>Nội dung</TableCell>
								<TableCell align='center'>Thời gian (MM/DD/YY)</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row, index) => (
								<TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align='center'>{row.index}</TableCell>
									<TableCell align='left'>{row.name}</TableCell>
									<TableCell align='center'>{row.username}</TableCell>
									<TableCell align='left'>{row.email}</TableCell>
									<TableCell align='center'>{row.point}</TableCell>
									<TableCell align='center'>{row.content}</TableCell>
									<TableCell align='center'>{row.time}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<Typography variant='h6' textAlign={'center'}>
					Chưa có feedback
				</Typography>
			)}
		</Container>
	)
}

export default FeedbackTable
