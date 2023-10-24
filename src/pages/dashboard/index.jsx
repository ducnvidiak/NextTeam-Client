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
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import EventList from './events/eventStatis'

const Dashboard = () => {
	const ORIGIN_URL = 'http://localhost:8080/api/statis?clubId='
	const [cookies, setCookie] = useCookies(['clubData'])
	const [data, setData] = useState([])
	const clubId = cookies['clubData']?.clubId

	const refreshData = () => {
		fetch(`${ORIGIN_URL}${clubId}`)
			.then(res => res.json())
			.then(result => {
				setData(result)
				console.log(result)
			})
	}

	useEffect(() => {
		refreshData()
	}, [cookies])

	return (
		<ApexChartWrapper>
			<Grid container spacing={6}>
				<Grid item xs={12} md={6}>
					<Trophy data={data} />
				</Grid>
				<Grid item xs={12} md={6}>
					<EventList data={data} />
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
								stats={data.balance}
								icon={<Poll />}
								color='success'
								trendNumber='+42%'
								title='Số dư'
								subtitle='Trong kỳ'
							/>
						</Grid>
						<Grid item xs={6}>
							<CardStatisticsVerticalComponent
								stats={data.activity_point}
								title='Điểm Hoạt Động'
								trend='negative'
								color='secondary'
								trendNumber='-15%'
								subtitle='Trong năm'
								icon={<CurrencyUsd />}
							/>
						</Grid>
						<Grid item xs={6}>
							<CardStatisticsVerticalComponent
								stats={data.total_report}
								trend='negative'
								trendNumber='-18%'
								title='Số báo cáo'
								subtitle='Trong tháng'
								icon={<BriefcaseVariantOutline />}
							/>
						</Grid>
						<Grid item xs={6}>
							<CardStatisticsVerticalComponent
								stats={data.total_post}
								color='warning'
								trend='negative'
								trendNumber='-18%'
								subtitle='Trong tháng'
								title='Số bài viết'
								icon={<HelpCircleOutline />}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} md={6} lg={4}>
					<SalesByCountries />
				</Grid>
				<Grid item xs={12} md={12} lg={8}>
					<DepositWithdraw />
				</Grid>
				<Grid item xs={12}>
					<Table />
				</Grid>
			</Grid>
		</ApexChartWrapper>
	)
}

export default Dashboard
