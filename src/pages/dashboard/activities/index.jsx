import { useState, useEffect } from 'react'
import {
	Container,
	Box,
	Button,
	TextField,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper
} from '@mui/material'

export default function Home() {
	const [points, setPoints] = useState([
		{
			id: 1,
			name: 'Trần Văn A',
			reason: '',
			value: '+ 22 điểm'
		},
		{
			id: 2,
			name: 'Nguyễn Sỹ Đ',
			reason: '',
			value: '+ 30 điểm'
		},
		{
			id: 2,
			name: 'Nguyễn Đình Tuấn',
			reason: 'Vắng mặt (có phép)',
			value: '- 20 điểm'
		}
	])

	useEffect(() => {
		// Fetch points from API
	}, [])

	const addPoint = () => {
		// Add point
	}

	const updatePoint = id => {
		// Update point by id
	}

	const deletePoint = id => {
		// Delete point by id
	}

	return (
		<Paper maxWidth='lg' sx={{ padding: 5 }}>
			<Box sx={{ display: 'flex', height: '52px' }}>
				<TextField label='Name' sx={{ marginRight: '15px' }} />
				<TextField label='Point' sx={{ marginRight: '15px' }} />
				<TextField label='Note' sx={{ marginRight: '15px' }} />
				<Button variant='contained' onClick={addPoint}>
					Add Point
				</Button>
			</Box>

			<Table>
				<TableHead>
					<TableRow>
						<TableCell sx={{ width: '25%' }}>Name</TableCell>
						<TableCell sx={{ width: '10%' }}>Points</TableCell>
						<TableCell sx={{ width: '50%' }}>Note</TableCell>
						<TableCell align='right'>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{points.reverse().map(point => (
						<TableRow key={point.id}>
							<TableCell>{point.name}</TableCell>
							<TableCell>{point.value}</TableCell>
							<TableCell>{point.reason}</TableCell>
							<TableCell align='right'>
								<Button onClick={() => updatePoint(point.id)}>Edit</Button>
								<Button onClick={() => deletePoint(point.id)}>Delete</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	)
}
