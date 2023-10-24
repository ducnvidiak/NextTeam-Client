// ClubActivityScore.js
import React from 'react'
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableRow } from '@mui/material'

const ClubActivityScore = ({ clubScores,clubNames }) => (
	<Card>
		<CardContent>
			<Typography variant='h5'>Điểm hoạt động câu lạc bộ</Typography>
			<Table>
				<TableBody>
					{clubScores?.map((score, index) => (
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

export default ClubActivityScore
