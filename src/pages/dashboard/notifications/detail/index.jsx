// ** React Imports
import { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import CardHeader from '@mui/material/CardHeader'
import TablePagination from '@mui/material/TablePagination'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Notifications = () => {
  const router = useRouter()

  const cardStyle = {
    margin: '10px' // Thiết lập margin 10px
  }

  return (
    <Grid item xs={12} style={{ height: '100%' }}>
      <Card style={{ height: '100%' }}>
        <CardHeader
          title='FUDN [Khảo thí] Danh sách phòng thi Retake môn SSL101c ngày 23/09/2023 (đợt 2 kỳ Summer 2023)
'
          titleTypographyProps={{ variant: 'h6' }}
        />
        <CardContent>
          Phòng Khảo thí thông báo đến các em sinh viên Danh sách phòng thi ngày 23/09/2023. Chi tiết ở tệp đính kèm.
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Notifications
