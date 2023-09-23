// ** React Imports
import { useState, useEffect } from 'react'
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
import { useParams } from 'react-router-dom'

const Notifications = () => {
  const router = useRouter()
  const [notificationsData, setNotificationsData] = useState([])

  const cardStyle = {
    margin: '10px' // Thiết lập margin 10px
  }
  function validateContent(content) {
    // Implement your content validation logic here
    // For example, check for <script> tags or other unsafe HTML
    // Return true if content is safe, false otherwise
    return !/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i.test(content)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/notification?action=view-detail&id=' + router.query.id, {
          method: 'GET'
        })

        const jsonData = await response.json()
        setNotificationsData({ ...jsonData })
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    }
    fetchData()
  }, [router.query.id])

  return (
    <Grid item xs={12} style={{ height: '100%' }}>
      <Card style={{ height: '100%' }}>
        <Grid container spacing={0}>
          <CardHeader
            title={notificationsData.title}
            titleTypographyProps={{ variant: 'h3' }}
            style={{ fontWeight: 'bold' }}
          />
        </Grid>

        <CardContent>
          {true ? <div dangerouslySetInnerHTML={{ __html: notificationsData.content }} /> : <p>Unsafe content</p>}
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Notifications
