import { useState, useRef, useEffect } from 'react'
import { useCookies } from 'react-cookie'

import Modal from '@mui/material/Modal'
import { createProposal } from 'src/api-utils/apiUtils'

import { Box, Button, Chip, InputLabel, Paper, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import { TextareaAutosize } from '@mui/base'
import { Fragment } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { AiFillFileWord } from 'react-icons/ai'
import { AiFillFileExcel } from 'react-icons/ai'
import { AiOutlineFileUnknown } from 'react-icons/ai'
import { BiSolidFilePdf } from 'react-icons/bi'

import classes from './styles.module.scss'

import classNames from 'classnames'
import { getUserInfo } from 'src/utils/info'
import { toast } from 'react-toastify'

function NewProposal() {
	const [isFocused, setIsFocused] = useState(false)
	const [fileList, setFileList] = useState([])

	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const [userData, setUserData] = useState()

	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')

	const wrapperRef = useRef(null)

	const outline = classNames(isFocused ? classes.outline__orange : '')

	const handleFocus = () => {
		setIsFocused(true)
	}

	const handleBlur = () => {
		setIsFocused(false)
	}

	const onDragEnter = () => wrapperRef.current.classList.add('dragover')
	const onDragLeave = () => wrapperRef.current.classList.remove('dragover')
	const onDrop = () => wrapperRef.current.classList.remove('dragover')

	const onFileDrop = e => {
		const newFiles = e.target.files
		setFileList(current => [...current, ...newFiles])
	}

	const handleDeleteFile = file => {
		const updatedList = [...fileList]

		updatedList.splice(fileList.indexOf(file), 1)
		setFileList(updatedList)
	}

	const handleResetForm = () => {
		setTitle('')
		setContent('')
		setFileList([])
	}

	const readFile = file => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.onload = () => {
				const fileContent = reader.result.split(',')[1]
				resolve(fileContent)
			}
			reader.onerror = reject
			reader.readAsDataURL(file)
		})
	}

	const handleSubmitForm = async () => {
		const formData = new FormData()
		const numOfFile = fileList.length

		for (let i = 0; i < numOfFile; i++) {
			const fileContent = await readFile(fileList[i])
			formData.append(`filescontent[${i}]`, fileContent)

			console.log(formData.get(`filescontent[${i}]`))

			formData.append(`filesname[${i}]`, fileList[i].name)
			formData.append(`filesType[${i}]`, fileList[i].type)
		}

		formData.append('numOfFile', numOfFile)
		formData.append('title', title)
		formData.append('content', content)
		formData.append('clubId', 1)

		await createProposal(formData, userData.id).then(response => {
			if (response?.status == 'success') {
				toast.success('Gửi đề xuất thành công')
			} else {
				toast.error('Vui lòng thử lại sau')
			}
		})
	}

	return (
		<Fragment>
			<Typography variant='h5' sx={{ fontWeight: '600', marginBottom: '10px' }}>
				Thêm đề xuất mới
			</Typography>
			<Paper
				sx={{
					width: '100%',
					height: '100%',
					position: 'relative'
				}}
			>
				<Box
					sx={{
						width: '100%',

						borderRadius: '15px',
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						columnGap: '20px',
						overflow: 'hidden',
						marginBottom: '50px'
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							padding: '20px',
							gap: '20px'
						}}
					>
						<Box
							sx={{
								width: '100%',
								position: 'relative'
							}}
						>
							<img
								src='/assets/images/friends.jpg'
								width={'100%'}
								height={'250px'}
								alt='friends picture'
								style={{ borderRadius: '15px' }}
							/>
							<Typography
								sx={{
									position: 'absolute',
									top: '50%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
									width: 'auto',
									fontSize: '38px',
									fontWeight: '600',
									width: '70%',
									color: '#fff',
									textAlign: 'center'
								}}
							>
								Nơi cánh của mở ra
							</Typography>
						</Box>
						<Typography>
							Thật tuyệt khi bạn có đề xuất, ý tưởng giúp chúng ta phát triển và trở nên tốt đẹp, lớn mạnh
							hơn.
						</Typography>
						<Box sx={{ marginTop: '20px' }}>
							<div
								className={classes.dropbox}
								ref={wrapperRef}
								onDragEnter={onDragEnter}
								onDragLeave={onDragLeave}
								onDrop={onDrop}
							>
								<div className={classes.dropbox__label}>
									<AiOutlineCloudUpload className={classes.upload__icon} />
									<Typography sx={{ fontSize: '26px', fontWeight: '600', color: '#e3e3e3' }}>
										Kéo thả files ở đây
									</Typography>
								</div>
								<input type='file' value={''} onChange={onFileDrop} multiple />
							</div>
						</Box>
					</Box>
					<Box
						sx={{
							padding: '20px'
						}}
					>
						<InputLabel htmlFor='title' sx={{ fontSize: '20px', fontWeight: '600' }}>
							Tiêu đề
						</InputLabel>

						<TextField
							id='title'
							variant='standard'
							sx={{ width: 'calc(100% - 30px)', marginLeft: '30px', marginTop: '8px' }}
							value={title}
							onChange={event => {
								setTitle(event.target.value)
							}}
						/>

						<InputLabel htmlFor='title' sx={{ fontSize: '20px', fontWeight: '600', margin: '30px 0 20px' }}>
							Nội dung đề xuất
						</InputLabel>
						<TextareaAutosize
							maxRows={6}
							minRows={6}
							style={{
								width: 'calc(100% - 30px)',
								marginLeft: '30px',
								borderRadius: '10px',
								padding: '20px',
								fontSize: '18px',
								resize: 'none'
							}}
							spellCheck='false'
							className={outline}
							onFocus={handleFocus}
							onBlur={handleBlur}
							value={content}
							onChange={event => {
								setContent(event.target.value)
							}}
						/>

						<Typography sx={{ marginTop: '20px', fontSize: '16px', fontWeight: '600' }}>
							Files đính kèm:
						</Typography>
						<Box
							sx={{
								display: 'flex',
								flexWrap: 'wrap',
								margin: '20px 30px',
								gap: '10px'
							}}
						>
							{fileList?.map((file, index) => {
								let avatar = <AiOutlineFileUnknown style={{ fontSize: '20px', color: 'gray' }} />

								switch (file.type) {
									case 'application/msword':
									case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
										avatar = <AiFillFileWord style={{ fontSize: '20px', color: '#3581d7' }} />
										break

									case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
										avatar = <AiFillFileExcel style={{ fontSize: '20px', color: 'green' }} />
										break

									case 'application/pdf':
										avatar = <BiSolidFilePdf style={{ fontSize: '20px', color: 'orange' }} />
										break
								}

								return (
									<Chip
										avatar={avatar}
										key={index}
										label={file.name}
										onDelete={() => {
											handleDeleteFile(file)
										}}
										variant='outlined'
									/>
								)
							})}
						</Box>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						position: 'absolute',
						width: '100%',
						bottom: '30px',
						padding: '0 30px'
					}}
				>
					<Link href={'/dashboard/activity-proposals'}>
						<Button variant='contained'>Quay trở lại</Button>
					</Link>
					<Box sx={{ display: 'flex', gap: '40px' }}>
						<Button variant='contained' onClick={handleSubmitForm}>
							Gửi đi
						</Button>
						<Button variant='outlined' onClick={handleResetForm}>
							Xóa
						</Button>
					</Box>
				</Box>
			</Paper>
		</Fragment>
	)
}

export default NewProposal
