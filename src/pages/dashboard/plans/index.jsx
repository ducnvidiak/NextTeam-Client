import {
	Avatar,
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Stack,
	Typography
} from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import PostAddIcon from '@mui/icons-material/PostAdd'
import Chip from '@mui/material/Chip'

import { AiFillFileWord } from 'react-icons/ai'
import { BiSolidFilePdf } from 'react-icons/bi'
import { AiFillFileExcel } from 'react-icons/ai'
import { AiOutlineFileUnknown } from 'react-icons/ai'
import { BsFiletypePng, BsFiletypeJpg } from 'react-icons/bs'

import LinearProgress from '@mui/material/LinearProgress'

import { VscTools } from 'react-icons/vsc'
import { RiDeleteBinLine } from 'react-icons/ri'
import { AiOutlineCloudDownload, AiOutlineClose } from 'react-icons/ai'

import classes from './styles.module.scss'
import { useCookies } from 'react-cookie'

import { getUserInfo } from 'src/utils/info'
import { getPlansByClubId, deletePlanById, getAllPlanFilesByClubId } from '../../../api-utils/apiUtils'

import Modal from '@mui/material/Modal'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

function ActivityPlans() {
	const [openPreviewModal, setOpenPreviewModal] = useState(false)

	const [filterBy, setFilterBy] = useState('all')
	const [cookies, setCookie, removeCookie] = useCookies(['userData', 'clubId'])
	const [userData, setUserData] = useState()
	const [plans, setPlans] = useState(null)
	const [fileRecords, setFileRecords] = useState(null)
	const [previewFile, setPreviewFile] = useState(null)

	const [loading, setLoading] = useState(false)

	const [deletePlan, setDeletePlan] = useState(null)

	const [openModal, setOpenModal] = useState(false)

	const router = useRouter()

	const clubId = cookies['clubData']?.clubId

	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	useEffect(() => {
		if (userData) {
			getPlansByClubId(clubId).then(response => {
				setPlans(response)
			})
			getAllPlanFilesByClubId(clubId).then(response => {
				setFileRecords(response)
			})
		}
	}, [userData, clubId])

	const handleAddNewPlan = () => {
		router.push('./plans/new-plan')
	}

	const handleDelete = () => {
		const hasFile = fileRecords?.some(fileRecord => fileRecord.planId == deletePlan.id)
		if (hasFile) setLoading(true)

		deletePlanById(deletePlan.id).then(response => {
			console.log('delete response: ', response)

			if (response?.message == 'success') {
				if (hasFile) setLoading(false)

				toast.success('Xóa thành công')
				setPlans(current => current.filter(plan => plan.id !== deletePlan.id))
				setDeletePlan(null)
			} else {
				toast.error('Hệ thống đang gặp sự cố vui lòng thử lại sau')
			}
		})
		setOpenModal(false)
	}

	const handleConfirmDelete = id => {
		setDeletePlan(plans.find(plan => plan.id == id))
		setOpenModal(true)
	}

	const handleCloseModal = () => {
		setOpenModal(false)
		setDeletePlan(null)
	}

	const handleOpenPreview = fileRecord => {
		setPreviewFile(fileRecord)
		setOpenPreviewModal(true)
	}

	const handleClosePreview = () => {
		setPreviewFile(null)
		setOpenPreviewModal(false)
	}

	const filteredPlan = plans?.filter(plan => filterBy == 'all' || filterBy == plan.isApproved)

	const renderFilteredPlan = filteredPlan?.map(plan => {
		if (filterBy == 'all' || filterBy == plan.isApproved)
			return (
				<Box
					key={plan.id}
					sx={{
						overflow: 'hidden',
						borderRadius: '15px',
						border: '2px solid #f27123',
						position: 'relative',
						padding: '5px 10px'
					}}
				>
					<Typography
						sx={{
							position: 'absolute',
							top: '0',
							right: '-5px',
							backgroundColor: '#f27123',
							color: 'white',
							fontSize: '12px',
							fontWeight: '600',
							padding: '5px 15px',
							borderBottomLeftRadius: '15px',
							textTransform: 'uppercase'
						}}
					>
						dever
					</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography sx={{ color: 'rgb(86, 129, 249)', fontSize: '12px' }}>
							<span style={{ fontSize: '20px' }}>#</span> id-{plan.id}
						</Typography>
					</Box>
					<Box>
						<Typography
							variant='h6'
							sx={{
								margin: '15px 0 5px',
								backgroundColor: '#faeee4',
								padding: '10px 25px',
								borderRadius: '15px',
								color: 'black'
							}}
						>
							{plan.title}
						</Typography>
						<Typography
							sx={{
								padding: '10px 25px',
								borderRadius: '8px',
								border: '1px dashed orange',
								margin: '20px 0',
								backgroundColor: 'rgba(255, 255, 255,0.9)',
								color: 'black'
							}}
						>
							{plan.content}
						</Typography>
					</Box>

					<Box>
						<Typography>Files đính kèm:</Typography>
						<Box sx={{ display: 'flex', flexWrap: 'wrap', margin: '10px 30px', gap: '10px' }}>
							{fileRecords
								?.filter(fileRecord => fileRecord.planId == plan.id)
								.map(fileRecord => {
									let avatar = <AiOutlineFileUnknown style={{ fontSize: '20px', color: 'gray' }} />

									switch (fileRecord.type) {
										case 'application/msword':
										case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
											avatar = <AiFillFileWord style={{ fontSize: '20px', color: '#3581d7' }} />
											break
										case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
											avatar = <AiFillFileExcel style={{ fontSize: '20px', color: 'green' }} />
											break
										case 'application/pdf':
											avatar = <BiSolidFilePdf style={{ fontSize: '20px', color: 'orange' }} />
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
					{plan.isApproved != 'pending' && (
						<Box sx={{ margin: '20px 0 30px' }}>
							<Typography>
								Phản hồi: {plan.response != null ? plan.response : 'Không có phản hồi'}
							</Typography>
						</Box>
					)}
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							margin: '20px 0 5px',
							flexWrap: 'wrap',
							rowGap: '20px'
						}}
					>
						{plan.isApproved == 'accepted' ? (
							<Chip
								label='Chấp nhận'
								size='small'
								sx={{ backgroundColor: 'rgb(0,186,0)', color: 'floralwhite' }}
							/>
						) : plan.isApproved == 'rejected' ? (
							<Chip
								label='Từ chối'
								size='small'
								sx={{ backgroundColor: 'rgb(230, 63, 41)', color: 'floralwhite' }}
							/>
						) : (
							<Chip
								label='Đang chờ'
								size='small'
								sx={{ backgroundColor: 'rgb(236, 156, 64)', color: 'floralwhite' }}
							/>
						)}
						{plan.isApproved == 'pending' && (
							<Box sx={{ display: 'flex', gap: '15px' }}>
								<Button
									sx={{
										border: 'none',
										backgroundColor: 'transparent',
										color: 'rgb(233, 166, 41)',
										fontSize: '22px',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										minWidth: 'auto',
										padding: '0',
										':hover': {
											backgroundColor: 'transparent',
											transform: 'scale(1.2)'
										}
									}}
									onClick={() => {
										router.push(`./plans/edit-plan/${plan.id}`)
									}}
								>
									<VscTools />
								</Button>
								<Button
									sx={{
										border: 'none',
										backgroundColor: 'transparent',
										color: 'rgb(234, 53, 21)',
										fontSize: '22px',
										display: 'flex',
										justifyContent: 'center',
										minWidth: 'auto',
										alignItems: 'center',
										padding: '0',
										':hover': {
											backgroundColor: 'transparent',
											transform: 'scale(1.2)'
										}
									}}
									onClick={() => {
										handleConfirmDelete(plan.id)
									}}
								>
									<RiDeleteBinLine />
								</Button>
							</Box>
						)}
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'center',
								width: '100%'
							}}
						>
							<Typography variant='subtitle2' sx={{ color: 'rgb(164, 164,164)' }}>
								Cập nhật lúc:{' '}
								{new Date(plan.updatedAt).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
									hour: 'numeric',
									minute: 'numeric',
									second: 'numeric'
								})}
							</Typography>
						</Box>
					</Box>
				</Box>
			)
	})

	return (
		<Fragment>
			<Paper
				sx={{
					width: '100%',
					height: '100%'
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						borderBottom: '2px solid #f27123',
						height: '58px',
						padding: '0 10px'
					}}
				>
					<Typography variant='h6'>Tổng cộng: {filteredPlan?.length || 0} bản kế hoạch</Typography>
					<button
						className={classes.btn__primary}
						style={{
							fontWeight: '600',
							fontSize: '12px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '15px',
							cursor: 'pointer'
						}}
						onClick={handleAddNewPlan}
					>
						<span>Thêm kế hoạch mới</span> <PostAddIcon sx={{ width: '30px', height: '30px' }} />
					</button>
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
						height: '80px',
						marginRight: '50px'
					}}
				>
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
				<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '0 20px' }}>
					{plans !== null && renderFilteredPlan}
				</Box>
				<Modal
					open={openModal}
					onClose={handleCloseModal}
					aria-labelledby='plan deleting'
					aria-describedby='modal for confirm delete plan'
				>
					<Paper
						sx={{
							width: '650px',
							position: 'absolute',
							top: '10%',
							left: '50%',
							transform: 'translateX(-50%)',
							paddingBottom: '50px'
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
							<Typography variant='h6'>Bạn chắc chắn muốn xóa bản kế hoạch này chứ?</Typography>
						</Box>

						<Box sx={{ padding: '20px' }}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Typography sx={{ color: 'rgb(86, 129, 249)', fontSize: '12px' }}>
									<span style={{ fontSize: '20px' }}>#</span> id-{deletePlan?.id}
								</Typography>
							</Box>
							<Box>
								<Typography
									variant='h6'
									sx={{
										margin: '15px 0 5px',
										backgroundColor: '#faeee4',
										padding: '10px 25px',
										borderRadius: '15px',
										color: 'black'
									}}
								>
									{deletePlan?.title}
								</Typography>
								<Typography
									sx={{
										padding: '10px 25px',
										borderRadius: '8px',
										border: '1px dashed orange',
										margin: '20px 0',
										backgroundColor: 'rgba(255, 255, 255,0.9)',
										color: 'black'
									}}
								>
									{deletePlan?.content}
								</Typography>
							</Box>
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
							<Button variant='contained' onClick={handleDelete}>
								Xác nhận xóa
							</Button>
							<Button variant='outlined' onClick={handleCloseModal}>
								Hủy
							</Button>
						</Box>
					</Paper>
				</Modal>
				<Modal
					open={openPreviewModal}
					onClose={handleClosePreview}
					aria-labelledby='preview modal'
					aria-describedby='show preview file in a plan'
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
							></div>
						</a>
					</Paper>
				</Modal>
			</Paper>
			<Modal open={loading} aria-labelledby='modal-loading' aria-describedby='modal-loading files to drive'>
				<Box
					sx={{
						width: '700px',
						position: 'absolute',
						top: '30%',
						left: '50%',
						transform: 'translateX(-50%)',
						overflow: 'hidden'
					}}
				>
					<Typography
						variant='h6'
						sx={{
							marginBottom: '5px',
							padding: '10px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#fff'
						}}
					>
						Đang xóa các file, vui lòng đợi!
					</Typography>
					<LinearProgress color='primary' />
				</Box>
			</Modal>
		</Fragment>
	)
}

export default ActivityPlans

// 23$@#HURury an@gmail.com
