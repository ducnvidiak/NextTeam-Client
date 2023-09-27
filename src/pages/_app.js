// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import '../../styles/forgot.scss'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
	Router.events.on('routeChangeStart', () => {
		NProgress.start()
	})
	Router.events.on('routeChangeError', () => {
		NProgress.done()
	})
	Router.events.on('routeChangeComplete', () => {
		NProgress.done()
	})
}

// ** Configure JSS & ClassName
const App = props => {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

	// Variables
	const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
				<meta
					name='description'
					content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
				/>
				<meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
				<meta name='viewport' content='initial-scale=1, width=device-width' />
				<style>
					@import
					url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
				</style>
			</Head>

			<SettingsProvider>
				<SettingsConsumer>
					{({ settings }) => {
						return (
							<ThemeComponent settings={settings}>
								{getLayout(<Component {...pageProps} />)}
							</ThemeComponent>
						)
					}}
				</SettingsConsumer>
			</SettingsProvider>
		</CacheProvider>
	)
}

export default App
