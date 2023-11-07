// ** React Imports
import { useState, useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import axios from 'axios'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'
import { Chip } from '@mui/material'
import NotificationDetail from '../NotificationDetail'
import { getUserInfo } from 'src/utils/info'
import moment from 'moment/moment'

const TableStickyHeader = () => {
	const router = useRouter()
	const [state, dispatch] = useReducer((state, action) => action, 0)

	// ** States
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [notificationsData, setNotificationsData] = useState([])
	const [search, setSearch] = useState('')
	const [cookies, setCookie] = useCookies(['clubData', 'userData'])
	const [notificationDetail, setNotificationDetail] = useState()
	const [userData, setUserData] = useState()
	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	//modal
	const [open, setOpen] = useState(false)

	function handleClickOpen(id, title, content, type, createdAt) {
		setNotificationDetail({
			id: id,
			title: title,
			content: content,
			type: type,
			createdAt: createdAt
		})
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const statusObj = {
		private: { color: 'primary', label: 'Cá nhân' },
		public: { color: 'success', label: 'CLB' },
		wide: { color: 'warning', label: 'Chung' }
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	const handleEnterKeyPress = event => {
		if (event.key === 'Enter') {
			// Gọi hàm của bạn ở đây khi người dùng nhấn phím Enter
			handleSearch()
		}
	}

	const handleSearch = () => {
		// Thực hiện tìm kiếm hoặc gọi hàm bạn muốn khi người dùng nhấn Enter
		if (search == ' ') {
			dispatch({ type: 'trigger' })
		} else {
			fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/notification?action=search-noti&search=${search}&clubId=${cookies['clubData'].clubId}&userId=${userData.id}`,
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
					setNotificationsData(data)
				})
				.catch(error => console.error('Error:', error))
		}
	}

	useEffect(() => {
		fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/notification?action=list-noti&clubId=${cookies['clubData']?.clubId}&userId=${userData?.id}`,
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
				setNotificationsData(data)
			})
			.catch(error => console.error('Error:', error))
	}, [cookies, userData, state])

	return (
		<Grid item xs={12}>
			<NotificationDetail
				notificationDetail={notificationDetail}
				handleClickOpen={handleClickOpen}
				open={open}
				setOpen={setOpen}
				handleClose={handleClose}
				statusObj={statusObj}
			></NotificationDetail>
			<Card style={{ height: '100%' }}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingRight: '10px'
					}}
				>
					<CardHeader title='Tất cả thông báo' titleTypographyProps={{ variant: 'h6' }} />
					{/* <TextField
						placeholder='Tìm kiếm...'
						size='small'
						sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 }, width: '30%' }}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Magnify fontSize='small' />
								</InputAdornment>
							)
						}}
						onChange={event => {
							setSearch(event.target.value)
							handleSearch()
						}}
					/> */}
				</div>

				<Paper sx={{ width: '100%', overflow: 'hidden' }}>
					<TableContainer>
						<Table aria-label='table in dashboard'>
							<TableHead>
								<TableRow>
									<TableCell>Thời gian</TableCell>
									<TableCell>Loại thông báo</TableCell>
									<TableCell>Nội dung</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{notificationsData.map(row => (
									<TableRow
										hover
										key={row.id}
										sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
									>
										<TableCell>{moment(row.createdAt).format('DD/MM/YY, h:mm A')}</TableCell>
										<TableCell>
											<Chip
												label={statusObj[row.type]?.label}
												color={statusObj[row.type]?.color}
												sx={{
													height: 24,
													fontSize: '0.75rem',
													textTransform: 'capitalize',
													'& .MuiChip-label': { fontWeight: 500 }
												}}
											/>
										</TableCell>

										<TableCell
											onClick={() =>
												handleClickOpen(row.id, row.title, row.content, row.type, row.createdAt)
											}
										>
											{row.title}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 25, 100]}
						component='div'
						count={notificationsData.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			</Card>
		</Grid>
	)
}

export default TableStickyHeader
