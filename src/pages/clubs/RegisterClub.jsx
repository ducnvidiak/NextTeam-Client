import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Typography,
	styled
} from '@mui/material'
import axios from 'axios'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Autocomplete from '@mui/material/Autocomplete'
import { useState } from 'react'
import { getAPI } from 'src/ultis/requestAPI'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { uploadCv } from 'src/utils/Config'
import { v4 } from 'uuid'
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1
})

function RegisterClub({ clubId, userId, isOpen, handleClose }) {
	const [department, setDepartment] = useState([])
	const [loading, setLoading] = useState(false)
	const [cv, setCv] = useState()
	const [url, setUrl] = useState()
	const [departmentId, setDepartmentId] = useState('')

	const handleUpload = () => {
		const cvfile = ref(uploadCv, `files/${v4()}`)
		const uploadTask = uploadBytesResumable(cvfile, cv)
		uploadTask.on(
			'state_changed',
			snapshot => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				console.log('Upload is ' + progress + '% done')
				switch (snapshot.state) {
					case 'paused':
						console.log('Upload is paused')
						break
					case 'running':
						console.log('Upload is running')
						break
				}
			},
			error => {
				// Handle unsuccessful uploads
			},
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
					console.log('File available at', downloadURL)
					axios
						.get(
							`${process.env.NEXT_PUBLIC_API_URL}/engagement?action=add-engagement&userId=${userId}&departmentId=${departmentId}&clubId=${clubId}&cvUrl=` +
								downloadURL,
							{
								headers: {
									'Content-type': 'application/json; charset=UTF-8'
								}
							}
						)
						.then(response => {
							toast.success('Đăng ký tham gia câu lạc bộ thành công !')

							handleClose()
						})
						.catch(error => {
							console.error(error)
						})
				})
			}
		)
	}

	const callAPIDepartment = async clubId => {
		try {
			setLoading(true)
			const res = await getAPI('/department?action=list-dept&clubId=' + clubId)
			setDepartment(res)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	if (isOpen && !loading) {
		callAPIDepartment(clubId)
	}

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>Đăng ký tham gia câu lạc bộ</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description' marginBottom={2}>
					Vui lòng điền những thông tin bên dưới để đăng ký tham gia vào câu lạc bộ này
				</DialogContentText>
				<Box sx={{ maxWidth: '50%', marginBottom: 2 }}>
					<Autocomplete
						id='sendTo'
						fullWidth
						options={department}
						autoHighlight
						getOptionLabel={option => option.name}
						onChange={event => setDepartmentId(event.target.value)}
						renderOption={(props, option) => (
							<Box
								component='li'
								sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
								{...props}
								value={option.id}
							>
								{option.name}
							</Box>
						)}
						renderInput={params => (
							<TextField
								{...params}
								label='Ban đăng ký'
								inputProps={{
									...params.inputProps,
									autoComplete: 'new-password' // disable autocomplete and autofill
								}}
							/>
						)}
					/>
				</Box>
				<Typography marginBottom={1}>Chọn CV: </Typography>
				<Button component='label' variant='contained' startIcon={<CloudUploadIcon />} sx={{ marginBottom: 2 }}>
					Upload file
					<VisuallyHiddenInput type='file' onChange={e => setCv(e.target.files[0])} />
				</Button>
			</DialogContent>
			<DialogActions>
				<Button variant='contained' onClick={handleUpload}>
					Xác nhận
				</Button>
				<Button variant='outlined' onClick={handleClose}>
					Hủy
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default RegisterClub
