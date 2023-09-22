// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = ({ userInfo, setUserInfo, userInfoCopy, setUserInfoCopy }) => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      // reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  const another = {
    id: 3,
    email: 'jane.smith@example.com',
    username: 'janesmith(edited)',
    password: 'password456',
    avatarURL: 'https://example.com/avatar2.jpg',
    firstname: 'Jane',
    lastname: 'Smith',
    studentCode: '987654321',
    phoneNumber: '0987654321',
    major: '2',
    academicYear: '2022',
    gender: 'Female',
    dob: '1995-08-20',
    homeTown: '2',
    facebookUrl: 'https://www.facebook.com/janesmith',
    linkedInUrl: 'https://www.linkedin.com/in/janesmith',
    createdAt: '2023-09-18',
    updatedAt: '2023-09-18'
  }

  const fetchData = async () => {
    console.log(userInfo)

    const requestConfig = {
      method: 'POST',

      headers: {},
      body: JSON.stringify(userInfoCopy)
    }

    try {
      const response = await fetch('http://localhost:8080/api/user', requestConfig)
      const jsonData = await response.json()
      console.log(jsonData)
      setUserInfo({ ...jsonData })
    } catch (error) {
      console.log('Error fetching data:', error)
    }
  }

  const handleSubmit = event => {
    event.preventDefault()

    fetchData()
  }

  const handleReset = event => {
    event.preventDefault()
    setUserInfoCopy({ ...userInfo })
  }

  console.log(userInfoCopy)

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={userInfoCopy !== null ? userInfoCopy.avatarURL : ''} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Username'
              placeholder='johnDoe'
              defaultValue='johnDoe'
              value={userInfoCopy !== null ? userInfoCopy.username : ''}
              onChange={event => {
                setUserInfoCopy({ ...userInfoCopy, username: event.target.value })
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder='johnDoe@example.com'
              defaultValue='johnDoe@example.com'
              value={userInfoCopy !== null ? userInfoCopy.email : ''}
              onChange={event => {
                setUserInfoCopy({ ...userInfoCopy, email: event.target.value })
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='First name'
              placeholder='John Doe'
              defaultValue='John Doe'
              value={userInfoCopy !== null ? userInfoCopy.firstname : ''}
              onChange={event => {
                setUserInfoCopy({ ...userInfoCopy, firstname: event.target.value })
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Last name'
              placeholder='John Doe'
              defaultValue='John Doe'
              value={userInfoCopy !== null ? userInfoCopy.lastname : ''}
              onChange={event => {
                setUserInfoCopy({ ...userInfoCopy, lastname: event.target.value })
              }}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label='Role' defaultValue='admin'>
                <MenuItem value='admin' selected={userInfo.role == 'admin'}>
                  Admin
                </MenuItem>
                <MenuItem value='author' selected={userInfo.role == 'author'}>
                  Author
                </MenuItem>
                <MenuItem value='editor' selected={userInfo.role == 'editor'}>
                  Editor
                </MenuItem>
                <MenuItem value='maintainer' selected={userInfo.role == 'maintainer'}>
                  Maintainer
                </MenuItem>
                <MenuItem value='subscriber' selected={userInfo.role == 'subscriber'}>
                  Subscriber
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label='Status' defaultValue='active'>
                <MenuItem value='active' selected={userInfo.status == 'active'}>
                  Active
                </MenuItem>
                <MenuItem value='inactive' selected={userInfo.status == 'inactive'}>
                  Inactive
                </MenuItem>
                <MenuItem value='pending' selected={userInfo.status == 'pending'}>
                  Pending
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Company' placeholder='ABC Pvt. Ltd.' defaultValue='ABC Pvt. Ltd.' />
          </Grid> */}

          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={e => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={handleReset}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
