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
import { getProposalsByUserId } from '../../../api-utils/apiUtils'

function ActivityProposals() {
	const [filterBy, setFilterBy] = useState('')
	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const [userData, setUserData] = useState()
	const [proposals, setProposals] = useState(null)

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
					<Typography variant='h6'>Tổng cộng: {proposals?.length || 0} đề xuất</Typography>
					<button
						className={classes.btn__primary}
						style={{
							fontWeight: '600',
							fontSize: '16px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '15px'
						}}
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
							<MenuItem value={'a'}>Điểm thành tích</MenuItem>
							<MenuItem value={'b'}>Tên</MenuItem>
							<MenuItem value={'c'}>Thời gian hoạt động</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
					{proposals !== null &&
						proposals.map(proposal => (
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
										/>
										<Chip
											label='file.pdf'
											variant='outlined'
											icon={<BiSolidFilePdf style={{ fontSize: '20px', color: '#f68b1e' }} />}
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
						))}
				</Box>
			</Paper>
			1
		</Fragment>
	)
}

export default ActivityProposals
