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
import React, { useEffect } from 'react'
import classes from './styles.module.scss'
import { postAPI } from 'src/utils/request'
import { ToastContainer, toast } from 'react-toastify'
import { BsKeyFill } from 'react-icons/bs'

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

const SuccessSpan = styled('span')(theme => ({
	textTransform: 'uppercase',
	color: 'green'
}))

const ErrorSpan = styled('span')(theme => ({
	textTransform: 'uppercase',
	color: 'red'
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

function ImportForm({ setOpen, loadStudents }) {
	const [showPgsBar, setShowPgsBar] = React.useState(false)
	const [dragOver, setDragOver] = React.useState(false)
	const [processing, setProcessing] = React.useState(false)
	const [jsonData, setJsonData] = React.useState({})
	const theme = useTheme()

	function setupProgressBar() {
		setShowPgsBar(true)
	}

	function setProgressBarStatus(num, total) {
		var progressBar = document.querySelector(`.${classes.progressBar} .${classes.mainBar} .${classes.barStatus}`)
		var percent = document.querySelector(`.${classes.progressBar} p`)

		var value = (num * 100.0) / total
		progressBar.style.width = value + '%'
		percent.innerHTML = value.toFixed(2) + ' %'
	}

	const importSubmission = React.useCallback(
		event => {
			event.preventDefault()
			const form = event.target
			if (form.classList.contains(classes.error)) return
			document.getElementById('dropzoneInput').style.display = 'none'
			setupProgressBar()
			setProcessing(true)

			var error = 0
			;(async () => {
				for (let i = 1; i < jsonData.length; i++) {
					const row = jsonData[i]

					// Access cell values from the row
					const username = row['Mã SV']
					const { firstName, lastName } = splitFullName(row['Họ và tên'])
					const birthDate = row['Ngày sinh']
					const homeTown = row['Nơi sinh']
					const gender = row['Giới tính']

					// Post data to an API endpoint (assuming you have a 'post' function)
					const result = await postAPI('import-student', {
						cmd: 'import',
						username,
						firstName,
						lastName,
						birthDate,
						homeTown,
						gender
					})
					if (result.status == -1) {
						toast.error(`Lỗi ${result.status}: ${result.msg}. Nhập file thất bại!`)
						error++
						break
					} else if (result.status != 0) {
						toast.error(`Lỗi ${result.status}: ${result.msg}. Bỏ qua dòng ${i + 2}!`)
					}

					setProgressBarStatus(i, jsonData.length)
				}

				if (!error) {
					toast.success('Nhập danh sách sinh viên thành công!')
					loadStudents()
				}
				setProcessing(false)
				setOpen(false)
				form[1].innerHTML = 'Processing...'
				form[1].disabled = true
			})()
		},
		[jsonData, setOpen]
	)

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
				setJsonData(jsonData)
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
			<Typography id='transition-modal-title' variant='h4' component='h1' color={theme.palette.primary.main}>
				Nhập danh sách
			</Typography>
			<form id='e8Qh9TaDxUf0CqH3EgNp6Ym7JtKoR4nLvSs1Fz2XbGyIwP5dVcZ' onSubmit={importSubmission}>
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
				<Box className={classes.progressBar} style={{ display: showPgsBar ? 'block' : 'none' }}>
					<Box className={classes.mainBar}>
						<Box className={classes.barStatus}></Box>
					</Box>
					<p style={{ textAlign: 'center' }}>0 %</p>
				</Box>
				<Box sx={{ textAlign: 'center', mt: 7.5 }}>
					<Button type='submit' variant='contained' disabled={processing}>
						Confirm
					</Button>
				</Box>
			</form>
		</Box>
	)
}

const DeleteForm = ({ handleClick, setOpen, data }) => {
	const theme = useTheme()

	return (
		<Box autoComplete='off' component='div' sx={{ mt: 5 }}>
			<Typography id='transition-modal-title' variant='h4' component='h1' color={theme.palette.primary.main}>
				Nhập danh sách
			</Typography>
			<Typography variant='body1'>
				Bạn có chắc chắn muốn xóa{' '}
				<strong>
					{data.firstname} {data.lastname}
				</strong>{' '}
				khỏi danh sách không?
			</Typography>
			<Box component='div' display='flex' justifyContent='center' gap={2} mt={5}>
				<Button variant='outlined' onClick={handleClick(data.id)}>
					Có
				</Button>
				<Button variant='contained' onClick={() => setOpen(false)}>
					Không
				</Button>
			</Box>
		</Box>
	)
}

function StudentsManagement() {
	const [open, setOpen] = React.useState(false)
	const [filter, setFilter] = React.useState(-1)
	const [students, setStudents] = React.useState([])
	const _style = { ...style, width: '25%' }
	const theme = useTheme()

	async function loadStudents() {
		const result = await postAPI('import-student', {
			cmd: 'view',
			filter
		})

		if (result.status == 0) {
			console.log(result.data)
			setStudents(result.data)
		}
	}

	useEffect(() => loadStudents(), [filter])

	const openModal = (cmd, value) => event => {
		event.preventDefault()
		setOpen({ cmd, id: value })
	}

	const handleClick = id => () =>
		(async () => {
			const result = await postAPI('import-student', {
				cmd: 'del',
				id
			})
			if (result.status == 0) {
				setOpen(false)
				toast.success('Đã xóa thành công!')
				loadStudents()
			}
		})()

	return (
		<Box>
			<ToastContainer></ToastContainer>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open != false}
				onClose={() => setOpen(false)}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
			>
				<Fade in={open != false}>
					<Box sx={_style}>
						{open.cmd == 'add' && <ImportForm setOpen={setOpen} loadStudents={loadStudents} />}
						{open.cmd == 'del' && <DeleteForm setOpen={setOpen} handleClick={handleClick} data={open.id} />}
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
								<TableBody>
									{students.map((val, ind) => (
										<TableBodyRow key={ind}>
											<TableBodyCell>{val.firstname}</TableBodyCell>
											<TableBodyCell>{val.lastname}</TableBodyCell>
											<TableBodyCell>{val.id}</TableBodyCell>
											<TableBodyCell sx={{ textAlign: 'right' }}>{val.birthDate}</TableBodyCell>
											<TableBodyCell sx={{ textAlign: 'center' }}>
												{val.isRegistered == 'true' ? (
													<SuccessSpan>Đã đăng ký</SuccessSpan>
												) : (
													<ErrorSpan>Chưa đăng ký</ErrorSpan>
												)}
											</TableBodyCell>
											<TableBodyCell sx={{ textAlign: 'center' }}>
												<StyledLink href='#' onClick={openModal('del', val)}>
													xóa
												</StyledLink>
											</TableBodyCell>
										</TableBodyRow>
									))}
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

export default StudentsManagement
