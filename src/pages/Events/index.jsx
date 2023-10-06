import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Container,
	FormControl,
	InputLabel,
	Stack,
	Tab,
	Tabs,
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

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge']

function Events() {
	const [open, setOpen] = useState(false)
	const [selectedIndex, setSelectedIndex] = useState(1)
	const anchorRef = useRef(null)

	const handleClick = () => {
		console.info(`You clicked ${options[selectedIndex]}`)
	}

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index)
		setOpen(false)
	}

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen)
	}

	const handleClose = event => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return
		}

		setOpen(false)
	}

	const [value, setValue] = useState('one')

	//   const handleChange = (event, newValue) => {
	//     setValue(newValue)
	//   }

	const [option, setOption] = useState(0)

	const handleChange = event => {
		setOption(event.target.value)
	}

	return (
		<Container maxWidth='lg' sx={{ marginTop: 20 }}>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'} marginBottom={10}>
				<Typography fontSize={32} fontWeight={600}>
					SỰ KIỆN
				</Typography>
				{/* <FormControl variant='outlined' size='small'>
					<InputLabel>Bộ lọc</InputLabel>
					<Select label='Status' defaultValue='active'>
						<MenuItem value='active'>Sự kiện trong tháng</MenuItem>
						<MenuItem value='inactive'>Đã Đăng ký</MenuItem>
						<MenuItem value='pending'>Sự kiện đã qua</MenuItem>
					</Select>
				</FormControl> */}
			</Stack>
			<EventList></EventList>
		</Container>
	)
}

export default Events
