import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import DeleteIcon from '@mui/icons-material/Delete'
import Stack from '@mui/material/Stack'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import ImageListItem from '@mui/material/ImageListItem'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import { Button, FormControl, FormLabel, Input, Card, CardMedia } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'

const columns = [
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'name', label: 'Tên', minWidth: 100 },
  {
    id: 'avatarUrl',
    label: 'Ảnh',
    minWidth: 50,
    align: 'left'
  },
  {
    id: 'description',
    label: 'Mô tả',
    minWidth: 100,
    align: 'left',
    format: value => value.toLocaleString('en-VN')
  },
  {
    id: 'movementPoint',
    label: 'Điểm Hoạt Động',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'createAt',
    label: 'Ngày lập',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'updateAt',
    label: 'Ngày cập nhật',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'action',
    label: 'Hành động',
    minWidth: 100,
    align: 'left'
  }
]

function createData(id, name, avatarUrl, description, movementPoint, createAt, updateAt, button) {
  return { id, name, avatarUrl, description, movementPoint, createAt, updateAt, button }
}

const TableStickyHeader = props => {
  const { refreshClubData, clubs } = props
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rows, setRows] = useState([]) // Initialize rows with an empty array
  refreshClubData()
  useEffect(() => {
    // Assuming your 'clubs' state has the required data structure
    const newRows = clubs.map(club => {
      return createData(
        club.id,
        club.name,
        club.avatarUrl,
        club.description,
        club.movementPoint,
        club.createdAt,
        club.updatedAt,
        ''
      )
    })

    // Update 'rows' only when 'clubs' change
    setRows(newRows)
  }, [clubs])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map((column, index) => {
                    const value = row[column.id]
                    const length = columns.length
                    if (index !== length - 1) {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'avatarUrl' ? (
                            <img src={value} alt={value} style={{ maxWidth: '50%', maxHeight: '50%' }} />
                          ) : (
                            value
                          )}
                        </TableCell>
                      )
                    } else {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Stack direction='row' spacing={2} sx={{width:'300px'}}>
                            <Button
                              variant='contained'
                              color='warning'
                              endIcon={<ModeEditIcon />}
                              onClick={() => props.openEditClubHandle(row)}
                              
                            >
                              Cập Nhật
                            </Button>
                            <Button
                              variant='contained'
                              color='error'
                              startIcon={<DeleteIcon />}
                              onClick={() => props.openDeleteClubHandle(row)}
                            >
                              Xóa
                            </Button>
                          </Stack>
                        </TableCell>
                      )
                    }
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableStickyHeader
