import React from 'react'
import { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

const DemoGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingTop: `${theme.spacing(1)} !important`
  }
}))

function NotificationCreator() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [clubId, setClubId] = useState('')

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title='Tạo thông báo mới' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <form noValidate autoComplete='off' method='POST'>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label='Tiêu đề'
                  id='title'
                  name='title'
                  onChange={event => setTitle(event.target.value)}
                  value={title}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <CKEditor
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setContent(data)
                  }}
                />
              </Grid>
            </Grid>
            <Button variant='contained' sx={{ marginBottom: 7, marginTop: 6 }} onClick={e => handleSubmit(e)}>
              Gửi thông báo
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default NotificationCreator
