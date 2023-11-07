import {
	Backdrop,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Fade,
	Link,
	Modal,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	styled,
	useTheme
} from '@mui/material'
import React from 'react'
import classes from './styles.module.scss'
import { postAPI } from 'src/utils/request'

const XLSX = require('xlsx')

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

function splitFullName(fullName) {
	const names = fullName.split(' ')

	let firstName = names[0]
	let lastName = names[names.length - 1]

	if (names.length > 2) {
		// Handle middle names, if any
		const middleNames = names.slice(1, -1)
		firstName = firstName + ' ' + middleNames.join(' ')
	}

	return { firstName, lastName }
}

function StudentsManagement() {
	const [open, setOpen] = React.useState(false)
	const [showPgsBar, setShowPgsBar] = React.useState(false)
	const [dragOver, setDragOver] = React.useState(false)
	const [processing, setProcessing] = React.useState(false)
	const theme = useTheme()

	const openModal = (cmd, value) => event => {
		event.preventDefault()
		setOpen({ cmd, id: value })
	}

	async function importSubmission(event) {
		function setupProgressBar() {
			document.querySelector(`.${classes.progressBar}`).classList.remove(classes.hidden)
		}

		function setProgressBarStatus(num, total) {
			var progressBar = document.querySelector(`.${classes.progressBar} ${classes.mainBar} ${classes.barStatus}`)
			var percent = document.querySelector(`.${classes.progressBar} p`)

			var value = (num * 100.0) / total
			progressBar.style.width = value + '%'
			percent.innerHTML = value.toFixed(2) + ' %'
		}
		event.preventDefault()
		const form = event.target
		if (form.classList.contains('error')) return
		const file = form[0].files[0]
		const reader = new FileReader()
		document.getElementById('dropzoneInput').style.display = 'none'
		setupProgressBar()

		reader.onload = async function (e) {
			const data = new Uint8Array(e.target.result)
			const workbook = XLSX.read(data, { type: 'array' })
			const sheetName = workbook.SheetNames[0]
			const sheet = workbook.Sheets[sheetName]
			const jsonData = XLSX.utils.sheet_to_json(sheet)

			for (let i = 0; i < jsonData.length; i++) {
				const row = jsonData[i]

				// Access cell values from the row
				const username = row['Mã SV']
				const { firstName, lastName } = splitFullName(row['Họ và tên'])
				const birthDate = row['Ngày sinh']
				const homeTown = row['Nơi sinh']
				const gender = row['Giới tính']

				// Post data to an API endpoint (assuming you have a 'post' function)
				const result = await postAPI('', {})

				if (result.status !== 0) {
					console.error('There is some error occurred!')
					break
				}

				setProgressBarStatus(i, jsonData.length)
			}

			setProcessing(false)
			closePopup()
			show(currIndex)
		}

		reader.readAsArrayBuffer(file)
		form[1].innerHTML = 'Processing...'
		form[1].disabled = true
		setProcessing(true)
	}

	function inputOnChange(event) {
		const definedLength = 15

		var file = event.file
		if (!file) file = event.target.files[0]
		var parent = document.getElementById('dropzoneInput')
		if (!file) {
			parent.classList.remove(classes.droped)
			parent.classList.remove(classes.error)
			parent.classList.remove(classes.success)
			parent.innerHTML = `<p>Drag and drop files here</p>
				<label>Or click here to select files</label>`

			return
		}

		parent.classList.remove(classes.drag)
		parent.classList.remove(classes.success)
		parent.classList.add(classes.droped)
		parent.innerHTML = 'Uploading...'

		var reader = new FileReader()
		reader.onload = e => {
			const data = new Uint8Array(e.target.result)
			const workbook = XLSX.read(data, { type: 'array' })
			const sheetName = workbook.SheetNames[0]
			const sheet = workbook.Sheets[sheetName]
			const jsonData = XLSX.utils.sheet_to_json(sheet)
			console.log(jsonData)

			let isValid = true
			let errorLine = 0

			for (let i = 1; i < jsonData.length; i++) {
				const row = jsonData[i]
				const rowLength = Object.keys(row).length

				if (rowLength !== definedLength) {
					isValid = false
					errorLine = i + 2 // Add 2 because Excel starts counting from 1, and the header is usually the first row.
					break
				}
			}

			if (!isValid) {
				parent.classList.add(classes.error)
				parent.classList.remove(classes.success)
				parent.parentElement.classList.add(classes.error)
				parent.innerHTML = `Error at row ${errorLine}`
			} else {
				parent.classList.remove(classes.error)
				parent.classList.add(classes.success)
				parent.parentElement.classList.remove(classes.error)
				parent.innerHTML = `Uploading successfully!`
			}
		}
		reader.readAsArrayBuffer(file)
	}

	function handleDragleave(event) {
		setDragOver(false)
	}

	function handleDragover(event) {
		event.preventDefault()
		event.dataTransfer.dropEffect = 'copy'
		setDragOver(true)
	}

	function handleDrop(event) {
		event.preventDefault()
		var files = event.dataTransfer.files

		var fileInput = document.getElementById('file-input')
		fileInput.files = files

		var changeEvent = new Event('change', { bubbles: true })
		changeEvent.file = files[0]
		fileInput.dispatchEvent(changeEvent)
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
							Nhập danh sách
						</Typography>
						<Box>
							<Box
								variant='form'
								id='e8Qh9TaDxUf0CqH3EgNp6Ym7JtKoR4nLvSs1Fz2XbGyIwP5dVcZ'
								className='error'
								onSubmit={importSubmission}
							>
								<input
									type='file'
									id='file-input'
									name='files'
									style={{ display: 'none' }}
									accept='.xlsx'
									onChange={inputOnChange}
								/>
								<Box
									id='dropzoneInput'
									className={`${classes.dropzoneInput} ${dragOver ? classes.drag : ''}`}
									onClick={() => {
										document.getElementById('file-input').click()
									}}
									onDragOver={handleDragover}
									onDragLeave={handleDragleave}
									onDrop={handleDrop}
								>
									<p>Drag and drop files here</p>
									<label>Or click here to select files</label>
								</Box>
								<div className={classes.progressBar} style={{ display: showPgsBar ? 'block' : 'none' }}>
									<div className={classes.mainBar}>
										<div className={classes.barStatus}></div>
									</div>
									<p>0 %</p>
								</div>
							</Box>
						</Box>
					</Box>
				</Fade>
			</Modal>
			<Card>
				<CardHeader
					title='Danh sách sinh viên'
					titleTypographyProps={{ sx: { letterSpacing: '0.15px !important' } }}
					action={
						<Button variant='contained' onClick={openModal('add')}>
							Nhập danh sách
						</Button>
					}
				/>

				<CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
					<Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
						<TableContainer sx={{ borderRadius: 1, maxHeight: '75vh' }}>
							<Table stickyHeader aria-label='sticky table'>
								<TableHead>
									<TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
										<TableHeaderCell sx={{ width: 250 }}>Họ và tên đệm</TableHeaderCell>
										<TableHeaderCell sx={{ width: 100 }}>Tên</TableHeaderCell>
										<TableHeaderCell sx={{ width: 100 }}>MSSV</TableHeaderCell>
										<TableHeaderCell sx={{ textAlign: 'right' }}>Ngày sinh</TableHeaderCell>
										<TableHeaderCell sx={{ textAlign: 'center' }}>Trạng thái</TableHeaderCell>
										<TableHeaderCell sx={{ textAlign: 'center' }}>Hành động</TableHeaderCell>
									</TableRow>
								</TableHead>
								<TableBody></TableBody>
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
			{/* <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant='h5'>Điểm danh</Typography>

        <Box sx={{ mt: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tên</TableCell>
                        <TableCell align='right'>Điểm danh</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {members.map(member => (
                        <TableRow key={member.id}>
                            <TableCell>{member.name}</TableCell>
                            <TableCell align='right'>
                                <Checkbox
                                    checked={checked[member.id] || false}
                                    onChange={() => handleCheck(member.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>

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
        </Box>
    </Paper> */}
		</Box>
	)
}

export default StudentsManagement
