import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

// ** MUI Imports

import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import ClubStructure from 'src/views/dashboard/ClubStructure'
import Member from 'src/views/dashboard/Member'
import Balance from 'src/views/dashboard/Balance'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import Event from 'src/views/dashboard/Event'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'

const Dashboard = () => {
	
	const ORIGIN_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/statis?clubId=`
	const [loading,setLoading] = useState(true)
	const [cookies, setCookie] = useCookies(['clubData'])
	const [data, setData] = useState([])
	const clubId = cookies['clubData']?.clubId

	

	useEffect(() => {
		const refreshData = () => {
			fetch(`${ORIGIN_URL}${clubId}`)
				.then(res => res.json())
				.then(result => {
					setData(result)
					
					setLoading(false)
				})
		}
		refreshData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cookies, clubId])

	return (
		<ApexChartWrapper>
			<Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 100 }} open={loading}>
                <CircularProgress color='inherit' />
            </Backdrop>
			<Grid container spacing={6}>
				<Grid item xs={12} md={12}>
					<ClubStructure data={data} />
				</Grid>
				<Grid item xs={12} md={5.9} sx={{ marginLeft: 3 }}>
					<Trophy data={data} />
				</Grid>

				<Grid item xs={12} md={5.9}>
					<Event data={data} />
				</Grid>

				<Grid item xs={12} md={6} lg={4}>
					<WeeklyOverview data={data} />
				</Grid>

				<Grid item xs={12} md={6} lg={4}>
					<TotalEarning data={data} />
				</Grid>
				<Grid item xs={12} md={6} lg={4}>
					<Grid container spacing={6}>
						<Grid item xs={6}>
							<CardStatisticsVerticalComponent
								stats={data?.balance}
								icon={<Poll />}
								color='success'
								title='Số dư'
							/>
						</Grid>
						<Grid item xs={6}>
							<CardStatisticsVerticalComponent
								stats={data?.activity_point}
								title='Điểm Hoạt Động'
								trend='negative'
								color='secondary'
								icon={<CurrencyUsd />}
							/>
						</Grid>
						<Grid item xs={6}>
							<CardStatisticsVerticalComponent
								stats={data?.total_report}
								trend='negative'
								title='Số báo cáo'
								icon={<BriefcaseVariantOutline />}
							/>
						</Grid>
						<Grid item xs={6}>
							<CardStatisticsVerticalComponent
								stats={data?.total_post}
								color='warning'
								trend='negative'
								title='Số bài viết'
								icon={<HelpCircleOutline />}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} md={12} sx={{ margin: '0 250px' }}>
					<Member data={data} />
				</Grid>
			</Grid>
		</ApexChartWrapper>
	)
}

export default Dashboard
