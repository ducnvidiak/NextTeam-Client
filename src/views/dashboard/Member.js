import React from 'react'
import { Typography, Grid } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const Member = props => {
	// code to prepare data
	const currentDate = new Date()
	const currentMonthIndex = currentDate.getMonth()
    const total_enga_months = Array.isArray(props?.data?.total_enga_months) ? props.data.total_enga_months.slice(0, currentMonthIndex + 1) : [];
const months = ['Th 1', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'Th 8', 'Th 9', 'Th 10', 'Th 11', 'Th 12'].slice(0, currentMonthIndex);

let membersData = months.map((month, index) => {
    return { month: month, so_thanh_vien: total_enga_months[index] || 0 };
});

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Typography variant='h4' gutterBottom>
					Biểu đồ số lượng thành viên mỗi tháng
				</Typography>
			</Grid>

			<Grid item xs={12} md={6}>
				<BarChart width={500} height={300} data={membersData}>
					<XAxis dataKey='month' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey='so_thanh_vien' fill='#8884d8' />
				</BarChart>
			</Grid>
		</Grid>
	)
}

export default Member
