import * as React from 'react'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { Autocomplete, CardContent, Checkbox, Container, FormControlLabel, TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import { Editor } from '@tinymce/tinymce-react'

// **Toasify Imports
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

export default function EditPrivateNotification({
	privateUpdateModal,
	handleClose,
	privateNotificationDetail,
	setPrivateNotificationDetail,
	setPrivateUpdateModal,
	state,
	dispatch, cookies
}) {
	const router = useRouter()
	const [clubData, setclubData, removeclubData] = useCookies(['clubData'])
	const [save, setSave] = useState(false)
	const [clubMember, setClubMember] = useState([])

	const handleSubmitPrivate = event => {
		if (save) {
			fetch('http://localhost:8080/notification?action=send-private-email', {
				method: 'POST',
				body: JSON.stringify({
					clubId: clubData['clubData']?.clubId,
					sendTo: privateNotificationDetail?.sendTo,
					title: privateNotificationDetail?.title.trim(),
					content: privateNotificationDetail?.content.trim()
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
		fetch('http://localhost:8080/notification?action=update-private-noti', {
			method: 'POST',
			body: JSON.stringify({
				id: privateNotificationDetail?.id,
				clubId: clubData['clubData']?.clubId,
				sendTo: privateNotificationDetail?.sendTo,
				title: privateNotificationDetail?.title.trim(),
				content: privateNotificationDetail?.content.trim()
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
					toast.error(data)
				} else {
					console.log('Chỉnh sửa thông báo thành công')
					toast.success('Chỉnh sửa thông báo thành công!')
					router.push('/dashboard/notification-creator')
					handleClose()
					dispatch({ type: 'trigger' })
				}
			})
			.catch(error => console.error('Error:', error))
	}

	useEffect(() => {
		if (cookies['clubData'])
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
		<div>
			<ToastContainer></ToastContainer>
			<Dialog fullScreen open={privateUpdateModal} onClose={handleClose} TransitionComponent={Transition}>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} color='white' variant='h6' component='div'>
							{privateNotificationDetail?.title}
						</Typography>
					</Toolbar>
				</AppBar>
				<CardContent>
					<form noValidate autoComplete='off' method='POST'>
						<Grid container spacing={6}>
							<Grid item xs={12} sm={12}>
								<TextField
									fullWidth
									label='Tiêu đề'
									id='title'
									name='title'
									onChange={event =>
										setPrivateNotificationDetail({
											...privateNotificationDetail,
											title: event.target.value
										})
									}
									value={privateNotificationDetail?.title}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<Editor
									apiKey='prt9ektecsmty8j5e4o3sv1kwt1kmaadr8blewpfqi4ue43c'
									onChange={(event, editor) => {
										const data = editor.getContent()
										setPrivateNotificationDetail({ ...privateNotificationDetail, content: data })
									}}
									value={privateNotificationDetail?.content}
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
									getOptionLabel={option => option?.email}
									onChange={event =>
										setPrivateNotificationDetail({
											...privateNotificationDetail,
											sendTo: event.target.value
										})
									}
									renderOption={(props, option) => (
										<Box
											component='li'
											sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
											{...props}
											value={option?.id}
										>
											{option?.firstname} {option?.lastname} ({option?.studentCode}) -{' '}
											{option?.email}
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
			</Dialog>
		</div>
	)
}
