// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import { Button, FormControl, FormLabel, Input, Card, CardMedia, InputLabel, Select, MenuItem } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'
import DialogContentText from '@mui/material/DialogContentText'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Typography from '@mui/material/Typography'

function Club() {
  const categories = [
    { label: 'Học Thuật', id: '1' },
    { label: 'Thể Thao', id: '2' },
    { label: 'Năng Khiếu', id: '3' },
    { label: 'Cộng Đồng', id: '4' }
  ]
  const snackbarStyle = {
    position: 'fixed',
    top: '-55%',
    right: '69%'
  }
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const [clubFormData, setClubFormData] = useState({
    id: '',
    name: '',
    subname: '',
    description: '',
    avatarUrl: '',
    movementPoint: '',
    balance: '',
    bannerUrl: '',
    categoryId: ''
  })
  const [imageBannerUrl, setImageBannerUrl] = useState('')
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [clubs, setClubs] = useState([])
  const [open, setOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success') // 'success' or 'error'
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const openSnackbar = (message, severity) => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

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
  }

  const refreshClubData = () => {
    fetch('http://localhost:8080/club_cmd?cmd=list')
      .then(res => res.json())
      .then(result => {
        setClubs(result)
      })
  }

  const closeEditDialog = () => {
    setIsEditDialogOpen(false)
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
      categoryId: rowData.categoryId,
      balance: rowData.balance
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
  }
  const handleCreateClub = () => {
    const url_fetch =
      'http://localhost:8080/club_cmd?cmd=add&name=' +
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
      clubFormData.balance
    //  Club c = new Club(1, name, subname, categoryId, description, avatarUrl, bannerUrl, movementPoint, balance);
    console.log(url_fetch)
    fetch(url_fetch)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then(data => {
        setIsCreateDialogOpen(false)
        refreshClubData()
        // Show the success message
        openSnackbar('Thêm câu lạc bộ thành công!', 'success')
        // Add any additional logic here after a successful response
        // Reset clubFormData to its initial empty state
        setClubFormData({
          id: '',
          name: '',
          subname: '',
          description: '',
          avatarUrl: '',
          movementPoint: '',
          balance: '',
          bannerUrl: '',
          categoryId: ''
        })
      })
      .catch(error => {
        openSnackbar('Thêm câu lạc bộ thất bại!', 'error')
        // Handle the error here (e.g., show an error message to the user)
      })
  }

  const handleEditClub = () => {
    const url_fetch =
      'http://localhost:8080/club_cmd?cmd=update&name=' +
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
      '&id=' +
      clubFormData.id
    console.log(url_fetch)
    fetch(url_fetch)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then(data => {
        openSnackbar('Sửa câu lạc bộ thành công!', 'success')
        setIsEditDialogOpen(false)
       
        refreshClubData()
        // Add any additional logic here after a successful response
      })
      .catch(error => {
        openSnackbar('Sửa câu lạc bộ thất bại!', 'error')
      })
  }

  const handleDeleteClub = () => {
    fetch('http://localhost:8080/club_cmd?cmd=delete&id=' + clubFormData.id)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then(data => {
        openSnackbar('Xóa câu lạc bộ thành công!', 'success')
        setIsDeleteDialogOpen(false)
        setDeleteSuccess(true)
        refreshClubData()
      })
      .catch(error => {
        openSnackbar('Xóa câu lạc bộ thành công!', 'success')
      })
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
          console.log(imageUrl)
        } else {
          console.error('Tải lên hình ảnh thất bại')
        }
      } catch (error) {
        console.error('Lỗi khi tải lên hình ảnh:', error)
      }
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
          console.error('Tải lên hình ảnh thất bại')
        }
      } catch (error) {
        console.error('Lỗi khi tải lên hình ảnh:', error)
      }
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
    console.log(selectedCategoryLabel)
    const selectedCategory = categories.find(category => category.label === selectedCategoryLabel)

    setSelectedCategory(selectedCategoryLabel)
    console.log(selectedCategory)
    setClubFormData({
      ...clubFormData,
      categoryId: selectedCategory.id
    })
    console.log(`hello ${clubFormData.categoryId}`)
    handleCloseDialog() // Close the dialog when a category is selected
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
        <DialogTitle id='form-dialog-title'>Tạo Câu Lạc Bộ</DialogTitle>

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
              <Select labelId='category-label' id='category' value={selectedCategory} onChange={handleCategoryChange}>
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.label}>
                    {category.label}
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
              <Button variant='contained' component='span' startIcon={<CloudUpload />} sx={{ margin: '10px 0' }}>
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
              <Button variant='contained' component='span' startIcon={<CloudUpload />} sx={{ margin: '10px 0' }}>
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

          {/*  điểm */}
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
          />
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
              <Select labelId='category-label' id='category' value={selectedCategory} onChange={handleCategoryChange}>
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.label}>
                    {category.label}
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

          <FormControl>
            <FormLabel htmlFor='file-upload'>Chọn ảnh câu lạc bộ</FormLabel>
            <Input
              accept='image/*' // Chỉ cho phép tải lên các tệp hình ảnh
              id='file-upload'
              type='file'
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor='file-upload'>
              <Button variant='contained' component='span' startIcon={<CloudUpload />} sx={{ margin: '10px 0' }}>
                Upload
              </Button>
            </label>
          </FormControl>
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
              <Button variant='contained' component='span' startIcon={<CloudUpload />} sx={{ margin: '10px 0' }}>
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
          />
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

      <Snackbar
        open={snackbarOpen}
        variant='contained'
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Câu Lạc Bộ' titleTypographyProps={{ variant: 'h6' }} />

          <TableStickyHeader
            openEditClubHandle={openEditDialog}
            openDeleteClubHandle={openDeleteDialog}
            refreshClubData={refreshClubData}
            clubs={clubs} // Pass the callback function
          />
        </Card>
      </Grid>
    </div>
  )
}
export default Club
