// ** React Imports
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import { Button, Grid, Stack, Typography, styled } from '@mui/material'
import Link from 'next/link'
import VerticalNavHeader from 'src/@core/layouts/components/vertical/navigation/VerticalNavHeader'

const LinkStyled = styled('Typography')(({ theme }) => ({
	color: '#27123'
}))

const LandingAppContent = props => {
	// ** Props
	const { hidden, settings, saveSettings, toggleNavVisibility } = props

	// ** Hook
	const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))
	const [cookies, setCookie, removeCookie] = useCookies(['userData'])

	return (
		<Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
			<Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
				{/* {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null} */}
				<VerticalNavHeader></VerticalNavHeader>
			</Box>
			<Stack direction='row' gap={12}>
				<Link href='/' underline='hover' passHref>
					<Button>Giới thiệu</Button>
				</Link>
				<Link href='/events' underline='hover' passHref>
					<Button>Sự kiện</Button>
				</Link>
				<Link href='/clubs' underline='hover' passHref>
					<Button>Câu lạc bộ</Button>
				</Link>
			</Stack>
			<Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
				{cookies['userData'] ? (
					<div>
						<ModeToggler settings={settings} saveSettings={saveSettings} />
						<NotificationDropdown />
						<UserDropdown settings={settings} saveSettings={saveSettings} />
					</div>
				) : (
					<Grid item xs={12}>
						<Link passHref href='/auth/login'>
							<Button variant='contained' sx={{ marginRight: 3.5 }}>
								Đăng nhập
							</Button>
						</Link>
						<Link passHref href='/auth/register'>
							<Button variant='outlined'>Đăng ký</Button>
						</Link>
					</Grid>
				)}
			</Box>
		</Box>
	)
}

export default LandingAppContent
