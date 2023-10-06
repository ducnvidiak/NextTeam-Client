import * as React from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { CardContent, Checkbox, Container, FormControlLabel, TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import { Editor } from '@tinymce/tinymce-react'

// **Toasify Imports
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Import the main component
import { Worker } from '@react-pdf-viewer/core'
import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core'

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

export default function ViewPDF({ viewCvModal, handleClose, cv }) {
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
						<Box sx={{ marginTop: '70px' }}>
							<Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
								<Viewer
									fileUrl={`http://localhost:8080${cv?.cvUrl}`}
									defaultScale={SpecialZoomLevel.PageFit}
								/>
							</Worker>
						</Box>
					</CardContent>
				</Container>
			</Dialog>
		</div>
	)
}
