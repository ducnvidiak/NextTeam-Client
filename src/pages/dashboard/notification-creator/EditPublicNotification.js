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
import { CardContent, Checkbox, Container, FormControlLabel, TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import { Editor } from '@tinymce/tinymce-react'

// **Toasify Imports
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

export default function EditPublicNotification({
	publicUpdateModal,
	handleClose,
	publicNotificationDetail,
	setPublicUpdateModal,
	state,
	dispatch
}) {
	const router = useRouter()
	const [clubData, setclubData, removeclubData] = useCookies(['clubData'])
	const [notificationDetailEdit, setNotificationDetailEdit] = useState()
	const [save, setSave] = useState(false)

	useEffect(() => {
		setNotificationDetailEdit({
			id: publicNotificationDetail?.id,
			clubId: clubData['clubData']?.clubId,
			title: publicNotificationDetail?.title,
			content: publicNotificationDetail?.content
		})
	}, [publicNotificationDetail, clubData])

	const handleSubmit = event => {
		if (save) {
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/notification?action=send-public-email`, {
				method: 'POST',
				body: JSON.stringify(notificationDetailEdit),
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			})
				.then(function (response) {
					return response.json()
				})
				.catch(error => console.error('Error:', error))
		}
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/notification?action=update-public-noti`, {
			method: 'POST',
			body: JSON.stringify(notificationDetailEdit),
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
					setPublicUpdateModal(false)
					toast.success('Thay đổi thông báo thành công!')
					router.push('/dashboard/notification-creator')
					dispatch({ type: 'trigger' })
				}
			})
			.catch(error => console.error('Error:', error))
	}

	return (
		<div>
			<ToastContainer></ToastContainer>
			<Dialog fullScreen open={publicUpdateModal} onClose={handleClose} TransitionComponent={Transition}>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} color='white' variant='h6' component='div'>
							{notificationDetailEdit?.title}
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
										setNotificationDetailEdit({
											...notificationDetailEdit,
											title: event.target.value
										})
									}
									value={notificationDetailEdit?.title}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<Editor
									apiKey='prt9ektecsmty8j5e4o3sv1kwt1kmaadr8blewpfqi4ue43c'
									onChange={(event, editor) => {
										setNotificationDetailEdit({
											...notificationDetailEdit,
											content: editor.getContent()
										})
									}}
									initialValue={notificationDetailEdit?.content}
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
							Lưu thông báo
						</Button>
					</form>
				</CardContent>
			</Dialog>
		</div>
	)
}
