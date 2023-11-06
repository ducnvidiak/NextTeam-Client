// ** MUI Imports
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MuiFormControl from '@mui/material/FormControl'
import { Container, Stack, Tab, Typography } from '@mui/material'
import { useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import ClubList from './ClubList'
import Ranking from './Ranking'

const FormControl = styled(MuiFormControl)(({ theme }) => ({
	'& .MuiFormLabel-root.Mui-focused': {
		color: '#80BDFF'
	},
	'& .MuiInputLabel-root': {
		left: -14,
		zIndex: 0
	},
	'& > .MuiInputBase-root': {
		marginTop: theme.spacing(4),
		'&.MuiInput-root:before, &.MuiInput-root:after': {
			border: 0
		}
	},
	'& .MuiInputBase-input': {
		fontSize: 16,
		borderRadius: 4,
		position: 'relative',
		padding: '10px 26px 10px 12px',
		backgroundColor: theme.palette.background.paper,
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		border: theme.palette.mode === 'light' ? '1px solid #ced4da' : `1px solid ${theme.palette.divider}`,
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(','),
		'&:focus': {
			borderRadius: 4,
			borderColor: '#80BDFF',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,0.25)'
		}
	}
}))


function Clubs() {
	const [tab, setTab] = useState('1')
	const [semester, setSemester] = useState(0)
	const [year, setYear] = useState(0)

	const handleChangeTab = (event, newValue) => {

		setTab(newValue)
	}

	const handleChangeSemester = event => {
		setSemester(event.target.value)
	}

	const handleChangeYear = event => {
		setYear(event.target.value)
	}

	return (
		<Container maxWidth='lg' sx={{ marginTop: 20 }}>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'} marginBottom={10}>
				<Typography fontSize={32} fontWeight={600}>
					CÂU LẠC BỘ
				</Typography>
				{/* <Stack direction={'row'} gap={2}>
          <FormControl>
            <InputLabel id='controlled-select-label'>Kỳ</InputLabel>
            <Select
              value={semester}
              label='Controlled'
              id='controlled-select'
              onChange={handleChangeSemester}
              labelId='controlled-select-label'
            >
              <MenuItem value={0}>
                <em>Tất cả</em>
              </MenuItem>
              <MenuItem value={10}>Spring</MenuItem>
              <MenuItem value={20}>Summer</MenuItem>
              <MenuItem value={30}>Fall</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id='controlled-select-label'>Năm</InputLabel>
            <Select
              value={year}
              label='Controlled'
              id='controlled-select'
              onChange={handleChangeYear}
              labelId='controlled-select-label'
            >
              <MenuItem value={0}>
                <em>Tất cả</em>
              </MenuItem>
              <MenuItem value={10}>2023</MenuItem>
              <MenuItem value={20}>2022</MenuItem>
              <MenuItem value={30}>2021</MenuItem>
            </Select>
          </FormControl>
        </Stack> */}
			</Stack>
			<TabContext value={tab}>
				<TabList variant='fullWidth' onChange={handleChangeTab} aria-label='full width tabs example'>
					<Tab value='1' label='Danh sách' />
					<Tab value='2' label='Xếp hạng' />
				</TabList>
				<TabPanel value='1'>
					<ClubList></ClubList>
				</TabPanel>
				<TabPanel value='2'>
					<Ranking></Ranking>
				</TabPanel>
			</TabContext>
		</Container>
	)
}

export default Clubs
