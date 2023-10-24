import React from 'react'
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableRow } from '@mui/material'

const ReportCount = ({ clubPlans,clubNames }) => (
	<Card>
		<CardContent>
			<Typography variant='h5'>Số báo cáo câu lạc bộ</Typography>
			<Table>
				<TableBody>
					{clubPlans?.map((score, index) => (
						<TableRow key={index}>
							<TableCell component='th' scope='row'>
							{clubNames[index]}
							</TableCell>
							<TableCell align='right'>{score}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
)

export default ReportCount
