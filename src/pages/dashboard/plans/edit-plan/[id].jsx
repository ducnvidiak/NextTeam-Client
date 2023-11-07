import { useState, useRef, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

import { getPlanByPlanId, getPlanFilesByPlanId } from 'src/api-utils/apiUtils'

import Modal from '@mui/material/Modal'
import { updatePlan } from 'src/api-utils/apiUtils'

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

import classes from '../styles.module.scss'

import classNames from 'classnames'
import { getUserInfo } from 'src/utils/info'
import { toast } from 'react-toastify'

function EditPlans() {
	const [isFocused, setIsFocused] = useState(false)
	const [fileRecords, setFileRecords] = useState(null)
	const [planId, setPlanId] = useState(null)

	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const [userData, setUserData] = useState()

	const [newFiles, setNewFiles] = useState([])
	const [deleteFiles, setDeleteFiles] = useState([])

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	const router = useRouter()
	const { id } = router.query

	useEffect(() => {
		setPlanId(id)

		if (planId) {
			getPlanByPlanId(planId).then(response => {
				console.log('plans: ', response)
				setTitle(response.title)
				setContent(response.content)
			})
			getPlanFilesByPlanId(planId).then(response => {
				console.log('file records: ', response)
				setFileRecords(response)
			})
		}
	}, [id, planId])

	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')

	const [titleEmpty, setTitleEmpty] = useState(false)
	const [contentEmpty, setContentEmpty] = useState(false)

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
		setNewFiles(current => [...current, ...newFiles])
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
			const numOfFile = newFiles.length
			const numOfDeleteFile = deleteFiles.length

			for (let i = 0; i < numOfFile; i++) {
				const fileContent = await readFile(newFiles[i])
				formData.append(`filescontent[${i}]`, fileContent)

				console.log(formData.get(`filescontent[${i}]`))

				formData.append(`filesname[${i}]`, newFiles[i].name)
				formData.append(`filesType[${i}]`, newFiles[i].type)
			}

			// formData.append('deleteFileRecords', deleteFiles)

			for (let i = 0; i < numOfDeleteFile; i++) {
				console.log(deleteFiles[i].fileId)
				console.log(deleteFiles[i].id)
				formData.append(`deleteFileId[${i}]`, deleteFiles[i].fileId)
			}

			formData.append('numOfDeleteFile', numOfDeleteFile)
			formData.append('numOfFile', numOfFile)
			formData.append('title', title)
			formData.append('content', content)

			if (numOfFile > 0 || numOfDeleteFile > 0) setLoading(true)

			await updatePlan(formData, planId).then(response => {
				if (response?.status == 'success') {
					toast.success('Cập nhật đề xuất thành công')
					router.push('../')
				} else {
					toast.error('Vui lòng thử lại sau')
				}
				if (numOfFile > 0 || numOfDeleteFile > 0) setLoading(false)
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
						width: '100%',
						marginBottom: '50px'
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
							Nội dung đề xuất
						</InputLabel>
						<TextareaAutosize
							maxRows={5}
							minRows={5}
							style={{
								width: 'calc(100% - 30px)',
								borderRadius: '10px',
								paddingTop: '20px',
								paddingLeft: '15px',
								paddingBottom: '20px',
								paddingRight: '15px',
								fontFamily: 'Be Vietnam Pro,sans-serif',
								fontSize: '16px',
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
									{fileRecords?.map((fileRecord, index) => {
										let avatar = (
											<AiOutlineFileUnknown style={{ fontSize: '20px', color: 'gray' }} />
										)

										switch (fileRecord.type) {
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
												label={fileRecord.name}
												onDelete={() => {
													const updatedList = [...fileRecords]
													updatedList.splice(fileRecords.indexOf(fileRecord), 1)
													setFileRecords(updatedList)
													setDeleteFiles(current => [...current, fileRecord])
												}}
												variant='outlined'
											/>
										)
									})}
									{newFiles?.map((file, index) => {
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
													const updatedList = [...newFiles]
													updatedList.splice(newFiles.indexOf(file), 1)
													setNewFiles(updatedList)
												}}
												variant='outlined'
											/>
										)
									})}
								</Box>
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									padding: '20px',
									gap: '20px'
								}}
							>
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
					<Link passHref href={'/dashboard/plans'}>
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
						Đang cập nhật, vui lòng chờ!
					</Typography>
					<LinearProgress color='primary' />
				</Box>
			</Modal>
		</Fragment>
	)
}

export default EditPlans
