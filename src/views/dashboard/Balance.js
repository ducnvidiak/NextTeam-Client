import React from 'react'
import { Typography, Grid } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'

// Dummy data for balanceData
const balanceData = [
	{ month: 'Jan', balance: 1000 },
	{ month: 'Feb', balance: 2000 },
	{ month: 'Mar', balance: 3000 },
	{ month: 'Apr', balance: 2500 },
	{ month: 'May', balance: 3500 },
	{ month: 'Jun', balance: 3000 },
	{ month: 'Jul', balance: 4000 },
	{ month: 'Aug', balance: 3500 },
	{ month: 'Sep', balance: 4500 },
	{ month: 'Oct', balance: 5000 },
	{ month: 'Nov', balance: 5500 },
	{ month: 'Dec', balance: 6000 }
]

const Balance = () => {
	return (
		<Grid container spacing={3}>
			{/* Monthly club balance */}
			<Grid item xs={12}>
      <Typography variant="h4" gutterBottom>
       Số dư
      </Typography>
    </Grid>
			<Grid item xs={12} md={6}>
				<LineChart width={500} height={300} data={balanceData}>
					<XAxis dataKey='month' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type='monotone' dataKey='balance' stroke='#82ca9d' />
				</LineChart>
			</Grid>
		</Grid>
	)
}

export default Balance
