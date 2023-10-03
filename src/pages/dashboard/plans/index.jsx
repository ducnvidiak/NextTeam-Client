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
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
			files: [
				{ id: 1, name: 'tệp 1.pdf' },
				{ id: 2, name: 'tệp 2.docx' }
			]
		},
		{
			id: 2,
			text: 'Bản kế hoạch 2',
			content:
				'Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.',
			files: [
				{ id: 3, name: 'tệp 3.jpg' },
				{ id: 4, name: 'tệp 4.xlsx' }
			]
		}
	])

	const handleUpdatePlan = plan => {
		// Xử lý logic cập nhật bản kế hoạch tại đây
		console.log('Cập nhật bản kế hoạch:', plan)
	}

	const handleDeletePlan = plan => {
		// Xử lý logic xóa bản kế hoạch tại đây
		console.log('Xóa bản kế hoạch:', plan)
		setPlans(prevPlans => prevPlans.filter(p => p.id !== plan.id))
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
						<Button onClick={() => handleUpdatePlan(plan)}>Cập nhật</Button>
						<Button onClick={() => handleDeletePlan(plan)}>Xóa</Button>
					</CardActions>
				</Card>
			))}
		</div>
	)
}

export default PlanListPage
