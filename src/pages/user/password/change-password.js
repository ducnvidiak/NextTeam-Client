import { useCookies } from 'react-cookie'
import Error404 from '../404'

function ChangePassword() {
	const [cookies, setCookie, removeCookie] = useCookies(['userData'])

	return cookies['userData'] ? <div>Change password</div> : <Error404 />
}

export default ChangePassword
