// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { Button, Container } from '@mui/material'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import ViewPDF from './ViewPDF'
import { getUserInfo } from 'src/utils/info'

const Application = () => {
	const [application, setApplication] = useState([])
	const [cookies, setCookies] = useCookies(['userData'])
	const [cv, setCv] = useState()
	const [viewCvModal, setViewCvModal] = useState(false)
	const [userData, setUserData] = useState()
	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	function handleClick(link) {
		setCv({
			cvUrl: link
		})
		setViewCvModal(true)
	}

	const handleClose = () => {
		setViewCvModal(false)
	}

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/engagement?action=application-list-of-user&userId=${userData?.id}`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				setApplication(data)
			})
			.catch(error => console.error('Error:', error))
	}, [userData])

	const statusObj = {
		0: { color: 'primary', label: 'Đăng ký mới' },
		1: { color: 'success', label: 'Đã duyệt đơn' },
		2: { color: 'warning', label: 'Đang phỏng vấn' },
		3: { color: 'error', label: 'Đã từ chối' },
		4: { color: 'error', label: 'Drop out' }
	}

	return (
		<Container>
			<ViewPDF
				cv={cv}
				viewCvModal={viewCvModal}
				setViewCvModal={setViewCvModal}
				handleClose={handleClose}
			></ViewPDF>
			<Box marginTop={2}>
				<Card>
					<TableContainer>
						<Table aria-label='table in dashboard'>
							<TableHead>
								<TableRow>
									<TableCell>Câu lạc bộ</TableCell>
									<TableCell>Ban tham gia</TableCell>
									<TableCell>CV</TableCell>
									<TableCell>Ngày nộp đơn</TableCell>
									<TableCell>Tình trạng đơn</TableCell>
									<TableCell>Ngày cập nhật</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{application.map(row => (
									<TableRow
										hover
										key={row.id}
										sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
									>
										<TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
											<Box sx={{ display: 'flex', flexDirection: 'column' }}>
												<Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
													{row.club.name}
												</Typography>
												<Typography variant='caption'>{row.club.subname}</Typography>
											</Box>
										</TableCell>
										<TableCell>{row.dept.name}</TableCell>
										<TableCell>
											<Button
												size='small'
												variant='contained'
												color='primary'
												value={`${process.env.NEXT_PUBLIC_API_URL}${row?.engagement.cvUrl}`}
												onClick={() => handleClick(row?.engagement.cvUrl)}
											>
												Xem CV
											</Button>
										</TableCell>
										<TableCell>{row.engagement.createdAt}</TableCell>
										<TableCell>
											<Chip
												color={statusObj[row?.engagement.status]?.color}
												label={statusObj[row?.engagement.status]?.label}
												sx={{
													height: 24,
													fontSize: '0.75rem',
													textTransform: 'capitalize',
													'& .MuiChip-label': { fontWeight: 500 }
												}}
											/>
										</TableCell>
										<TableCell>{row.engagement.updatedAt}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Card>
			</Box>
		</Container>
	)
}

export default Application
