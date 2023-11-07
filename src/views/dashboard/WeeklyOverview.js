// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const WeeklyOverview = props => {
	const currentDate = new Date()
	const currentMonthIndex = currentDate.getMonth()

	const total_event_months = Array.isArray(props?.data?.total_event_months)
		? props.data.total_event_months.slice(0, currentMonthIndex + 1)
		: []

	const currentMonthEvents = total_event_months[total_event_months.length - 1] || 0

	const previousMonthEvents = total_event_months[total_event_months.length - 2] || 0

	const percentageIncrease = ((currentMonthEvents - previousMonthEvents) / (previousMonthEvents || 1)) * 100

	// ** Hook
	const theme = useTheme()

	const options = {
		chart: {
			parentHeightOffset: 0,
			toolbar: { show: false }
		},
		plotOptions: {
			bar: {
				borderRadius: 9,
				distributed: true,
				columnWidth: '40%',
				endingShape: 'rounded',
				startingShape: 'rounded'
			}
		},
		stroke: {
			width: 2,
			colors: [theme.palette.background.paper]
		},
		legend: { show: false },
		grid: {
			strokeDashArray: 7,
			padding: {
				top: -1,
				right: 0,
				left: -12,
				bottom: 5
			}
		},
		dataLabels: { enabled: false },
		colors: [
			theme.palette.primary.main,
			theme.palette.primary.main,
			theme.palette.primary.main,
			theme.palette.primary.main,
			theme.palette.primary.main,
			theme.palette.primary.main
		],
		states: {
			hover: {
				filter: { type: 'none' }
			},
			active: {
				filter: { type: 'none' }
			}
		},
		xaxis: {
			categories: [
				'Tháng 1',
				'Tháng 2',
				'Tháng 3',
				'Tháng 4',
				'Tháng 5',
				'Tháng 6',
				'Tháng 7',
				'Tháng 8',
				'Tháng 9',
				'Tháng 10',
				'Tháng 11',
				'Tháng 12'
			],
			tickPlacement: 'on',
			labels: { show: false },
			axisTicks: { show: false },
			axisBorder: { show: false }
		},
		yaxis: {
			show: true,
			tickAmount: 4,
			labels: {
				offsetX: 12,
				formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}`
			}
		}
	}

	return (
		<Card>
			<CardHeader
				title='Tổng quan sự kiện trong tháng'
				titleTypographyProps={{
					sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
				}}
				action={
					<IconButton
						size='small'
						aria-label='settings'
						className='card-more-options'
						sx={{ color: 'text.secondary' }}
					>
						<DotsVertical />
					</IconButton>
				}
			/>
			<CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
				<ReactApexcharts
					type='bar'
					height={205}
					options={options}
					series={[{ data: props?.data?.total_event_months }]}
				/>
				<Box sx={{ mb: 7, display: 'flex', alignItems: 'center' }}>
					<Typography variant='h5' sx={{ mr: 4 }}>
						{percentageIncrease.toFixed(2)}%
					</Typography>
					<Typography variant='body2'>
						Số lượng sự kiện của câu lạc bộ tăng {percentageIncrease.toFixed(2)}% so với tháng trước
					</Typography>
				</Box>
				<Button fullWidth variant='contained'>
					Chi tiết
				</Button>
			</CardContent>
		</Card>
	)
}

export default WeeklyOverview
