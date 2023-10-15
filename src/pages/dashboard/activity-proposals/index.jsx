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

import { VscTools } from 'react-icons/vsc'
import { RiDeleteBinLine } from 'react-icons/ri'

import classes from './styles.module.scss'
import { useCookies } from 'react-cookie'

import { getUserInfo } from 'src/utils/info'
import { getProposalsByUserId, deleteProposalById } from '../../../api-utils/apiUtils'

import Modal from '@mui/material/Modal'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

function ActivityProposals() {
	const [openPreviewModal, setOpenPreviewModal] = useState(false)

	const [filterBy, setFilterBy] = useState('all')
	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const [userData, setUserData] = useState()
	const [proposals, setProposals] = useState(null)

	const [deleteProposal, setDeleteProposal] = useState(null)

	const [openModal, setOpenModal] = useState(false)

	const router = useRouter()

	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	useEffect(() => {
		if (userData)
			getProposalsByUserId(userData.id).then(response => {
				console.log('proposals: ', response)
				setProposals(response)
			})
	}, [userData])

	const handleAddNewProposal = () => {
		router.push('./activity-proposals/new-proposal')
	}

	const handleDelete = () => {
		deleteProposalById(deleteProposal.id).then(response => {
			console.log('delete response: ', response)

			if (response.message == 'success') {
				toast.success('Xóa thành công')
				setProposals(current => current.filter(proposal => proposal.id !== deleteProposal.id))
				setDeleteProposal(null)
			} else {
				toast.error('Hệ thống đang gặp sự cố vui lòng thử lại sau')
			}
		})
		setOpenModal(false)
	}

	const handleConfirmDelete = id => {
		setDeleteProposal(proposals.find(proposal => proposal.id == id))
		setOpenModal(true)
	}

	const handleCloseModal = () => {
		setOpenModal(false)
		setDeleteProposal(null)
	}

	const handleOpenPreview = () => {
		setOpenPreviewModal(true)
	}

	const handleClosePreview = () => {
		setOpenPreviewModal(false)
	}

	const filteredProposal = proposals?.filter(proposal => filterBy == 'all' || filterBy == proposal.isApproved)

	const renderFilteredProposal = filteredProposal?.map(proposal => {
		if (filterBy == 'all' || filterBy == proposal.isApproved)
			return (
				<Box
					key={proposal.id}
					sx={{
						overflow: 'hidden',
						borderRadius: '15px',
						border: '2px solid orange',
						position: 'relative',
						padding: '5px 10px'
					}}
				>
					<Typography
						sx={{
							position: 'absolute',
							top: '0',
							right: '-5px',
							backgroundColor: 'orange',
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
							<span style={{ fontSize: '20px' }}>#</span> id-{proposal.id}
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
							{proposal.title}
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
							{proposal.content}
						</Typography>
					</Box>
					<Box>
						<Typography>Files đính kèm:</Typography>
						<Stack direction='row' spacing={2} sx={{ marginLeft: '70px', marginTop: '10px' }}>
							<Chip
								label='file.docx'
								variant='outlined'
								icon={<AiFillFileWord style={{ fontSize: '20px', color: '#3581d7' }} />}
								sx={{ cursor: 'pointer', ':hover': { backgroundColor: '#f1f1f1' } }}
							/>
							<Chip
								label='file.pdf'
								variant='outlined'
								icon={<BiSolidFilePdf style={{ fontSize: '20px', color: '#f68b1e' }} />}
								sx={{ cursor: 'pointer', ':hover': { backgroundColor: '#f1f1f1' } }}
							/>
						</Stack>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							margin: '20px 0 5px',
							flexWrap: 'wrap',
							rowGap: '20px'
						}}
					>
						{proposal.isApproved == 'approved' ? (
							<Chip
								label='Chấp nhận'
								size='small'
								sx={{ backgroundColor: 'rgb(0,186,0)', color: 'floralwhite' }}
							/>
						) : proposal.isApproved == 'refused' ? (
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
									handleConfirmDelete(proposal.id)
								}}
							>
								<RiDeleteBinLine />
							</Button>
						</Box>
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
								{new Date(proposal.updatedAt).toLocaleDateString('en-US', {
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
			<Typography variant='h4' sx={{ fontWeight: '600', marginBottom: '30px' }}>
				Các đề xuất ý tưởng, kế hoạch của bạn
			</Typography>
			<Paper
				sx={{
					width: '100%',
					height: '100%',
					borderRadius: '15px',
					padding: '0px 20px'
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						borderBottom: '2px solid #F8C883',
						height: '80px'
					}}
				>
					<Typography variant='h6'>Tổng cộng: {filteredProposal?.length || 0} đề xuất</Typography>
					<button
						className={classes.btn__primary}
						style={{
							fontWeight: '600',
							fontSize: '16px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '15px',
							cursor: 'pointer'
						}}
						onClick={handleAddNewProposal}
					>
						<span>Thêm đề xuất mới</span> <PostAddIcon sx={{ width: '30px', height: '30px' }} />
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
							<MenuItem value={'approved'}>Đã chấp nhận</MenuItem>
							<MenuItem value={'refused'}>Bị từ chối</MenuItem>
							<MenuItem value={'pending'}>Đang chờ xử lý</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
					{proposals !== null && renderFilteredProposal}
				</Box>
				<Modal
					open={openModal}
					onClose={handleCloseModal}
					aria-labelledby='child-modal-title'
					aria-describedby='child-modal-description'
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
							<Typography variant='h6'>Bạn chắc chắn muốn xóa bản đề xuất này chứ?</Typography>
						</Box>

						<Box sx={{ padding: '20px' }}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Typography sx={{ color: 'rgb(86, 129, 249)', fontSize: '12px' }}>
									<span style={{ fontSize: '20px' }}>#</span> id-{deleteProposal?.id}
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
									{deleteProposal?.title}
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
									{deleteProposal?.content}
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
			</Paper>
		</Fragment>
	)
}

export default ActivityProposals

// 12@$%HYrwr  ducnsde160488@gmail.com
// 34JHer&*$ van@gmail.com
// 8KHuf&$%f phong@gmail.com
// pas$w0URR123 ngankim@gmail.com
