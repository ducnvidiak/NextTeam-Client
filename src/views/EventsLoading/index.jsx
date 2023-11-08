import { Skeleton, Stack } from '@mui/material'
import React from 'react'

function EventsLoading() {
	return (
		<>
        <Stack direction={'row'} justifyContent={'space-between'} marginBottom={10}>
			<Stack direction={'column'} width={'15%'} gap={1}>
				<Skeleton animation='wave' variant='rounded' height={30} />
				<Skeleton animation='wave' variant='rounded' height={30} />
				<Skeleton animation='wave' variant='rounded' height={20} />
			</Stack>
			<Skeleton variant='rounded' width={'75%'} height={240} />
		</Stack>
        <Stack direction={'row'} justifyContent={'space-between'} marginBottom={10}>
			<Stack direction={'column'} width={'15%'} gap={1}>
				<Skeleton animation='wave' variant='rounded' height={30} />
				<Skeleton animation='wave' variant='rounded' height={30} />
				<Skeleton animation='wave' variant='rounded' height={20} />
			</Stack>
			<Skeleton variant='rounded' width={'75%'} height={240} />
		</Stack>
        <Stack direction={'row'} justifyContent={'space-between'} marginBottom={10}>
			<Stack direction={'column'} width={'15%'} gap={1}>
				<Skeleton animation='wave' variant='rounded' height={30} />
				<Skeleton animation='wave' variant='rounded' height={30} />
				<Skeleton animation='wave' variant='rounded' height={20} />
			</Stack>
			<Skeleton variant='rounded' width={'75%'} height={240} />
		</Stack>
        </>
	)
}

export default EventsLoading
