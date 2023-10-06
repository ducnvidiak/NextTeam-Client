// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'
import { useEffect, useState } from 'react'

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  position: 'flexed',

  // right: 0,
  // width: 'calc(100% - 260px)',
  // background: '#fff',
  // boxShadow: theme.shadows[4],
  transition: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 6),
  color: theme.palette.text.primary,
  minHeight: theme.mixins.toolbar.minHeight,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  width: '100%',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  padding: `${theme.spacing(0)} !important`,
  minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
  transition:
    'padding .25s ease-in-out, box-shadow .25s ease-in-out, backdrop-filter .25s ease-in-out, background-color .25s ease-in-out'
}))

const LayoutAppBar = props => {
  // ** Props
  const { settings, verticalAppBarContent: userVerticalAppBarContent } = props

  // ** Hooks
  const theme = useTheme()

  // ** Vars
  const { contentWidth } = settings

  const [isScrollHeader, setScrollHeader] = useState(false)

  const handleScroll = e => {
    const y = document.documentElement.scrollTop
    if (y > 5) setScrollHeader(true)
    else setScrollHeader(false)
  }
  console.log(isScrollHeader)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <AppBar
      elevation={0}
      color='default'
      className='layout-navbar'
      position='fixed'
      sx={{
        transition: 'all 0.3s',
        right: isScrollHeader ? 24 : 0,
        width: isScrollHeader ? 'calc(100% - 308px)' : 'calc(100% - 260px)',
        borderBottomLeftRadius: isScrollHeader ? 12 : 0,
        borderBottomRightRadius: isScrollHeader ? 12 : 0,
        backdropFilter: 'blur(8px)',
        backgroundColor: isScrollHeader ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
        boxShadow: isScrollHeader ? 4 : 'none',
      }}
    >
      <Toolbar
        className='navbar-content-container'
        sx={{
          ...(contentWidth === 'boxed' && {
            '@media (min-width:1440px)': { maxWidth: `calc(1440px - ${theme.spacing(6)} * 2)` }
          })
        }}
      >
        {(userVerticalAppBarContent && userVerticalAppBarContent(props)) || null}
      </Toolbar>
    </AppBar>
  )
}

export default LayoutAppBar
