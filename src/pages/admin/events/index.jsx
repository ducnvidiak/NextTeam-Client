import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import classes from './styles.module.scss'

import Button from '@mui/material/Button'

function createData(name, calories, fat, carbs, files) {
	return { name, calories, fat, carbs, files }
}

const rows = [
	createData(
		'Dever',
		'Đêm nhạc đa dạng',
		'Một buổi biểu diễn âm nhạc đa dạng với sự tham gia của các ban nhạc và nghệ sĩ trẻ, từ pop, rock, jazz đến EDM và hip-hop. Mục tiêu là mang đến cho khán giả một đêm nhạc tràn đầy sôi động và đa phong cách.',
		'Thời gian: 15/10/2023, từ 18:00 đến 22:00 Địa điểm: Nhà hát Thành phố',
		'plan.docx'
	),
	createData(
		'Gdsc',
		'Triển lãm nghệ thuật đương đại',
		'Triển lãm nghệ thuật đương đại với sự tham gia của các nghệ sĩ trẻ, bao gồm hội họa, điêu khắc, ảnh nghệ thuật và nhiều hình thức khác. Sự kiện nhằm thúc đẩy sự sáng tạo và truyền cảm hứng cho các tác phẩm nghệ thuật mới.',
		'Thời gian: 25/11/2023, từ 10:00 đến 18:00 Địa điểm: Trung tâm Nghệ thuật và Văn hóa',
		'chi tiết.docx'
	),
	createData(
		'Fve',
		'Ngày hội thể thao',
		'Một ngày hội thể thao vui vẻ và năng động với các hoạt động như bóng đá, bóng chuyền, cầu lông, và các trò chơi thể thao độc đáo khác. Sự kiện nhằm khích lệ sự tham gia và rèn luyện sức khỏe cho các thành viên trong một môi trường thân thiện và hào hứng.',
		'Thời gian: 30/09/2023, từ 14:00 đến 18:00 Địa điểm: Sân vận động thành phố',
		'hình ảnh.png'
	),
	createData(
		'Sner',
		'Hội thảo công nghệ mới',
		'Một hội thảo thú vị về công nghệ mới nhất, bao gồm trình diễn và thảo luận về trí tuệ nhân tạo, blockchain, thực tế ảo, và các xu hướng công nghệ tiên tiến khác. Sự kiện nhằm tạo cơ hội cho các thành viên tìm hiểu và chia sẻ kiến thức về những phát triển công nghệ đang diễn ra.',
		'Thời gian: 12/10/2023, từ 09:00 đến 16:00 Địa điểm: Trung tâm Hội nghị và Triển lãm',
		'thông tin.docx'
	),
	createData(
		'Kever',
		'Ngày dọn dẹp môi trường',
		'Một ngày dành cho hoạt động dọn dẹp môi trường, bao gồm thu gom rác, trồng cây và xây dựng các hoạt động bảo vệ thiên nhiên. Sự kiện nhằm tạo ý thức về bảo vệ môi trường và khuyến khích sự tham gia tích cực của các thành viên để xây dựng một môi trường xanh và sạch hơn.',
		'Thời gian: 05/11/2023, từ 08:00 đến 12:00 Địa điểm: Công viên thành phố',
		'kế hoạch.png'
	)
]

export default function EventDashboard() {
	return (
		<TableContainer component={Paper}>
			<h1 className={classes.ml_2}>Phệ duyệt sự kiện</h1>
			<Table sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Câu lạc bộ</TableCell>
						<TableCell align='left'>Sự kiện</TableCell>
						<TableCell align='left'>Nội dung</TableCell>
						<TableCell align='center'>Files đính kèm</TableCell>
						<TableCell align='center'>Thời gian/ Địa điểm</TableCell>
						<TableCell align='center'>Hành động</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map(row => (
						<TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell component='th' scope='row'>
								{row.name}
							</TableCell>
							<TableCell align='left'>{row.calories}</TableCell>
							<TableCell align='left'>{row.fat}</TableCell>
							<TableCell align='center' sx={{ width: '150px' }}>
								<div className={classes.filebox}>{row.files}</div>
							</TableCell>
							<TableCell align='left' sx={{ width: '150px' }}>
								{row.carbs}
							</TableCell>
							<TableCell
								align='center'
								sx={{
									width: '300px',
									gap: '20px'
								}}
							>
								<Button variant='contained' sx={{ marginRight: '20px' }}>
									Chấp nhận
								</Button>
								<Button variant='outlined'>Từ chối</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
