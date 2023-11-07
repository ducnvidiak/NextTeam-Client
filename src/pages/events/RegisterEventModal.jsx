import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, Typography } from '@mui/material'
import moment from 'moment'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { getUserInfo } from 'src/utils/info'

function RegisterEventModal({ event, openRegisterModal, setOpenRegisterModal, anchor, toggleDrawer, setEventList }) {
	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const [userData, setUserData] = useState()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	const handleSubmit = async () => {
		setLoading(true)
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/event-registration`, {
			method: 'POST',
			body: JSON.stringify({
				eventId: event.id,
				registeredBy: userData?.id
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				setEventList(data)
				setLoading(false)
				toast.success('Đăng ký sự kiện thành công!!!!')
				setOpenRegisterModal(false)
			})
			.catch(error => {
				console.error('Error:', error)
				setLoading(false)
				setOpenRegisterModal(false)
				toast.error('Có lỗi xảy ra khi đăng ký sự kiện, vui lòng thử lại')
			})
	}

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
				<Typography align='center'>
					Your information is not correct?{' '}
					<Link href={'/user/' + userData?.id} passHref style={{ color: '#f27023' }}>
						Click here
						{/* <Typography style={{ color: '#f27023' }}>Click here</Typography> */}
					</Link>{' '}
					to update your information
				</Typography>
				<DialogActions sx={{ paddingX: 16, pb: 16, justifyContent: 'center' }}>
					<LoadingButton loading={loading} variant='contained' onClick={handleSubmit}>
						Xác nhận
					</LoadingButton>
					<Button variant='outlined' onClick={() => setOpenRegisterModal(false)}>
						Hủy
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default RegisterEventModal
