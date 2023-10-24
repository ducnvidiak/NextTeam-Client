// ** React Imports
import * as React from 'react'
import { useState, useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'

import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'

// ** Icons Imports
import Magnify from 'mdi-material-ui/Magnify'
import { Chip } from '@mui/material'
import {
	getListOfAllUserForManage,
	getDepartmentByClubId,
	changeDepartment,
	changeMemberStatus
} from 'src/api-utils/apiUtils'

// **Toasify Imports
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const TableStickyHeader = () => {
	const router = useRouter()
	const [state, dispatch] = useReducer((state, action) => action, 0)

	// ** States
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [members, setMembers] = useState([])
	const [departments, setDepartments] = useState([])
	const [applicationDetail, setApplicationDetail] = useState()
	const [search, setSearch] = useState('')
	const [cookies, setCookie] = useCookies(['clubData', 'userData'])

	//modal
	// const [open, setOpen] = useState(false)
	// const [scroll, setScroll] = useState('paper')
	// const [openCreateInterviewDialog, setOpenCreateInterviewDialog] = useState(false)
	// const [openInterviewDialog, setOpenInterviewDialog] = useState(false)

	// const [userData, setUserData] = useState()

	const clubId = cookies['clubData']?.clubId

	useEffect(() => {
		getListOfAllUserForManage(clubId).then(data => {
			setMembers(data)
		})
		getDepartmentByClubId(clubId).then(data => {
			setDepartments(data)
		})
	}, [cookies])

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	const handleChangeDepartment = (umember, departmentId, clubId) => {
		changeDepartment(umember.id, departmentId, clubId).then(response => {
			if (response.status == 'success') {
				const updateMembers = members.map(member => {
					if (member.id != umember.id) return member
					else return { ...member, departmentId: departmentId }
				})
				setMembers(updateMembers)
				toast.success('Cập nhật thành công')
			} else {
				toast.error('Vui long thử lại sau')
			}
		})
	}

	const handleChangeUserStatus = (clubId, umember) => {
		let status = umember.status == 'active' ? 0 : 1

		changeMemberStatus(umember.id, clubId, status).then(response => {
			if (response?.status == 'success') {
				const updateMembers = members.map(member => {
					if (member.id != umember.id) return member
					else return { ...member, status: member.status == 'active' ? 'inactive' : 'active' }
				})
				setMembers(updateMembers)
				toast.success('Cập nhật thành công')
			} else {
				toast.error('Vui long thử lại sau')
			}
		})
	}

	return (
		<Grid item xs={12}>
			<ToastContainer></ToastContainer>

			<Card style={{ height: '100%' }}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingRight: '10px'
					}}
				>
					<CardHeader title='Danh sách thành viên' titleTypographyProps={{ variant: 'h6' }} />
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
					/>
				</div>

				<Paper sx={{ width: '100%', overflow: 'hidden' }}>
					<TableContainer>
						<Table aria-label='table in dashboard'>
							<TableHead>
								<TableRow>
									<TableCell>Họ và tên</TableCell>
									<TableCell>MSSV</TableCell>
									<TableCell>Ban đăng ký</TableCell>

									<TableCell>Tình trạng</TableCell>
									<TableCell>Hành động</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{members?.map(member => (
									<TableRow
										hover
										key={member.id}
										sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
									>
										<TableCell
											onClick={() => {
												handleClickOpen(member)
											}}
										>
											{member.fullname}
										</TableCell>
										<TableCell>{member.studentCode}</TableCell>
										<TableCell>
											<FormControl>
												<Select
													value={member.departmentId}
													onChange={event => {
														handleChangeDepartment(member, event.target.value, clubId)
													}}
													size='small'
												>
													{departments.map(department => (
														<MenuItem key={department.id} value={department.id}>
															{department.name}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</TableCell>

										<TableCell>
											<Chip
												color={member.status == 'active' ? 'success' : 'default'}
												label={member.status}
												sx={{
													height: 24,
													fontSize: '0.75rem',
													textTransform: 'capitalize',
													'& .MuiChip-label': { fontWeight: 500 }
												}}
											/>
										</TableCell>

										<TableCell>
											<Button
												size='small'
												variant={member.status == 'active' ? 'contained' : 'outlined'}
												onClick={() => {
													handleChangeUserStatus(clubId, member)
												}}
											>
												{member.status == 'active' ? 'Block' : 'Unblock'}
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 25, 100]}
						component='div'
						count={members?.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			</Card>
		</Grid>
	)
}

export default TableStickyHeader
