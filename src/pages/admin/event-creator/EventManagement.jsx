import {
	AppBar,
	Button,
	Dialog,
	DialogActions,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Tab,
	Toolbar,
	Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { TabContext, TabList, TabPanel } from '@mui/lab'

import React, { useState } from 'react'
import ClubList from 'src/pages/clubs/ClubList'
import Ranking from 'src/pages/clubs/Ranking'
import EventOverView from './EventOverView'
import RegisteredTable from './RegisteredTable'
import FeedbackTable from './FeedbackTable'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

function EventManagement({ openEventManagememntModal, setOpenEventManagememntModal, event, setEventList }) {
	const [tab, setTab] = useState('1')

	const handleChangeTab = (event, newValue) => {
		setTab(newValue)
	}

	return (
		<Dialog
			fullScreen
			open={openEventManagememntModal}
			onClose={() => setOpenEventManagememntModal(false)}
			TransitionComponent={Transition}
		>
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					<IconButton
						edge='start'
						color='inherit'
						onClick={() => setOpenEventManagememntModal(false)}
						aria-label='close'
					>
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div' color={'#fff'}>
						{event?.name}
					</Typography>
				</Toolbar>
			</AppBar>
			<TabContext value={tab}>
				<TabList variant='fullWidth' onChange={handleChangeTab} aria-label='full width tabs example'>
					<Tab value='1' label='Tổng quan' />
					<Tab value='2' label='Danh sách đăng ký' />
					<Tab value='3' label='Feedback sự kiện' />
				</TabList>
				<TabPanel value='1'>
					<EventOverView
						event={event}
						setEventList={setEventList}
						setOpenEventManagememntModal={setOpenEventManagememntModal}
					></EventOverView>
				</TabPanel>
				<TabPanel value='2'>
					<RegisteredTable event={event}></RegisteredTable>
				</TabPanel>
				<TabPanel value='3'>
					<FeedbackTable event={event}></FeedbackTable>
				</TabPanel>
			</TabContext>
		</Dialog>
	)
}

export default EventManagement
