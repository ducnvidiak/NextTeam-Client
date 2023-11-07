import {
	Badge,
	Box,
	Card,
	CardContent,
	CardMedia,
	Container,
	FormControl,
	IconButton,
	InputLabel,
	Stack,
	Tab,
	Tabs,
	Tooltip,
	Typography
} from '@mui/material'
import React, { useRef, useState } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import EventList from 'src/pages/events/EventList'
import Select from '@mui/material/Select'
import FeedbackIcon from '@mui/icons-material/Feedback'

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge']

function Events() {
	const [filter, setFilter] = useState('all')

	return (
		<Container maxWidth='lg' sx={{ marginTop: 20 }}>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'} marginBottom={10}>
				<Typography fontSize={32} fontWeight={600}>
					SỰ KIỆN
				</Typography>
				<FormControl variant='outlined' size='small'>
					<InputLabel>Bộ lọc</InputLabel>
					<Select label='filter' defaultValue='all' onChange={e => setFilter(e.target.value)}>
						<MenuItem value='all'>Tất cả</MenuItem>
						<MenuItem value='registered'>Đã Đăng ký</MenuItem>
						<MenuItem value='upcoming'>Sắp diễn ra</MenuItem>
						<MenuItem value='past'>Đã qua</MenuItem>
						<MenuItem value='feedback'>Feedback</MenuItem>
					</Select>
				</FormControl>
			</Stack>
			<EventList filter={filter}></EventList>
		</Container>
	)
}

export default Events
