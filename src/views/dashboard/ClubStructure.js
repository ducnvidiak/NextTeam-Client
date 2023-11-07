import React from 'react'
import { Typography, Box, Container, Grid, Card, CardContent, Avatar, CardMedia, styled, Stack } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ClubCategory from 'src/components/ClubCategory'
import EventNoteIcon from '@mui/icons-material/EventNote' // Icon for Founding Date
import { useRouter } from 'next/router'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Groups2Icon from '@mui/icons-material/Groups2'
import CakeIcon from '@mui/icons-material/Cake'

const StyledBox = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	boxShadow: theme.shadows[1],
	padding: theme.spacing(2),
	borderRadius: theme.shape.borderRadius,
	display: 'flex',
	alignItems: 'center'
}))

const StyledIcon = styled(AccountCircleIcon)(({ theme }) => ({
	color: theme.palette.primary.main,
	marginRight: theme.spacing(2),
	fontSize: 40
}))

const ClubStructure = props => {
	const router = useRouter()
	function handleClick(id) {
		router.push('/dashboard/members/info/' + id)
	}
	const boardMembers = [{ position: 'Chủ nhiệm câu lạc bộ', name: props?.data?.manager_club_name }]

	const clubInfo = {
		name: props?.data?.name_club,
		subname: props?.data?.subname,
		foundingDate: props?.data?.create_date_club,
		categoryId: props?.data?.category_club,
		avatar: props?.data?.avartar_club, // Path to avatar image
		banner: props?.data?.banner_club, // Path to banner image
		manager_ava: props?.data?.manager_club_ava,
		manager_club_name: props?.data?.manager_club_name,
		manager_club_username: props?.data?.manager_club_username,
		manager_club_id: props?.data?.manager_club_id,
		description: props?.data?.description
	}

	return (
		<Container>
			<Card>
				<img
					src={clubInfo?.banner}
					alt=''
					style={{
						width: '100%',
						objectFit: 'cover',
						display: 'block'
					}}
				/>
				<CardContent sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
					<Card sx={{ height: '140px', width: '140px' }}>
						<img
							src={clubInfo?.avatar}
							alt=''
							width={'100%'}
							height={'100%'}
							style={{ objectFit: 'cover' }}
						/>
					</Card>

					<Stack direction={'column'} flex={1}>
						<Typography variant='h7' sx={{ opacity: 0.7 }}>
							{clubInfo?.subname}
						</Typography>
						<Typography variant='h5' fontWeight={700} sx={{}}>
							{clubInfo?.name}
						</Typography>
						<ClubCategory categoryId={clubInfo?.categoryId}></ClubCategory>
						<Box mt={5}>
							<Typography
								variant='body1'
								sx={{
									flex: 1,
									overflow: 'hidden',
									display: '-webkit-box',
									WebkitBoxOrient: 'vertical',
									WebkitLineClamp: 3,
									whiteSpace: 'pre-wrap'
								}}
							>
								{clubInfo?.description}
							</Typography>
						</Box>
						<Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
							<Stack direction={'row'} gap={12}>
								<Box sx={{ display: 'flex', gap: 4 }}>
									<CakeIcon></CakeIcon>
									<Typography variant='body1'>{clubInfo?.foundingDate}</Typography>
								</Box>
							</Stack>
						</Stack>
					</Stack>
				</CardContent>
				<Card
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '5px',
						cursor: 'pointer',
						marginTop: 5,
						marginBottom: 5,
						marginLeft: 'auto',
						marginRight: 'auto',
						width: '95%'
					}}
					onClick={() => {
						handleClick(clubInfo?.manager_club_id)
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
						<Box
							sx={{
								width: '90px',
								height: '90px',
								borderRadius: '1000px',
								border: '3px solid #F27123',
								overflow: 'hidden'
							}}
						>
							<Avatar
								sx={{
									width: '90px',
									height: '90px',
									transition: 'transform .4s ease-in-out',
									':hover': { transform: 'scale(1.2)' }
								}}
								alt='avatar'
								src={clubInfo?.manager_ava}
							/>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'flex-start',

								gap: '1px'
							}}
						>
							<Typography variant='body1'>Chủ nhiệm</Typography>
							<Typography variant='body1'>{clubInfo?.manager_club_name}</Typography>
							<Typography
								variant='subtitle1'
								sx={{
									backgroundColor: '#F27123',
									display: 'inline-block',
									padding: '0 5px',
									borderRadius: '5px',
									color: 'white'
								}}
							>
								{clubInfo?.manager_club_username}
							</Typography>
						</Box>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
						<Box
							sx={{
								padding: '5px',
								borderRadius: '1000px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								':hover': {
									backgroundColor: '#ededed'
								}
							}}
						>
							
						</Box>
					</Box>
				</Card>
			</Card>
		</Container>
	)
}

export default ClubStructure
