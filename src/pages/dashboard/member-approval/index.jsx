import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardContent,
	CardHeader,
	Chip,
	Container,
	Grid,
	InputAdornment,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	Typography
} from '@mui/material'
import React from 'react'
import ViewInfo from './ViewInfo'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { TabContext, TabList } from '@mui/lab'
import { Magnify, Tab } from 'mdi-material-ui'

// ** Icons Imports
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteIcon from '@mui/icons-material/Delete'

const statusObj = {
	0: { color: 'primary' },
	1: { color: 'success' }
}

function MemberApproval() {
	const [application, setApplication] = useState([])
	const [userData, setUserData] = useCookies(['userData'])
	const [info, setInfo] = useState()
	const [viewInfoModal, setViewInfoModal] = useState(false)

	function handleClick(info) {
		setInfo(info)
		setViewInfoModal(true)
	}

	const handleClose = () => {
		setViewInfoModal(false)
	}

	useEffect(() => {
		fetch(`http://localhost:8080/engagement?action=application-list-of-user&userId=${userData['userData']?.id}`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				setApplication(data)
			})
			.catch(error => console.error('Error:', error))
	}, [userData])

	return (
		<Container>
			<Grid item xs={12} style={{ height: '100%' }}>
				<ViewInfo
					info={info}
					viewInfoModal={viewInfoModal}
					setViewInfoModal={setViewInfoModal}
					handleClose={handleClose}
				></ViewInfo>
				<Card style={{ height: '100%' }}>
					<CardContent>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								paddingRight: '10px'
							}}
						>
							<CardHeader title='Tất cả thông báo' titleTypographyProps={{ variant: 'h6' }} />
							<TextField
								placeholder='Tìm kiếm...'
								size='small'
								sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 }, width: '30%' }}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<Magnify fontSize='small' />
										</InputAdornment>
									)
								}}
								onChange={event => {
									setSearch(event.target.value)
									handleSearch()
								}}

								// onKeyPress={handleEnterKeyPress} // Gọi handleEnterKeyPress khi có sự kiện keypress
							/>
						</div>

						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Thời gian</TableCell>
									<TableCell>Nội dung</TableCell>
									<TableCell>Hành động</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{notificationsData
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map(row => (
										<TableRow key={row.id}>
											<TableCell>{row.updatedAt}</TableCell>
											<TableCell
												onClick={() => router.push(`/dashboard/notifications/detail/${row.id}`)}
											>
												{row.title}
											</TableCell>

											<TableCell>
												<ButtonGroup
													variant='contained'
													aria-label='outlined primary button group'
												>
													<Button
														onClick={() =>
															handleUpdateClick(row.id, row.title, row.content)
														}
													>
														<ModeEditOutlineOutlinedIcon
															sx={{ color: 'white' }}
														></ModeEditOutlineOutlinedIcon>
													</Button>
													<Button onClick={() => handleDeleteClick(row.id, row.title)}>
														<DeleteIcon sx={{ color: 'white' }}></DeleteIcon>
													</Button>
												</ButtonGroup>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
						<TablePagination
							rowsPerPageOptions={[10, 25, 100]}
							component='div'
							count={rows.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</CardContent>
				</Card>
			</Grid>

			<Box marginTop={2}>
				<Card>
					<TableContainer>
						<Table aria-label='table in dashboard'>
							<TableHead>
								<TableRow>
									<TableCell>Câu lạc bộ</TableCell>
									<TableCell>Ban tham gia</TableCell>
									<TableCell>CV</TableCell>
									<TableCell>Ngày nộp đơn</TableCell>
									<TableCell>Tình trạng đơn</TableCell>
									<TableCell>Ngày cập nhật</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{application.map(row => (
									<TableRow
										hover
										key={row.id}
										sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
									>
										<TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
											<Box sx={{ display: 'flex', flexDirection: 'column' }}>
												<Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
													{row.club.name}
												</Typography>
												<Typography variant='caption'>{row.club.subname}</Typography>
											</Box>
										</TableCell>
										<TableCell>{row.dept.name}</TableCell>
										<TableCell>
											<Button
												size='small'
												variant='contained'
												color='primary'
												value={`http://localhost:8080${row?.engagement.cvUrl}`}
												onClick={() => handleClick(row)}
											>
												Xem CV
											</Button>
										</TableCell>
										<TableCell>{row.engagement.createdAt}</TableCell>
										<TableCell>
											<Chip
												label={row.engagement.roleId == 0 ? 'Đăng ký Mới' : 'Đã duyệt đơn'}
												color={statusObj[row.engagement.roleId].color}
												sx={{
													height: 24,
													fontSize: '0.75rem',
													textTransform: 'capitalize',
													'& .MuiChip-label': { fontWeight: 500 }
												}}
											/>
										</TableCell>
										<TableCell>{row.engagement.updatedAt}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Card>
			</Box>
		</Container>
	)
}

export default MemberApproval
