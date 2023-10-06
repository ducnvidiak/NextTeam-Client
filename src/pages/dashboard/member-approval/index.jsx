// ** React Imports
import * as React from 'react'
import { useState, useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

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
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'

// ** Icons Imports
import Magnify from 'mdi-material-ui/Magnify'
import { Chip } from '@mui/material'
import { getUserInfo } from 'src/utils/info'

// **Toasify Imports
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ViewInfo from './ViewInfo'

const TableStickyHeader = () => {
	const router = useRouter()
	const [state, dispatch] = useReducer((state, action) => action, 0)

	// ** States
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [application, setApplication] = useState([])
	const [applicationDetail, setApplicationDetail] = useState()
	const [search, setSearch] = useState('')
	const [cookies, setCookie] = useCookies(['clubData', 'userData'])

	//modal
	const [open, setOpen] = useState(false)
	const [scroll, setScroll] = useState('paper')

	const [userData, setUserData] = useState()
	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	function handleClickOpen(application) {
		setApplicationDetail(application)
		setOpen(true)
	}

	function handleApproveApplication(id) {
		fetch('http://localhost:8080/engagement?action=approve-application&id=' + id, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				toast.success(data)
				dispatch({ type: 'trigger' })
			})
			.catch(error => console.error('Error:', error))
	}

	function handleRejectApplication(id) {
		fetch('http://localhost:8080/engagement?action=reject-application&id=' + id, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				toast.success(data)
				dispatch({ type: 'trigger' })
			})
			.catch(error => console.error('Error:', error))
	}

	const handleClose = () => {
		setOpen(false)
	}

	const statusObj = {
		0: { color: 'primary', label: 'Đăng ký mới' },
		1: { color: 'success', label: 'Đã duyệt đơn' },
		2: { color: 'warning', label: 'Đang phỏng vấn' },
		3: { color: 'error', label: 'Đã từ chối' }
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
				`http://localhost:8080/notification?action=search-noti&search=${search}&clubId=${cookies['clubData'].clubId}&userId=${userData.id}`,
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
					setApplication(data)
				})
				.catch(error => console.error('Error:', error))
		}
	}

	useEffect(() => {
		fetch(`http://localhost:8080/engagement?action=application-list-of-user&userId=${userData?.id}`, {
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
	}, [userData, state])

	return (
		<Grid item xs={12}>
			<ToastContainer></ToastContainer>
			<ViewInfo
				applicationDetail={applicationDetail}
				handleClickOpen={handleClickOpen}
				open={open}
				setOpen={setOpen}
				handleClose={handleClose}
				statusObj={statusObj}
			></ViewInfo>
			<Card style={{ height: '100%' }}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingRight: '10px'
					}}
				>
					<CardHeader title='Tất cả đơn đăng ký' titleTypographyProps={{ variant: 'h6' }} />
					<TextField
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
					/>
				</div>

				<Paper sx={{ width: '100%', overflow: 'hidden' }}>
					<TableContainer>
						<Table aria-label='table in dashboard'>
							<TableHead>
								<TableRow>
									<TableCell>Họ và tên</TableCell>
									<TableCell>MSSV</TableCell>
									<TableCell>Ban đăng ký</TableCell>
									<TableCell>Ngày đăng ký</TableCell>
									<TableCell>Tình trạng</TableCell>
									<TableCell>Hành động</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{application.map(row => (
									<TableRow
										hover
										key={row.id}
										sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
									>
										<TableCell
											onClick={() => {
												handleClickOpen(row)
											}}
										>
											{row?.user.firstname} {row?.user.lastname}
										</TableCell>
										<TableCell>{row?.user.username}</TableCell>
										<TableCell>{row?.dept.name}</TableCell>
										<TableCell>{row?.engagement.createdAt}</TableCell>
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

										<TableCell>
											<PopupState variant='popover' popupId='demo-popup-menu'>
												{popupState => (
													<React.Fragment>
														<Button
															variant='contained'
															size='small'
															{...bindTrigger(popupState)}
														>
															Tác vụ
														</Button>
														<Menu {...bindMenu(popupState)}>
															<MenuItem onClick={popupState.close}>
																Tạo phỏng vấn
															</MenuItem>
															<MenuItem onClick={popupState.close}>Phỏng vấn</MenuItem>
															<MenuItem
																onClick={() => {
																	handleApproveApplication(row?.engagement.id)
																	popupState.close
																}}
															>
																Phê duyệt
															</MenuItem>
															<MenuItem
																onClick={() => {
																	handleRejectApplication(row?.engagement.id)
																	popupState.close
																}}
															>
																Từ chối
															</MenuItem>
														</Menu>
													</React.Fragment>
												)}
											</PopupState>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 25, 100]}
						component='div'
						count={application.length}
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
