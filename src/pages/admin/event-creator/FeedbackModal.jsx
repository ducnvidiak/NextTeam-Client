import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputBase, Stack, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import Paper from 'src/@core/theme/overrides/paper'
import SendIcon from '@mui/icons-material/Send'
import { TextareaAutosize } from '@mui/base';

function FeedbackModal({ openFeedbackModal, setOpenFeedbackModal }) {
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
						<Stack direction={'column'} alignItems={'center'}>
							<StarIcon fontSize='large' color={'primary'}></StarIcon>
							<Typography color={'primary'}>Tệ</Typography>
						</Stack>
						<Stack direction={'column'} alignItems={'center'}>
							<StarIcon fontSize='large' color={'primary'}></StarIcon>
							<Typography color={'primary'}>Chưa tốt</Typography>
						</Stack>
						<Stack direction={'column'} alignItems={'center'}>
							<StarIcon fontSize='large' color={'primary'}></StarIcon>
							<Typography color={'primary'}>Ổn</Typography>
						</Stack>
						<Stack direction={'column'} alignItems={'center'}>
							<StarIcon fontSize='large' color={'primary'}></StarIcon>
							<Typography color={'primary'}>Tốt</Typography>
						</Stack>
						<Stack direction={'column'} alignItems={'center'}>
							<StarOutlineIcon fontSize='large' color={'secondary'}></StarOutlineIcon>
							<Typography>Tuyệt vời</Typography>
						</Stack>
					</Stack>
					<Typography mt={4} mb={1}>Để lại góp ý</Typography>
					<Stack direction={'row'} alignItems={'center'} gap={2} padding={2} border={'1px solid #ddd'} borderRadius={1}>
						<SendIcon></SendIcon>
						<InputBase
							sx={{ ml: 1, flex: 1 }}
							placeholder='Search Google Maps'
							inputProps={{ 'aria-label': 'search google maps' }}
						/>
					</Stack>
				</DialogContent>
				<DialogActions sx={{ paddingX: 16, pb: 16, justifyContent: 'center' }}>
					<Button variant='contained' onClick={() => setOpenFeedbackModal(false)}>
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
