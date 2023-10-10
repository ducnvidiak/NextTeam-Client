import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { Avatar, Box, Card, CardContent, CardHeader, LinearProgress, Typography } from '@mui/material'
import React from 'react'
import { useCookies } from 'react-cookie'
import { getUserInfo, getUserPoints, getUserPointsHistory } from 'src/utils/info'

const data = [
	{
		progress: 80,
		imgHeight: 27,
		title: 'Hoạt động 1',
		color: 'primary',
		amount: '+ 22 điểm',
		subtitle: 'Hoạt động 1',
		imgSrc: '/images/cards/logo-bitbank.png'
	},
	{
		progress: 90,
		color: 'info',
		imgHeight: 27,
		title: 'Hoạt động 2',
		amount: '+ 37 điểm',
		subtitle: 'Hoạt động 2',
		imgSrc: '/images/cards/logo-bitbank.png'
	},
	{
		progress: 10,
		imgHeight: 20,
		title: 'Hoạt động 3',
		color: 'error',
		amount: '- 30 điểm',
		subtitle: 'Vắng mặt',
		imgSrc: '/images/cards/logo-aviato.png'
	}
]

const arrowStyle = {
	borderRadius: '50%'
}

const ActivityPoint = () => {
	const [cookies, setCookies] = useCookies(['userData', 'clubData'])
	const [userData, setUserData] = React.useState()
	const [userPoints, setUserPoints] = React.useState(0)
	const [userPointsHistories, setUserPointsHistories] = React.useState([])
	React.useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	React.useEffect(() => {
		if (userData && cookies['clubData'])
			(async () => {
				setUserPoints(await getUserPoints(userData.id, cookies['clubData'].clubId))
				setUserPointsHistories(await getUserPointsHistory(userData.id, cookies['clubData'].clubId))
			})()
	}, [userData, cookies])

	return (
		<Card>
			<CardHeader
				title='Điểm hoạt động'
				titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
			/>
			<CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
				<Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
					<Typography variant='h4' sx={{ fontWeight: 600, fontSize: '2.125rem !important' }}>
						{userPoints.points} điểm
					</Typography>
				</Box>

				<Typography component='p' variant='caption' sx={{ mb: 10 }}>
					Xếp hạng #{userPoints.rank} trong CLB
				</Typography>

				{userPointsHistories.map((item, index) => {
					return (
						<Box
							key={item.title}
							sx={{
								display: 'flex',
								alignItems: 'center',
								...(index !== data.length - 1 ? { mb: 8.5 } : {})
							}}
						>
							<Avatar
								variant='rounded'
								sx={{
									mr: 3,
									width: 40,
									height: 40,
									backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.04)`
								}}
							>
								{item.amount < 0 ? (
									<ArrowDropDown sx={{ color: 'red', backgroundColor: '#f003', ...arrowStyle }} />
								) : (
									<ArrowDropUp sx={{ color: 'green', backgroundColor: '#0f03', ...arrowStyle }} />
								)}
							</Avatar>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									flexWrap: 'wrap',
									alignItems: 'center',
									justifyContent: 'space-between'
								}}
							>
								<Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
									<Typography
										variant='body2'
										sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}
									>
										{item.reason}
									</Typography>
									<Typography variant='caption'>{item.createdAt}</Typography>
								</Box>

								<Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
									<Typography
										variant='body2'
										sx={{ mb: 2, fontWeight: 600, color: 'text.primary', textAlign: 'right' }}
									>
										{item.amount > 0 ? `+ ${item.amount}` : `- ${Math.abs(item.amount)}`} điểm
									</Typography>
									<LinearProgress
										color={item.amount > 0 ? 'success' : 'error'}
										value={item.progress}
										variant='determinate'
									/>
								</Box>
							</Box>
						</Box>
					)
				})}
			</CardContent>
		</Card>
	)
}

function Rank() {
	return (
		<div>
			<ActivityPoint />
		</div>
	)
}

export default Rank
