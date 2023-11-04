import React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { PieChart, Pie, Cell } from 'recharts'
import { Box, Container, List, ListItem, ListItemText } from '@mui/material'
import EventNoteIcon from '@mui/icons-material/EventNote'
import PieChartIcon from '@mui/icons-material/PieChart'

const COLORS = ['#f27123', '#61a330', '#2b2827']

const data = [
	{ name: 'Đã diễn ra', value: 60 },
	{ name: 'Chuẩn bị', value: 30 }
]

const EventChart = props => {
	const totalValue = data.reduce((prev, curr) => prev + curr.value, 0)

	const handleButtonClick = () => {
		window.location.href = '/dashboard/events'
	}

	return (
		<Card sx={{ position: 'relative' }}>
			<CardContent>
				<Box component='span' sx={{ display: 'inline-flex', alignItems: 'center' }}>
					<EventNoteIcon color='action' />
					<Box sx={{ ml: 1 }}>Số lượng sự kiện</Box>
				</Box>
				<Typography variant='h6'>{props?.data?.total_event} </Typography>

				<Grid container space={5}>
					<Grid item xs={12} md={6}>
						{data.map((item, index) => (
							<Typography variant='body2' key={index} sx={{ letterSpacing: '0.25px' }}>
								<Box component='span' sx={{ display: 'inline-flex', alignItems: 'center' }}>
									<PieChartIcon color='action' />
									<Box sx={{ ml: 1 }}>
										{Math.round((item.value / totalValue) * 100)}% {item.name}
									</Box>
								</Box>
							</Typography>
						))}
					</Grid>
					<Grid item xs={12} md={6} sx={{ paddingRight: -100 }}>
						<PieChart width={140} height={140}>
							<Pie
								data={data}
								dataKey='value'
								nameKey='name'
								cx='50%'
								cy='50%'
								outerRadius={70}
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

const Event = props => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={12}>
				<EventChart data={props.data} />
			</Grid>
		</Grid>
	)
}

export default Event
