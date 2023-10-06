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

export default function ViewInfo({ applicationDetail, handleClose, open, statusObj }) {
	return (
		<div>
			<Dialog open={open} onClose={handleClose} scroll='paper' maxWidth='lg' fullWidth>
				<DialogTitle id='scroll-dialog-title'>
					<strong>
						Thông tin đơn tham gia của {applicationDetail?.user?.firstname}{' '}
						{applicationDetail?.user?.lastname}
					</strong>
				</DialogTitle>

				<DialogContent>
					<DialogContentText></DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Đóng</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
