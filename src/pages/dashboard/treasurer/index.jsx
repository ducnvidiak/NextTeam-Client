// ** React Imports
import * as React from 'react'
import { useState, useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { getUserInfo } from 'src/utils/info'

import {
	Button,
	Card,
	CardHeader,
	Chip,
	Container,
	FormControl,
	Grid,
	InputAdornment,
	InputLabel,
	Menu,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	Typography
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'
import PopupState from 'material-ui-popup-state'
import { Magnify } from 'mdi-material-ui'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddCategory from './AddCategory'
import PayByCash from './PayByCash'
import AddExpense from './AddExpense'
import PaymentDetail from './PaymentDetail'

function Treasurer() {
	const router = useRouter()
	const [state, dispatch] = useReducer((state, action) => action, 0)

	// ** States
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [cookies, setCookie] = useCookies(['clubData', 'userData'])
	const [userData, setUserData] = useState()
	const [paymentData, setPaymentData] = useState([])
	const [paymentDataDetail, setPaymentDataDetail] = useState([])
	const [paymentDataFilter, setPaymentDataFilter] = useState([])
	const [filter, setFilter] = useState('all')
	const [loading, setLoading] = useState(true)
	const [balance, setBalance] = useState()
	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	//modal
	const [scroll, setScroll] = useState('paper')
	const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false)
	const [openAddExpenseDialog, setOpenAddExpenseDialog] = useState(false)
	const [openPaymentDetailDialog, setOpenPaymentDetailDialog] = useState(false)

	const handleAddCategory = () => {
		setOpenAddCategoryDialog(true)
	}

	const handleAddExpense = () => {
		setOpenAddExpenseDialog(true)
	}

	// Tính tổng của items.amount với items.status='in'
	var totalInAmount = paymentData.reduce(function (sum, item) {
		if (item?.type == 'in') {
			return sum + item.amount
		}

		return sum
	}, 0)

	// Tính tổng của items.amount với items.status='out'
	var totalOutAmount = paymentData.reduce(function (sum, item) {
		if (item?.type == 'out') {
			return sum + item.amount
		}

		return sum
	}, 0)

	const difference = totalInAmount - totalOutAmount

	const handleClose = () => {
		setOpenAddCategoryDialog(false)
		setOpenAddExpenseDialog(false)
		setOpenPaymentDetailDialog(false)
		dispatch({ type: 'trigger' })
		setBalance(difference)
		console.log(balance)
		updateBalance()
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	const statusObj = {
		0: { color: 'primary', label: 'Chưa thanh toán' },
		1: { color: 'success', label: 'Thanh toán thành công' },
		2: { color: 'warning', label: 'Thanh toán thất bại' }
	}

	const type = {
		in: { color: 'success', label: 'Khoản thu' },
		out: { color: 'warning', label: 'Khoản chi' }
	}

	const getApiPaymentDetail = id => {
		setOpenPaymentDetailDialog(true)
		fetch(`http://localhost:8080/payment?action=list-payments-in-category&categoryId=${id}`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				setPaymentDataDetail(data)
			})
			.catch(error => console.error('Error:', error))
	}

	const updateBalance = () => {
		fetch(
			`http://localhost:8080/payment?action=update-balance&clubId=${cookies['clubData']?.clubId}&balance=${balance}`,
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

			.catch(error => console.error('Error:', error))
	}

	useEffect(() => {
		fetch(`http://localhost:8080/payment?action=list-payments-by-category&clubId=${cookies['clubData']?.clubId}`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				setPaymentData(data)
				setLoading(false)
				setBalance(difference)
			})
			.catch(error => console.error('Error:', error))
	}, [cookies, state, difference])

	useEffect(() => {
		switch (filter) {
			case 'all':
				setPaymentDataFilter(paymentData)

				return
			case 'in':
				setPaymentDataFilter(paymentData?.filter(paymentData => paymentData?.type == 'in'))

				return
			case 'out':
				setPaymentDataFilter(paymentData?.filter(paymentData => paymentData?.type == 'out'))

				return
			default:
				return
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter])

	useEffect(() => {
		setPaymentDataFilter(paymentData)
	}, [paymentData])

	return (
		<Grid item xs={12}>
			<Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 100 }} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<AddCategory
				openAddCategoryDialog={openAddCategoryDialog}
				setOpenAddCategoryDialog={setOpenAddCategoryDialog}
				handleClose={handleClose}
				handleAddCategory={handleAddCategory}
				cookies={cookies}
			></AddCategory>
			<PaymentDetail
				openPaymentDetailDialog={openPaymentDetailDialog}
				setOpenPaymentDetailDialog={setOpenPaymentDetailDialog}
				handleClose={handleClose}
				paymentDataDetail={paymentDataDetail}
				statusObj={statusObj}
				dispatch={dispatch}
			></PaymentDetail>
			<AddExpense
				openAddExpenseDialog={openAddExpenseDialog}
				setOpenAddExpenseDialog={setOpenAddExpenseDialog}
				handleClose={handleClose}
				handleAddExpense={handleAddExpense}
				cookies={cookies}
			></AddExpense>
			<ToastContainer></ToastContainer>

			<Card style={{ height: '100%' }}>
				<Button variant='contained' size='small' onClick={handleAddCategory} sx={{ margin: 2 }}>
					Thêm khoản nộp
				</Button>
				<Button variant='contained' size='small' onClick={handleAddExpense} sx={{ marginLeft: 2 }}>
					Thêm khoản chi
				</Button>
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
								<MenuItem value='all'>Tất cả khoản thu chi</MenuItem>
								<MenuItem value='in'>Khoản thu</MenuItem>
								<MenuItem value='out'>Khoản chi</MenuItem>
							</Select>
						</FormControl>
					</Container>
					<Chip label={'Số dư: ' + balance?.toLocaleString()} color='primary' sx={{ marginRight: 5 }} />
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
									<TableCell>Thời gian</TableCell>
									<TableCell>Tên khoản thu/chi</TableCell>
									<TableCell>Mô tả</TableCell>
									<TableCell>Số tiền</TableCell>
									<TableCell>Loại</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{paymentDataFilter?.map(row => (
									<TableRow
										hover
										key={row.id}
										sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
										onClick={() => (row?.type == 'in' ? getApiPaymentDetail(row?.id) : '')}
									>
										<TableCell>
											<div>
												<Typography
													variant='body2'
													color='textSecondary'
													style={{ fontSize: '0.7rem' }}
												>
													Tạo mới: {row?.createdAt}
												</Typography>
												<Typography
													variant='body2'
													color='textSecondary'
													style={{ fontSize: '0.7rem' }}
												>
													Cập nhật: {row?.updatedAt}
												</Typography>
											</div>
										</TableCell>
										<TableCell>{row?.title}</TableCell>
										<TableCell>{row?.description}</TableCell>
										<TableCell>{row?.amount.toLocaleString()}</TableCell>
										<TableCell>
											{row.type ? (
												<Chip
													color={type[row?.type]?.color}
													label={type[row?.type]?.label}
													sx={{
														height: 24,
														fontSize: '0.75rem',
														textTransform: 'capitalize',
														'& .MuiChip-label': { fontWeight: 500 }
													}}
												/>
											) : (
												''
											)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 25, 100]}
						component='div'
						count={paymentDataFilter.length}
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

export default Treasurer
