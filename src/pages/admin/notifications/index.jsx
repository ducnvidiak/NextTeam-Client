// ** React Imports
import { useState, useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import CardContent from '@mui/material/CardContent'
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
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

// **Toasify Imports
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EditWideNotification from './EditWideNotification'
import EditPrivateNotification from './EditPrivateNotification'
import CancelIcon from '@mui/icons-material/Cancel'
import Decentralization from 'src/layouts/Decentralization'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const NotificationCreator = () => {
	const router = useRouter()

	// ** States
	const [state, dispatch] = useReducer((state, action) => action, 0)
	const [page, setPage] = useState(0) //Phân trang
	const [rowsPerPage, setRowsPerPage] = useState(10) //Phân trang
	const [wideNotificationsData, setWideNotificationsData] = useState([]) //Data wide noti
	const [wideNotificationDetail, setWideNotificationDetail] = useState() //set data cho wide update
	const [privateNotificationData, setPrivateNotificationData] = useState([]) //Data  private noti
	const [privateNotificationDetail, setPrivateNotificationDetail] = useState() //set data cho private update
	const [search, setSearch] = useState() //Search data wide noti
	const [cookies, setCookie] = useCookies(['clubData']) // cookiee club id
	const [openWideDelete, setOpenWideDelete] = useState(false) //set data cho modal delete
	const [openPrivateDelete, setOpenPrivateDelete] = useState(false) //set data cho modal delete
	const [value, setValue] = useState('1') //tab
	const [wideUpdateModal, setWideUpdateModal] = useState(false)
	const [privateUpdateModal, setPrivateUpdateModal] = useState(false)

	//change phân trang
	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const handleEnterKeyPress = event => {
		if (event.key === 'Enter') {
			// Gọi hàm của bạn ở đây khi người dùng nhấn phím Enter
			handleSearch()
		}
	}

	function handleWideUpdateClick(id, title, content) {
		setWideNotificationDetail({
			id: id,
			title: title,
			content: content
		})
		setWideUpdateModal(true)
	}

	const deleteWideNoti = event => {
		fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/notification?action=delete-public-noti&id=${wideNotificationDetail?.id}`,
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
				toast.success(data)
				setOpenWideDelete(false)
				dispatch({ type: 'trigger' })
			})
	}

	function handleWideDeleteClick(id, title) {
		setOpenWideDelete(true)
		setWideNotificationDetail({
			id: id,
			title: title
		})
	}

	const deletePrivateNoti = event => {
		fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/notification?action=delete-private-noti&id=${privateNotificationDetail?.id}`,
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
				toast.success(data)
				setOpenPrivateDelete(false)
				dispatch({ type: 'trigger' })
			})
			.catch(error => console.error('Error:', error))
	}

	function handlePrivateDeleteClick(id, title) {
		setOpenPrivateDelete(true)
		setPrivateNotificationDetail({
			id: id,
			title: title
		})
	}

	function handlePrivateUpdateClick(id, title, content, sendTo) {
		setPrivateNotificationDetail({
			id: id,
			title: title,
			content: content,
			sendTo: sendTo
		})
		setPrivateUpdateModal(true)
	}

	const handleClose = () => {
		setOpenWideDelete(false)
		setWideUpdateModal(false)
		setPrivateUpdateModal(false)
	}

	const handleSearch = () => {}

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/notification?action=list-wide-noti`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				setWideNotificationsData(data)
			})
			.catch(error => console.error('Error:', error))

		fetch(`${process.env.NEXT_PUBLIC_API_URL}/notification?action=list-private-noti-from-admin`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				setPrivateNotificationData(data)
			})
			.catch(error => console.error('Error:', error))
	}, [cookies, state])

	return (
		<Grid item xs={12} style={{ height: '100%' }}>
			<EditWideNotification
				wideUpdateModal={wideUpdateModal}
				setWideUpdateModal={setWideUpdateModal}
				handleClose={handleClose}
				wideNotificationDetail={wideNotificationDetail}
				setWideNotificationDetail={setWideNotificationDetail}
				state={state}
				dispatch={dispatch}
			/>
			<EditPrivateNotification
				privateUpdateModal={privateUpdateModal}
				setPrivateUpdateModal={setPrivateUpdateModal}
				handleClose={handleClose}
				privateNotificationDetail={privateNotificationDetail}
				setPrivateNotificationDetail={setPrivateNotificationDetail}
				state={state}
				dispatch={dispatch}
			/>
			<ToastContainer></ToastContainer>
			{/* Dialog confirm delete */}

			<Dialog
				open={openWideDelete}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{'Xác nhận xoá thông báo?'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Bạn đang muốn xoá thông báo {wideNotificationDetail?.title}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Huỷ bỏ</Button>
					<Button onClick={deleteWideNoti} autoFocus>
						Đồng ý
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={openPrivateDelete}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{'Xác nhận xoá thông báo?'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Bạn đang muốn xoá thông báo {privateNotificationDetail?.title}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Huỷ bỏ</Button>
					<Button onClick={deletePrivateNoti} autoFocus>
						Đồng ý
					</Button>
				</DialogActions>
			</Dialog>
			<Card style={{ height: '100%' }}>
				<TabContext value={value}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<TabList sx={{ float: 'left' }} onChange={handleChange} aria-label='card navigation example'>
							<Tab value='1' label='Thông báo chung' />
							<Tab value='2' label='Thông báo cá nhân' />
						</TabList>
						<div style={{ float: 'right', padding: '10px 10px 0 0 ' }}>
							<Button variant='contained' onClick={() => router.push('/admin/notifications/add')}>
								Thêm mới
							</Button>
						</div>
					</div>
					<CardContent>
						<TabPanel value='1' sx={{ p: 0 }}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Thời gian</TableCell>
										<TableCell>Nội dung</TableCell>
										<TableCell>Hành động</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{wideNotificationsData
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map(row => (
											<TableRow key={row.id}>
												<TableCell>{row.createdAt}</TableCell>
												<TableCell>{row.title}</TableCell>

												<TableCell>
													<ButtonGroup
														variant='contained'
														aria-label='outlined primary button group'
													>
														<Button
															onClick={() =>
																handleWideUpdateClick(row.id, row.title, row.content)
															}
														>
															<ModeEditOutlineOutlinedIcon
																sx={{ color: 'white' }}
															></ModeEditOutlineOutlinedIcon>
														</Button>
														<Button
															onClick={() => handleWideDeleteClick(row.id, row.title)}
														>
															<DeleteIcon sx={{ color: 'white' }}></DeleteIcon>
														</Button>
													</ButtonGroup>
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
							<TablePagination
								rowsPerPageOptions={[10, 25, 100]}
								component='div'
								count={wideNotificationsData.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						</TabPanel>
						<TabPanel value='2' sx={{ p: 0 }}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Thời gian</TableCell>
										<TableCell>Nội dung</TableCell>
										<TableCell>Gửi cho</TableCell>
										<TableCell>Tình trạng xem</TableCell>
										<TableCell>Hành động</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{privateNotificationData
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map(row => (
											<TableRow key={row.id}>
												<TableCell>{row.createdAt}</TableCell>
												<TableCell>{row.title}</TableCell>
												<TableCell>
													{row.firstname} {row.lastname}
												</TableCell>
												<TableCell>
													{row.hasSeen ? (
														<CheckCircleIcon sx={{ color: 'green' }}></CheckCircleIcon>
													) : (
														<CancelIcon sx={{ color: 'red' }}></CancelIcon>
													)}
												</TableCell>

												<TableCell>
													<ButtonGroup
														variant='contained'
														aria-label='outlined primary button group'
													>
														<Button
															onClick={() =>
																handlePrivateUpdateClick(
																	row.id,
																	row.title,
																	row.content,
																	row.sendTo
																)
															}
														>
															<ModeEditOutlineOutlinedIcon
																sx={{ color: 'white' }}
															></ModeEditOutlineOutlinedIcon>
														</Button>
														<Button
															onClick={() => handlePrivateDeleteClick(row.id, row.title)}
														>
															<DeleteIcon sx={{ color: 'white' }}></DeleteIcon>
														</Button>
													</ButtonGroup>
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
							<TablePagination
								rowsPerPageOptions={[10, 25, 100]}
								component='div'
								count={privateNotificationData.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						</TabPanel>
					</CardContent>
				</TabContext>
			</Card>
		</Grid>
	)
}

export default NotificationCreator
