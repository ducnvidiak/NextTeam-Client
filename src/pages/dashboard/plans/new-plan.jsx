import { useState, useRef, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

import Modal from '@mui/material/Modal'
import { createPlan } from 'src/api-utils/apiUtils'

import { Box, Button, Chip, FormHelperText, InputLabel, Paper, TextField, Typography } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

import Link from 'next/link'
import { TextareaAutosize } from '@mui/base'
import { Fragment } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { AiFillFileWord } from 'react-icons/ai'
import { AiFillFileExcel } from 'react-icons/ai'
import { AiOutlineFileUnknown } from 'react-icons/ai'
import { BiSolidFilePdf } from 'react-icons/bi'
import { BsFiletypePng, BsFiletypeJpg } from 'react-icons/bs'

import classes from './styles.module.scss'

import classNames from 'classnames'
import { getUserInfo } from 'src/utils/info'
import { toast } from 'react-toastify'

function NewPlan() {
	const [isFocused, setIsFocused] = useState(false)
	const [fileList, setFileList] = useState([])

	const [cookies, setCookie, removeCookie] = useCookies(['userData', 'clubId'])
	const [userData, setUserData] = useState()

	const [loading, setLoading] = useState(false)
	const router = useRouter()

	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')

	const [titleEmpty, setTitleEmpty] = useState(false)
	const [contentEmpty, setContentEmpty] = useState(false)

	console.log('club id: ', cookies['clubData']?.clubId)
	const clubId = cookies['clubData']?.clubId

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
		if (title.length == 0) setTitleEmpty(true)
		if (content.length == 0) setContentEmpty(true)
		if (title.length > 0 && content.length > 0) {
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
			formData.append('clubId', clubId)

			if (numOfFile > 0) setLoading(true)

			await createPlan(formData, 2).then(response => {
				if (response?.status == 'success') {
					toast.success('Gửi kế hoạch thành công')
					router.push('./')
				} else {
					toast.error('Vui lòng thử lại sau')
				}
				if (numOfFile > 0) setLoading(false)
			})
		} else {
			toast.error('Vui lòng điền đầy đủ thông tin')
		}
	}

	return (
		<Fragment>
			<Paper
				sx={{
					width: '100%',
					height: '100%',
					position: 'relative'
				}}
			>
				<Box
					sx={{
						width: '100%'
					}}
				>
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
							variant='outlined'
							sx={{ width: 'calc(100% - 30px)', marginTop: '8px' }}
							value={title}
							onChange={event => {
								if (event.target.value.length > 0) setTitleEmpty(false)
								setTitle(event.target.value)
							}}
							error={titleEmpty}
							helperText={titleEmpty && 'Thông tin này là bắt buộc'}
						/>

						<InputLabel htmlFor='title' sx={{ fontSize: '20px', fontWeight: '600', margin: '30px 0 20px' }}>
							Nội dung kế hoạch
						</InputLabel>
						<TextareaAutosize
							maxRows={3}
							minRows={3}
							style={{
								width: 'calc(100% - 30px)',

								borderRadius: '5px',
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
								if (event.target.value.length > 0) setContentEmpty(false)
								setContent(event.target.value)
							}}
						/>
						{contentEmpty && (
							<FormHelperText sx={{ color: 'red', marginLeft: '30px' }}>
								Thông tin nay là bắt buộc
							</FormHelperText>
						)}
						<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
							<Box>
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
										let avatar = (
											<AiOutlineFileUnknown style={{ fontSize: '20px', color: 'gray' }} />
										)

										switch (file.type) {
											case 'application/msword':
											case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
												avatar = (
													<AiFillFileWord style={{ fontSize: '20px', color: '#3581d7' }} />
												)
												break
											case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
												avatar = (
													<AiFillFileExcel style={{ fontSize: '20px', color: 'green' }} />
												)
												break
											case 'application/pdf':
												avatar = (
													<BiSolidFilePdf style={{ fontSize: '20px', color: 'orange' }} />
												)
												break
											case 'image/jpeg':
												avatar = <BsFiletypeJpg style={{ fontSize: '20px' }} />
												break
											case 'image/png':
												avatar = <BsFiletypePng style={{ fontSize: '20px' }} />
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
							<Box
								sx={{
									marginTop: '30px',
									marginRight: '30px',
									display: 'flex',
									justifyContent: 'flex-end'
								}}
							>
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
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						position: 'absolute',
						width: '100%',
						bottom: '20px',
						padding: '0 30px'
					}}
				>
					<Link href={'/dashboard/plans'}>
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
			<Modal open={loading} aria-labelledby='modal-loading' aria-describedby='modal-loading files to drive'>
				<Box
					sx={{
						width: '700px',
						position: 'absolute',
						top: '30%',
						left: '50%',
						transform: 'translateX(-50%)',
						overflow: 'hidden'
					}}
				>
					<Typography
						variant='h6'
						sx={{
							marginBottom: '5px',
							padding: '10px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#fff'
						}}
					>
						Các file đang được tải lên, vui lòng chờ!
					</Typography>
					<LinearProgress color='primary' />
				</Box>
			</Modal>
		</Fragment>
	)
}

export default NewPlan
