// ** React Imports
import { forwardRef, useState, useEffect } from 'react'

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
import axios from 'axios'
import { Autocomplete, Box, Typography } from '@mui/material'
import { Country, State, City } from 'country-state-city'
import { updateUserInfo } from '../../utils/apiUtils'
import { Cookie } from 'mdi-material-ui'
import { ToastContainer, toast } from 'react-toastify'
import { validateStudentCode, validatePhone, validateBirthOfDate } from '../../input-validation/index'

const CustomInput = forwardRef((props, ref) => {
	return <TextField inputRef={ref} label='Ngày sinh' fullWidth {...props} />
})

const TabInfo = ({ userInfo, setUserInfo, majors }) => {
	// ** State

	const [currentUserInfo, setCurrentUserInfo] = useState({ ...userInfo })

	const [studentCodeError, setStudentCodeError] = useState({ status: false, message: '' })
	const [phoneNumberError, setPhoneNumberError] = useState({ status: false, message: '' })
	const [dobError, setDobError] = useState({ status: false, message: '' })

	const [date, setDate] = useState(
		currentUserInfo?.dob != null && currentUserInfo.dob != '1970-01-01' ? new Date(currentUserInfo.dob) : null
	)

	useEffect(() => {
		setCurrentUserInfo({ ...userInfo })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userInfo?.id])

	const [country, setCountry] = useState(
		userInfo?.homeTown != '' && userInfo?.homeTown != null
			? Country.getCountryByCode(userInfo?.homeTown.split('-')[0])
			: Country.getCountryByCode('VN')
	)

	const [state, setState] = useState(
		userInfo?.homeTown != '' && userInfo?.homeTown != null && userInfo.homeTown.includes('-')
			? State.getStateByCodeAndCountry(userInfo.homeTown.split('-')[1], userInfo.homeTown.split('-')[0])
			: null
	)

	const [states, setStates] = useState(
		userInfo?.homeTown != '' && userInfo?.homeTown != null
			? State.getStatesOfCountry(userInfo?.homeTown.split('-')[0])
			: State.getStatesOfCountry('VN')
	)

	const [countries, setCountries] = useState(Country.getAllCountries())

	const handleSubmit = event => {
		event.preventDefault()
		if (studentCodeError.status || phoneNumberError.status) {
			toast.error('Vui lòng điền thông tin hợp lệ.')
		} else {
			updateUserInfo(currentUserInfo).then(response => {
				if (response.message == 'success') {
					setUserInfo({ ...currentUserInfo })
					toast.success('Success change detail info!', {
						position: toast.POSITION.TOP_RIGHT
					})
				} else {
					toast.error('Fail to change detail info!')
				}
			})
		}
	}

	const handleReset = event => {
		event.preventDefault()
		setCurrentUserInfo({ ...userInfo })
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
							value={`Tên tôi là ${currentUserInfo.lastname}. Sau đây là mô tả ngắn gọn của tôi ...  😎😀😍`}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							type='text'
							label='Mã sinh viên'
							placeholder='DE160488'
							value={currentUserInfo?.username?.toUpperCase() || ''}
							error={studentCodeError.status}
							onChange={event => {
								const validStudentCode = validateStudentCode(event.target.value)
								if (!validStudentCode.valid) {
									setStudentCodeError({ status: true, message: validStudentCode.message })
								} else {
									setStudentCodeError({ status: false, message: validStudentCode.message })
								}
								setCurrentUserInfo(current => {
									return { ...current, username: event.target.value }
								})
							}}
							helperText={
								studentCodeError.status &&
								'Mã sinh viên phải chứa ít nhất 1 ký tự (bao gồm số và chữ cái).'
							}
						/>
					</Grid>
					{/* <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='text'
              label='Major'
              placeholder='(123) 456-7890'
              value={currentUserInfo?.major || ''}
              onChange={event => {
                setCurrentUserInfo(current => {
                  return { ...current, major: event.target.value }
                })
              }}
            />
          </Grid> */}
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<InputLabel id='major-label'>Chuyên ngành</InputLabel>
							<Select
								labelId='major-label'
								id='major'
								value={currentUserInfo?.major || ''}
								label='Chuyên ngành'
								onChange={event => {
									setCurrentUserInfo(current => {
										return { ...current, major: event?.target.value }
									})
								}}
							>
								{majors != ''
									? majors.map(major => (
											<MenuItem key={major.id} value={major.id}>
												{major.name}
											</MenuItem>
									  ))
									: ''}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							type='text'
							label='Số điện thoại'
							placeholder='0123456789'
							value={currentUserInfo?.phoneNumber || ''}
							error={phoneNumberError.status}
							onChange={event => {
								const validPhone = validatePhone(event.target.value)
								if (!validPhone.valid) {
									setPhoneNumberError({ status: true, message: validPhone.message })
								} else {
									setPhoneNumberError({ status: false, message: validPhone.message })
								}
								setCurrentUserInfo(current => {
									return { ...currentUserInfo, phoneNumber: event.target.value }
								})
							}}
							helperText={
								phoneNumberError.status && 'Số điện thoại phải chứa (+84|0) 9|10 chữ số tiếp theo.'
							}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<DatePickerWrapper>
							<DatePicker
								selected={date}
								showYearDropdown
								showMonthDropdown
								disableFuture='true'
								id='account-settings-date'
								placeholderText='MM-DD-YYYY'
								customInput={<CustomInput />}
								error={dobError.status}
								onChange={newValue => {
									setDate(newValue)
									const validDoB = validateBirthOfDate(newValue?.toISOString().split('T')[0])
									if (!validDoB.valid) {
										setDobError({ status: true, message: validDoB.message })
									} else {
										setDobError({ status: false, message: validDoB.message })
										setCurrentUserInfo(current => {
											return { ...current, dob: newValue?.toISOString().split('T')[0] || null }
										})
									}
								}}
							/>
							{dobError.status && (
								<Typography variant='caption' color='error' sx={{ marginLeft: '20px' }}>
									Ngày sinh của bạn phải đủ 7 tuổi trở lên
								</Typography>
							)}
						</DatePickerWrapper>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<Autocomplete
								value={country}
								onChange={(event, newValue) => {
									if (newValue !== null) {
										setCurrentUserInfo(current => {
											return { ...current, homeTown: newValue.isoCode }
										})

										setCountry(newValue)
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
										label='Chọn quốc gia'
										inputProps={{ ...params.inputProps, autoComplete: 'new-password' }}
									/>
								)}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<Autocomplete
								value={state}
								onChange={(event, newValue) => {
									if (newValue !== null) {
										setCurrentUserInfo(current => {
											return { ...current, homeTown: country.isoCode + '-' + newValue.isoCode }
										})

										setState(newValue)
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
										label='Thành phố/ Tỉnh'
										inputProps={{ ...params.inputProps, autoComplete: 'new-password' }}
									/>
								)}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label='Link tài khoản Facebook'
							placeholder='https://www.facebook.com/profile.php?id=[user_id]'
							value={currentUserInfo?.facebookUrl || ''}
							onChange={event => {
								setCurrentUserInfo(current => {
									return { ...current, facebookUrl: event.target.value }
								})
							}}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label='Link tài khoản Linkedin'
							placeholder='https://www.linkedin.com/in/[user_id]/'
							value={currentUserInfo.linkedInUrl || ''}
							onChange={event => {
								setCurrentUserInfo(current => {
									return { ...current, linkedInUrl: event.target.value }
								})
							}}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<FormControl fullWidth></FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl>
							<FormLabel sx={{ fontSize: '0.875rem' }}>Giới tính</FormLabel>
							<RadioGroup
								onChange={event => {
									setCurrentUserInfo(current => {
										return {
											...currentUserInfo,
											gender:
												event.target.value == 'Male'
													? 0
													: event.target.value == 'Female'
													? 1
													: 2
										}
									})
								}}
								row
								value={
									currentUserInfo.gender == 0
										? 'Male'
										: currentUserInfo.gender == 1
										? 'Female'
										: 'Others' || 'Male'
								}
								aria-label='gender'
								name='account-settings-info-radio'
							>
								<FormControlLabel value='Male' label='Nam' control={<Radio />} />
								<FormControlLabel value='Female' label='Nữ' control={<Radio />} />
								<FormControlLabel value='Others' label='Khác' control={<Radio />} />
							</RadioGroup>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleSubmit}>
							Lưu thay đổi
						</Button>
						<Button type='reset' variant='outlined' color='secondary' onClick={handleReset}>
							Hủy
						</Button>
					</Grid>
				</Grid>
			</form>
		</CardContent>
	)
}

export default TabInfo
