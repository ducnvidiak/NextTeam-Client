import { Button, Card, CardContent, CardHeader, Chip, Grid, Typography } from '@mui/material'
import * as React from 'react'
import { useState, useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { getUserInfo } from 'src/utils/info'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'

function PaymentForm() {
	const router = useRouter()
	const [state, dispatch] = useReducer((state, action) => action, 0)
	const [paymentData, setPaymentData] = useState([])
	const [cookies, setCookie] = useCookies(['clubData', 'userData'])
	const [userData, setUserData] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	useEffect(() => {
		fetch(`http://localhost:8080/payment?action=list-of-me&userId=${userData?.id}`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				setPaymentData(data)
				setLoading(false)
			})
			.catch(error => console.error('Error:', error))
	}, [userData, state])

	const cardStyle = {
		margin: '10px' // Thiết lập margin 10px
	}

	const statusObj = {
		0: { color: 'primary', label: 'Mới' },
		1: { color: 'success', label: 'Thanh toán thành công' },
		2: { color: 'warning', label: 'Thanh toán thất bại' }
	}

	const handlePay = row => {
		console.log(row)
		fetch(`http://localhost:8080/vnpayajax?amount=${row?.amount}&id=${row?.id}`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				window.location.href = data?.data
			})
			.catch(error => console.error('Error:', error))
	}

	return (
		<Grid item xs={12} style={{ height: '100%' }}>
			<Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 100 }} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<Card style={{ height: '100%' }}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingRight: '10px'
					}}
				>
					<CardHeader title='Khoản nộp' titleTypographyProps={{ variant: 'h6' }} />
				</div>
				<CardContent>
					{paymentData?.map(row => {
						return (
							<Card key={row.id} sx={{ ...cardStyle, borderLeft: 4, borderColor: 'primary.main' }}>
								<CardContent>
									<Grid container spacing={1}>
										<Grid item xs={2} md={2}>
											{row?.createdAt}
										</Grid>
										<Grid item xs={6} md={6}>
											<Typography variant='body1' style={{ fontWeight: 'bold' }}>
												{row?.title}
											</Typography>
											<Typography
												variant='body2'
												style={{ fontWeight: 'bold', fontSize: '0.7rem' }}
											>
												{row?.description}
											</Typography>
											<Chip
												color={statusObj[row?.status]?.color}
												label={statusObj[row?.status]?.label}
												sx={{
													height: 24,
													fontSize: '0.75rem',
													textTransform: 'capitalize',
													'& .MuiChip-label': { fontWeight: 500 }
												}}
											/>
										</Grid>
										<Grid item xs={2} md={2}>
											<Typography variant='body1' style={{ fontWeight: 'bold' }}>
												Số tiền: {row?.amount}
											</Typography>
										</Grid>
										<Grid item xs={2} md={2}>
											{row.status == 0 ? (
												<Button fullWidth variant='contained' onClick={() => handlePay(row)}>
													Thanh toán
												</Button>
											) : (
												''
											)}
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						)
					})}
				</CardContent>
			</Card>
		</Grid>
	)
}

export default PaymentForm
