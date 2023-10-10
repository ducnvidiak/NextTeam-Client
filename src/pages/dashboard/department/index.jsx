import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
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

function Department() {
  const [departments, setDepartments] = useState([])
  const originUrl = 'http://localhost:8080/department'
  const [cookies, setCookie] = useCookies(['clubData'])
  const loadDataUrl = originUrl + '?action=list-dept&clubId=' + cookies['clubData']?.clubId

  const handleLoadDataDepartments = () => {
    fetch(loadDataUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong')
        }
        console.log(res.json)
      })
      .then(result => {
        setDepartments(result)
      })
  }
  useEffect(() => {
    handleLoadDataDepartments()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departments])

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [departmentToDelete, setDepartmentToDelete] = useState(null)

  // ... (Các hàm khác)

  const handleDelete = department => {
    setDepartmentToDelete(department)
    setOpenDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (departmentToDelete) {
      // Xử lý xóa phòng ban ở đây.
      // Ví dụ:
      // const updatedDepartments = departments.filter(dep => dep.depId !== departmentToDelete.depId);
      // setDepartments(updatedDepartments);
    }
    setOpenDeleteDialog(false)
  }

  return (
    <div>
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
              <TableRow key={department.depId}>
                <TableCell>{department.depId}</TableCell>
                <TableCell>{department.depName}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickOpen(department)} color='primary'>
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
