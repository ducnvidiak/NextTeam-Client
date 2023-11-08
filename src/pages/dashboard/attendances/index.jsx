import React, { useRef } from 'react'
import { useState } from 'react'
import {
	Paper,
	Typography,
	Box,
	Button,
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	styled,
	Card,
	CardHeader,
	CardContent,
	TextField,
	Autocomplete,
	TableContainer,
	Link,
	useTheme,
	Modal,
	Fade,
	Backdrop
} from '@mui/material'
import AdminLayout from 'src/@core/layouts/AdminLayout'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useCookies } from 'react-cookie'
import { postAPI } from 'src/utils/request'
import { reformatTimestamp, spaceTimestamp } from 'src/utils/timestamp'
import { useReducer } from 'react'
import { useEffect } from 'react'

// import { createQrCode } from 'src/utils/qr'

const members = [
	{ id: 1, name: 'John Doe' },
	{ id: 2, name: 'Jane Smith' },
	{ id: 3, name: 'Bob Williams' }
]

const TableHeaderCell = styled(TableCell)(({ theme }) => ({
	borderBottom: `1px solid ${theme.palette.primary.main}`,
	color: theme.palette.primary.main
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

const StyledButton = styled(Button)(() => ({
	marginLeft: 10
}))

const style = {
	width: '50%',
	maxHeight: '80%',
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

function convertJsonToArray(jsonObj) {
	const result = []

	for (const key in jsonObj) {
		if (jsonObj.hasOwnProperty(key)) {
			const item = jsonObj[key]
			result.push({
				id: parseInt(key),
				note: item.note ?? '',
				atten: item.atten
			})
		}
	}

	return result
}

function Attendance({ eid, cmd, setOpen }) {
	const [registratorList, setRegistratorList] = useState([])
	const [attendanceData, setAttendanceData] = useState({})

	useEffect(() => {
		if (eid)
			(async () => {
				const data = await postAPI('/info-utils', {
					cmd: 'club.events.attendances',
					data: eid
				})
				setRegistratorList(data.result)
			})()
	}, [eid])

	useEffect(() => {
		var attenData = {}
		registratorList.map(val => {
			attenData = { ...attenData, [val.id]: { note: val.reasonForAbsence, atten: val.isJoined == 'true' } }
		})
		setAttendanceData(attenData)
	}, [registratorList])

	const handleChange = evid => event => {
		event.preventDefault()
		setAttendanceData({ ...attendanceData, [evid]: { ...attendanceData[evid], note: event.target.value } })
	}

	const handleCheck = evid => event => {
		event.preventDefault()
		setAttendanceData({ ...attendanceData, [evid]: { ...attendanceData[evid], atten: event.target.checked } })
	}

	const handleConfirm = async () => {
		const res = await postAPI('attendance', {
			cmd: 'set',
			data: JSON.stringify(convertJsonToArray(attendanceData))
		})
		if (res.res == '0') setOpen['setOpen'](false)
	}

	const handleCreate = cmd => event => {
		event.preventDefault()
		setOpen['setOpen2']({ cmd, data: eid })
	}

	return (
		<Box>
			<Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}></Box>
			<TableContainer>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							<TableCell>Tên</TableCell>
							<TableCell>MSSV</TableCell>
							<TableCell>Ghi chú</TableCell>
							<TableCell align='center'>Điểm danh</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{registratorList.map((val, index) => (
							<TableBodyRow key={index}>
								<TableBodyCell sx={{ width: 250 }}>{val.registeredBy}</TableBodyCell>
								<TableBodyCell sx={{ width: 50 }}>{val.registeredById}</TableBodyCell>
								<TableBodyCell>
									<TextField
										sx={{ width: '100%' }}
										onChange={handleChange(val.id)}
										value={attendanceData[val.id]?.note ?? val.reasonForAbsence ?? ''}
									/>
								</TableBodyCell>
								<TableBodyCell sx={{ width: 110, textAlign: 'center' }}>
									<Checkbox
										onChange={handleCheck(val.id)}
										checked={attendanceData[val.id]?.atten ?? val.isJoined == 'true'}
									/>
								</TableBodyCell>
							</TableBodyRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					mt: 2,
					width: 'justifyContent'
				}}
			>
				{cmd == 'take' && (
					<>
						<StyledButton variant='outlined' onClick={handleCreate('qr')}>
							Tạo mã QR
						</StyledButton>
					</>
				)}
				<StyledButton variant='contained' onClick={handleConfirm}>
					Xác nhận
				</StyledButton>
			</Box>
		</Box>
	)
}

function AttendanceCode({ open }) {
	const ref = useRef()

	var [qrCode, setQrCode] = useState()

	// useEffect(() => {
	// 	setQrCode(createQrCode())
	// }, [])

	// useEffect(() => {
	// 	qrCode.append(ref.current)
	// }, [qrCode])

	// useEffect(() => {
	// 	qrCode.update({
	// 		data: 'https://next-team-client.vercel.app/'
	// 	})
	// }, [qrCode])

	if (open.cmd == 'qr')
		return (
			<Box variant='div' ref={ref}>
				<iframe
					src={`${process.env.NEXT_PUBLIC_API_URL}/qr_code.jsp?code=${open.data}`}
					title='W3Schools Free Online Web Tutorials'
					scrolling='no'
					style={{ border: 'none', backgroundColor: 'white', width: 300, height: 300 }}
				></iframe>
			</Box>
		)
	if (open.cmd == 'code') return <Box></Box>

	return <></>
}

function Attendances() {
	const [open, setOpen] = React.useState(false)
	const [open2, setOpen2] = React.useState(false)
	const [eventList, setEventList] = useState([])
	const [cookies] = useCookies(['userData', 'clubData'])

	const theme = useTheme()

	React.useEffect(() => {
		;(async () => {
			const data = await postAPI('/info-utils', {
				cmd: 'club.events',
				data: cookies.clubData.clubId
			})
			setEventList(data.result)
		})()
	}, [cookies])
	console.log(eventList)

	const openModal = (cmd, value) => event => {
		event.preventDefault()
		setOpen({ cmd, id: value })
	}

	return (
		<Box>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open != false}
				onClose={() => setOpen(false)}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
			>
				<Fade in={open != false}>
					<Box sx={style}>
						<Typography
							id='transition-modal-title'
							variant='h4'
							component='h1'
							color={theme.palette.primary.main}
						>
							Điểm danh
						</Typography>
						<Box>
							<Attendance eid={open.id} cmd={open.cmd} setOpen={{ setOpen, setOpen2 }} />
						</Box>
					</Box>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open2 != false}
				onClose={() => setOpen2(false)}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				style={{ backgroundColor: '#00000099', backdropFilter: 'blur(20px)' }}
			>
				<Fade in={open2 != false}>
					<Box sx={{ ...style, width: 'fit-content', height: 'fit-content', minWidth: 50, minHeight: 50 }}>
						<AttendanceCode open={open2} />
					</Box>
				</Fade>
			</Modal>
			<Card>
				<CardHeader title='Điểm danh' titleTypographyProps={{ sx: { letterSpacing: '0.15px !important' } }} />

				<CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
					<Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
						<TableContainer sx={{ borderRadius: 1, maxHeight: '75vh' }}>
							<Table stickyHeader aria-label='sticky table'>
								<TableHead>
									<TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
										<TableHeaderCell>Tên sự kiện</TableHeaderCell>
										<TableHeaderCell sx={{ textAlign: 'right' }}>Thời gian</TableHeaderCell>

										<TableHeaderCell sx={{ textAlign: 'center' }}>Hành động</TableHeaderCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{[...eventList].map((val, index) => {
										const timestampSpace = spaceTimestamp(val.startTime, val.endTime)

										return (
											<TableBodyRow key={index}>
												<TableBodyCell>{val.name}</TableBodyCell>
												<TableBodyCell
													sx={{
														textAlign: 'right',
														fontFamily: 'Consolas',
														width: 215
													}}
												>
													S: {reformatTimestamp(val.startTime)}
													<br />
													E: {reformatTimestamp(val.endTime)}
												</TableBodyCell>
												<TableBodyCell sx={{ textAlign: 'center', width: 150 }}>
													<StyledLink
														href='#'
														onClick={openModal(timestampSpace ? 'edit' : 'take', val.id)}
													>
														{timestampSpace ? 'Sửa' : 'Điểm danh'}
													</StyledLink>
												</TableBodyCell>
											</TableBodyRow>
										)
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
					{/* <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}></Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							mt: 2,
							width: 'justifyContent'
						}}
					>
						<StyledButton variant='outlined'>Tạo mã</StyledButton>
						<StyledButton variant='outlined'>Tạo mã QR</StyledButton>
						<StyledButton variant='contained'>Xác nhận</StyledButton>
					</Box> */}
				</CardContent>
			</Card>
		</Box>
	)
}

export default Attendances
