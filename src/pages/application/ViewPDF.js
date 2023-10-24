import * as React from 'react'
import Dialog from '@mui/material/Dialog'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { CardContent, Container } from '@mui/material'
import Box from '@mui/material/Box'

// Import the main component
import { Worker, Viewer, ScrollMode } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode'

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

export default function ViewPDF({ viewCvModal, handleClose, cv }) {
	const defaultLayoutPluginInstance = defaultLayoutPlugin()
	const scrollModePluginInstance = scrollModePlugin()

	return (
		<div>
			<Dialog fullScreen open={viewCvModal} onClose={handleClose} TransitionComponent={Transition}>
				<AppBar sx={{ position: 'fixed' }}>
					<Toolbar>
						<IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} color='white' variant='h6' component='div'>
							Xem CV của bạn
						</Typography>
					</Toolbar>
				</AppBar>
				<Container>
					<CardContent>
						<Box sx={{ marginTop: '8vh', height: '85vh' }}>
							<Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
								<Viewer
									fileUrl={`http://localhost:8080${cv?.cvUrl}`}
									plugins={[defaultLayoutPluginInstance, scrollModePluginInstance]}
									scrollMode={ScrollMode.Vertical}
								/>
							</Worker>
						</Box>
					</CardContent>
				</Container>
			</Dialog>
		</div>
	)
}
