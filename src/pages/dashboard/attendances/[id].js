import { useRouter } from 'next/router'

function TakeAttendance() {
	const router = useRouter()
	console.log(router.query.id)

	return <></>
}

export default TakeAttendance
