import { Button, Card, Stack, Box, CardContent, Typography, Divider } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Select from 'src/@core/theme/overrides/select'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import FeedbackIcon from '@mui/icons-material/Feedback'
import CloseIcon from '@mui/icons-material/Close'
import InfoIcon from '@mui/icons-material/Info'
import Groups2Icon from '@mui/icons-material/Groups2'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import Link from 'next/link'

function SwipeableDrawerList({ anchor, event, setOpenRegisterModal, toggleDrawer = () => {}, setOpenFeedbackModal }) {
	const handleFeedbackClick = () => {
		setOpenFeedbackModal(true)
	}

	return (
		<>
			<Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500, padding: 4 }} role='presentation'>
				<Stack direction={'row'} justifyContent={'space-between'} marginBottom={2}>
					<Button variant='text' onClick={toggleDrawer(anchor, false)}>
						<CloseIcon></CloseIcon>
					</Button>
                    {event?.isRegistered && !event?.isFeedback && new Date() > new Date(event?.endTime) ? (
						<Button variant='text' onClick={handleFeedbackClick}>
							<Typography mr={2} variant='button'>
								Feedback
							</Typography>
							<FeedbackIcon></FeedbackIcon>
						</Button>
					) : event?.isRegistered && event?.isFeedback && new Date() > new Date(event?.endTime) ? (
						<Button variant='text' color='secondary'>
							<Typography mr={2} variant='button'>
								Đã Feedback
							</Typography>
							<FeedbackIcon></FeedbackIcon>
						</Button>
					) : null}
				</Stack>
				<Card sx={{ padding: 2 }}>
					<img
						src={event?.bannerUrl}
						alt=''
						style={{
							height: '300px',
							width: '100%',
							objectFit: 'cover',
							borderRadius: 8,
							display: 'block'
						}}
					></img>
					<CardContent sx={{ padding: 4 }}>
						<Typography variant='h6' fontWeight={700} marginBottom={4}>
							{event?.name}
							<Link href={`http://localhost:3000/clubs/${event?.clubSubname}`} passHref>
								<Stack
									direction={'row'}
									alignItems={'center'}
									marginTop={2}
									sx={{ cursor: 'pointer' }}
									justifyItems={'flex-start'}
								>
									<img src={event?.clubAvatarUrl} alt='' style={{ width: 20, height: 20 }} />
									<Typography variant='body2' marginLeft={1}>
										{event?.clubSubname}{' '}
									</Typography>
									<KeyboardArrowRightIcon></KeyboardArrowRightIcon>
								</Stack>
							</Link>
						</Typography>
						<Box sx={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 2 }}>
							<Box sx={{ padding: '6px 8px 2px', border: '1px solid #ddd', borderRadius: 1 }}>
								<Groups2Icon></Groups2Icon>
							</Box>
							<Box>
								<Typography variant='body2' fontWeight={500}>
									Tổ chức
								</Typography>
								<Typography variant='body1' fontWeight={600}>
									FU-DEVER
								</Typography>
							</Box>
						</Box>
						<Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
							<Box sx={{ padding: '6px 8px 2px', border: '1px solid #ddd', borderRadius: 1 }}>
								<LocationOnIcon></LocationOnIcon>
							</Box>
							<Box>
								<Typography variant='body2' fontWeight={500}>
									Tại
								</Typography>
								<Typography variant='body1' fontWeight={600}>
									{event?.locationName}
								</Typography>
							</Box>
						</Box>
					</CardContent>
				</Card>
				<Card sx={{ marginTop: 4 }}>
					<Stack direction={'row'} alignItems={'flex-end'} gap={2} padding={2}>
						<InfoIcon sx={{ marginBottom: 1 }}></InfoIcon>
						<Typography variant='h6' fontWeight={700}>
							Mô tả sự kiện
						</Typography>
					</Stack>
					<Divider sx={{ margin: 0 }}></Divider>
					<CardContent sx={{ padding: 6 }}>
						<Typography sx={'body1'}>{event?.description}</Typography>
					</CardContent>
				</Card>
				{new Date() > new Date(event?.endTime) ? (
					<>
						<Button variant='outlined' color='secondary' disabled fullWidth sx={{ marginTop: 4 }}>
							Sự kiện đã kết thúc
						</Button>
					</>
				) : event?.isRegistered == 'true' || event?.isRegistered == true ? (
					<Button variant='outlined' fullWidth sx={{ marginTop: 4 }}>
						Đã đăng ký
					</Button>
				) : (
					<Button
						variant='contained'
						fullWidth
						sx={{ marginTop: 4 }}
						onClick={() => (userData?.id ? setOpenRegisterModal(true) : router.push('/auth/login'))}
					>
						Đăng ký
					</Button>
				)}
			</Box>
		</>
	)
}

export default SwipeableDrawerList
