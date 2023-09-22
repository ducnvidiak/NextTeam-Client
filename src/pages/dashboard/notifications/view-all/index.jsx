// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
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

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

const columns = [
  { id: 'updateAt', label: 'Thời gian', width: 200 },
  { id: 'title', label: 'Nội dung' }
]
function createData(id, updateAt, title) {
  return { id, updateAt, title }
}

const TableStickyHeader = () => {
  const router = useRouter()

  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [notificationsData, setNotificationsData] = useState([])
  const [search, setSearch] = useState()
  const [cookies, setCookie] = useCookies(['clubData'])

  // const rows = [
  //   createData('India', 'IN', 1324171354, 3287263),
  // ]

  const rows = notificationsData.map(item => {
    return createData(item.id, item.updatedAt, item.title)
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleEnterKeyPress = event => {
    if (event.key === 'Enter') {
      // Gọi hàm của bạn ở đây khi người dùng nhấn phím Enter
      handleSearch()
    }
  }

  const handleSearch = () => {
    // Thực hiện tìm kiếm hoặc gọi hàm bạn muốn khi người dùng nhấn Enter
    fetch(
      `http://localhost:8080/public-notification-list-search?search=${search}&clubId=${cookies['clubData'].clubId}`,
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
        console.log(data)
      })
      .catch(error => console.error('Error:', error))
  }

  useEffect(() => {
    fetch('http://localhost:8080/all-public-notification-list?clubId=' + cookies['clubData'].clubId, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        setNotificationsData(data)
        console.log(data)
      })
      .catch(error => console.error('Error:', error))
  }, [])

  return (
    <Grid item xs={12}>
      <Card style={{ height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '10px' }}>
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
            onChange={event => setSearch(event.target.value)}
            onKeyPress={handleEnterKeyPress} // Gọi handleEnterKeyPress khi có sự kiện keypress
          />
        </div>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ height: '100%' }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column.id} align={column.align} sx={{ width: column.width }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                      {columns.map(column => {
                        const value = row[column.id]

                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            onClick={() => router.push(`/dashboard/notifications/detail/${row.id}`)}
                          >
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        )
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
      </Card>
    </Grid>
  )
}

export default TableStickyHeader
