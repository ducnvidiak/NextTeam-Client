// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import { Button, FormControl, FormLabel, Input, Card, CardMedia, InputLabel, Select, MenuItem } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'
import DialogContentText from '@mui/material/DialogContentText'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import FormHelperText from '@mui/material/FormHelperText'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Club() {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

	const initialClubFormData = {
		id: '',
		name: '',
		subname: '',
		description: '',
		avatarUrl: '',
		movementPoint: '',
		balance: '',
		bannerUrl: '',
		categoryId: '',
		categoryName: '',
		isActive: 'false'
	}
	const [clubFormData, setClubFormData] = useState(initialClubFormData)
	const [resultClubCate, setResultClubCate] = useState([])
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [clubs, setClubs] = useState([])
	const [open, setOpen] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState('')

	const initValid = {
		name: false,
		subname: false,
		categoryId: false,
		movementPoint: false,
		balance: false
	}
	const [validationErrors, setValidationErrors] = useState(initValid)

	const handleInputChange = e => {
		const { name, value } = e.target
		setClubFormData({
			...clubFormData,
			[name]: value
		})
	}

	const openCreateDialog = () => {
		setIsCreateDialogOpen(true)
	}

	const closeCreateDialog = () => {
		setIsCreateDialogOpen(false)
		setValidationErrors(initValid)
	}

	const refreshClubCategories = () => {
		fetch('http://localhost:8080/api/club-categories?cmd=list')
			.then(res => res.json())
			.then(result => {
				setResultClubCate(result)
			})
	}
	useEffect(() => {
		refreshClubCategories()
	}, []) // Gọi refreshClubCategories một lần khi component được tạo

	useEffect(() => {
		// Chỉ gọi lại refreshClubCategories khi result thay đổi
		refreshClubCategories()
	}, [resultClubCate])

	const refreshClubData = () => {
		fetch('http://localhost:8080/api/club?cmd=list')
			.then(res => res.json())
			.then(result => {
				setClubs(result)
			})
	}

	const closeEditDialog = () => {
		setIsEditDialogOpen(false)
		setClubFormData(initialClubFormData)
		setValidationErrors(initValid)
	}

	const openEditDialog = rowData => {
		setClubFormData({
			id: rowData.id,
			subname: rowData.subname,
			name: rowData.name,
			description: rowData.description,
			avatarUrl: rowData.avatarUrl,
			bannerUrl: rowData.bannerUrl,
			movementPoint: rowData.movementPoint,
			categoryName: rowData.categoryName,
			balance: rowData.balance,
			isActive: rowData.isActive,
			categoryId: rowData.categoryId
		})
		setIsEditDialogOpen(true)
	}

	const openDeleteDialog = rowData => {
		setClubFormData({
			...clubFormData,
			id: rowData.id
		})

		setIsDeleteDialogOpen(true)
	}

	const closeDeleteDialog = () => {
		setIsDeleteDialogOpen(false)
		setClubFormData(initialClubFormData)
	}

	const handleCreateClub = () => {
		// Kiểm tra các trường dữ liệu và hiển thị thông báo lỗi nếu cần
		const errors = {}
		if (!clubFormData.name) {
			errors.name = true
		}
		if (!clubFormData.subname) {
			errors.subname = true
		}
		if (!clubFormData.categoryId) {
			errors.categoryId = true
		}
		if (clubFormData.movementPoint < 0) {
			errors.movementPoint = true
		}
		if (clubFormData.balance < 0) {
			errors.balance = true
		}
		setValidationErrors(errors)

		// Nếu có lỗi, không thực hiện gửi yêu cầu
		if (Object.keys(errors).length > 0) {
			toast.error('Thông tin câu lạc bộ bị thiếu hoặc không đúng ! Vui lòng nhập lại !', {
				position: 'top-right',
				autoClose: 3000, // Close the toast after 3 seconds
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true
			})
		}

		const url_fetch =
			'http://localhost:8080/api/club?cmd=add&name=' +
			clubFormData.name +
			'&subname=' +
			clubFormData.subname +
			'&categoryId=' +
			clubFormData.categoryId +
			'&description=' +
			clubFormData.description +
			'&avatarUrl=' +
			clubFormData.avatarUrl +
			'&bannerUrl=' +
			clubFormData.bannerUrl +
			'&movementPoint=' +
			clubFormData.movementPoint +
			'&balance=' +
			clubFormData.balance +
			'&isActive=' +
			clubFormData.isActive

		fetch(url_fetch)
			.then(res => {
				if (!res.ok) {
					throw new Error('Network response was not ok')
				}

				return res.json()
			})
			.then(data => {
				setIsCreateDialogOpen(false)
				setClubFormData(initialClubFormData)
				toast.success('Câu lạc bộ đã được thêm thành công', {
					position: 'top-right',
					autoClose: 3000, // Close the toast after 3 seconds
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				})
			})
			.catch(error => {
				toast.error('Thêm câu lạc bộ thất bại', {
					position: 'top-right',
					autoClose: 3000, // Close the toast after 3 seconds
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				})
			})
	}

	const handleEditClub = async () => {
		const errors = {}
		if (!clubFormData.name) {
			errors.name = true
		}
		if (!clubFormData.subname) {
			errors.subname = true
		}
		if (!clubFormData.categoryId) {
			errors.categoryId = true
		}
		if (clubFormData.movementPoint < 0) {
			errors.movementPoint = true
		}
		if (clubFormData.balance < 0) {
			errors.balance = true
		}

		setValidationErrors(errors)

		// Nếu có lỗi, không thực hiện gửi yêu cầu
		if (Object.keys(errors).length > 0) {
			toast.error('Thông tin câu lạc bộ bị thiếu hoặc không đúng ! Vui lòng nhập lại !', {
				position: 'top-right',
				autoClose: 3000, // Close the toast after 3 seconds
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true
			})
		}

		const url_fetch =
			'http://localhost:8080/api/club?cmd=update&name=' +
			clubFormData.name +
			'&subname=' +
			clubFormData.subname +
			'&categoryId=' +
			clubFormData.categoryId +
			'&description=' +
			clubFormData.description +
			'&avatarUrl=' +
			clubFormData.avatarUrl +
			'&bannerUrl=' +
			clubFormData.bannerUrl +
			'&movementPoint=' +
			clubFormData.movementPoint +
			'&balance=' +
			clubFormData.balance +
			'&isActive=' +
			clubFormData.isActive +
			'&id=' +
			clubFormData.id

		fetch(url_fetch)
			.then(res => {
				if (!res.ok) {
					throw new Error('Network response was not ok')
				}

				return res.json()
			})
			.then(data => {
				setClubFormData(initialClubFormData)
				toast.success('Câu lạc bộ đã cập nhật thành công', {
					position: 'top-right',
					autoClose: 3000, // Close the toast after 3 seconds
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				})
				setIsEditDialogOpen(false)
			})
			.catch(error => {
				toast.error('Cập nhật câu lạc bộ thất bại', {
					position: 'top-right',
					autoClose: 3000, // Close the toast after 3 seconds
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				})
			})
	}

	const handleDeleteClub = () => {
		fetch('http://localhost:8080/api/club?cmd=delete&id=' + clubFormData.id)
			.then(res => {
				if (!res.ok) {
					toast.error('Xóa câu lạc bộ thất bại', {
						position: 'top-right',
						autoClose: 3000, // Close the toast after 3 seconds
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true
					})
					throw new Error('Network response was not ok')
				}

				return res.json()
			})
			.then(data => {
				toast.success('Câu lạc bộ đã xóa thành công', {
					position: 'top-right',
					autoClose: 3000, // Close the toast after 3 seconds
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				})
				setIsDeleteDialogOpen(false)

				setDeleteSuccess(true)
			})
			.catch(error => {})
	}

	const handleFileUpload = async e => {
		const file = e.target.files[0]
		if (file) {
			// Tạo formData để gửi tệp hình ảnh lên imgbb
			const formData = new FormData()
			formData.append('image', file)

			try {
				const response = await fetch('https://api.imgbb.com/1/upload?key=c3ea5cebc2cb4a75e54ef52db0eeabca', {
					method: 'POST',
					body: formData
				})

				if (response.ok) {
					const data = await response.json()
					const imageUrl = data.data.url

					setClubFormData(prevData => ({
						...prevData,
						['avatarUrl']: imageUrl
					}))
				} else {
				}
			} catch (error) {}
		}
	}

	const handleBannerImageUpload = async e => {
		const file = e.target.files[0]
		if (file) {
			// Tạo formData để gửi tệp hình ảnh lên imgbb
			const formData = new FormData()
			formData.append('image', file)

			try {
				const response = await fetch('https://api.imgbb.com/1/upload?key=c3ea5cebc2cb4a75e54ef52db0eeabca', {
					method: 'POST',
					body: formData
				})

				if (response.ok) {
					const data = await response.json()
					const imageBannerUrl = data.data.url

					setClubFormData(prevData => ({
						...prevData,
						['bannerUrl']: imageBannerUrl
					}))
				} else {
				}
			} catch (error) {}
		}
	}

	const handleOpenDialog = () => {
		setOpen(true)
	}

	const handleCloseDialog = () => {
		setOpen(false)
	}

	const handleCategoryChange = event => {
		const selectedCategoryLabel = event.target.value
		const selectedCategory = resultClubCate.find(category => category.name === selectedCategoryLabel)
		setSelectedCategory(selectedCategoryLabel)
		setClubFormData(prevData => ({
			...prevData,
			categoryId: selectedCategory.id,
			categoryName: selectedCategory.name
		}))
	}

	const [isDescriptionDialogOpen, setDescriptionDialogOpen] = useState(false)
	const [selectedDescription, setSelectedDescription] = useState('')

	const handleViewDescription = description => {
		setSelectedDescription(description)
		setDescriptionDialogOpen(true)
	}

	const handleCloseDescriptionDialog = () => {
		setDescriptionDialogOpen(false)
	}

	return (
		<div>
			{/* Button Create Dialog */}
			<Button
				onClick={openCreateDialog}
				variant='contained'
				color='primary'
				align='right'
				sx={{ marginBottom: '15px' }}
			>
				Tạo Câu Lạc Bộ
			</Button>
			{/* Create Club Dialog */}

			<Dialog open={isCreateDialogOpen} onClose={closeCreateDialog} aria-labelledby='form-dialog-title'>
				<DialogTitle id='form-dialog-title'>Thêm Câu Lạc Bộ</DialogTitle>

				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						id='name'
						name='name'
						label='Tên Câu Lạc Bộ'
						type='text'
						fullWidth
						value={clubFormData.name}
						onChange={handleInputChange}
						error={validationErrors.name} // Sử dụng error prop để hiển thị lỗi
						helperText={validationErrors.name ? 'Tên không được bỏ trống' : ''}
					/>
					<TextField
						autoFocus
						margin='dense'
						id='subname'
						name='subname'
						label='Tên Viết Tắt Câu Lạc Bộ'
						type='text'
						fullWidth
						value={clubFormData.subname}
						onChange={handleInputChange}
						error={validationErrors.subname} // Sử dụng error prop để hiển thị lỗi
						helperText={validationErrors.subname ? 'Tên viết tắt không được bỏ trống' : ''}
					/>
					<>
						<DialogContent id='form-dialog-title' sx={{ paddingLeft: 0 }}>
							Danh Mục Câu Lạc Bộ
						</DialogContent>
						<FormControl fullWidth>
							<Select
								labelId='category-label'
								id='category'
								value={selectedCategory}
								onChange={handleCategoryChange}
							>
								{resultClubCate.map(category => (
									<MenuItem key={category.id} value={category.name}>
										{category.name}
									</MenuItem>
								))}
							</Select>
							{validationErrors.categoryId && (
								<FormHelperText sx={{ color: 'red' }}>Danh mục không được bỏ trống</FormHelperText>
							)}
						</FormControl>
					</>
					<DialogContent id='form-dialog-title' sx={{ paddingLeft: 0 }}>
						Mô Tả Câu Lạc Bộ
					</DialogContent>
					<TextareaAutosize
						minRows={3} // Specify the minimum number of rows
						maxRows={10} // Optionally specify the maximum number of rows
						aria-label='Mô tả'
						id='description'
						name='description'
						placeholder='Mô tả'
						value={clubFormData.description}
						onChange={handleInputChange}
						style={{
							width: '100%',
							height: '150px',
							padding: 10,
							borderColor: '#ccc',
							borderRadius: 5 // Set the initial border color
						}}
					/>
					{/* Tải ảnh avatar */}
					<FormControl>
						<FormLabel htmlFor='file-upload'>
							{' '}
							<DialogContent id='form-dialog' sx={{ paddingLeft: '0' }}>
								Tải ảnh đại điện câu lạc bộ
							</DialogContent>
						</FormLabel>
						<Input
							accept='image/*' // Chỉ cho phép tải lên các tệp hình ảnh
							id='file-upload'
							type='file'
							onChange={handleFileUpload}
							style={{ display: 'none' }}
						/>
						<label htmlFor='file-upload'>
							<Button
								variant='contained'
								component='span'
								startIcon={<CloudUpload />}
								sx={{ margin: '10px 0' }}
							>
								Tải lên
							</Button>
						</label>
						{clubFormData.avatarUrl && (
							<Card>
								<CardMedia
									component='img'
									alt='Selected Image'
									height='100%'
									width='100%'
									image={clubFormData.avatarUrl}
								/>
							</Card>
						)}
					</FormControl>

					{/* Tải ảnh banner */}

					<FormControl>
						<FormLabel htmlFor='file-upload'>
							{' '}
							<DialogContent id='form-dialog-title' sx={{ paddingLeft: 0 }}>
								Tải ảnh banner câu lạc bộ
							</DialogContent>
						</FormLabel>
						<Input
							accept='image/*' // Chỉ cho phép tải lên các tệp hình ảnh
							id='image-upload'
							type='file'
							onChange={handleBannerImageUpload}
							style={{ display: 'none' }}
						/>
						<label htmlFor='image-upload'>
							<Button
								variant='contained'
								component='span'
								startIcon={<CloudUpload />}
								sx={{ margin: '10px 0' }}
							>
								Tải lên
							</Button>
						</label>
						{clubFormData.bannerUrl && (
							<Card>
								<CardMedia
									component='img'
									alt='Selected Image'
									height='100%'
									width='100%'
									image={clubFormData.bannerUrl}
								/>
							</Card>
						)}
					</FormControl>

					{/*Điểm hoạt động  */}
					<TextField
						autoFocus
						margin='dense'
						id='movementPoint'
						name='movementPoint'
						label='Điểm Hoạt Động Câu Lạc Bộ'
						type='number'
						fullWidth
						value={clubFormData.movementPoint}
						onChange={handleInputChange}
						error={validationErrors.movementPoint} // Add error prop
						helperText={
							validationErrors.movementPoint &&
							'Điểm Hoạt Động Câu Lạc Bộ phải lớn hơn hoặc bằng 0 hoặc bỏ trống'
						} // Display error message
					/>
					{/*Số dư */}
					<TextField
						autoFocus
						margin='dense'
						id='balance'
						name='balance'
						label='Số Dư Câu Lạc Bộ'
						type='number'
						fullWidth
						value={clubFormData.balance}
						onChange={handleInputChange}
						error={validationErrors.balance} // Add error prop
						helperText={
							validationErrors.balance && 'Số Dư Câu Lạc Bộ phải lớn hơn hoặc bằng 0 hoặc bỏ trống'
						} // Display error message
					/>
					{/*Trạng thái  */}
					<FormControl component='fieldset'>
						<DialogContent id='form-dialog-title' sx={{ paddingLeft: 0 }}>
							Trạng thái câu lạc bộ
						</DialogContent>
						<RadioGroup
							aria-label='isActive'
							name='isActive'
							value={clubFormData.isActive.toString()} // Chuyển đổi giá trị từ boolean sang chuỗi
							onChange={handleInputChange}
						>
							<FormControlLabel value='true' control={<Radio />} label='Hoạt động' />
							<FormControlLabel value='false' control={<Radio />} label='Không hoạt động' />
						</RadioGroup>
					</FormControl>
				</DialogContent>
				{/* Cancle dialog */}
				<DialogActions>
					<Button onClick={closeCreateDialog} color='primary'>
						Hủy
					</Button>
					<Button onClick={handleCreateClub} color='primary'>
						Thêm Mới
					</Button>
				</DialogActions>

				{/* Edit dialog */}
			</Dialog>
			{/* Edit Club Dialog */}
			<Dialog open={isEditDialogOpen} onClose={closeEditDialog} aria-labelledby='form-dialog-title'>
				<DialogTitle id='form-dialog-title'>Thay Đổi Thông Tin Câu Lạc Bộ</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						id='id'
						name='id'
						label='ID'
						type='text'
						InputProps={{
							readOnly: true
						}}
						fullWidth
						value={clubFormData.id}
						onChange={handleInputChange}
					/>
					<TextField
						autoFocus
						margin='dense'
						id='name'
						name='name'
						label='Tên Câu Lạc Bộ'
						type='text'
						fullWidth
						value={clubFormData.name}
						onChange={handleInputChange}
					/>
					<TextField
						autoFocus
						margin='dense'
						id='subname'
						name='subname'
						label='Tên Viết Tắt Câu Lạc Bộ'
						type='text'
						fullWidth
						value={clubFormData.subname}
						onChange={handleInputChange}
					/>
					<>
						<DialogContent id='form-dialog-title' sx={{ paddingLeft: 0 }}>
							Danh Mục Câu Lạc Bộ
						</DialogContent>
						<FormControl fullWidth>
							<Select
								labelId='category-label'
								id='category'
								value={selectedCategory}
								onChange={handleCategoryChange}
							>
								{resultClubCate.map(category => (
									<MenuItem key={category.id} value={category.name}>
										{category.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</>
					<DialogContent id='form-dialog-title' sx={{ paddingLeft: 0 }}>
						Mô Tả Câu Lạc Bộ
					</DialogContent>
					<TextareaAutosize
						minRows={3} // Specify the minimum number of rows
						maxRows={10} // Optionally specify the maximum number of rows
						aria-label='Mô tả'
						id='description'
						name='description'
						placeholder='Mô tả'
						value={clubFormData.description}
						onChange={handleInputChange}
						style={{
							width: '100%',
							height: '150px',
							padding: 10,
							borderColor: '#ccc',
							borderRadius: 5 // Set the initial border color
						}}
					/>

					{/* Tải ảnh avatar */}
					<FormControl>
						<FormLabel htmlFor='file-upload'>
							{' '}
							<DialogContent id='form-dialog' sx={{ paddingLeft: '0' }}>
								Tải ảnh đại điện câu lạc bộ
							</DialogContent>
						</FormLabel>
						<Input
							accept='image/*' // Chỉ cho phép tải lên các tệp hình ảnh
							id='file-upload'
							type='file'
							onChange={handleFileUpload}
							style={{ display: 'none' }}
						/>
						<label htmlFor='file-upload'>
							<Button
								variant='contained'
								component='span'
								startIcon={<CloudUpload />}
								sx={{ margin: '10px 0' }}
							>
								Tải lên
							</Button>
						</label>
						{clubFormData.avatarUrl && (
							<Card>
								<CardMedia
									component='img'
									alt='Selected Image'
									height='100%'
									width='100%'
									image={clubFormData.avatarUrl}
								/>
							</Card>
						)}
					</FormControl>

					{/* Tải ảnh banner */}

					<FormControl>
						<FormLabel htmlFor='file-upload'>
							{' '}
							<DialogContent id='form-dialog-title' sx={{ paddingLeft: 0 }}>
								Tải ảnh banner câu lạc bộ
							</DialogContent>
						</FormLabel>
						<Input
							accept='image/*' // Chỉ cho phép tải lên các tệp hình ảnh
							id='image-upload'
							type='file'
							onChange={handleBannerImageUpload}
							style={{ display: 'none' }}
						/>
						<label htmlFor='image-upload'>
							<Button
								variant='contained'
								component='span'
								startIcon={<CloudUpload />}
								sx={{ margin: '10px 0' }}
							>
								Tải lên
							</Button>
						</label>
						{clubFormData.bannerUrl && (
							<Card>
								<CardMedia
									component='img'
									alt='Selected Image'
									height='100%'
									width='100%'
									image={clubFormData.bannerUrl}
								/>
							</Card>
						)}
					</FormControl>
					<TextField
						margin='dense'
						id='movementPoint'
						name='movementPoint'
						label='Điểm Hoạt Động Câu Lạc Bộ'
						type='text'
						fullWidth
						value={clubFormData.movementPoint}
						onChange={handleInputChange}
						error={validationErrors.movementPoint} // Add error prop
						helperText={
							validationErrors.movementPoint &&
							'Điểm Hoạt Động Câu Lạc Bộ phải lớn hơn hoặc bằng 0 hoặc bỏ trống'
						} // Display error message
					/>
					{/*Số dư */}
					<TextField
						autoFocus
						margin='dense'
						id='balance'
						name='balance'
						label='Số Dư Câu Lạc Bộ'
						type='number'
						fullWidth
						value={clubFormData.balance}
						onChange={handleInputChange}
						error={validationErrors.balance} // Add error prop
						helperText={
							validationErrors.balance && 'Số dư Câu Lạc Bộ phải lớn hơn hoặc bằng 0 hoặc bỏ trống'
						} // Display error message
					/>
					<>
						<FormControl component='fieldset'>
							<DialogContent id='form-dialog-title' sx={{ paddingLeft: 0 }}>
								Trạng thái câu lạc bộ
							</DialogContent>
							<RadioGroup
								aria-label='isActive'
								name='isActive'
								value={clubFormData.isActive.toString()} // Chuyển đổi giá trị từ boolean sang chuỗi
								onChange={handleInputChange}
							>
								<FormControlLabel value='true' control={<Radio />} label='Hoạt động' />
								<FormControlLabel value='false' control={<Radio />} label='Không hoạt động' />
							</RadioGroup>
						</FormControl>
					</>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeEditDialog} color='primary'>
						Hủy
					</Button>
					<Button onClick={handleEditClub} color='primary'>
						Cập Nhật
					</Button>
				</DialogActions>
			</Dialog>
			{/* Delete Club Dialog */}
			<Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
				<DialogTitle>Xác nhận xóa</DialogTitle>
				<DialogContent>
					<DialogContentText>Bạn chắc chắn muốn xóa câu lạc bộ này ?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeDeleteDialog} color='primary'>
						Hủy
					</Button>
					<Button onClick={handleDeleteClub} color='primary' variant='contained'>
						Xóa
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={isDescriptionDialogOpen} onClose={handleCloseDescriptionDialog} fullWidth maxWidth='md'>
				<DialogTitle>Chi tiết mô tả</DialogTitle>
				<DialogContent>
					<p>{selectedDescription}</p>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDescriptionDialog} color='primary'>
						Đóng
					</Button>
				</DialogActions>
			</Dialog>
			<Grid item xs={12}>
				<Card>
					<CardHeader title='Câu Lạc Bộ' titleTypographyProps={{ variant: 'h6' }} />
					<TableStickyHeader
						openEditClubHandle={openEditDialog}
						openDeleteClubHandle={openDeleteDialog}
						refreshClubData={refreshClubData}
						resultClubCate={resultClubCate}
						handleViewDescription={handleViewDescription}
						clubs={clubs} // Pass the callback function
					/>
				</Card>
			</Grid>
			<ToastContainer />
		</div>
	)
}

export default Club
