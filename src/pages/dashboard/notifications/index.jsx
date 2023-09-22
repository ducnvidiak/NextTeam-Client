// ** React Imports
import { useEffect, useState } from 'react'
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
import Link from '@mui/material/Link'

const Notifications = () => {
  const router = useRouter()
  const [notificationsData, setNotificationsData] = useState([])

  const cardStyle = {
    margin: '10px' // Thiết lập margin 10px
  }

  const handleSubmit = event => {
    router.push('/dashboard/notifications/view-all')
  }
  useEffect(() => {
    fetch('http://localhost:8080/public-notification-list-10', {
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
      })
      .catch(error => console.error('Error:', error))
  }, [])

  return (
    <Grid item xs={12} style={{ height: '100%' }}>
      <Card style={{ height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '10px' }}>
          <CardHeader title='Thông báo' titleTypographyProps={{ variant: 'h6' }} />
          <Button variant='contained' onClick={e => handleSubmit(e)}>
            Xem tất cả
          </Button>
        </div>

        {notificationsData.map(notification => {
          return (
            <Card style={cardStyle} key={notification.id}>
              <CardContent onClick={() => router.push(`/dashboard/notifications/detail/${notification.id}`)}>
                <Grid container spacing={0}>
                  <Grid item xs={4} md={2}>
                    {notification.updatedAt}
                  </Grid>
                  <Grid item xs={8} md={10}>
                    <Typography variant='body1' style={{ fontWeight: 'bold' }}>
                      {notification.title}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              {/* <Link passHref href={`/dashboard/notifications/detail/${notification.id}`}>
                
              </Link> */}
            </Card>
          )
        })}
      </Card>
    </Grid>
  )
}

export default Notifications
