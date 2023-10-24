import React from 'react'
import { Typography, Box, Container, Avatar } from '@mui/material'

const FacultyAdvisor = () => {
	const advisor = {
		name: 'Professor Doe',
		title: 'Faculty Advisor',
		image: 'url-to-the-advisor-image'
	}

	return (
		<Container sx={{ mt: 4 }}>
			<Typography variant='h4' gutterBottom>
				Faculty Advisor
			</Typography>
			<Box
				sx={{
					bgcolor: 'background.paper',
					boxShadow: 1,
					p: 2,
					borderRadius: 1,
					display: 'flex',
					alignItems: 'center'
				}}
			>
				<Avatar src={advisor.image} alt={advisor.name} sx={{ width: 60, height: 60, mr: 2 }} />
				<Box>
					<Typography variant='h6'>{advisor.name}</Typography>
					<Typography variant='subtitle1'>{advisor.title}</Typography>
				</Box>
			</Box>
		</Container>
	)
}

export default FacultyAdvisor
