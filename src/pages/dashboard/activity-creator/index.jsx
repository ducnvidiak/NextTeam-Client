import {
	Autocomplete,
	Avatar,
	Backdrop,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Fade,
	IconButton,
	LinearProgress,
	Link,
	Modal,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
	useAutocomplete
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'
import { useCookies } from 'react-cookie'
import { postAPI } from 'src/utils/request'
import { getUserInfo } from 'src/utils/info'
import { useContext } from 'react'
import '@mui/icons-material/'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material/'

const data = [
	{
		progress: 80,
		imgHeight: 20,
		title: 'Hoạt động 1',
		color: 'primary',
		amount: '+ 22 điểm',
		subtitle: 'Hoạt động 1',
		imgSrc: '/images/cards/logo-bitbank.png'
	},
	{
		progress: 90,
		color: 'info',
		imgHeight: 27,
		title: 'Hoạt động 2',
		amount: '+ 37 điểm',
		subtitle: 'Hoạt động 2',
		imgSrc: '/images/cards/logo-bitbank.png'
	},
	{
		progress: 10,
		imgHeight: 20,
		title: 'Hoạt động 3',
		color: 'error',
		amount: '- 30 điểm',
		subtitle: 'Vắng mặt',
		imgSrc: '/images/cards/logo-aviato.png'
	}
]

const TableHeaderCell = styled(TableCell)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: 'white'
}))

const TableBodyRow = styled(TableRow)(({}) => ({
	['&:hover td']: {
		backgroundColor: '#FFA50019'
	}
}))

const TableBodyCell = styled(TableCell)(({ theme }) => ({}))

const StyledLink = styled(Link)(({ theme }) => ({
	color: theme.palette.primary.main,
	textDecoration: 'none',
	padding: '5px',
	marginLeft: 5,
	marginRight: 5,
	cursor: 'pointer',
	textTransform: 'uppercase',
	fontWeight: '500',
	['&:hover']: {
		textDecoration: 'underline'
	}
}))

const style = {
	width: 500,
	p: 4,
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	borderRadius: 3,
	boxShadow: 24,
	zIndex: 100,
	backgroundColor: 'white'
}

const arrowStyle = {
	borderRadius: '50%'
}

const AddFunctionContext = React.createContext({})

const AddingForm = () => {
	const [values, setValues] = React.useState({})
	const [memberOption, setMemberOption] = React.useState([])
	const loading = memberOption.length === 0
	const passedValue = useContext(AddFunctionContext)
	const cookies = passedValue.cookies

	React.useEffect(() => {
		;(async () => {
			const data = await postAPI('/info-utils', {
				cmd: 'club.users',
				data: cookies.clubData.clubId
			})
			setMemberOption(data)
		})()
	}, [cookies])

	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value })
	}

	return (
		<Box autoComplete='off' component='form' sx={{ mt: 5 }} onSubmit={passedValue.handleSubmitAdd(values)}>
			<Autocomplete
				multiple
				limitTags={2}
				id='multiple-limit-tags'
				options={memberOption}
				getOptionLabel={option => `${option.username}`}
				renderOption={(props, option) => <li {...props}>{`${option.username} - ${option.label}`}</li>}
				renderInput={params => <TextField {...params} label='Tên' placeholder='nhập tên...' />}
				disableClearable
				// getOptionDisabled={option => option.isManager == 1}
				sx={{ marginBottom: 6 }}
				onChange={(event, value) => handleChange('name')({ target: { value } })}
				loading={loading}
			/>
			<TextField
				fullWidth
				id='point'
				type='number'
				label='Điểm thêm'
				name='point'
				onChange={handleChange('point')}
				value={values.point ?? ''}
				sx={{ marginBottom: 6 }}
			/>
			<TextField
				fullWidth
				id='note'
				label='Ghi chú'
				name='note'
				onChange={handleChange('note')}
				value={values.note ?? ''}
				sx={{ marginBottom: 6 }}
			/>
			<Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7, P: 7 }} type='submit'>
				THÊM
			</Button>
		</Box>
	)
}

