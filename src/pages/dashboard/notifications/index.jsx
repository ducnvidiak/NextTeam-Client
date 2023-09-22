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

  const handleSubmit = event => {
    router.push('/dashboard/notifications/view-all')
  }

  return (
    <Grid item xs={12} style={{ height: '100%' }}>
      <Card style={{ height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '10px' }}>
          <CardHeader title='Thông báo' titleTypographyProps={{ variant: 'h6' }} />
          <Button variant='contained' onClick={e => handleSubmit(e)}>
            Xem tất cả
          </Button>
        </div>

        <Card style={cardStyle}>
          <CardContent>
            <Grid container spacing={0}>
              <Grid item xs={4} md={2}>
                21/09/23 16:20
              </Grid>
              <Grid item xs={8} md={10}>
                <Typography variant='body1' style={{ fontWeight: 'bold' }}>
                  FUDN [Khảo thí] Danh sách phòng thi Retake môn SSL101c ngày 23/09/2023 (đợt 2 kỳ Summer 2023)
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={cardStyle}>
          <CardContent>
            <Grid container spacing={0}>
              <Grid item xs={4} md={2}>
                21/09/23 16:20
              </Grid>
              <Grid item xs={8} md={10}>
                <Typography variant='body1' style={{ fontWeight: 'bold' }}>
                  FUDN [Khảo thí] Danh sách phòng thi Retake môn SSL101c ngày 23/09/2023 (đợt 2 kỳ Summer 2023)
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Card>
    </Grid>
  )
}

export default Notifications
