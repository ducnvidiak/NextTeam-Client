import React from 'react'
import { Typography, Box, Container, List, ListItem, ListItemText } from '@mui/material'

const Meetings = () => {
	const meetings = [
		{ title: 'General Meeting', date: 'Nov 1, 2023' },
		{ title: 'Workshop: Introduction to R', date: 'Nov 8, 2023' },
		{ title: 'Guest Lecture: Data Science in Healthcare', date: 'Nov 15, 2023' },
		{ title: 'End of Year Party', date: 'Dec 6, 2023' }
	]

	return (
		<Container sx={{ mt: 4 }}>
			<Typography variant='h4' gutterBottom>
				Weekly/Monthly Meetings
			</Typography>
			<Box
				sx={{
					bgcolor: 'background.paper',
					boxShadow: 1,
					p: 2,
					borderRadius: 1
				}}
			>
				<List>
					{meetings.map((meeting, index) => (
						<ListItem key={index}>
							<ListItemText primary={meeting.title} secondary={meeting.date} />
						</ListItem>
					))}
				</List>
			</Box>
		</Container>
	)
}

export default Meetings
