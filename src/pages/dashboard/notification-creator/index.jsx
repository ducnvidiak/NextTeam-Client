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
import Backdrop from '@mui/material/Backdrop'
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
import CircularProgress from '@mui/material/CircularProgress'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

// **Toasify Imports
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EditPublicNotification from './EditPublicNotification'
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
	const [notificationsData, setNotificationsData] = useState([]) //Data public noti
	const [publicNotificationDetail, setPublicNotificationDetail] = useState() //set data cho public update
	const [privateNotificationData, setPrivateNotificationData] = useState([]) //Data  private noti
	const [privateNotificationDetail, setPrivateNotificationDetail] = useState() //set data cho private update
	const [search, setSearch] = useState() //Search data public noti
	const [cookies, setCookie] = useCookies(['clubData']) // cookiee club id
	const [openPublicDelete, setOpenPublicDelete] = useState(false) //set data cho modal delete
	const [openPrivateDelete, setOpenPrivateDelete] = useState(false) //set data cho modal delete
	const [value, setValue] = useState('1') //tab
	const [publicUpdateModal, setPublicUpdateModal] = useState(false)
	const [privateUpdateModal, setPrivateUpdateModal] = useState(false)
	const [loading, setLoading] = useState(true)

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

	function handlePublicUpdateClick(id, title, content) {
		setPublicNotificationDetail({
			id: id,
			title: title,
			content: content
		})
		setPublicUpdateModal(true)
	}

	const deletePublicNoti = event => {
		fetch('http://localhost:8080/notification?action=delete-public-noti&id=' + publicNotificationDetail?.id, {
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
				setOpenPublicDelete(false)
				dispatch({ type: 'trigger' })
			})
	}

	function handlePublicDeleteClick(id, title) {
		setOpenPublicDelete(true)
		setPublicNotificationDetail({
			id: id,
			title: title
		})
	}

	const deletePrivateNoti = event => {
		fetch('http://localhost:8080/notification?action=delete-private-noti&id=' + privateNotificationDetail?.id, {
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
		setOpenPublicDelete(false)
		setPublicUpdateModal(false)
		setPrivateUpdateModal(false)
	}

	const handleSearch = () => {
		// Thực hiện tìm kiếm hoặc gọi hàm bạn muốn khi người dùng nhấn Enter
		fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/notification?action=search-noti&search=${search}&clubId=${cookies['clubData'].clubId}`,
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

	useEffect(() => {
		fetch('http://localhost:8080/notification?action=list-noti&clubId=' + cookies['clubData'].clubId, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				setNotificationsData(data.filter(item => item.type == 'public'))
				setLoading(false)
			})
			.catch(error => console.error('Error:', error))

		fetch('http://localhost:8080/notification?action=list-private-noti&clubId=' + cookies['clubData'].clubId, {
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
			<Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 100 }} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<EditPublicNotification
				publicUpdateModal={publicUpdateModal}
				setPublicUpdateModal={setPublicUpdateModal}
				handleClose={handleClose}
				publicNotificationDetail={publicNotificationDetail}
				setPublicNotificationDetail={setPublicNotificationDetail}
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
				cookies={cookies}
			/>
			<ToastContainer></ToastContainer>
			{/* Dialog confirm delete */}

			<Dialog
				open={openPublicDelete}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{'Xác nhận xoá thông báo?'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Bạn đang muốn xoá thông báo {publicNotificationDetail?.title}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Huỷ bỏ</Button>
					<Button onClick={deletePublicNoti} autoFocus>
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
							<Button
								variant='contained'
								onClick={() => router.push('/dashboard/notification-creator/add')}
							>
								Thêm mới
							</Button>
						</div>
					</div>
					<CardContent>
						<TabPanel value='1' sx={{ p: 0 }}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									paddingRight: '10px'
								}}
							>
								<CardHeader title='Tất cả thông báo' titleTypographyProps={{ variant: 'h6' }} />
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
									onKeyPress={handleEnterKeyPress} // Gọi handleEnterKeyPress khi có sự kiện keypress
								/>
							</div>

							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Thời gian</TableCell>
										<TableCell>Nội dung</TableCell>
										<TableCell>Hành động</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{notificationsData
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
																handlePublicUpdateClick(row.id, row.title, row.content)
															}
														>
															<ModeEditOutlineOutlinedIcon
																sx={{ color: 'white' }}
															></ModeEditOutlineOutlinedIcon>
														</Button>
														<Button
															onClick={() => handlePublicDeleteClick(row.id, row.title)}
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
								count={notificationsData.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						</TabPanel>
						<TabPanel value='2' sx={{ p: 0 }}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									paddingRight: '10px'
								}}
							>
								<CardHeader title='Tất cả thông báo' titleTypographyProps={{ variant: 'h6' }} />
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
									onKeyPress={handleEnterKeyPress} // Gọi handleEnterKeyPress khi có sự kiện keypress
								/>
							</div>

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
