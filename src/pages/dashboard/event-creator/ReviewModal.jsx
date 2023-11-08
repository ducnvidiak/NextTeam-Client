import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	InputBase,
	Stack,
	Typography
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import Paper from 'src/@core/theme/overrides/paper'
import SendIcon from '@mui/icons-material/Send'
import { TextareaAutosize } from '@mui/base'

function ReviewModal({ event, openReviewModal, setOpenReviewModal, status, message }) {
	return (
		<>
			<Dialog
				open={openReviewModal}
				onClose={() => setOpenReviewModal(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
				maxWidth={'md'}
			>
				<DialogTitle id='alert-dialog-title' sx={{ paddingX: 16, pt: 16 }}>
					<Typography textAlign={'center'} variant='h5' mb={2}>
						{status === 'accepted' ? 'Sự kiện được phê duyệt' : 'Sự kiện bị từ chối'}
					</Typography>
					<Typography textAlign={'center'} variant='subtitle1' color={'#838383'} maxWidth={500} sx={{mx: 'auto'}}>
						{status === 'accepted'
							? 'Chúc mừng! Sự kiện của câu lạc bộ đã được phê duyệt, hãy chuẩn bị thật tốt cho sự kiện nhé ^^'
							: 'Rất tiếc, sự kiện của bạn chưa đạt yêu cầu! Hãy cố gắng hơn trong các sự kiện tiếp theo nhé ^^'}
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
						<Typography marginBottom={1}>6:00 PM</Typography>
					</Stack>
					<Stack direction={'row'} gap={2}>
						<Typography marginBottom={1} width={'20%'}>
							Địa điểm:
						</Typography>
						<Typography marginBottom={1}>Phòng 201</Typography>
					</Stack>
					{/* <Divider variant='middle'></Divider> */}
					<Typography fontWeight={600} marginBottom={1} marginTop={2} variant='h6'>
					Phản hồi từ người kiểm duyệt
					</Typography>
					
					<Stack
						direction={'row'}
						alignItems={'center'}
						gap={2}
						padding={2}
						border={'1px solid #ddd'}
						borderRadius={1}
					>
						<SendIcon></SendIcon>
						<InputBase
							value={message}
							sx={{ ml: 1, flex: 1 }}
							placeholder='Search Google Maps'
							inputProps={{ 'aria-label': 'search google maps' }}
							readOnly
						/>
					</Stack>
				</DialogContent>
				<DialogActions sx={{ paddingX: 16, pb: 16, justifyContent: 'center' }}>
					<Button variant='contained' onClick={() => setOpenReviewModal(false)}>
						Xem sự kiện
					</Button>
					<Button variant='outlined' onClick={() => setOpenReviewModal(false)}>
						Đóng
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default ReviewModal
