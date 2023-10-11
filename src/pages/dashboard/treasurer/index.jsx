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
	Grid,
	InputAdornment,
	Menu,
	MenuItem,
	Paper,
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
import PopupState from 'material-ui-popup-state'
import { Magnify } from 'mdi-material-ui'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddCategory from './AddCategory'
import PayByCash from './PayByCash'
import AddExpense from './AddExpense'

function Treasurer() {
	const router = useRouter()
	const [state, dispatch] = useReducer((state, action) => action, 0)

	// ** States
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [cookies, setCookie] = useCookies(['clubData', 'userData'])
	const [userData, setUserData] = useState()
	const [paymentData, setPaymentData] = useState([])
	const [sumBalance, setSumBalance] = useState([])
	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	console.log('sum', sumBalance)

	//modal
	const [scroll, setScroll] = useState('paper')
	const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false)
	const [openPayByCashDialog, setOpenPayByCashDialog] = useState(false)
	const [openAddExpenseDialog, setOpenAddExpenseDialog] = useState(false)

	const handleAddCategory = () => {
		setOpenAddCategoryDialog(true)
	}

	const handlePayByCash = () => {
		setOpenPayByCashDialog(true)
	}

	const handleAddExpense = () => {
		setOpenAddExpenseDialog(true)
	}

	const handleClose = () => {
		setOpenAddCategoryDialog(false)
		setOpenPayByCashDialog(false)
		setOpenAddExpenseDialog(false)
		dispatch({ type: 'trigger' })
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	const statusObj = {
		0: { color: 'primary', label: 'Mới' },
		1: { color: 'success', label: 'Thanh toán thành công' },
		2: { color: 'warning', label: 'Thanh toán thất bại' }
	}

	const type = {
		in: { color: 'success', label: 'Khoản thu' },
		out: { color: 'warning', label: 'Khoản chi' }
	}

	useEffect(() => {
		fetch(`http://localhost:8080/payment?action=list-payments&clubId=${cookies['clubData']?.clubId}`, {
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
			})
			.catch(error => console.error('Error:', error))
		fetch(`http://localhost:8080/payment?action=sum-balance&clubId=${cookies['clubData']?.clubId}`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				setSumBalance(data)
			})
			.catch(error => console.error('Error:', error))
	}, [cookies, state])

	const paymentDataTypeIn = paymentData.filter(item => item.type == 'in' && item.status == 0)

	return (
		<Grid item xs={12}>
			<AddCategory
				openAddCategoryDialog={openAddCategoryDialog}
				setOpenAddCategoryDialog={setOpenAddCategoryDialog}
				handleClose={handleClose}
				handleAddCategory={handleAddCategory}
				cookies={cookies}
			></AddCategory>
			<PayByCash
				openPayByCashDialog={openPayByCashDialog}
				setOpenPayByCashDialog={setOpenPayByCashDialog}
				handleClose={handleClose}
				handlePayByCash={handlePayByCash}
				cookies={cookies}
				paymentDataTypeIn={paymentDataTypeIn}
			></PayByCash>
			<AddExpense
				openAddExpenseDialog={openAddExpenseDialog}
				setOpenAddExpenseDialog={setOpenAddExpenseDialog}
				handleClose={handleClose}
				handleAddExpense={handleAddExpense}
				cookies={cookies}
			></AddExpense>
			<ToastContainer></ToastContainer>
			<Button variant='contained' size='small' onClick={handleAddCategory}>
				Thêm khoản nộp
			</Button>
			<Button variant='contained' size='small' onClick={handleAddExpense} sx={{ marginLeft: 2 }}>
				Thêm khoản chi
			</Button>
			<Button variant='contained' size='small' onClick={handlePayByCash} sx={{ marginLeft: 2 }}>
				Thanh toán tiền mặt
			</Button>
			<Card style={{ height: '100%' }}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingRight: '10px'
					}}
				>
					<CardHeader title='Quản lý thu chi' titleTypographyProps={{ variant: 'h6' }} />
					<Chip
						color='success'
						label={sumBalance?.balance}
						sx={{
							height: 24,
							textTransform: 'capitalize',
							'& .MuiChip-label': { fontWeight: 500 }
						}}
					/>

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
									<TableCell>Tình trạng</TableCell>
									<TableCell>Người nộp</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{paymentData.map(row => (
									<TableRow
										hover
										key={row.id}
										sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
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
										<TableCell>{row?.amount}</TableCell>
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
										<TableCell>
											{row.status ? (
												<Chip
													color={statusObj[row?.status]?.color}
													label={statusObj[row?.status]?.label}
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
										<TableCell>
											{row?.firstname} {row?.lastname}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 25, 100]}
						component='div'
						count={paymentData.length}
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
