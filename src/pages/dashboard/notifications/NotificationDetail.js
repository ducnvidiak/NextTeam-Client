import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { Chip, Grid } from '@mui/material'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'

export default function NotificationDetail({ notificationDetail, handleClose, open }) {
	function validateContent(content) {
		// Implement your content validation logic here
		// For example, check for <script> tags or other unsafe HTML
		// Return true if content is safe, false otherwise
		return !/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i.test(content)
	}

	const statusObj = {
		private: { color: 'primary', label: 'Cá nhân' },
		public: { color: 'success', label: 'CLB' },
		wide: { color: 'warning', label: 'Chung' }
	}

	return (
		<div>
			<Dialog open={open} onClose={handleClose} scroll='paper' maxWidth='lg' fullWidth>
				<DialogTitle id='scroll-dialog-title'>
					<strong>{notificationDetail?.title}</strong>
					<div>
						<span>
							<Chip
								label={statusObj[notificationDetail?.type]?.label}
								color={statusObj[notificationDetail?.type]?.color}
								sx={{
									height: 24,
									fontSize: '0.75rem',
									textTransform: 'capitalize',
									'& .MuiChip-label': { fontWeight: 500 }
								}}
							/>
						</span>
						<span>
							<Chip
								icon={<AccessAlarmIcon />}
								label={notificationDetail?.createdAt}
								sx={{
									height: 24,
									fontSize: '0.75rem',
									textTransform: 'capitalize',
									'& .MuiChip-label': { fontWeight: 500 },
									marginLeft: 2
								}}
								color='secondary'
							/>
						</span>
					</div>
				</DialogTitle>

				<DialogContent>
					<DialogContentText>
						{true ? (
							<div dangerouslySetInnerHTML={{ __html: notificationDetail?.content }} />
						) : (
							<p>Unsafe content</p>
						)}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Đóng</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
