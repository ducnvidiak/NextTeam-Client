import { Backdrop, CircularProgress, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

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

		const member = userData.id(async () => {
			const res = await postAPI('attendance', {
				cmd: 'take',
				member,
				event
			})
			if (res.res == 0) setSuccess(true)
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
		</>
	)
}

export default TakeAttendance
