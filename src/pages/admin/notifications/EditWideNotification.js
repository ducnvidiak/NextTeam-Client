import * as React from 'react'
import { useState } from 'react'
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

export default function EditWideNotification({
	wideUpdateModal,
	handleClose,
	wideNotificationDetail,
	setWideNotificationDetail,
	setWideUpdateModal,
	state,
	dispatch
}) {
	const router = useRouter()
	const [clubData, setclubData, removeclubData] = useCookies(['clubData'])
	const [save, setSave] = useState(false)

	const handleSubmit = event => {
		if (save) {
			fetch('http://localhost:8080/notification?action=send-public-email', {
				method: 'POST',
				body: JSON.stringify({
					clubId: null,
					title: '[CẬP NHẬT] ' + wideNotificationDetail?.title,
					content: wideNotificationDetail?.content
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
		fetch('http://localhost:8080/notification?action=update-public-noti', {
			method: 'POST',
			body: JSON.stringify({
				id: wideNotificationDetail?.id,
				clubId: null,
				title: wideNotificationDetail?.title,
				content: wideNotificationDetail?.content
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
					setWideUpdateModal(false)
					console.log('Thay đổi thông báo thành công')
					toast.success('Thay đổi thông báo thành công!')
					router.push('/admin/notifications')
					dispatch({ type: 'trigger' })
				}
			})
			.catch(error => console.error('Error:', error))
	}

	return (
		<div>
			<ToastContainer></ToastContainer>
			<Dialog fullScreen open={wideUpdateModal} onClose={handleClose} TransitionComponent={Transition}>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} color='white' variant='h6' component='div'>
							{wideNotificationDetail?.title}
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
										setWideNotificationDetail({
											...wideNotificationDetail,
											title: event.target.value
										})
									}
									value={wideNotificationDetail?.title}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<Editor
									apiKey='prt9ektecsmty8j5e4o3sv1kwt1kmaadr8blewpfqi4ue43c'
									onChange={(event, editor) => {
										const data = editor.getContent()
										setWideNotificationDetail({ ...wideNotificationDetail, content: data })
									}}
									initialValue={wideNotificationDetail?.content}
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
