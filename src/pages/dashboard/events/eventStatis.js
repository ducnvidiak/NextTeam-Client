// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#f27123', '#61a330', '#2b2827']

const data = [
	{ name: 'Đã diễn ra', value: 70 },
	{ name: 'Chuẩn bị', value: 30 }
]

const EventList = props => {
	const handleButtonClick = () => {
		window.location.href = '/dashboard/events'
	}

	// ** Hook
	return (
		<Card sx={{ position: 'relative' }}>
			<CardContent>
				<Typography variant='h6'>Số lượng sự kiện </Typography>
				<Typography variant='h6'>{props?.data?.total_event} </Typography>

				<Grid container space={5}>
					<Grid item xs={12} md={6}>
						<Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
							70% sự kiện đã diễn ra
						</Typography>
						<Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
							30% sự kiện chưa diễn ra
						</Typography>
					</Grid>
					<Grid item xs={12} md={6} sx={{ paddingRight: -100 }}>
						<PieChart width={100} height={100}>
							<Pie
								data={data}
								dataKey='value'
								nameKey='name'
								cx='50%'
								cy='50%'
								outerRadius={40}
								fill='#8884d8'
							>
								{data.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
						</PieChart>
					</Grid>
				</Grid>

				<Button size='small' variant='contained' onClick={handleButtonClick}>
					Xem chi tiết
				</Button>
			</CardContent>
		</Card>
	)
}

export default EventList
