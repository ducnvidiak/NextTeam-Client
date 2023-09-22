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
import { Button, FormControl, FormLabel, Input, Card, CardMedia } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'
import DialogContentText from '@mui/material/DialogContentText'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

function Club() {
  const snackbarStyle = {
    position: 'fixed',
    top: '-55%', // Adjust the top position as needed
    right: '69%' // Adjust the right position as needed
  }

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [clubFormData, setClubFormData] = useState({
    id: '',
    name: '',
    description: '',
    avatarUrl: '',
    movementPoint: ''
  })
  const [imageUrl, setImageUrl] = useState('')
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [clubs, setClubs] = useState([])

  const openCreateDialog = () => {
    setIsCreateDialogOpen(true)
  }

  const closeCreateDialog = () => {
    setIsCreateDialogOpen(false)
  }
  // Snackbar close handler
  const handleSnackbarClose = () => {
    setDeleteSuccess(false)
  }
  const refreshClubData = () => {
    fetch('http://localhost:8080/NextTeam/club?command=list')
      .then(res => res.json())
      .then(result => {
        setClubs(result);
      });
  };
  const handleCreateClub = () => {
    fetch(
      'http://localhost:8080/NextTeam/club?command=add&name=' +
        clubFormData.name +
        '&description=' +
        clubFormData.description +
        '&avatarUrl=' +
        clubFormData.avatarUrl +
        '&movementPoint=' +
        clubFormData.movementPoint
    )
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then(data => {
        console.log(data)
        closeCreateDialog()
        refreshClubData()
        // Show the success message

        // Add any additional logic here after a successful response
      })
      .catch(error => {
        console.error('Error during fetch:', error)
        // Handle the error here (e.g., show an error message to the user)
      })
  }
  const openEditDialog = rowData => {
    setClubFormData({
      id: rowData.id,
      name: rowData.name,
      description: rowData.description,
      avatarUrl: rowData.avatarUrl,
      movementPoint: rowData.movementPoint
    })
    setIsEditDialogOpen(true)
  }

  const closeEditDialog = () => {
    setIsEditDialogOpen(false)
  }
  const handleInputChange = e => {
    const { name, value } = e.target
    setClubFormData({
      ...clubFormData,
      [name]: value
    })
  }
  const handleEditClub = () => {
    fetch(
      'http://localhost:8080/NextTeam/club?command=update&name=' +
        clubFormData.name +
        '&description=' +
        clubFormData.description +
        '&avatarUrl=' +
        clubFormData.avatarUrl +
        '&movementPoint=' +
        clubFormData.movementPoint +
        '&id=' +
        clubFormData.id
    )
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then(data => {
        console.log(data)
        closeEditDialog()
        refreshClubData()
        // Add any additional logic here after a successful response
      })
      .catch(error => {
        console.error('Error during fetch:', error)
        // Handle the error here (e.g., show an error message to the user)
      })
  }

  const handleDeleteClub = () => {
    fetch('http://localhost:8080/NextTeam/club?command=delete&id=' + clubFormData.id)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then(data => {
        console.log(data)
        setDeleteSuccess(true)
        closeDeleteDialog()
        refreshClubData()
       
      })
      .catch(error => {
        console.error('Error during fetch:', error)
        // Handle the error here (e.g., show an error message to the user)
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
          setImageUrl(imageUrl)
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

  return (
    <div>
      <Button
        onClick={openCreateDialog}
        variant='contained'
        color='primary'
        align='right'
        sx={{ marginBottom: '15px' }}
      >
        Thêm Câu Lạc Bộ
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
          />
          <TextField
            margin='dense'
            id='description'
            name='description'
            label='Mô tả'
            type='text'
            fullWidth
            value={clubFormData.description}
            onChange={handleInputChange}
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
          {imageUrl && (
            <Card>
              <CardMedia component='img' alt='Selected Image' height='100%' width='100%' image={imageUrl} />
            </Card>
          )}
          <TextField
            margin='dense'
            id='movementPoint'
            name='movementPoint'
            label='Điểm Hoạt Động'
            type='text'
            fullWidth
            value={clubFormData.movementPoint}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCreateDialog} color='primary'>
            Hủy
          </Button>
          <Button onClick={handleCreateClub} color='primary'>
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditDialogOpen} onClose={closeEditDialog} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Thêm Câu Lạc Bộ</DialogTitle>
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
            margin='dense'
            id='description'
            name='description'
            label='Mô tả'
            type='text'
            fullWidth
            value={clubFormData.description}
            onChange={handleInputChange}
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
          <TextField
            margin='dense'
            id='movementPoint'
            name='movementPoint'
            label='Điểm Hoạt Động'
            type='text'
            fullWidth
            value={clubFormData.movementPoint}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color='primary'>
            Hủy
          </Button>
          <Button onClick={handleEditClub} color='primary'>
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDeleteClub} color='primary' variant='contained'>
            Delete
            <Snackbar open={deleteSuccess} autoHideDuration={3000} onClose={handleSnackbarClose} style={snackbarStyle}>
              <Alert onClose={handleSnackbarClose} severity='success'>
                Delete successful!
              </Alert>
            </Snackbar>
          </Button>
        </DialogActions>
      </Dialog>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Câu Lạc Bộ' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader openEditClubHandle={openEditDialog} openDeleteClubHandle={openDeleteDialog}   refreshClubData={refreshClubData} clubs={clubs} // Pass the callback function
 />
        </Card>
      </Grid>
    </div>
  )
}
export default Club
