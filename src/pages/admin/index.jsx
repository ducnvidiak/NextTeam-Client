import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import ReportCount from './reports/ReportCount'
import ClubBalance from './reports/ClubBalance'
import ClubActivityScore from './reports/ClubActivityScore'
import {
	Card,
	CardContent,
	Typography,
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'


import dynamic from 'next/dynamic'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Dashboard = () => {
	const [loading, setLoading] = useState(true);


	const ORIGIN_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/statis?clubId=1`

	console.log('orgin url', ORIGIN_URL)

	const [data, setData] = useState([])

	useEffect(() => {
		const refreshData = () => {
			fetch(`${ORIGIN_URL}`)
				.then(res => res.json())
				.then(result => {
					setData(result)
					setLoading(false)
				})
		}
		refreshData()
	}, [])

	const cd = Array.isArray(data?.clubCounter) ? data?.clubCounter : []

	const uniqueClubs = cd.filter((club, index, self) => self.findIndex(c => c.name === club.name) === index)

	const clubData = [...new Set(cd?.map(club => club.name))]

	const eventCounts = uniqueClubs?.map(club => club.eventCount)
	const memberCounts = (uniqueClubs || []).filter(club => club.memberCount > 0).map(club => club.memberCount)

	const clubBalances = uniqueClubs?.map(club => club.balance)
	const clubScores = uniqueClubs?.map(club => club.activiyPoint)
	const clubPlans = uniqueClubs?.map(club => club.planCount)

	const upcomingEvents = cd?.map(club => ({
		club: club.name,
		event: club.upcomingEventName,
		date: club.upcomingEventTime
	}))

	// Bar chart configurations
	const barOptions = {
		chart: {
			id: 'basic-bar'
		},
		plotOptions: {
			bar: {
				columnWidth: '30%' // Specifies the width of the column as a percentage of the available space
			}
		},
		xaxis: {
			categories: clubData
		},
		dataLabels: {
			enabled: false
		},
		title: {
			text: 'Số lượng sự kiện và thành viên',
			align: 'center'
		}
	}

	const barSeries = [
		{
			name: 'Sự kiện',
			data: eventCounts
		},
		{
			name: 'Thành viên',
			data: memberCounts
		}
	]

	// Pie chart configurations
	const pieOptions = {
		labels: clubData,
		title: {
			text: 'Tỷ lệ tham gia câu lạc bộ',
			align: 'center'
		}
	}

	const pieSeries = memberCounts

	return (
		<div>
			<Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 100 }} open={loading}>
                <CircularProgress color='inherit' />
            </Backdrop>
			<Card>
				<CardContent>
					<Typography variant='h5' component='div'>
						Tổng quan các câu lạc bộ
					</Typography>
					<Box sx={{ minWidth: 120, marginTop: 3 }}>
						<ReactApexChart options={barOptions} series={barSeries} type='bar' height={350} />
					</Box>
				</CardContent>
			</Card>

			<Card sx={{ marginTop: 10 }}>
				<CardContent>
					<Typography variant='h5' component='div'>
						Tỷ lệ tham gia câu lạc bộ
					</Typography>
					<Box sx={{ minWidth: 275, width: 700, marginTop: 3 }}>
						<ReactApexChart options={pieOptions} series={pieSeries} type='pie' />
					</Box>
				</CardContent>
			</Card>

			<Card sx={{ marginTop: 10 }}>
				<CardContent>
					<Typography variant='h5' component='div'>
						Sự kiện sắp diễn ra
					</Typography>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell>Câu lạc bộ</TableCell>
									<TableCell>Sự kiện</TableCell>
									<TableCell>Ngày</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{upcomingEvents.map(row => (
									<TableRow key={row.event}>
										<TableCell>{row.club}</TableCell>
										<TableCell>{row.event}</TableCell>
										<TableCell>{row.date}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</CardContent>
			</Card>
			<Grid container spacing={3} sx={{ marginTop: 10 }}>
				<Grid item xs={12} md={4}>
					<ReportCount clubPlans={clubPlans} clubNames={clubData} />
				</Grid>
				<Grid item xs={12} md={4}>
					<ClubBalance clubBalances={clubBalances} clubNames={clubData} />
				</Grid>
				<Grid item xs={12} md={4}>
					<ClubActivityScore clubScores={clubScores} clubNames={clubData} />
				</Grid>
			</Grid>
		</div>
	)
}

export default Dashboard
