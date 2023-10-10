import React, { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import classes from './styles.module.scss'

function FileUploadForm() {
	const [text, setText] = useState('')
	const [files, setFiles] = useState([])

	const handleTextChange = event => {
		setText(event.target.value)
	}

	const handleFileChange = event => {
		const fileList = Array.from(event.target.files)
		setFiles(prevFiles => [...prevFiles, ...fileList])
	}

	const handleRemoveFile = file => {
		setFiles(prevFiles => prevFiles.filter(f => f !== file))
	}

	const handleSubmit = event => {
		event.preventDefault()
	}

	return (
		<form onSubmit={handleSubmit}>
			<Typography variant='h6'>Tạo bản kế hoạch</Typography>
			<TextField
				label='Văn bản'
				multiline
				rows={4}
				value={text}
				onChange={handleTextChange}
				fullWidth
				margin='normal'
			/>

			<label htmlFor='file-upload' className={classes.label__fileupload}>
				<input
					className={classes.input__fileupload}
					type='file'
					id='file-upload'
					accept='.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx'
					onChange={handleFileChange}
					multiple
				/>
				Đính kèm tệp tin
			</label>

			<Typography variant='subtitle1'>Các tệp tin đã chọn:</Typography>
			{files.length > 0 ? (
				<ul>
					{files.map((file, index) => (
						<li key={index}>
							{file.name}
							<Button onClick={() => handleRemoveFile(file)}>Xóa</Button>
						</li>
					))}
				</ul>
			) : (
				<Typography variant='body2'>Chưa có tệp tin nào được chọn.</Typography>
			)}

			<Button type='submit' variant='contained' color='primary'>
				Gửi
			</Button>
		</form>
	)
}

export default FileUploadForm
