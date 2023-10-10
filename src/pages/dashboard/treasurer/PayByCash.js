import {
	Autocomplete,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField
} from '@mui/material'
import * as React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useState, useEffect, useReducer } from 'react'

export default function PayByCash({
	openPayByCashDialog,
	setOpenPayByCashDialog,
	handleClose,
	handlePayByCash,
	cookies,
	paymentDataTypeIn
}) {
	// ** Hook
	const [payByCash, setPayByCash] = useState({
		id: '',
		status: 1,
		paymentForm: 'cash'
	})

	const handleSubmit = () => {
		fetch('http://localhost:8080/payment?action=pay-by-cash&id=' + payByCash?.id, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				toast.success('Thanh toán tiền mặt thành công')
				handleClose()
			})
			.catch(error => {
				console.error('Error:', error)

				toast.error('Có lỗi xảy ra khi thanh toán, vui lòng thử lại')
			})
			.finally(() => {
				handleClose()
			})
	}

	return (
		<div>
			<ToastContainer></ToastContainer>
			<Dialog open={openPayByCashDialog} onClose={handleClose} scroll='paper' maxWidth='sm' fullWidth>
				<DialogTitle id='scroll-dialog-title'>
					<strong>Thanh toán tiền mặt</strong>
				</DialogTitle>

				<DialogContent>
					<DialogContentText>
						<Autocomplete
							sx={{ marginTop: 5 }}
							id='location'
							fullWidth
							options={paymentDataTypeIn}
							autoHighlight
							getOptionLabel={option => option.firstname + ' ' + option.lastname + ' - ' + option.amount}
							onChange={e => setPayByCash({ ...payByCash, id: e.target.value })}
							renderOption={(props, option) => (
								<Box
									component='li'
									sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
									{...props}
									value={option.id}
								>
									{option.title} - {option.firstname} {option.lastname} - {option.amount}
								</Box>
							)}
							renderInput={params => (
								<TextField
									{...params}
									label='Khoản nộp'
									inputProps={{
										...params.inputProps,
										autoComplete: 'new-password' // disable autocomplete and autofill
									}}
								/>
							)}
						/>
					</DialogContentText>
				</DialogContent>

				<DialogActions>
					<Button variant='contained' onClick={handleSubmit}>
						Xác nhận
					</Button>
					<Button onClick={handleClose}>Đóng</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
