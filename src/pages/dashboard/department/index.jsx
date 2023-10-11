import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

import {
	Paper,
	Table,
	TableContainer,
	TableHead,
	TableBody,
	TableRow,
	TextField,
	TableCell,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Typography from '@mui/material/Typography'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Department() {
	const [departments, setDepartments] = useState([])
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
	const ORIGIN_URL = 'http://localhost:8080/department'
	const [cookies, setCookie] = useCookies(['clubData'])
	const [updateData, setUpdateData] = useState(false)
	const loadDataUrl = ORIGIN_URL + '?action=list-dept&clubId=' + cookies['clubData']?.clubId
	console.log(loadDataUrl)
	const [validationErrors, setValidationErrors] = useState({
		name: false
	})

	useEffect(() => {
		// Fetch dữ liệu lại chỉ khi có tín hiệu cập nhật hoặc departments thay đổi
		if (updateData || departments.length === 0) {
			fetch(loadDataUrl, {
				method: 'GET',
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			})
				.then(function (response) {
					return response.json()
				})
				.then(function (data) {
					setDepartments(data)
					setUpdateData(false) // Đặt lại tín hiệu cập nhật sau khi cập nhật dữ liệu
				})
				.catch(error => console.error('Error:', error))
		}
	}, [cookies, updateData, departments])

	const [departmentToDelete, setDepartmentToDelete] = useState(null)

	const handleDelete = department => {
		setDepartmentToDelete(department)
		setOpenDeleteDialog(true)
	}

	const confirmDelete = () => {
		if (departmentToDelete) {
			// Handle the creation of the department here, for example, make an API call.
			const DELETE_DATA_URL = ORIGIN_URL + `?action=delete-dept&depId=${departmentToDelete.id}`
			console.log(`Testing create url: ${DELETE_DATA_URL}`)
			fetch(DELETE_DATA_URL)
				.then(res => {
					if (!res.ok) {
						throw new Error('Something went wrong')
					}
					return res.json()
				})
				.then(data => {
					setUpdateData(true)
					setOpenDeleteDialog(false)
					toast.success('Xóa thành công ', {
						position: 'top-right',
						autoClose: 3000, // Close the toast after 3 seconds
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true
					})
				})
				.catch(error => {
					toast.error('Lỗi máy chủ ! Xóa thất bại', {
						position: 'top-right',
						autoClose: 3000, // Close the toast after 3 seconds
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true
					})
					console.log(error)
				})
		}
	}
	// Create department dialog state
	const [openCreateDialog, setOpenCreateDialog] = useState(false)
	const [newDepartmentName, setNewDepartmentName] = useState('') // Add state for department name
	const handleCreateDepartment = () => {
		// Kiểm tra xem tên phòng ban có được nhập không
		if (!newDepartmentName) {
			setValidationErrors({ name: true })
			return
		}
		// Handle the creation of the department here, for example, make an API call.
		const CREATE_DATA_URL =
			ORIGIN_URL + '?action=add-dept&clubId=' + cookies['clubData']?.clubId + '&name=' + newDepartmentName
		console.log(`Testing create url: ${CREATE_DATA_URL}`)
		fetch(CREATE_DATA_URL)
			.then(res => {
				if (!res.ok) {
					throw new Error('Something went wrong')
				}
				return res.json()
			})
			.then(data => {
				setUpdateData(true)
				setOpenCreateDialog(false)
				toast.success('Thêm thành công', {
					position: 'top-right',
					autoClose: 3000, // Close the toast after 3 seconds
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				})
			})
			.catch(error => {
				toast.error('Lỗi máy chủ ! Thêm thất bại', {
					position: 'top-right',
					autoClose: 3000, // Close the toast after 3 seconds
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				})
				console.log(error)
			})

		closeCreateDepartmentDialog()
	}
	const openCreateDepartmentDialog = () => {
		setOpenCreateDialog(true)
	}

	const closeCreateDepartmentDialog = () => {
		setOpenCreateDialog(false)
		setNewDepartmentName('') // Clear the input field
	}
	const [openEditDialog, setOpenEditDialog] = useState(false)
	const [editedDepartmentName, setEditedDepartmentName] = useState('')
	const [editedDepartmentId, setEditedDepartmentId] = useState('')
	// Hàm để mở dialog chỉnh sửa tên phòng ban
	const handleOpenEditDialog = department => {
		setEditedDepartmentId(department.id)
		setEditedDepartmentName(department.name) // Đặt giá trị mặc định cho tên phòng ban
		setOpenEditDialog(true)
	}
	// Hàm để lưu các thay đổi trong dialog chỉnh sửa tên phòng ban
	const handleSaveEditedDepartment = () => {
		// Thực hiện xử lý cập nhật tên phòng ban ở đây (ví dụ: gửi API request)
		const EDIT_DATA_URL =
			ORIGIN_URL +
			'?action=edit-dept&clubId=' +
			cookies['clubData']?.clubId +
			'&name=' +
			editedDepartmentName +
			'&depId=' +
			editedDepartmentId
		console.log(`Testing create url: ${EDIT_DATA_URL}`)
		fetch(EDIT_DATA_URL)
			.then(res => {
				if (!res.ok) {
					throw new Error('Something went wrong')
				}
				return res.json()
			})
			.then(data => {
				setUpdateData(true)
				setOpenCreateDialog(false)
				toast.success('Cập nhật thành công', {
					position: 'top-right',
					autoClose: 3000, // Close the toast after 3 seconds
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				})
			})
			.catch(error => {
				toast.success('Lỗi máy chủ ! Cập nhật thất bại ', {
					position: 'top-right',
					autoClose: 3000, // Close the toast after 3 seconds
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				})
				console.log(error)
			})
		// Sau khi cập nhật xong, đóng dialog
		setOpenEditDialog(false)
	}
	return (
		<div>
			<Typography>Danh Sách Phòng Ban Câu Lạc Bộ</Typography>
			<Button variant='contained' sx={{ marginTop: 10, marginBottom: 10 }} onClick={openCreateDepartmentDialog}>
				Thêm phòng ban
			</Button>
			{/* Create Department Dialog */}
			<Dialog open={openCreateDialog} onClose={closeCreateDepartmentDialog}>
				<DialogTitle>Tạo Phòng Ban Mới</DialogTitle>
				<DialogContent>
					<TextField
						label='Tên phòng ban'
						fullWidth
						value={newDepartmentName}
						onChange={e => setNewDepartmentName(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeCreateDepartmentDialog} color='primary'>
						Hủy
					</Button>
					<Button onClick={handleCreateDepartment} color='primary'>
						Tạo
					</Button>
				</DialogActions>
			</Dialog>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Mã phòng ban</TableCell>
							<TableCell>Tên phòng ban</TableCell>
							<TableCell>Hành động</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{departments.map(department => (
							<TableRow key={department.id}>
								<TableCell>{department.id}</TableCell>
								<TableCell>{department.name}</TableCell>
								<TableCell>
									<IconButton onClick={() => handleOpenEditDialog(department)} color='primary'>
										<EditIcon />
									</IconButton>
									<IconButton onClick={() => handleDelete(department)} color='secondary'>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{/* Dialog Edit Department */}
			<Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
				<DialogTitle>Chỉnh Sửa Tên Phòng Ban</DialogTitle>
				<DialogContent>
					<TextField
						label='Tên phòng ban'
						fullWidth
						value={editedDepartmentName}
						onChange={e => setEditedDepartmentName(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenEditDialog(false)} color='primary'>
						Hủy
					</Button>
					<Button onClick={handleSaveEditedDepartment} color='primary'>
						Lưu
					</Button>
				</DialogActions>
			</Dialog>

			{/* Dialog Form Xóa */}
			<Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
				<DialogTitle>Xác Nhận Xóa Câu Lạc Bộ !</DialogTitle>
				<DialogContent>
					{departmentToDelete && (
						<Typography variant='body1'>Bạn có chắc chắn muốn xóa câu lạc bộ này không?</Typography>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDeleteDialog(false)} color='primary'>
						Hủy
					</Button>
					<Button onClick={confirmDelete} color='secondary'>
						Xóa
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default Department
