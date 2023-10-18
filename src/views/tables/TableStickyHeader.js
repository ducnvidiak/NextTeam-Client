import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import DeleteIcon from '@mui/icons-material/Delete'
import Stack from '@mui/material/Stack'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import ImageListItem from '@mui/material/ImageListItem'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import { Button, FormControl, FormLabel, Input, Card, CardMedia } from '@mui/material'
import { CheckCircle, Cancel } from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'

// id name avatarUrl bannerUrl description movementPoint categoryid createAt updateAt
const columns = [
	{ id: 'id', label: 'ID', minWidth: 50, align: 'center' },
	{ id: 'name', label: 'Tên', minWidth: 100, align: 'center' },
	{ id: 'subname', label: 'Tên Viết Tắt', minWidth: 100, align: 'center' },
	{
		id: 'avatarUrl',
		label: 'Ảnh Đại Diện',
		minWidth: 150,
		align: 'center'
	},
	{
		id: 'bannerUrl',
		label: 'Ảnh Bìa',
		minWidth: 150,
		align: 'center'
	},
	{
		id: 'description',
		label: 'Mô tả',
		minWidth: 200,
		align: 'left',
		format: value => value.toLocaleString('en-VN')
	},
	{
		id: 'movementPoint',
		label: 'Điểm Hoạt Động',
		minWidth: 100,
		align: 'center'
	},
	{
		id: 'balance',
		label: 'Số Dư',
		minWidth: 100,
		align: 'center'
	},
	{
		id: 'categoryName',
		label: 'Hạng Mục',
		minWidth: 100,
		align: 'center'
	},
	{
		id: 'createAt',
		label: 'Ngày lập',
		minWidth: 100,
		align: 'center'
	},
	{
		id: 'updateAt',
		label: 'Ngày cập nhật',
		minWidth: 100,
		align: 'center'
	},
	,
	{
		id: 'isActive',
		label: 'Trạng thái',
		minWidth: 100,
		align: 'center'
	},
	{
		id: 'action',
		label: 'Hành động',
		minWidth: 100,
		align: 'left'
	}
]

function createData(
	id,
	name,
	subname,
	avatarUrl,
	bannerUrl,
	description,
	movementPoint,
	balance,
	categoryName,
	createAt,
	updateAt,
	isActive,
	categoryId,
	button
) {
	return {
		id,
		name,
		subname,
		avatarUrl,
		bannerUrl,
		description,
		movementPoint,
		balance,
		categoryName,
		createAt,
		updateAt,
		isActive,
		categoryId,
		button
	}
}

const TableStickyHeader = props => {
	const { refreshClubData, clubs, handleViewDescription } = props

	// ** States
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [rows, setRows] = useState([]) // Initialize rows with an empty array

	useEffect(() => {
		refreshClubData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clubs])

	useEffect(() => {
		  const newRows = clubs.map(club => {
        const balanceNumber = parseFloat(club.balance);
        const balanceFormatted = balanceNumber.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
		
			return createData(
				club.id,
				club.name,
				club.subname,
				club.avatarUrl,
				club.bannerUrl,
				club.description,
				club.movementPoint,
				balanceFormatted,
				club.categoryName,
				club.createdAt,
				club.updatedAt,
				club.isActive,
				club.categoryId,
				''
			)
		})
		setRows(newRows)
	}, [clubs])

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<ToastContainer></ToastContainer>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell key={column.id} align={column.align} sx={{ width: column.minWidth }}>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
							return (
								<TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
									{columns.map((column, index) => {
										const value = row[column.id]

										const length = columns.length
										if (index !== length - 1) {
											return (
												<TableCell key={column.id} align={column.align}>
													{column.id === 'avatarUrl' || column.id === 'bannerUrl' ? (
														<img src={value} alt={value} style={{ maxWidth: '150%' }} />
													) : column.id === 'description' ? (
														<>
															<Button
																variant='contanied'
																onClick={() => handleViewDescription(value)}
															>
																Xem chi tiết
															</Button>
														</>
													) : column.id === 'isActive' ? (
														<>
															{value === 'true' ? (
																<CheckCircle sx={{ color: 'green' }} />
															) : (
																<Cancel sx={{ color: 'red' }} />
															)}
														</>
													) : (
														value
													)}
												</TableCell>
											)
										} else {
											return (
												<TableCell key={column.id} align={column.align}>
													<Stack direction='row' spacing={2} sx={{ width: '200px' }}>
														<Button
															variant='contained'
															color='warning'
															endIcon={<ModeEditIcon />}
															onClick={() => props.openEditClubHandle(row)}
														>
															Sửa
														</Button>
														<Button
															variant='contained'
															color='error'
															startIcon={<DeleteIcon />}
															onClick={() => props.openDeleteClubHandle(row)}
														>
															Xóa
														</Button>
													</Stack>
												</TableCell>
											)
										}
									})}
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component='div'
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	)
}

export default TableStickyHeader
