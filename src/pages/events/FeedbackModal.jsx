import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	InputAdornment,
	InputBase,
	Stack,
	TextField,
	Typography
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import Paper from 'src/@core/theme/overrides/paper'
import SendIcon from '@mui/icons-material/Send'
import { TextareaAutosize } from '@mui/base'
import { useState } from 'react'
import { toast } from 'react-toastify'

const feedbackValues = ['Tệ', 'Chưa tốt', 'Ổn', 'Tốt', 'Tuyệt vời']

function FeedbackModal({ openFeedbackModal, setOpenFeedbackModal, event, userData, setEventList }) {
	const [feedback, setFeedback] = useState({
		point: 3,
		content: ''
	})

	const handleSubmit = async () => {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedbacks?cmd=create&userId=${userData?.id}`, {
			method: 'POST',
			body: JSON.stringify({
				...feedback,
				userId: userData?.id,
				eventId: event?.id
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				toast.success('Gửi feedback thành công!!!!')
				setOpenFeedbackModal(false)
				setEventList(data)
			})
			.catch(error => {
				console.error('Error:', error)
				toast.error('Gửi feedback thất bại, vui lòng thử lại')
				setOpenFeedbackModal(false)
			})
	}

	return (
		<>
			<Dialog
				open={openFeedbackModal}
				onClose={() => setOpenFeedbackModal(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
				maxWidth={'md'}
			>
				<DialogTitle id='alert-dialog-title' sx={{ paddingX: 16, pt: 16 }}>
					<Typography textAlign={'center'} variant='h5' mb={2}>
						Đánh giá sự kiện
					</Typography>
					<Typography textAlign={'center'} variant='subtitle1' color={'#838383'}>
						Hãy cho chúng tôi biết cảm nhận của bạn về sự kiện
					</Typography>
				</DialogTitle>
				<DialogContent sx={{ paddingX: 16 }}>
					<Stack direction={'row'} justifyContent={'space-between'}>
						{feedbackValues.map((value, index) =>
							index < feedback.point ? (
								<Stack
									key={index}
									direction={'column'}
									alignItems={'center'}
									onClick={() => setFeedback({ ...feedback, point: index + 1 })}
								>
									<StarIcon fontSize='large' color={'primary'}></StarIcon>
									<Typography color={'primary'}>{value}</Typography>
								</Stack>
							) : (
								<Stack
									key={index}
									direction={'column'}
									alignItems={'center'}
									onClick={() => setFeedback({ ...feedback, point: index + 1 })}
								>
									<StarIcon fontSize='large' color={'secondary'}></StarIcon>
									<Typography color={'secondary'}>{value}</Typography>
								</Stack>
							)
						)}
					</Stack>
					<Typography mt={4} mb={1}>
						Để lại góp ý
					</Typography>
					<TextField
						fullWidth
						multiline
						minRows={3}
						label=''
						placeholder='Cảm nhận của bạn...'
						sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
						onChange={e => setFeedback({ ...feedback, content: e.target.value })}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<SendIcon></SendIcon>
								</InputAdornment>
							)
						}}
					/>
				</DialogContent>
				<DialogActions sx={{ paddingX: 16, pb: 16, justifyContent: 'center' }}>
					<Button variant='contained' onClick={handleSubmit}>
						Xác nhận
					</Button>
					<Button variant='outlined' onClick={() => setOpenFeedbackModal(false)}>
						Hủy
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default FeedbackModal
