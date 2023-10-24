import React, { useState, useEffect } from 'react'
import { Button, Modal, Paper, Box, Chip, Card, CardActions, CardContent, Typography } from '@mui/material'
import { Avatar, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'

import { useRouter } from 'next/router'
import { getAllPlansForAdmin, getAllPlanFiles, updatePlanStatus } from 'src/api-utils/apiUtils'

import { TextareaAutosize } from '@mui/base'

import classes from './styles.module.scss'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { AiFillFileWord } from 'react-icons/ai'
import { BiSolidFilePdf } from 'react-icons/bi'
import { AiFillFileExcel } from 'react-icons/ai'
import { AiOutlineFileUnknown } from 'react-icons/ai'
import { BsFiletypePng, BsFiletypeJpg } from 'react-icons/bs'
import { AiOutlineCloudDownload, AiOutlineClose } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'

function PlanListPage() {
	const [openPreviewModal, setOpenPreviewModal] = useState(false)

	const [feedback, setFeedback] = useState(null)

	const [filterBy, setFilterBy] = useState('all')
	const [fileRecords, setFileRecords] = useState(null)
	const [previewFile, setPreviewFile] = useState(null)
	const [selectedPlan, setSelectedPlan] = useState(null)
	const [selectedStatus, setSelectedStatus] = useState(null)

	const [loading, setLoading] = useState(false)
	const [openModal, setOpenModal] = useState(false)
	const [cookies, setCookie] = useCookies(['clubData'])

	const router = useRouter()

	const [plans, setPlans] = useState([])
	const clubId = cookies['clubData']?.clubId

	const handleOpenPreview = fileRecord => {
		setPreviewFile(fileRecord)
		setOpenPreviewModal(true)
	}

	const handleClosePreview = () => {
		setPreviewFile(null)
		setOpenPreviewModal(false)
	}

	useEffect(() => {
		getAllPlansForAdmin(clubId).then(response => {
			console.log('plans: ', response)
			setPlans(response)
		})
		getAllPlanFiles(clubId).then(response => {
			console.log('file records: ', response)
			setFileRecords(response)
		})
	}, [clubId])

	const handleCloseModal = () => {
		setOpenModal(false)
	}

	const handleAction = () => {
		setOpenModal(false)
		handleUpdatePlanStatus(selectedPlan, selectedStatus, feedback)
	}

	const handleConfirmAction = (plan, status) => {
		setSelectedPlan(plan)
		setSelectedStatus(status)
		setOpenModal(true)
	}

	const handleUpdatePlanStatus = (uplan, status, feedback) => {
		// Xử lý logic cập nhật trạng thái kế hoạch
		updatePlanStatus(uplan.id, status, feedback).then(response => {
			if (response?.status == 'success') {
				const updatePlan = plans?.map(plan => {
					if (plan.id != uplan.id) return plan
					else return { ...plan, isApproved: response.planStatus }
				})
				toast.success('Cập nhật thành công')
				setPlans(updatePlan)
			} else {
				toast.error('Vui lòng thử lại sau')
			}
		})
	}

	const numberOfProposalPerPage = 3

	const [page, setPage] = useState(1)

	const handleChangePage = (event, value) => {
		setPage(value)
	}

	const filteredPlans = plans?.filter(plan => filterBy == 'all' || filterBy == plan.isApproved)

	const pagePlans = filteredPlans?.filter(
		(plan, index) => page * numberOfProposalPerPage >= index && (page - 1) * numberOfProposalPerPage <= index
	)

	return (
		<div style={{ height: '100%', position: 'relative', paddingBottom: '70px' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					height: '80px',
					marginRight: '50px'
				}}
			>
				<Typography variant='h5'>Các đề xuất</Typography>
				<Box sx={{ display: 'flex', gap: '30px', justifyContent: 'space-between', alignItems: 'center' }}>
					<FormControl>
						<InputLabel size='small' id='filter-label'>
							Lọc theo
						</InputLabel>
						<Select
							labelId='filter-lable'
							label='Sắp xếp'
							id='filter'
							onChange={event => {
								setFilterBy(event.target.value)
							}}
							value={filterBy}
							size='small'
						>
							<MenuItem value={'all'} selected>
								Tất cả
							</MenuItem>
							<MenuItem value={'accepted'}>Đã chấp nhận</MenuItem>
							<MenuItem value={'rejected'}>Bị từ chối</MenuItem>
							<MenuItem value={'pending'}>Đang chờ xử lý</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</Box>
			{pagePlans?.map(plan => (
				<Card key={plan.id} variant='outlined' style={{ marginBottom: '16px' }}>
					<CardContent>
						<Typography variant='h6'>Tiêu đề: {plan.title}</Typography>
						<Typography variant='body1' style={{ marginTop: '8px', marginBottom: '16px' }}>
							Nội dụng: {plan.content}
						</Typography>
						<Box sx={{ margin: '10px 0' }}>
							<Typography>Gửi từ: {plan.clubname}</Typography>
						</Box>
						<Box>
							<Typography>Files đính kèm:</Typography>
							<Box sx={{ display: 'flex', flexWrap: 'wrap', margin: '10px 30px', gap: '10px' }}>
								{fileRecords
									?.filter(fileRecord => fileRecord.planId == plan.id)
									.map(fileRecord => {
										let avatar = (
											<AiOutlineFileUnknown style={{ fontSize: '20px', color: 'gray' }} />
										)

										switch (fileRecord.type) {
											case 'application/msword':
											case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
												avatar = (
													<AiFillFileWord style={{ fontSize: '20px', color: '#3581d7' }} />
												)
												break
											case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
												avatar = (
													<AiFillFileExcel style={{ fontSize: '20px', color: 'green' }} />
												)
												break
											case 'application/pdf':
												avatar = (
													<BiSolidFilePdf style={{ fontSize: '20px', color: 'orange' }} />
												)
												break
											case 'image/jpeg':
												avatar = <BsFiletypeJpg style={{ fontSize: '20px' }} />
												break
											case 'image/png':
												avatar = <BsFiletypePng style={{ fontSize: '20px' }} />
										}

										return (
											<Chip
												key={fileRecord.id}
												label={fileRecord.name}
												variant='outlined'
												avatar={avatar}
												sx={{ cursor: 'pointer', ':hover': { backgroundColor: '#f1f1f1' } }}
												onDoubleClick={() => {
													handleOpenPreview(fileRecord)
												}}
											/>
										)
									})}
							</Box>
						</Box>
					</CardContent>
					<CardActions>
						{plan.isApproved === 'pending' && (
							<>
								<Button
									variant='contained'
									onClick={() => {
										handleConfirmAction(plan, 'accepted')
									}}
								>
									Chấp nhận
								</Button>
								<Button
									variant='outlined'
									onClick={() => {
										handleConfirmAction(plan, 'rejected')
									}}
								>
									Từ chối
								</Button>
							</>
						)}
						{plan.isApproved === 'accepted' && (
							<Typography variant='body2' color='textSecondary'>
								Đã chấp nhận
							</Typography>
						)}
						{plan.isApproved === 'rejected' && (
							<Typography variant='body2' color='textSecondary'>
								Đã từ chối
							</Typography>
						)}
					</CardActions>
				</Card>
			))}

			<Modal
				open={openPreviewModal}
				onClose={handleClosePreview}
				aria-labelledby='preview modal'
				aria-describedby='show preview file in a proposal'
			>
				<Paper
					sx={{
						width: '1100px',
						position: 'absolute',
						top: '10%',
						left: '50%',
						transform: 'translateX(-50%)',
						padding: '5px'
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<Typography variant='h5' sx={{ marginBottom: '5px' }}>
							Bản xem trước
						</Typography>
						<AiOutlineClose
							style={{ width: '20px', height: '20px', marginRight: '5px', cursor: 'pointer' }}
							onClick={handleClosePreview}
						/>
					</Box>
					<iframe
						src={previewFile?.viewLink}
						width='100%'
						height={520}
						style={{ borderRadius: '5px' }}
					></iframe>

					<a href={previewFile?.downloadLink} download className={classes.btn__download}>
						<AiOutlineCloudDownload
							style={{ width: '24px', height: '24px', color: '#fff', zIndex: '10' }}
							title='Tải xuống'
						/>
						<div
							style={{
								position: 'absolute',
								top: '0',
								left: '0',
								width: '100%',
								height: '100%',
								borderRadius: '1000px',
								backgroundColor: 'orange'
							}}
						>
							{' '}
						</div>
					</a>
				</Paper>
			</Modal>
			<Modal
				open={openModal}
				onClose={handleCloseModal}
				aria-labelledby='proposal deleting'
				aria-describedby='modal for confirm delete proposal'
			>
				<Paper
					sx={{
						width: '650px',
						position: 'absolute',
						top: '10%',
						left: '50%',
						transform: 'translateX(-50%)',
						paddingBottom: '100px'
					}}
				>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							height: '50px',
							padding: '0 20px',
							borderBottom: '2px solid orange'
						}}
					>
						<Typography variant='h6'>Xác nhận hành động của bạn?</Typography>
					</Box>

					<Box
						sx={{
							padding: '0 20px'
						}}
					>
						<InputLabel htmlFor='response' sx={{ margin: '30px 0 20px' }}>
							Bạn có thể thêm phản hồi khi xác nhận hành động
						</InputLabel>
						<TextareaAutosize
							maxRows={3}
							minRows={3}
							style={{
								width: 'calc(100% - 70px)',
								marginLeft: '30px',
								borderRadius: '10px',
								padding: '20px',
								fontSize: '18px',
								resize: 'none'
							}}
							spellCheck='false'
							value={feedback}
							onChange={event => {
								setFeedback(event.target.value)
							}}
						/>
					</Box>

					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '20px',
							position: 'absolute',
							bottom: '15px',
							right: '20px'
						}}
					>
						<Button variant='contained' onClick={handleAction}>
							Xác nhận
						</Button>
						<Button variant='outlined' onClick={handleCloseModal}>
							Hủy
						</Button>
					</Box>
				</Paper>
			</Modal>
			<Box
				sx={{
					display: 'flex',
					gap: '10px',
					justifyContent: 'space-between',
					alignItems: 'center',
					position: 'absolute',
					bottom: '10px',
					right: '10px'
				}}
			>
				<Typography>Chọn trang</Typography>
				<Stack spacing={2}>
					<Pagination count={10} page={page} onChange={handleChangePage} color='primary' />
				</Stack>
			</Box>
		</div>
	)
}

export default PlanListPage
