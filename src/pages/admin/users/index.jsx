import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import {
	Card,
	CardContent,
	Typography,
	Table,
	TableContainer,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Switch,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Select,
	MenuItem
} from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const useStyles = makeStyles(theme => ({
	root: {
		margin: theme.spacing(2)
	},
	tableContainer: {
		marginTop: theme.spacing(2)
	},
	dialogContent: {
		display: 'flex',
		flexDirection: 'column',
		gap: theme.spacing(2)
	}
}))
const ORIGIN_URL = 'http://localhost:8080/api/user?cmd='

const AdminManageUsers = () => {
	const [users, setUsers] = useState([])
	const [blockDialogOpen, setBlockDialogOpen] = useState(false)
	const [permissionDialogOpen, setPermissionDialogOpen] = useState(false)
	const [selectedUser, setSelectedUser] = useState(null)
	const [selectedRole, setSelectedRole] = useState('') // State for selected role in dropdown

	const refreshUsers = () => {
		fetch(`${ORIGIN_URL}list`)
			.then(res => res.json())
			.then(result => {
				setUsers(result)
			})
	}

	useEffect(() => {
		refreshUsers()
	}, [users])

	const classes = useStyles()

	const handleBlockDialogOpen = user => {
		setSelectedUser(user)
		setBlockDialogOpen(true)
	}

	const handleBlockDialogClose = () => {
		setSelectedUser(null)
		setBlockDialogOpen(false)
	}

	const handleUnBlockDialogOpen = user => {
		setSelectedUser(user)
		setBlockDialogOpen(true)
	}

	const handlePermissionDialogOpen = user => {
		setSelectedUser(user)
		setPermissionDialogOpen(true)
	}

	const handlePermissionDialogClose = () => {
		setSelectedUser(null)
		setPermissionDialogOpen(false)
	}

	const handleBlockUser = selectedUser => {
		if (selectedUser.isActive) {
			fetch(`${ORIGIN_URL}block&id=${selectedUser.id}`)
				.then(res => res.json())
				.then(result => {
					// Assuming the server responds with the updated user data
					setUsers(prevUsers =>
						prevUsers.map(user => (user.id === selectedUser.id ? { ...user, isActive: false } : user))
					)
					toast.success('Mở chặn thành công', {
						position: 'top-right',
						autoClose: 3000, // Close the toast after 3 seconds
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true
					  })
				})
		} else {
			fetch(`${ORIGIN_URL}unblock&id=${selectedUser.id}`)
				.then(res => res.json())
				.then(result => {
					// Assuming the server responds with the updated user data
					setUsers(prevUsers =>
						prevUsers.map(user => (user.id === selectedUser.id ? { ...user, isActive: true } : user))
					)
					toast.success('Chặn thành công', {
						position: 'top-right',
						autoClose: 3000, // Close the toast after 3 seconds
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true
					  })
				})
		}
		handleBlockDialogClose()
	}

	const handleGrantPermission = () => {
		if (selectedRole === 'Quản trị viên') {
			const DCT_ADMIN_URL = `${ORIGIN_URL}dct_admin&id=${selectedUser.id}`
			console.log(DCT_ADMIN_URL)
			fetch(DCT_ADMIN_URL)
				.then(res => res.json())
				.then(result => {
					// Assuming the server responds with the updated user data
					setUsers(prevUsers =>
						prevUsers.map(user => (user.id === selectedUser.id ? { ...user, isAdmin: true } : user))
					)
					toast.success('Phân quyền thành công', {
						position: 'top-right',
						autoClose: 3000, // Close the toast after 3 seconds
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true
					  })
				}).catch(error =>{
					toast.error('Phân quyền thất bại', {
						position: 'top-right',
						autoClose: 3000, // Close the toast after 3 seconds
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true
					  })
				})
		} else {
			const DCT_USER_URL = `${ORIGIN_URL}dct_admin&id=${selectedUser.id}`
			console.log(DCT_USER_URL)
			fetch(DCT_USER_URL)
				.then(res => res.json())
				.then(result => {
					setUsers(prevUsers =>
						prevUsers.map(user => (user.id === selectedUser.id ? { ...user, isAdmin: false } : user))
					)
					toast.success('Phân quyền thành công', {
						position: 'top-right',
						autoClose: 3000, // Close the toast after 3 seconds
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true
					  })
				})
		}
		handlePermissionDialogClose()
	}

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography variant='h6' gutterBottom>
					Quản lý người dùng trên nền tảng
				</Typography>
				<TableContainer className={classes.tableContainer}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Tên người dùng</TableCell>
								<TableCell>Tên tài khoản</TableCell>
								<TableCell>Quyền</TableCell>
								<TableCell>Đã chặn</TableCell>
								<TableCell>Thao tác</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users?.map(user => (
								<TableRow key={user?.id}>
									<TableCell>{user.id}</TableCell>
									<TableCell>{user.firstname + ' ' + user.lastname}</TableCell>
									<TableCell>{user.username}</TableCell>
									<TableCell>{user.isAdmin == 'true' ? 'Quản Trị Viên' : 'Người Dùng'}</TableCell>
									<TableCell>
										<Switch
											checked={user.isActive}
											color='primary'
											onChange={() =>
												user.isActive
													? handleBlockDialogOpen(user)
													: handleUnBlockDialogOpen(user)
											}
										/>
									</TableCell>
									<TableCell>
										{user.role !== 'Admin' && (
											<Button
												variant='outlined'
												color='primary'
												onClick={() => handlePermissionDialogOpen(user)}
											>
												Phân quyền
											</Button>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<Dialog open={blockDialogOpen} onClose={handleBlockDialogClose}>
					<DialogTitle>
						{selectedUser && selectedUser.isActive ? 'Mở chặn người dùng' : 'Chặn người dùng'}
					</DialogTitle>
					<DialogContent className={classes.dialogContent}>
						<Typography variant='subtitle1'>
							{selectedUser && selectedUser.isActive
								? 'Bạn có chắc chắn mở chặn người dùng này ?'
								: 'Bạn có chắc chắn chặn người dùng này ?'}
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleBlockDialogClose}>Hủy</Button>
						<Button color='primary' onClick={() => handleBlockUser(selectedUser)}>
							{'Xác Nhận'}
						</Button>
					</DialogActions>
				</Dialog>
				<Dialog open={permissionDialogOpen} onClose={handlePermissionDialogClose}>
					<DialogTitle>Phân quyền cho tài khoản {selectedUser ? selectedUser.username : ''}</DialogTitle>
					<DialogContent className={classes.dialogContent}>
						<Typography variant='subtitle1'>Chọn quyền:</Typography>
						<Select value={selectedRole} onChange={e => setSelectedRole(e.target.value)} fullWidth>
							<MenuItem value='Quản trị viên'>Quản trị viên</MenuItem>
							<MenuItem value='Người dùng'>Người dùng</MenuItem>
						</Select>
					</DialogContent>
					<DialogActions>
						<Button onClick={handlePermissionDialogClose}>Hủy</Button>
						<Button color='primary' onClick={handleGrantPermission}>
							Phân quyền
						</Button>
					</DialogActions>
				</Dialog>
			</CardContent>
		</Card>
	)
}

export default AdminManageUsers
