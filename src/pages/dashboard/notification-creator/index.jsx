import React from 'react'
import { useState } from 'react'

import { $getRoot, $getSelection } from 'lexical'

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

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
              <Grid item xs={12} sm={12}></Grid>
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
