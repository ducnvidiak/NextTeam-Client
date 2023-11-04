import { Button, Card, CardContent, CardHeader, Chip, Grid, Typography } from '@mui/material'
import * as React from 'react'
import { useState, useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { getUserInfo } from 'src/utils/info'

function PaymentResult() {
	const router = useRouter()
	const [state, dispatch] = useReducer((state, action) => action, 0)
	const [paymentData, setPaymentData] = useState([])
	const [cookies, setCookie] = useCookies(['clubData', 'userData'])
	const [userData, setUserData] = useState()

	useEffect(() => {
		if (router.query.vnp_TransactionStatus) {
			fetch(
				`http://localhost:8080/payment?action=pay-by-online&id=${router.query.vnp_OrderInfo}&status=${router.query.vnp_TransactionStatus}`,
				{
					method: 'GET',
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				}
			)
				.then(function (response) {
					return response.json()
				})

				.catch(error => console.error('Error:', error))
		}
	})

	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	const statusObj = {
		'00': { color: 'success', label: 'Thanh toán thành công' },
		'07': {
			color: 'error',
			label: 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường)'
		},
		'09': {
			color: 'error',
			label: 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.'
		},
		11: {
			color: 'error',
			label: 'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.'
		},
		12: {
			color: 'error',
			label: 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.'
		},
		13: {
			color: 'error',
			label: 'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.'
		},
		24: {
			color: 'error',
			label: 'Giao dịch không thành công do: Khách hàng hủy giao dịch'
		},
		51: {
			color: 'error',
			label: 'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.'
		},
		65: {
			color: 'error',
			label: 'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.'
		},
		75: {
			color: 'error',
			label: 'Ngân hàng thanh toán đang bảo trì.'
		},
		79: {
			color: 'error',
			label: 'Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch'
		},
		99: {
			color: 'error',
			label: 'Các lỗi khác.'
		},
		'02': {
			color: 'error',
			label: 'Merchant không hợp lệ '
		},
		'03': {
			color: 'error',
			label: 'Dữ liệu gửi sang không đúng định dạng'
		},

		94: {
			color: 'error',
			label: 'Yêu cầu bị trùng lặp trong thời gian giới hạn của API'
		},
		94: {
			color: 'error',
			label: 'Yêu cầu bị trùng lặp trong thời gian giới hạn của API'
		},
		97: {
			color: 'error',
			label: 'Chữ ký không hợp lệ'
		}
	}

	return (
		<Grid item xs={12} style={{ height: '100%' }}>
			<Card style={{ height: '100%' }}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingRight: '10px'
					}}
				>
					<CardHeader title='Kết quả giao dịch' titleTypographyProps={{ variant: 'h6' }} />
				</div>
				<CardContent>
					<Typography variant='subtitle2' gutterBottom>
						Mã giao dịch thanh toán: {router?.query?.vnp_TxnRef}
					</Typography>
					<Typography variant='subtitle2' gutterBottom>
						Số tiền: {(parseInt(router?.query?.vnp_Amount, 10) / 100).toLocaleString()}
					</Typography>
					<Typography variant='subtitle2' gutterBottom>
						Mã giao dịch trên NextTeam: {router?.query?.vnp_OrderInfo}
					</Typography>

					<Typography variant='subtitle2' gutterBottom>
						Tình trạng giao dịch:{' '}
						<Chip
							color={statusObj[router?.query?.vnp_TransactionStatus]?.color}
							label={statusObj[router?.query?.vnp_TransactionStatus]?.label}
							sx={{
								height: 24,
								fontSize: '0.75rem',
								textTransform: 'capitalize',
								'& .MuiChip-label': { fontWeight: 500 }
							}}
						/>
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	)
}

export default PaymentResult
