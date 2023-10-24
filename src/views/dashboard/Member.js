import React from 'react'
import { Typography, Grid } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const Member = props => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();

    const total_enga_months = Array.isArray(props?.data?.total_enga_months) ? props.data.total_enga_months.slice(0, currentMonthIndex + 1) : [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].slice(0, currentMonthIndex + 1);

    let membersData = months.map((month, index) => {
        return { month: month, members: total_enga_months[index] || 0 };
    });

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant='h4' gutterBottom>
                    Số thành viên trong năm
                </Typography>
            </Grid>

            {/* Total number of club members per month */}
            <Grid item xs={12} md={6}>
                <LineChart width={500} height={300} data={membersData}>
                    <XAxis dataKey='month' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type='monotone' dataKey='members' stroke='#8884d8' />
                </LineChart>
            </Grid>
        </Grid>
    );
};

export default Member;