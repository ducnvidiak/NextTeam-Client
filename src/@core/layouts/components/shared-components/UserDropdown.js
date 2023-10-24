// ** React Imports
import { useState, Fragment, useRef, useEffect } from 'react'
import { useCookies } from 'react-cookie'

// ** Next Import
import { useRouter } from 'next/router'
import {
	Button,
	ButtonGroup,
	ClickAwayListener,
	Grid,
	Grow,
	MenuList,
	Modal,
	Paper,
	Popper,
	Stack
} from '@mui/material'

import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

// **Toasify Imports
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import LockIcon from '@mui/icons-material/Lock'
import Groups3Icon from '@mui/icons-material/Groups3'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { getUserInfo } from 'src/utils/info'
import HowToRegIcon from '@mui/icons-material/HowToReg'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
	width: 8,
	height: 8,
	borderRadius: '50%',
	backgroundColor: theme.palette.success.main,
	boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const ClubModal = styled('Modal')(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	background: '#fff',
	boxShadow: 24,
	padding: 20,
	borderRadius: 8
}))

const UserDropdown = props => {
	const { settings, saveSettings } = props

	// ** States

	const [anchorEl, setAnchorEl] = useState(null)
	const [open, setOpen] = useState(false)
	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const [clubData, setclubData, removeclubData] = useCookies(['clubData'])
	const [clubOfMeData, setClubOfMeData] = useState([])
	const [userData, setUserData] = useState()

	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	useEffect(() => {
		if (userData)
			fetch(`http://localhost:8080/club-user?action=view-my-list&userId=${userData?.id}`, {
				method: 'GET',
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			})
				.then(function (response) {
					return response.json()
				})
				.then(function (data) {
					console.log(data)
					setClubOfMeData(data)
				})
				.catch(error => console.error('Error:', error))
	}, [userData])

	// ** Hooks
	const router = useRouter()

	const handleDropdownOpen = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleLogout = e => {
		e.preventDefault()
		removeCookie('userData', { path: '/' })
		removeclubData('clubData', { path: '/' })
		router.push('/auth/login')
	}

	const handleDropdownClose = url => {
		if (url) {
			router.push(url)
		}
		setAnchorEl(null)
	}

	const handleChange = event => {
		var clubData = {
			clubId: event.target.value
		}
		setSelectedValue(event.target.value)

		{
			clubData.clubId == 'none' ? '' : router.push('/dashboard')
			setclubData('clubData', JSON.stringify(clubData), { path: '/' })
			toast.success('Bạn đang được chuyển tới trang của câu lạc bộ.')
		}
		setOpen(false)
	}

	const styles = {
		py: 2,
		px: 4,
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		color: 'text.primary',
		textDecoration: 'none',
		'& svg': {
			fontSize: '1.375rem',
			color: 'text.secondary'
		}
	}

	const anchorRef = useRef(null)
	const [selectedValue, setSelectedValue] = useState('')

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index)
		setOpenButton(false)
	}

	const handleToggle = () => {
		setOpenButton(prevOpen => !prevOpen)
	}

	const handleClose = event => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return
		}

		setOpen(false)
	}

	return (
		<Fragment key={settings.avatarVersion}>
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<ClubModal>
					<Typography
						id='modal-modal-title'
						variant='h5'
						component='h2'
						textAlign={'center'}
						marginBottom={4}
					>
						Truy cập vào câu lạc bộ
					</Typography>
					<Stack direction={'row'} justifyContent={'center'}>
						<FormControl fullWidth>
							<InputLabel htmlFor='gender-select'>Câu lạc bộ</InputLabel>
							<Select
								label='Câu lạc bộ'
								id='club-select'
								name='club'
								onChange={e => handleChange(e)}
								value={selectedValue}
							>
								<MenuItem value='none'>Lựa chọn</MenuItem>

								{clubOfMeData.map(option => (
									<MenuItem key={option.id} value={option.id}>
										{option.subname} - {option.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>
				</ClubModal>
			</Modal>
			<Badge
				overlap='circular'
				onClick={handleDropdownOpen}
				sx={{ ml: 2, cursor: 'pointer' }}
				badgeContent={<BadgeContentSpan />}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Avatar
					key={settings.avatarVersion}
					alt={userData?.lastname}
					onClick={handleDropdownOpen}
					sx={{ width: 40, height: 40 }}
					src={
						settings?.avatarURL ||
						userData?.avatarURL ||
						(userData?.gender == '0'
							? '/images/avatars/5.png'
							: userData?.gender == '1'
							? '/images/avatars/6.png'
							: null)
					}
				/>
			</Badge>
			<ToastContainer></ToastContainer>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => handleDropdownClose()}
				sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Box sx={{ pt: 2, pb: 3, px: 4 }}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Badge
							overlap='circular'
							badgeContent={<BadgeContentSpan />}
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
						>
							<Avatar
								alt={userData?.lastname}
								src={
									settings?.avatarURL ||
									userData?.avatarURL ||
									(userData?.gender == '0'
										? '/images/avatars/5.png'
										: userData?.gender == '1'
										? '/images/avatars/6.png'
										: null)
								}
								sx={{ width: '2.5rem', height: '2.5rem' }}
							/>
						</Badge>
						<Box
							sx={{
								display: 'flex',
								marginLeft: 3,
								alignItems: 'flex-start',
								flexDirection: 'column'
							}}
						>
							<Typography sx={{ fontWeight: 600 }}>Xin chào, {userData?.lastname}!</Typography>
							<Typography
								variant='body2'
								sx={{
									fontSize: '0.8rem',
									color: 'text.disabled'
								}}
							>
								{userData?.username?.toUpperCase()}
							</Typography>
						</Box>
					</Box>
				</Box>
				<Divider sx={{ mt: 0, mb: 1 }} />
				<MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
					<Box sx={styles}>
						<AccountOutline sx={{ marginRight: 2 }} />
						<Link passHref href={`/user/${userData?.id}`}>
							<Button>Hồ sơ cá nhân</Button>
						</Link>
					</Box>
				</MenuItem>
				<MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
					<Box sx={styles}>
						<HowToRegIcon sx={{ marginRight: 2 }} />
						<Link passHref href={'/application'}>
							<Button>Đơn đã gửi</Button>
						</Link>
					</Box>
				</MenuItem>

				<MenuItem
					sx={{ p: 0 }}
					onClick={() => {
						handleDropdownClose()
						setOpen(true)
					}}
				>
					<Box sx={styles}>
						<Groups3Icon sx={{ marginRight: 2 }} />
						<Button>CLB của bạn</Button>
					</Box>
				</MenuItem>
				<MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
					<Box sx={styles}>
						<LockIcon sx={{ marginRight: 2 }} />
						<Link passHref href={`/user/password/${userData?.id}`}>
							<Button>Đổi mật khẩu</Button>
						</Link>
					</Box>
				</MenuItem>
				<MenuItem sx={{ p: 0 }} onClick={handleLogout}>
					<Box sx={styles}>
						<LogoutVariant sx={{ marginRight: 2 }} />
						<Link onClick={handleLogout} passHref underline='none' href=''>
							<Button>Đăng xuất</Button>
						</Link>
					</Box>
				</MenuItem>
				{/* <Divider />
				<MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
					<Box sx={styles}>
						<CogOutline sx={{ marginRight: 2 }} />
						Settings
					</Box>
				</MenuItem>
				<MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
					<Box sx={styles}>
						<CurrencyUsd sx={{ marginRight: 2 }} />
						Pricing
					</Box>
				</MenuItem>
				<MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
					<Box sx={styles}>
						<HelpCircleOutline sx={{ marginRight: 2 }} />
						FAQ
					</Box>
				</MenuItem>
				<Divider />
				<MenuItem sx={{ py: 2 }} onClick={() => handleDropdownClose('/pages/login')}>
					<LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
					Logout
				</MenuItem> */}
			</Menu>
		</Fragment>
	)
}

export default UserDropdown
