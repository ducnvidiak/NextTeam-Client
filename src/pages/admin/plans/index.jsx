// import React from 'react'

// function Planning() {
//   return (
//     <div>Planning</div>
//   )
// }

// export default Planning

import React, { useState } from 'react'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'

function PlanListPage() {
	const [plans, setPlans] = useState([
		{
			id: 1,
			text: 'Bản kế hoạch 1',
			content:
				'Bản kế hoạch 1 là một kế hoạch chi tiết để cải thiện quy trình sản xuất và tăng cường hiệu suất công ty. Kế hoạch này bao gồm nâng cấp quy trình sản xuất, đào tạo nhân viên và sử dụng công nghệ tiên tiến. Mục tiêu chính của kế hoạch là cải thiện chất lượng sản phẩm, giảm thời gian sản xuất và tăng cường sự hài lòng của khách hàng.',
			files: [
				{ id: 1, name: 'tệp 1.pdf' },
				{ id: 2, name: 'tệp 2.docx' }
			],
			status: 'pending'
		},
		{
			id: 2,
			text: 'Bản kế hoạch 2',
			content:
				'Bản kế hoạch 2 là một kế hoạch chi tiết để mở rộng hoạt động kinh doanh vào các thị trường mới. Kế hoạch này đề xuất một chiến lược tiếp cận thị trường tỉ mỉ, bao gồm nghiên cứu thị trường, phân tích đối thủ cạnh tranh và xác định mục tiêu khách hàng tiềm năng. Mục tiêu của kế hoạch là tăng cường nhận diện thương hiệu và thu hút khách hàng mới.',
			files: [
				{ id: 3, name: 'tệp 3.jpg' },
				{ id: 4, name: 'tệp 4.xlsx' }
			],
			status: 'pending'
		}
	])

	const handleUpdatePlan = (plan, status) => {
		// Xử lý logic cập nhật trạng thái kế hoạch
		const updatedPlans = plans.map(p => {
			if (p.id === plan.id) {
				return { ...p, status }
			}

			return p
		})
		setPlans(updatedPlans)
	}

	return (
		<div>
			{plans.map(plan => (
				<Card key={plan.id} variant='outlined' style={{ marginBottom: '16px' }}>
					<CardContent>
						<Typography variant='h6'>{plan.text}</Typography>
						<Typography variant='body1' style={{ marginTop: '8px', marginBottom: '16px' }}>
							{plan.content}
						</Typography>
						<Typography variant='subtitle1'>Các tệp tin đính kèm:</Typography>
						<ul>
							{plan.files.map(file => (
								<li key={file.id}>{file.name}</li>
							))}
						</ul>
					</CardContent>
					<CardActions>
						{plan.status === 'pending' && (
							<>
								<Button variant='contained' onClick={() => handleUpdatePlan(plan, 'accepted')}>
									Chấp nhận
								</Button>
								<Button variant='outlined' onClick={() => handleUpdatePlan(plan, 'rejected')}>
									Từ chối
								</Button>
							</>
						)}
						{plan.status === 'accepted' && (
							<Typography variant='body2' color='textSecondary'>
								Đã chấp nhận
							</Typography>
						)}
						{plan.status === 'rejected' && (
							<Typography variant='body2' color='textSecondary'>
								Đã từ chối
							</Typography>
						)}
					</CardActions>
				</Card>
			))}
		</div>
	)
}

export default PlanListPage
