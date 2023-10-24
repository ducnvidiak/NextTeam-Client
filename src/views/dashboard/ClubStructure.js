import React from 'react'
import { Typography, Box, Container, Grid, Card, CardContent, Avatar, CardMedia, styled } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ClubCategory from 'src/components/ClubCategory'
import EventNoteIcon from '@mui/icons-material/EventNote' // Icon for Founding Date
import { useRouter } from 'next/router'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

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
		router.push('http://localhost:3000/dashboard/members/info/' + id)
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
		manager_club_id: props?.data?.manager_club_id
	}

	return (
		<Container>
			<Card>
				<CardMedia component='img' height='200' image={clubInfo?.banner} alt={clubInfo?.name} />

				<img
					src={clubInfo?.avatar}
					alt=''
					style={{
						width: '300px',
						height: '300px',
						objectFit: 'cover'
					}}
				/>
				<CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
					<Typography variant='h7' sx={{ opacity: 0.7 }}>
						{clubInfo?.subname}
					</Typography>
					<Typography variant='h5' fontWeight={700} sx={{}} textTransform={'uppercase'}>
						{clubInfo?.name}
					</Typography>
					<Box sx={{ display: 'flex', gap: 4, marginBottom: 4 }}>
						<ClubCategory categoryId={clubInfo?.categoryId}></ClubCategory>
					</Box>
					<Typography variant='body1'>
						<EventNoteIcon /> Ngày thành lập: {clubInfo.foundingDate}
					</Typography>

					<Card
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							padding: '20px',
							borderRadius: '15px',
							cursor: 'pointer',
							marginTop: 5,
							marginBottom: 5,
							boxShadow: '0 0 10px #dedede'
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
									border: '3px solid #f58a38',
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
									gap: '7px'
								}}
							>
								<Typography variant='h6'>Chủ nhiệm</Typography>
								<Typography variant='h6'>{clubInfo?.manager_club_name}</Typography>
								<Typography
									variant='subtitle1'
									sx={{
										backgroundColor: 'orange',
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
								<MoreHorizIcon sx={{ color: 'orange', fontSize: '32px' }} />
							</Box>
						</Box>
					</Card>
				</CardContent>
			</Card>
		</Container>
	)
}

export default ClubStructure
