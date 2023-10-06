import React from 'react'
import { useState } from 'react'
import {
	Paper,
	Typography,
	Box,
	Button,
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	styled
} from '@mui/material'
import AdminLayout from 'src/@core/layouts/AdminLayout'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const members = [
	{ id: 1, name: 'John Doe' },
	{ id: 2, name: 'Jane Smith' },
	{ id: 3, name: 'Bob Williams' }
]

const OutlinedButton = styled(Button)(({ theme }) => ({
	backgroundColor: 'white',
	color: theme.palette.primary.main,
	border: '1px solid ' + theme.palette.primary.main,
	marginRight: '15px'
}))

function Treasurer() {
	const [checked, setChecked] = useState({})

	const handleCheck = id => {
		setChecked({
			...checked,
			[id]: !checked[id]
		})
	}

	return (
		<div>
			<Paper sx={{ p: 2, mb: 2 }}>
				<Typography variant='h5'>Điểm danh</Typography>

				<Box sx={{ mt: 2 }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Tên</TableCell>
								<TableCell align='right'>Điểm danh</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{members.map(member => (
								<TableRow key={member.id}>
									<TableCell>{member.name}</TableCell>
									<TableCell align='right'>
										<Checkbox
											checked={checked[member.id] || false}
											onChange={() => handleCheck(member.id)}
										/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						mt: 2,
						width: 'justifyContent'
					}}
				>
					<OutlinedButton variant='contained'>Tạo mã</OutlinedButton>
					<OutlinedButton variant='contained'>Tạo mã QR</OutlinedButton>
					<Button variant='contained'>Xác nhận</Button>
				</Box>
			</Paper>
		</div>
	)
}

export default Treasurer
