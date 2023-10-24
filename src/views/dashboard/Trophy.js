import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import PeopleIcon from '@mui/icons-material/People' // import icon
import BlockIcon from '@mui/icons-material/Block' // import icon
import ExitToAppIcon from '@mui/icons-material/ExitToApp' // import icon
import { PieChart, Pie, Cell } from 'recharts'
import { Box } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group';

const COLORS = ['#f27123', '#61a330', '#2b2827']

const Trophy = props => {
	const total_mem_active = props?.data?.total_mem - props?.data?.total_mem_out-props?.data?.total_mem_ban;

	const data = [
		{ name: 'Đang hoạt động', value: total_mem_active},
		{ name: 'Đã rời đi', value: props?.data?.total_mem_out },
		{ name: 'Bị cấm', value: props?.data?.total_mem_ban }
	]
	const act = (total_mem_active * 100) / props?.data?.total_mem
	const out = (props?.data?.total_mem_out * 100) / props?.data?.total_mem
	const ban = (props?.data?.total_mem_ban * 100) / props?.data?.total_mem

	const handleButtonClick = () => {
		window.location.href = '/dashboard/members'
	}

	// ** Hook
	return (
		<Card sx={{ position: 'relative' }}>
			<CardContent>
			<Typography variant='h6'>
  <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
    <GroupIcon color='action' />
    <Box sx={{ ml: 1 }}>Thành viên</Box>
  </Box>
</Typography>
				<Typography variant='h6'>{props?.data?.total_mem}</Typography>
				<Grid container space={5} sx={{ marginTop: 5, marginBottom: 5 }}>
					<Grid item xs={12} md={6}>
						<Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
							<Box component='span' sx={{ display: 'inline-flex', alignItems: 'center' }}>
								<PeopleIcon color='action' />
								<Box sx={{ ml: 1 }}>{act}% thành viên đang hoạt động</Box>
							</Box>
						</Typography>
						<Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
							<Box component='span' sx={{ display: 'inline-flex', alignItems: 'center' }}>
								<BlockIcon color='action' />
								<Box sx={{ ml: 1 }}>{ban}% thành viên đang bị cấm</Box>
							</Box>
						</Typography>
						<Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
							<Box component='span' sx={{ display: 'inline-flex', alignItems: 'center' }}>
								<ExitToAppIcon color='action' />
								<Box sx={{ ml: 1 }}>{out}% thành viên rời khỏi câu lạc bộ</Box>
							</Box>
						</Typography>
					</Grid>
					<Grid item xs={12} md={6}>
						<PieChart width={100} height={100}>
							<Pie
								data={data}
								dataKey='value'
								nameKey='name'
								cx='50%'
								cy='50%'
								outerRadius={50}
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

export default Trophy
