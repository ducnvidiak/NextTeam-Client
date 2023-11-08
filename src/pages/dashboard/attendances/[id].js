import { Backdrop, Box, CircularProgress, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useCookies } from 'react-cookie'
import ForRole from 'src/layouts/ForRole'
import { getUserInfo } from 'src/utils/info'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Error } from '@mui/icons-material'
import { postAPI } from 'src/utils/request'

function TakeAttendance() {
	const router = useRouter()
	const [cookies, setCookies] = useCookies(['userData', 'clubData'])
	const [userData, setUserData] = React.useState()
	const [success, setSuccess] = React.useState(false)

	React.useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	React.useEffect(() => {
		const event = router.query.id

		const member = userData?.id
		;(async () => {
			const res = await postAPI('attendance', {
				cmd: 'take',
				member,
				event
			})
			if (res.res == 0) setSuccess(1)
			else if (res.res == 1) setSuccess(2)
		})()
	}, [router.query.id, userData])

	return (
		<>
			<Backdrop
				sx={{ color: '#aaa', zIndex: theme => theme.zIndex.drawer + 100, position: 'absolute' }}
				open={!success}
			>
				<CircularProgress color='primary' />
				<Typography>Đang điểm danh</Typography>
			</Backdrop>
			<Backdrop
				sx={{ color: '#aaa', zIndex: theme => theme.zIndex.drawer + 100, position: 'absolute' }}
				open={success == 1}
			>
				<Box sx={{ textAlign: 'center' }}>
					<CheckCircleIcon
						sx={{ color: 'green', backgroundColor: 'white', borderRadius: '50%', fontSize: 100 }}
					/>
					<Typography variant='h3' sx={{ color: 'white' }}>
						Điểm danh thành công!
					</Typography>
				</Box>
			</Backdrop>
			<Backdrop
				sx={{ color: '#aaa', zIndex: theme => theme.zIndex.drawer + 100, position: 'absolute' }}
				open={success == 2}
			>
				<Box sx={{ textAlign: 'center' }}>
					<Error sx={{ color: 'red', backgroundColor: 'white', borderRadius: '50%', fontSize: 100 }} />
					<Typography variant='h3' sx={{ color: 'white' }}>
						Bạn không tham gia sự kiện này
					</Typography>
				</Box>
			</Backdrop>
		</>
	)
}

export default TakeAttendance
