// ClubActivityScore.js
import React from 'react'
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableRow } from '@mui/material'

const ClubBalance = ({ clubBalances, clubNames }) => (
	<Card>
		<CardContent>
			<Typography variant='h5'>Số dư các câu lạc bộ</Typography>
			<Table>
				<TableBody>
					{clubBalances?.map((balance, index) => (
						<TableRow key={index}>
							<TableCell component='th' scope='row'>
								{clubNames[index]}
							</TableCell>
							<TableCell align='right'>{balance}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
)

export default ClubBalance
