import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'

import ListItemButton from '@mui/material/ListItemButton'

import Typography from '@mui/material/Typography'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import { Autocomplete, TextField, Paper, Card, Checkbox, Box, Select, MenuItem, Button } from '@mui/material'

import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import NativeSelect from '@mui/material/NativeSelect'

import CircularProgress from '@mui/material/CircularProgress'
import { useCookies } from 'react-cookie'

import { getListOfAllUserByClubId } from 'src/api-utils/apiUtils'
import { useState } from 'react'
import { useEffect } from 'react'

import Badge from '@mui/material/Badge'

import { useRouter } from 'next/router'
import Link from 'next/link'

const UserList = () => {
	const [userList, setUserList] = useState(null)
	const [sortBy, setSortBy] = useState('')
	const [cookies, setCookie] = useCookies(['clubData'])
	const [searchValue, setSearchValue] = useState('')

	const listOfUserName = userList?.map(user => user.fullname)
	const router = useRouter()

	const clubId = cookies['clubData']?.clubId

	useEffect(() => {
		getListOfAllUserByClubId(clubId).then(data => {
			setUserList(data)
		})
	}, [clubId])

	function handleClick(id) {
		router.push('./members/info/' + id)
	}

	const filteredUserList = userList?.filter(user => {
		return user.studentCode.startsWith(searchValue) || user.fullname.startsWith(searchValue) || searchValue == ''
	})

	return (
		<Paper
			sx={{
				width: '100%',
				height: '100%'
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					height: '60px',
					padding: '0 20px',
					borderBottom: '2px solid #f27123'
				}}
			>
				<Typography variant='h6'>Danh sách thành viên</Typography>
				<Autocomplete
					options={listOfUserName}
					onChange={(event, value) => {
						if (value !== null) setSearchValue(value)
						else setSearchValue('')
					}}
					renderInput={params => (
						<TextField
							{...params}
							placeholder='Tìm kiếm theo tên, mã sinh viên'
							InputProps={{
								...params.InputProps,
								style: {
									borderRadius: '1000px',
									width: '400px',
									paddingLeft: '20px'
								}
							}}
							onChange={event => {
								setSearchValue(event.target.value)
							}}
							size='small'
						/>
					)}
				/>

				<FormControl>
					<InputLabel size='small' id='filter-label'>
						Sắp xếp
					</InputLabel>
					<Select
						labelId='filter-lable'
						label='Sắp xếp'
						id='filter'
						onChange={event => {
							setSortBy(event.target.value)
						}}
						value={sortBy}
						size='small'
					>
						<MenuItem value={'mark'}>Điểm thành tích</MenuItem>
						<MenuItem value={'name'}>Tên</MenuItem>
						<MenuItem value={'time'}>Thời gian hoạt động</MenuItem>
					</Select>
				</FormControl>
			</Box>
			<Box sx={{ height: '100%' }}>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						padding: '40px',
						gap: '20px'
					}}
				>
					{filteredUserList?.map(user => (
						<Card
							key={user.id}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: '20px',
								borderRadius: '15px',
								cursor: 'pointer',
								boxShadow: '0 0 10px #dedede'
							}}
							onClick={() => {
								handleClick(user.id)
							}}
						>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
								<Box
									sx={{
										width: '90px',
										height: '90px',
										borderRadius: '1000px',
										border: '3px solid #f27123',
										overflow: 'hidden'
									}}
								>
									<Avatar
										sx={{
											width: '90px',
											height: '90px',
											transition: 'transform .4s ease-in-out',
											':hover': { transform: 'scale(1.2)' }
										}}
										alt='avatar'
										src={
											user?.avatarURL ||
											(user.gender == '0'
												? '/images/avatars/5.png'
												: user.gender == '1'
												? '/images/avatars/6.png'
												: '')
										}
									/>
								</Box>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'flex-start',
										gap: '7px'
									}}
								>
									<Typography variant='h6'>{user.fullname}</Typography>
									<Typography
										variant='subtitle1'
										sx={{
											backgroundColor: '#f27123',
											display: 'inline-block',
											padding: '0 5px',
											borderRadius: '5px',
											color: 'white'
										}}
									>
										{user?.studentCode.toUpperCase()}
									</Typography>
								</Box>
							</Box>
							<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
								<Box
									sx={{
										padding: '5px',
										borderRadius: '1000px',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										':hover': {
											backgroundColor: '#ededed'
										}
									}}
								>
									<MoreHorizIcon sx={{ color: '#f27123', fontSize: '32px' }} />
								</Box>
							</Box>
						</Card>
					))}
				</Box>
			</Box>
		</Paper>
	)
}

export default UserList
