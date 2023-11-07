// ** React Imports
import * as React from 'react'
import { useState, useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

// ** MUI Imports
import {
	Paper,
	Table,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	TableContainer,
	TablePagination,
	Grid,
	Card,
	CardHeader,
	TextField,
	InputAdornment,
	Button,
	Menu,
	MenuItem,
	Chip,
	Container,
	FormControl,
	InputLabel,
	Select,
	Slide,
	Backdrop
} from '@mui/material'

// ** Icons Imports
import Magnify from 'mdi-material-ui/Magnify'
import { getUserInfo } from 'src/utils/info'
import CircularProgress from '@mui/material/CircularProgress'

// **Toasify Imports
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ViewInfo from './ViewInfo'
import CreateInterview from './CreateInterview'
import Interview from './Interview'

const MemberApproval = () => {
	const router = useRouter()
	const [state, dispatch] = useReducer((state, action) => action, 0)

	// ** States
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [application, setApplication] = useState([])
	const [applicationFiltered, setApplicationFiltered] = useState([])
	const [applicationDetail, setApplicationDetail] = useState()
	const [filter, setFilter] = useState('all')
	const [cookies, setCookie] = useCookies(['clubData', 'userData'])
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState('')

	//modal
	const [open, setOpen] = useState(false)
	const [openCreateInterviewDialog, setOpenCreateInterviewDialog] = useState(false)
	const [openInterviewDialog, setOpenInterviewDialog] = useState(false)

	const [userData, setUserData] = useState()
	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	// ** Functions mở xem chi tiết đơn
	function handleClickOpen(application) {
		setApplicationDetail(application)
		setOpen(true)
	}

	// ** Functions tạo phỏng vấn
	function handleCreatInterview(application) {
		setApplicationDetail(application)
		setOpenCreateInterviewDialog(true)
	}

	// ** Functions phỏng vấn
	function handleInterview(application) {
		setApplicationDetail(application)
		setOpenInterviewDialog(true)
	}

	const handleClose = () => {
		setOpen(false)
		setOpenCreateInterviewDialog(false)
		setOpenInterviewDialog(false)
		dispatch({ type: 'trigger' })
	}

	const statusObj = {
		0: { color: 'primary', label: 'Đăng ký mới' },
		1: { color: 'success', label: 'Đã duyệt đơn' },
		2: { color: 'warning', label: 'Đang phỏng vấn' },
		3: { color: 'error', label: 'Đã từ chối' },
		4: { color: 'error', label: 'Drop out' }
	}

	// ** Functions chuyển trang
	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	// ** Functions thay đổi số bài 1 trang
	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	const Transition = React.forwardRef(function Transition(props, ref) {
		return <Slide direction='up' ref={ref} {...props} />
	})

	useEffect(() => {
		fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/engagement?action=application-list-of-club&clubId=${cookies['clubData']?.clubId}`,
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
				setLoading(false)
			})
			.catch(error => console.error('Error:', error))
	}, [cookies, state])

	useEffect(() => {
		switch (filter) {
			case 'all':
				setApplicationFiltered(application)

				return
			case '0':
				setApplicationFiltered(application?.filter(application => application?.engagement?.status == '0'))

				return
			case '1':
				setApplicationFiltered(application?.filter(application => application?.engagement?.status == '1'))

				return
			case '2':
				setApplicationFiltered(application?.filter(application => application?.engagement?.status == '2'))

				return
			case '3':
				setApplicationFiltered(application?.filter(application => application?.engagement?.status == '3'))

				return
			case '4':
				setApplicationFiltered(application?.filter(application => application?.engagement?.status == '4'))

				return
			default:
				return
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter])

	useEffect(() => {
		setApplicationFiltered(application)
	}, [application])

	return (
		<Grid item xs={12}>
			<Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 100 }} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<ToastContainer></ToastContainer>
			<ViewInfo
				applicationDetail={applicationDetail}
				handleClickOpen={handleClickOpen}
				open={open}
				setOpen={setOpen}
				handleClose={handleClose}
				statusObj={statusObj}
				Transition={Transition}
			></ViewInfo>
			<CreateInterview
				applicationDetail={applicationDetail}
				handleCreatInterview={handleCreatInterview}
				openCreateInterviewDialog={openCreateInterviewDialog}
				setOpenCreateInterviewDialog={setOpenCreateInterviewDialog}
				handleClose={handleClose}
				statusObj={statusObj}
				dispatch={dispatch}
			></CreateInterview>
			<Interview
				applicationDetail={applicationDetail}
				handleInterview={handleInterview}
				openInterviewDialog={openInterviewDialog}
				setOpenInterviewDialog={setOpenInterviewDialog}
				handleClose={handleClose}
				statusObj={statusObj}
				dispatch={dispatch}
				userData={userData}
			></Interview>
			<Card style={{ height: '100%' }}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingRight: '10px'
					}}
				>
					<Container>
						<FormControl
							variant='outlined'
							size='small'
							sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 }, width: '30%', marginTop: '20px' }}
						>
							<InputLabel>Bộ lọc</InputLabel>
							<Select label='filter' defaultValue='all' onChange={e => setFilter(e.target.value)}>
								<MenuItem value='all'>Tất cả đơn đăng ký</MenuItem>
								<MenuItem value='0'>Đơn đăng ký mới</MenuItem>
								<MenuItem value='1'>Đơn đã phê duyệt</MenuItem>
								<MenuItem value='2'>Đơn đang phỏng vấn</MenuItem>
								<MenuItem value='3'>Đơn đã từ chối</MenuItem>
								<MenuItem value='4'>Thành viên đã Drop out</MenuItem>
							</Select>
						</FormControl>
					</Container>

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
								{applicationFiltered.map(row => (
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
											{!row.interview ? (
												<Button
													variant='contained'
													size='small'
													onClick={() => {
														handleCreatInterview(row)
													}}
												>
													Tạo phỏng vấn
												</Button>
											) : (
												''
											)}

											<Button
												variant='contained'
												size='small'
												onClick={() => {
													handleInterview(row)
												}}
											>
												{row.engagement.status == '2' ? 'Phỏng vấn' : 'Cập nhật'}
											</Button>
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

export default MemberApproval
