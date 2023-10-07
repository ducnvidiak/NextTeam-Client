import React from 'react'
import { useState, useEffect } from 'react'

import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { Editor } from '@tinymce/tinymce-react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import FormControl from '@mui/material/FormControl'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Autocomplete from '@mui/material/Autocomplete'

// **Toasify Imports
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const DemoGrid = styled(Grid)(({ theme }) => ({
	[theme.breakpoints.down('sm')]: {
		paddingTop: `${theme.spacing(1)} !important`
	}
}))

function NotificationCreator() {
	const router = useRouter()

	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [sendTo, setSendTo] = useState('')
	const [clubId, setClubId] = useState('')
	const [value, setValue] = useState('1')
	const [save, setSave] = useState(false)
	const [clubData, setclubData, removeclubData] = useCookies(['clubData'])
	const [isSearchable, setIsSearchable] = useState(true)
	const [clubMember, setClubMember] = useState([])

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const handleSubmit = event => {
		if (save) {
			fetch('http://localhost:8080/notification?action=send-public-email', {
				method: 'POST',
				body: JSON.stringify({
					clubId: clubData['clubData']?.clubId,
					title: title.trim(),
					content: content.trim()
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			})
				.then(function (response) {
					return response.json()
				})
				.catch(error => console.error('Error:', error))
		}
		fetch('http://localhost:8080/notification?action=add-noti', {
			method: 'POST',
			body: JSON.stringify({
				clubId: clubData['clubData']?.clubId,
				title: title.trim(),
				content: content.trim()
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				if (data.id == null) {
					console.log(data)
					toast.error(data)
				} else {
					console.log('Gửi thông báo thành công')
					toast.success('Gửi thông báo thành công, đang chuyển hướng sang trang chủ!')
					router.push('/dashboard/notification-creator')
				}
			})
			.catch(error => console.error('Error:', error))
	}

	const handleSubmitPrivate = event => {
		if (save) {
			fetch('http://localhost:8080/notification?action=send-private-email', {
				method: 'POST',
				body: JSON.stringify({
					clubId: clubData['clubData']?.clubId,
					sendTo: sendTo,
					title: title.trim(),
					content: content.trim()
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			})
				.then(function (response) {
					return response.json()
				})
				.catch(error => console.error('Error:', error))
		}
		fetch('http://localhost:8080/notification?action=add-private-noti', {
			method: 'POST',
			body: JSON.stringify({
				clubId: clubData['clubData']?.clubId,
				sendTo: sendTo,
				title: title.trim(),
				content: content.trim()
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				if (data.id == null) {
					console.log(data)
					toast.error(data)
				} else {
					console.log('Gửi thông báo thành công')
					toast.success('Gửi thông báo thành công, đang chuyển hướng sang trang chủ!')
					router.push('/dashboard/notification-creator')
				}
			})
			.catch(error => console.error('Error:', error))
	}

	const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
		'& .MuiFormControlLabel-label': {
			fontSize: '0.875rem',
			color: theme.palette.text.secondary
		}
	}))

	useEffect(() => {
		fetch(`http://localhost:8080/club-user?action=view-club-member&clubId=${clubData['clubData']?.clubId}`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				setClubMember(data)
			})
			.catch(error => console.error('Error:', error))
	}, [clubData])

	return (
		<Grid item xs={12}>
			<ToastContainer></ToastContainer>
			<Card>
				<TabContext value={value}>
					<TabList onChange={handleChange} aria-label='card navigation example'>
						<Tab value='1' label='Tất cả thành viên CLB' />
						<Tab value='2' label='Tạo thông báo cho cá nhân' />
					</TabList>
					<CardContent>
						<TabPanel value='1' sx={{ p: 0 }}>
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
											<Editor
												apiKey='prt9ektecsmty8j5e4o3sv1kwt1kmaadr8blewpfqi4ue43c'
												onChange={(event, editor) => {
													const data = editor.getContent()
													setContent(data)
												}}
												init={{
													height: 500,
													menubar: true,
													plugins: [
														'advlist',
														'autolink',
														'lists',
														'link',
														'image',
														'charmap',
														'preview',
														'searchreplace',
														'insertdatetime',
														'table',
														'wordcount'
													],
													toolbar:
														'undo redo | blocks | ' +
														'bold italic forecolor | alignleft aligncenter ' +
														'alignright alignjustify | bullist numlist outdent indent | ' +
														'image, table'
												}}
											/>
										</Grid>
									</Grid>

									<Box>
										<FormControlLabel
											control={<Checkbox onChange={event => setSave(event.target.value)} />}
											label='Gửi đồng thời email'
										/>
									</Box>

									<Button
										variant='contained'
										sx={{ marginBottom: 7, marginTop: 6 }}
										onClick={e => handleSubmit(e)}
									>
										Gửi thông báo
									</Button>
								</form>
							</CardContent>
						</TabPanel>
						<TabPanel value='2' sx={{ p: 0 }}>
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
											<Editor
												apiKey='prt9ektecsmty8j5e4o3sv1kwt1kmaadr8blewpfqi4ue43c'
												onChange={(event, editor) => {
													const data = editor.getContent()
													setContent(data)
												}}
												init={{
													height: 500,
													menubar: true,
													plugins: [
														'advlist',
														'autolink',
														'lists',
														'link',
														'image',
														'charmap',
														'preview',
														'searchreplace',
														'insertdatetime',
														'table',
														'wordcount'
													],
													toolbar:
														'undo redo | blocks | ' +
														'bold italic forecolor | alignleft aligncenter ' +
														'alignright alignjustify | bullist numlist outdent indent | ' +
														'image, table'
												}}
											/>
										</Grid>
										<Grid item xs={12} sm={12}>
											<Autocomplete
												id='sendTo'
												fullWidth
												options={clubMember}
												autoHighlight
												getOptionLabel={option => option.email}
												onChange={event => setSendTo(event.target.value)}
												renderOption={(props, option) => (
													<Box
														component='li'
														sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
														{...props}
														value={option.id}
													>
														{option.firstname} {option.lastname} ({option.studentCode})
													</Box>
												)}
												renderInput={params => (
													<TextField
														{...params}
														label='Gửi cho'
														inputProps={{
															...params.inputProps,
															autoComplete: 'new-password' // disable autocomplete and autofill
														}}
													/>
												)}
											/>
										</Grid>
									</Grid>
									<Box>
										<FormControlLabel
											control={<Checkbox onChange={event => setSave(event.target.value)} />}
											label='Gửi đồng thời email'
										/>
									</Box>

									<Button
										variant='contained'
										sx={{ marginBottom: 7, marginTop: 6 }}
										onClick={e => handleSubmitPrivate(e)}
									>
										Gửi thông báo
									</Button>
								</form>
							</CardContent>
						</TabPanel>
					</CardContent>
				</TabContext>
			</Card>
			<Card></Card>
		</Grid>
	)
}

export default NotificationCreator
