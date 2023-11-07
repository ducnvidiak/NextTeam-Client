import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	InputAdornment,
	Stack,
	TextField,
	Typography
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'
import moment from 'moment'

function ReviewButton({ event, setFeedback, handleAction }) {
	const [openFeedbackModal, setOpenFeedbackModal] = useState(false)

	const handleAccept = () => {
		handleAction(event, 'accepted')
		setOpenFeedbackModal(false)
	}

	const handleReject = () => {
		handleAction(event, 'rejected')
		setOpenFeedbackModal(false)
	}

	return (
		<>
			<Button variant='contained' onClick={() => setOpenFeedbackModal(true)} style={{ color: 'white' }}>
				Xét duyệt
			</Button>
			<Dialog
				open={openFeedbackModal}
				onClose={() => setOpenFeedbackModal(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
				maxWidth={'md'}
				fullWidth
			>
				<DialogTitle id='alert-dialog-title' sx={{ paddingX: 16, pt: 16 }}>
					<Typography textAlign={'center'} variant='h5' mb={2}>
						Xét duyệt sự kiện
					</Typography>
					<Typography textAlign={'center'} variant='subtitle1' color={'#838383'}>
						Sự kiện được xét duyệt sẽ xuất hiện công khai toàn trường
					</Typography>
				</DialogTitle>
				<DialogContent sx={{ paddingX: 16 }}>
					<Typography fontWeight={600} marginBottom={1} variant='h6'>
						Thông tin sự kiện:
					</Typography>
					<Stack direction={'row'} gap={2}>
						<Typography marginBottom={1} width={'20%'}>
							Tên sự kiện:
						</Typography>
						<Typography marginBottom={1} width={'80%'}>
							"{event?.name}"
						</Typography>
					</Stack>
					<Stack direction={'row'} gap={2}>
						<Typography marginBottom={1} width={'20%'}>
							Thời gian:
						</Typography>
						<Typography marginBottom={1}>{`${moment(event?.startTime).format('LT')} ${moment(
							event?.startTime
						).format('L')}`}</Typography>
					</Stack>
					<Stack direction={'row'} gap={2}>
						<Typography marginBottom={1} width={'20%'}>
							Địa điểm:
						</Typography>
						<Typography marginBottom={1}>{event?.locationName}</Typography>
					</Stack>
					<Divider variant='middle'></Divider>
					<Typography mt={4} mb={1}>
						Để lại nhận xét
					</Typography>
					<TextField
						fullWidth
						multiline
						minRows={3}
						label=''
						placeholder='Nhận xét của bạn...'
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
					<Button variant='contained' onClick={handleAccept}>
						Phê duyệt
					</Button>
					<Button variant='outlined' onClick={handleReject}>
						Từ chối
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default ReviewButton
