import React, { useState, useEffect } from 'react'
import { Button, Modal, Paper, Box, Chip, Card, CardActions, CardContent, Typography } from '@mui/material'

import { useRouter } from 'next/router'
import { getAllProposalByClubId, getAllProposalFilesByClubId, updateProposalStatus } from 'src/api-utils/apiUtils'

import classes from './styles.module.scss'

import { AiFillFileWord } from 'react-icons/ai'
import { BiSolidFilePdf } from 'react-icons/bi'
import { AiFillFileExcel } from 'react-icons/ai'
import { AiOutlineFileUnknown } from 'react-icons/ai'
import { BsFiletypePng, BsFiletypeJpg } from 'react-icons/bs'
import { AiOutlineCloudDownload, AiOutlineClose } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'

function ProposalListPage() {
	const [openPreviewModal, setOpenPreviewModal] = useState(false)

	const [filterBy, setFilterBy] = useState('all')
	const [proposals, setProposals] = useState(null)
	const [fileRecords, setFileRecords] = useState(null)
	const [previewFile, setPreviewFile] = useState(null)
	const [cookies, setCookie] = useCookies(['clubData'])

	const clubId = cookies['clubData']?.clubId

	const [loading, setLoading] = useState(false)
	const [openModal, setOpenModal] = useState(false)

	const router = useRouter()

	const handleOpenPreview = fileRecord => {
		setPreviewFile(fileRecord)
		setOpenPreviewModal(true)
	}

	const handleClosePreview = () => {
		setPreviewFile(null)
		setOpenPreviewModal(false)
	}

	useEffect(() => {
		getAllProposalByClubId(clubId).then(response => {
			setProposals(response)
		})
		getAllProposalFilesByClubId(clubId).then(response => {
			setFileRecords(response)
		})
	}, [clubId])

	const handleUpdateProposalStatus = (uproposal, status) => {
		// Xử lý logic cập nhật trạng thái kế hoạch
		updateProposalStatus(uproposal.id, status).then(response => {
			if (response?.status == 'success') {
				const updatePlan = proposals?.map(proposal => {
					if (proposal.id != uproposal.id) return proposal
					else return { ...proposal, isApproved: status }
				})
				toast.success('Cập nhật thành công')
				setProposals(updatePlan)
			} else {
				toast.error('Vui lòng thử lại sau')
			}
		})
	}

	return (
		<div>
			{proposals?.length == 0 ? <Typography variant='h6'>Chưa có đề xuất nào</Typography> : ''}
			{proposals?.map(proposal => (
				<Card key={proposal.id} variant='outlined' style={{ marginBottom: '16px' }}>
					<CardContent>
						<Typography variant='h6'>{proposal.title}</Typography>
						<Typography variant='body1' style={{ marginTop: '8px', marginBottom: '16px' }}>
							{proposal.content}
						</Typography>
						<Box>
							<Typography>Files đính kèm:</Typography>
							<Box sx={{ display: 'flex', flexWrap: 'wrap', margin: '10px 30px', gap: '10px' }}>
								{fileRecords
									?.filter(fileRecord => fileRecord.proposalId == proposal.id)
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
						{proposal.isApproved === 'pending' && (
							<>
								<Button
									variant='contained'
									onClick={() => handleUpdateProposalStatus(proposal, 'approved')}
								>
									Chấp nhận
								</Button>
								<Button
									variant='outlined'
									onClick={() => handleUpdateProposalStatus(proposal, 'refused')}
								>
									Từ chối
								</Button>
							</>
						)}
						{proposal.isApproved === 'approved' && (
							<Typography variant='body2' color='textSecondary'>
								Đã chấp nhận
							</Typography>
						)}
						{proposal.isApproved === 'refused' && (
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
						></div>
					</a>
				</Paper>
			</Modal>
		</div>
	)
}

export default ProposalListPage
