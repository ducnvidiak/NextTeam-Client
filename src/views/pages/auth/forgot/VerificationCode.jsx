import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import { postAPI } from 'src/utils/request'
import { toast } from 'react-toastify'

const OtpInput = styled('input')(({ theme }) => ({
	outlineColor: theme.palette.primary.main
}))

function VerificationCode(props) {
	const setStep = props.setStep
	const setRef = props.setRef
	const values = props.values

	const handleInputOtp = async ({ target }) => {
		// console.log(target.value)
		const numberCodeForm = document.querySelector('[data-number-code-form]')
		const numberCodeInputs = [...numberCodeForm.querySelectorAll('[data-number-code-input]')]
		if (!target.value.length) {
			return (target.value = null)
		}

		const inputLength = target.value.length
		let currentIndex = Number(target.dataset.numberCodeInput)

		if (inputLength > 1) {
			const inputValues = target.value.split('')

			inputValues.forEach((value, valueIndex) => {
				const nextValueIndex = currentIndex + valueIndex

				if (nextValueIndex >= numberCodeInputs.length) {
					return
				}

				numberCodeInputs[nextValueIndex].value = value
			})

			currentIndex += inputValues.length - 2
		}

		const nextIndex = currentIndex + 1

		if (nextIndex < numberCodeInputs.length) {
			numberCodeInputs[nextIndex].focus()
		}

		var data = ''
		numberCodeInputs.forEach(input => {
			data += input.value
		})
		if (data.length == 6) {
			const res = await postAPI('forgot-password', { command: 2, code: data, type: values.type })
			if (res.code == 0) {
				setStep(3)
			} else {
				if (res.res == 0) {
					toast.error('Mã xác minh đã bị khóa!')
				} else toast.error(res.msg.replace('__res', res.res))
			}
		}
	}

	const handleKeyDown = e => {
		const numberCodeForm = document.querySelector('[data-number-code-form]')
		const numberCodeInputs = [...numberCodeForm.querySelectorAll('[data-number-code-input]')]
		const { code, target } = e

		const currentIndex = Number(target.dataset.numberCodeInput)
		const previousIndex = currentIndex - 1
		const nextIndex = currentIndex + 1

		const hasPreviousIndex = previousIndex >= 0
		const hasNextIndex = nextIndex <= numberCodeInputs.length - 1

		switch (code) {
			case 'ArrowLeft':
			case 'ArrowUp':
				if (hasPreviousIndex) {
					numberCodeInputs[previousIndex].focus()
				}
				e.preventDefault()
				break

			case 'ArrowRight':
			case 'ArrowDown':
				if (hasNextIndex) {
					numberCodeInputs[nextIndex].focus()
				}
				e.preventDefault()
				break
			case 'Backspace':
				if (!e.target.value.length && hasPreviousIndex) {
					numberCodeInputs[previousIndex].value = null
					numberCodeInputs[previousIndex].focus()
				}
				break
			default:
				break
		}
	}

	return (
		<div className='step'>
			<Box sx={{ mb: 6 }}>
				<Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
					We sent you a verification code
				</Typography>
				<Typography variant='body2'>Please check your email for the verification code</Typography>
			</Box>
			<form
				noValidate
				autoComplete='off'
				onSubmit={e => {
					e.preventDefault()
				}}
			>
				<fieldset
					name='number-code'
					data-number-code-form
					style={{ border: 'none' }}
					onInput={handleInputOtp}
					onKeyDown={handleKeyDown}
				>
					<legend style={{ fontSize: 0 }}>Number Code</legend>
					{/* <TextField className={classes.input} /> */}
					<OtpInput
						className='otp-code'
						type='number'
						min='0'
						max='9'
						name='number-code-0'
						data-number-code-input='0'
						required
						ref={ref => setRef(ref)}
					/>
					<OtpInput
						className='otp-code'
						type='number'
						min='0'
						max='9'
						name='number-code-1'
						data-number-code-input='1'
						required
					/>
					<OtpInput
						className='otp-code'
						type='number'
						min='0'
						max='9'
						name='number-code-2'
						data-number-code-input='2'
						required
					/>
					<OtpInput
						className='otp-code'
						type='number'
						min='0'
						max='9'
						name='number-code-3'
						data-number-code-input='3'
						required
					/>
					<OtpInput
						className='otp-code'
						type='number'
						min='0'
						max='9'
						name='number-code-4'
						data-number-code-input='4'
						required
					/>
					<OtpInput
						className='otp-code'
						type='number'
						min='0'
						max='9'
						name='number-code-5'
						data-number-code-input='5'
						required
					/>
				</fieldset>
				{/* <Button fullWidth size='large' variant='contained' type='submit' sx={{ marginBottom: 7 }}>
												Next
											</Button> */}
			</form>
		</div>
	)
}

export default VerificationCode
