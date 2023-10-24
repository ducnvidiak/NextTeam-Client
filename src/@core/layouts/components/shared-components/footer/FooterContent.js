// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
	// ** Var
	const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

	return (
		<Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
			<Typography sx={{ mr: 2 }}>
				{`© ${new Date().getFullYear()}, Được vận hành bởi `}
				<Link target='_blank' href='mailto:nextteam.fpt@gmail.com'>
					NextTeam
				</Link>
			</Typography>
			{hidden ? null : (
				<Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
					{/* <Link
            target='_blank'
            href='https://github.com/themeselection/materio-mui-react-nextjs-admin-template-free/blob/main/LICENSE'
          >
            Source code free Github
          </Link>
          <Link
            target='_blank'
            href='https://demos.themeselection.com/materio-mui-react-nextjs-admin-template/demo-1/dashboards/analytics/'
          >
            Demo Template Pro
          </Link>
          <Link
            target='_blank'
            href='https://demos.themeselection.com/materio-mui-react-nextjs-admin-template-free/'
          >
            Demo Template Free
          </Link>
          <Link
            target='_blank'
            href='https://github.com/themeselection/materio-mui-react-nextjs-admin-template-free/issues'
          >
            Support
          </Link> */}
				</Box>
			)}
		</Box>
	)
}

export default FooterContent
