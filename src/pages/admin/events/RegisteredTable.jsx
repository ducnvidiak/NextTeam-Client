import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const createData = (index, name, studentCode, email, phone, time) => {
	return { index, name, studentCode, email, phone, time }
}

function RegisteredTable() {
	const rows = [
		createData('1', 'Trần Văn Bảo Thắng', 'DE170145', 'thangtvb.dev@gmail.com', '0828828497', '22/07/2023'),
		createData('2', 'Phan Gia Bảo', 'DE170126', 'bao.dev@gmail.com', '0876309021', '23/07/2023'),
		createData('3', 'Nguyễn Đình Tuấn', 'DE170137', 'tuannd.dev@gmail.com', '0811289085', '21/07/2023')
	]

	return (
		<Container maxWidth={'lg'} sx={{ padding: '0 60px !important' }}>
			<TableContainer component={Paper} sx={{ marginX: 'auto' }}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell align='center' width={'120px'}>
								STT
							</TableCell>
							<TableCell align='center'>Họ và tên</TableCell>
							<TableCell align='center'>MSSV</TableCell>
							<TableCell align='center' width={'150px'}>
								Email
							</TableCell>
							<TableCell align='center'>Số điện thoại</TableCell>
							<TableCell align='center'>Thời gian</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, index) => (
							<TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell align='center'>{row.index}</TableCell>
								<TableCell align='left'>{row.name}</TableCell>
								<TableCell align='center'>{row.studentCode}</TableCell>
								<TableCell align='left'>{row.email}</TableCell>
								<TableCell align='center'>{row.phone}</TableCell>
								<TableCell align='center'>{row.time}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	)
}

export default RegisteredTable