const EditForm = ({ data }) => {
	console.log(data)
	const [values, setValues] = React.useState({ point: data.amount, note: data.reason })
	const [memberOption, setMemberOption] = React.useState([])
	const loading = memberOption.length === 0
	const passedValue = useContext(AddFunctionContext)
	const cookies = passedValue.cookies

	React.useEffect(() => {
		;(async () => {
			const data = await postAPI('/info-utils', {
				cmd: 'club.users',
				data: cookies.clubData.clubId
			})
			setMemberOption(data.filter(value => value.id == data.receivedBy))
		})()
	}, [cookies, data])

	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value })
	}

	return (
		<Box autoComplete='off' component='form' sx={{ mt: 5 }} onSubmit={passedValue.handleSubmitAdd(values)}>
			<TextField id='id' name='id' type='hidden' value={data.id} />
			<TextField
				fullWidth
				id='name'
				label='Tên'
				name='name'
				value={data.receivedByName}
				sx={{ marginBottom: 6 }}
				disabled
			/>
			<TextField
				fullWidth
				id='point'
				type='number'
				label='Điểm thêm'
				name='point'
				onChange={handleChange('point')}
				value={values.point ?? ''}
				sx={{ marginBottom: 6 }}
			/>
			<TextField
				fullWidth
				id='note'
				label='Ghi chú'
				name='note'
				onChange={handleChange('note')}
				value={values.note ?? ''}
				sx={{ marginBottom: 6 }}
			/>
			<Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7, P: 7 }} type='submit'>
				SỬA
			</Button>
		</Box>
	)
}

function ActivityCreator() {
	const [open, setOpen] = React.useState(false)
	const [pointsHistories, setPointsHistories] = React.useState([])
	const [cookies] = useCookies(['userData', 'clubData'])
	const [userData, setUserData] = React.useState()
	React.useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	const theme = useTheme()

	const renderTable = async data => {
		const res = await postAPI('activity', {
			cmd: 'view',
			clubId: data.clubId
		})
		console.log(res)
		if (res.code == 0) {
			setPointsHistories(res.result)
		}
	}

	React.useEffect(() => (async () => renderTable(cookies['clubData']))(), [cookies])

	const handleSubmitAdd = values => async event => {
		event.preventDefault()

		const data = await postAPI('activity', {
			...values,
			cmd: 'add',
			name: JSON.stringify(values.name),
			sendBy: userData.id,
			clubId: cookies.clubData.clubId
		})
		if (data.res == 0) {
			setOpen(false)
			renderTable(cookies['clubData'])
		}
	}

	const passValue = {
		handleSubmitAdd,
		cookies
	}

	return (
		<div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open}
				onClose={() => setOpen(false)}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Typography
							id='transition-modal-title'
							variant='h4'
							component='h1'
							color={theme.palette.primary.main}
						>
							{open.cmd == 'add' && 'Thêm điểm HĐ'}
							{open.cmd == 'edit' && 'Sửa điểm HĐ'}
						</Typography>
						<AddFunctionContext.Provider value={passValue}>
							{open.cmd == 'add' && <AddingForm />}
							{open.cmd == 'edit' && <EditForm data={open.id} />}
						</AddFunctionContext.Provider>
					</Box>
				</Fade>
			</Modal>
			<Card>
				<CardHeader
					title='Điểm hoạt động'
					titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
					action={
						<Button variant='contained' onClick={() => setOpen({ cmd: 'add' })}>
							Thêm
						</Button>
					}
				/>
				<CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
					<Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
						<TableContainer sx={{ borderRadius: 1, maxHeight: '75vh' }}>
							<Table stickyHeader aria-label='sticky table'>
								<TableHead>
									<TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
										<TableHeaderCell></TableHeaderCell>
										<TableHeaderCell>Người tạo</TableHeaderCell>
										<TableHeaderCell>Người nhận</TableHeaderCell>
										<TableHeaderCell>Điểm</TableHeaderCell>
										<TableHeaderCell>Ghi chú</TableHeaderCell>
										<TableHeaderCell sx={{ textAlign: 'center' }}>Hành động</TableHeaderCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{[...pointsHistories].reverse().map((value, index) => (
										<TableBodyRow key={value.id}>
											<TableBodyCell>
												{value.amount < 0 ? (
													<ArrowDropDown
														sx={{ color: 'red', backgroundColor: '#f003', ...arrowStyle }}
													/>
												) : (
													<ArrowDropUp
														sx={{ color: 'green', backgroundColor: '#0f03', ...arrowStyle }}
													/>
												)}
											</TableBodyCell>
											<TableBodyCell>{value.createdBy}</TableBodyCell>
											<TableBodyCell>{value.receivedByName}</TableBodyCell>
											<TableBodyCell sx={{ textAlign: 'right' }}>
												{(value.amount < 0
													? `- ${Math.abs(value.amount)}`
													: `+ ${value.amount}`) + ' điểm'}
											</TableBodyCell>
											<TableBodyCell>{value.reason}</TableBodyCell>
											<TableBodyCell sx={{ textAlign: 'center' }}>
												<StyledLink
													href='#'
													onClick={() => setOpen({ cmd: 'edit', id: value })}
												>
													Sửa
												</StyledLink>
												<StyledLink href='#' onClick={() => setOpen({ cmd: 'del', id: value })}>
													Xóa
												</StyledLink>
											</TableBodyCell>
										</TableBodyRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</CardContent>
			</Card>
		</div>
	)
}

export default ActivityCreator
