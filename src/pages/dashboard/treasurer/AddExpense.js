import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import * as React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useState, useEffect, useReducer } from 'react'

export default function AddExpense({
	openAddExpenseDialog,
	setOpenAddExpenseDialog,
	handleClose,
	handleAddExpense,
	cookies
}) {
	// ** Hook
	const [expense, setExpense] = useState({
		title: '',
		description: '',
		clubId: cookies['clubData']?.clubId,
		amount: ''
	})

	const handleSubmit = () => {
		fetch('http://localhost:8080/payment?action=add-expense', {
			method: 'POST',
			body: JSON.stringify(expense),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				toast.success('Thêm khoản chi mới thành công')
				handleClose()
			})
			.catch(error => {
				console.error('Error:', error)

				toast.error('Có lỗi xảy ra khi thêm khoản chi, vui lòng thử lại')
			})
			.finally(() => {
				handleClose()
			})
	}

	return (
		<div>
			<ToastContainer></ToastContainer>
			<Dialog open={openAddExpenseDialog} onClose={handleClose} scroll='paper' maxWidth='sm' fullWidth>
				<DialogTitle id='scroll-dialog-title'>
					<strong>Tạo khoản chi mới</strong>
				</DialogTitle>

				<DialogContent>
					<DialogContentText>
						<TextField
							sx={{ marginTop: 5 }}
							fullWidth
							id='outlined-multiline-static'
							label='Tên khoản chi'
							onChange={event =>
								setExpense({
									...expense,
									title: event.target.value
								})
							}
						/>
						<TextField
							sx={{ marginTop: 5 }}
							fullWidth
							id='outlined-multiline-static'
							label='Mô tả'
							onChange={event =>
								setExpense({
									...expense,
									description: event.target.value
								})
							}
						/>
						<TextField
							sx={{ marginTop: 5 }}
							fullWidth
							id='outlined-multiline-static'
							label='Số tiền'
							onChange={event =>
								setExpense({
									...expense,
									amount: event.target.value
								})
							}
							inputProps={{
								pattern: '[0-9]*' // Chỉ chấp nhận các ký tự số
							}}
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
