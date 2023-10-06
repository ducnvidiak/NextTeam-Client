import { Container, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import React from 'react'

function Activities() {
	return (
		<Container maxWidth='lg' style={{ padding: 0 }}>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'} marginBottom={10}>
				<Typography fontSize={32} fontWeight={600}>
					HOẠT ĐỘNG CÂU LẠC BỘ
				</Typography>
				<FormControl variant='outlined' size='small'>
					<InputLabel>Bộ lọc</InputLabel>
					<Select label='Status' defaultValue='active'>
						<MenuItem value='active'>Tất cả</MenuItem>
						<MenuItem value='inactive'>Đã Đăng ký</MenuItem>
						<MenuItem value='pending'>Sự kiện đã qua</MenuItem>
					</Select>
				</FormControl>
			</Stack>
		</Container>
	)
}

export default Activities
