import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, Typography } from '@mui/material'
import React from 'react'

function RegisterEventModal({ event, openRegisterModal, setOpenRegisterModal }) {
	return (
		<>
			<Dialog
				open={openRegisterModal}
				onClose={() => setOpenRegisterModal(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
				maxWidth={'md'}
			>
				<DialogTitle id='alert-dialog-title' sx={{ paddingX: 16, pt: 16 }}>
					<Typography textAlign={'center'} variant='h5' mb={2}>
						Đăng ký tham gia sự kiện
					</Typography>
					<Typography textAlign={'center'} variant='subtitle1' color={'#838383'}>
						Vui lòng xác nhận thông tin đăng ký của bạn
					</Typography>
				</DialogTitle>
				<DialogContent sx={{ paddingX: 16 }}>
					{/* <DialogContentText id='alert-dialog-description' marginBottom={2}>
					Bạn có muốn đăng ký tham gia sự kiện với các thông tin dưới đây không?
					</DialogContentText> */}
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
					<Divider variant='middle'></Divider>

					<Typography fontWeight={600} marginBottom={1} marginTop={4} variant='h6'>
						Thông tin đăng ký:
					</Typography>
					<Stack direction={'row'} gap={2}>
						<Typography marginBottom={1} width={'20%'}>
							Họ và tên:
						</Typography>
						<Typography marginBottom={1}>Trần Văn Bảo Thắng</Typography>
					</Stack>
					<Stack direction={'row'} gap={2}>
						<Typography marginBottom={1} width={'20%'}>
							MSSV:
						</Typography>
						<Typography marginBottom={1}>DE170145</Typography>
					</Stack>
					<Stack direction={'row'} gap={2}>
						<Typography marginBottom={1} width={'20%'}>
							SĐT:
						</Typography>
						<Typography marginBottom={1}>0828828497</Typography>
					</Stack>
					<Stack direction={'row'} gap={2}>
						<Typography marginBottom={1} width={'20%'}>
							Email:
						</Typography>
						<Typography marginBottom={1}>thangtvb.dev@gmail.com</Typography>
					</Stack>
				</DialogContent>
				<DialogActions sx={{ paddingX: 16, pb: 16, justifyContent: 'center' }}>
					<Button variant='contained' onClick={() => setOpenRegisterModal(false)}>
						Xác nhận
					</Button>
					<Button variant='outlined' onClick={() => setOpenRegisterModal(false)}>
						Hủy
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default RegisterEventModal
