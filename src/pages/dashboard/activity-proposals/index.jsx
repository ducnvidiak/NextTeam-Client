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
import { getProposalsByUserId, deleteProposalById, getAllProposalFilesByUserId } from '../../../api-utils/apiUtils'

import Modal from '@mui/material/Modal'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

function ActivityProposals() {
	const [openPreviewModal, setOpenPreviewModal] = useState(false)

	const [filterBy, setFilterBy] = useState('all')
	const [cookies, setCookie, removeCookie] = useCookies(['userData', 'clubId'])
	const [userData, setUserData] = useState()
	const [proposals, setProposals] = useState(null)
	const [fileRecords, setFileRecords] = useState(null)
	const [previewFile, setPreviewFile] = useState(null)

	const [loading, setLoading] = useState(false)

	const [deleteProposal, setDeleteProposal] = useState(null)

	const [openModal, setOpenModal] = useState(false)

	const router = useRouter()
	const clubId = cookies['clubData']?.clubId

	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	useEffect(() => {
		if (userData) {
			getProposalsByUserId(userData.id).then(response => {
				setProposals(response)
			})
			getAllProposalFilesByUserId(userData.id).then(response => {
				setFileRecords(response)
			})
		}
	}, [userData])

	const handleAddNewProposal = () => {
		router.push('./activity-proposals/new-proposal')
	}

	const handleDelete = () => {
		const hasFile = fileRecords?.some(fileRecord => fileRecord.proposalId == deleteProposal.id)
		if (hasFile) setLoading(true)

		deleteProposalById(deleteProposal.id).then(response => {

			if (response?.message == 'success') {
				if (hasFile) setLoading(false)

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

	const handleOpenPreview = fileRecord => {
		setPreviewFile(fileRecord)
		setOpenPreviewModal(true)
	}

	const handleClosePreview = () => {
		setPreviewFile(null)
		setOpenPreviewModal(false)
	}

	const filteredProposal = proposals?.filter(proposal => filterBy == 'all' || filterBy == proposal.isApproved)
	const filteredProposalInClub = filteredProposal?.filter(proposal => proposal.clubId == clubId)

	const renderFilteredProposal = filteredProposalInClub?.map(proposal => {
		if (filterBy == 'all' || filterBy == proposal.isApproved)
			return (
				<Box
					key={proposal.id}
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
						<Box sx={{ display: 'flex', flexWrap: 'wrap', margin: '10px 30px', gap: '10px' }}>
							{fileRecords
								?.filter(fileRecord => fileRecord.proposalId == proposal.id)
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
								onClick={() => {
									router.push(`./activity-proposals/edit-proposal/${proposal.id}`)
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
					<Typography variant='h6'>Tổng cộng: {filteredProposal?.length || 0} đề xuất</Typography>
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
				<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '0 20px' }}>
					{proposals !== null && renderFilteredProposal}
				</Box>
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

export default ActivityProposals

// 23$@#HURury an@gmail.com
