// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import { Autocomplete, Box } from '@mui/material'
import { Country, State, City } from 'country-state-city'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const TabInfo = ({ userInfo, setUserInfo, userInfoCopy, setUserInfoCopy }) => {
  // ** State

  const [date, setDate] = useState(userInfoCopy != null ? new Date(userInfoCopy.dob) : null)

  const [countryCode, setCountryCode] = useState()
  const [stateCode, setStateCode] = useState()
  const [states, setStates] = useState([])
  const countries = Country.getAllCountries()

  // console.log(State.getStatesOfCountry('VN'))

  const handleSubmit = event => {
    event.preventDefault()
  }

  const handleReset = event => {
    event.preventDefault()
    setUserInfoCopy({ ...userInfo })
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              multiline
              label='Bio'
              minRows={2}
              placeholder='Bio'
              defaultValue='The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scalable 😀, and lightning 😍 fast search and discovery experiences.'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='text'
              label='Student code'
              placeholder='(123) 456-7890'
              value={userInfoCopy !== null ? userInfoCopy.studentCode : ''}
              onChange={event => {
                setUserInfoCopy({ ...userInfoCopy, studentCode: event.target.value })
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='text'
              label='Major'
              placeholder='(123) 456-7890'
              value={userInfoCopy !== null ? userInfoCopy.major : ''}
              onChange={event => {
                setUserInfoCopy({ ...userInfoCopy, major: event.target.value })
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='text'
              label='Phone'
              placeholder='(123) 456-7890'
              value={userInfoCopy !== null ? userInfoCopy.phoneNumber : ''}
              onChange={event => {
                setUserInfoCopy({ ...userInfoCopy, phoneNumber: event.target.value })
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id='account-settings-date'
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                onChange={date => {
                  setDate(date)
                }}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Autocomplete
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setCountryCode(newValue.isoCode)
                    setStates(State.getStatesOfCountry(newValue.isoCode))
                  }
                }}
                sx={{ width: 300 }}
                options={countries}
                autoHighlight
                getOptionLabel={option => option.name}
                renderOption={(props, option) => (
                  <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                      loading='lazy'
                      width='20'
                      srcSet={`https://flagcdn.com/w40/${option.isoCode.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.isoCode.toLowerCase()}.png`}
                      alt=''
                    />
                    {option.name} ({option.isoCode}) +{option.phonecode}
                  </Box>
                )}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Choose a country'
                    inputProps={{ ...params.inputProps, autoComplete: 'new-password' }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Autocomplete
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setStateCode(newValue.isoCode)
                    console.log(newValue.isoCode)
                  }
                }}
                sx={{ width: 300 }}
                options={states}
                autoHighlight
                getOptionLabel={option => option.name}
                renderOption={(props, option) => (
                  <Box component='li' {...props}>
                    {option.name}
                  </Box>
                )}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='City'
                    inputProps={{ ...params.inputProps, autoComplete: 'new-password' }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Facebook Url'
              placeholder='https://www.facebook.com/profile.php?id=[user_id]'
              defaultValue='https://www.facebook.com/profile.php?id=100054151497842'
              value={userInfoCopy !== null ? userInfoCopy.facebookUrl : ''}
              onChange={event => {
                setUserInfoCopy({ ...userInfoCopy, facebookUrl: event.target.value })
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='LinkedIn Url'
              placeholder='https://www.linkedin.com/in/[user_id]/'
              defaultValue='https://www.linkedin.com/in/%C4%91%E1%BB%A9c-nguy%E1%BB%85n-s%E1%BB%B9-34a240292/'
              value={userInfoCopy !== null ? userInfoCopy.linkedinUrl : ''}
              onChange={event => {
                setUserInfoCopy({ ...userInfoCopy, linkedinUrl: event.target.value })
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth></FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup row defaultValue='male' aria-label='gender' name='account-settings-info-radio'>
                <FormControlLabel value='male' label='Male' control={<Radio />} />
                <FormControlLabel value='female' label='Female' control={<Radio />} />
                <FormControlLabel value='other' label='Other' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>
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

export default TabInfo
