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

import { getListOfAllUser } from '../../../api-utils/apiUtils'
import { useState } from 'react'
import { useEffect } from 'react'

import Badge from '@mui/material/Badge'

import { useRouter } from 'next/router'
import Link from 'next/link'

const UserList = () => {
	const [userList, setUserList] = useState(null)
	const [filterBy, setFilterBy] = useState('')

	const listOfUserName = userList?.map(user => user.fullname)
	const router = useRouter()

	console.log('user list: ', userList)

	useEffect(() => {
		getListOfAllUser().then(data => {
			setUserList(data)
		})
	}, [])

	function handleClick(id) {
		router.push('http://localhost:3000/dashboard/members/info/' + id)
	}

	return (
		<Paper
			sx={{
				width: '100%',
				height: '100%',
				borderRadius: '15px'
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					height: '60px',
					padding: '0 20px',
					borderBottom: '2px solid #F8C883'
				}}
			>
				<Typography variant='h6'>Danh sách thành viên</Typography>
				<Autocomplete
					options={listOfUserName}
					renderInput={params => (
						<TextField
							{...params}
							placeholder='Tìm kiếm theo tên'
							InputProps={{
								...params.InputProps,
								style: {
									borderRadius: '1000px',
									width: '400px',
									paddingLeft: '20px'
								}
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
							setFilterBy(event.target.value)
						}}
						value={filterBy}
						size='small'
					>
						<MenuItem value={'a'}>Điểm thành tích</MenuItem>
						<MenuItem value={'b'}>Tên</MenuItem>
						<MenuItem value={'c'}>Thời gian hoạt động</MenuItem>
					</Select>
				</FormControl>
			</Box>
			<Box sx={{ height: '100%' }}>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						padding: '40px',
						gap: '20px 50px'
					}}
				>
					{userList?.map(user => (
						<Card
							key={user.id}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: '20px',
								borderRadius: '15px',
								cursor: 'pointer',
								border: '1px solid #f5bb8e'
							}}
							onClick={() => {
								handleClick(user.id)
							}}
						>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
								<Box>
									<Avatar
										sx={{ width: '56px', height: '56px', border: '2px solid #f58a38' }}
										alt='avatar'
										src={user.avatarURL}
									/>
								</Box>
								<Box>
									<Typography variant='h6'>{user.fullname}</Typography>
									<Typography variant='subtitle1'>{user.studentCode}</Typography>
								</Box>
							</Box>
							<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
								<Card
									sx={{
										padding: '5px',
										borderRadius: '1000px',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center'
									}}
								>
									<MoreHorizIcon />
								</Card>
							</Box>
						</Card>
					))}
				</Box>
			</Box>
		</Paper>
	)

	// return (
	// 	<div className={classes.userList}>
	// 		<div>
	// 			<h3>Members List</h3>
	// 			<Card sx={{ minWidth: 120 }}>
	// 				<FormControl fullWidth>
	// 					<NativeSelect
	// 						defaultValue={10}
	// 						inputProps={{
	// 							name: 'age',
	// 							id: 'uncontrolled-native'
	// 						}}
	// 					>
	// 						<option value={10}>All</option>
	// 						<option value={20}>GDSC</option>
	// 						<option value={30}>DEVER</option>
	// 						<option value={40}>SRC</option>
	// 					</NativeSelect>
	// 				</FormControl>
	// 			</Card>
	// 		</div>
	// 		<hr />
	// 		<List dense sx={{ width: '100%', bgcolor: 'background.paper', padding: '20px' }}>
	// 			{userList !== null ? (
	// 				userList.map(member => {
	// 					const labelId = `checkCard-list-secondary-label-${member.id}`

	// 					return (
	// 						<ListItem key={member.id} disablePadding>
	// 							<ListItemButton
	// 								sx={{
	// 									height: '65px',
	// 									backgroundColor: 'rgb(249 250 251)',
	// 									marginBottom: '10px',
	// 									borderRadius: '8px'
	// 								}}
	// 								onClick={() => {
	// 									handleClick(member.id)
	// 								}}
	// 							>
	// 								<div className={classes.carditem}>
	// 									<div className={classes.carditem__left}>
	// 										<ListItemAvatar>
	// 											<Avatar alt={`Avatar ${member.fullname}`} src={member.avatarURL} />
	// 										</ListItemAvatar>
	// 										{/* <ListItemText
	// 									id={labelId}
	// 									primary={`${member.fullname}`}
	// 									secondary={'text secondary'}
	// 								/> */}
	// 										<div className={classes.info}>
	// 											<p>{member.fullname}</p>
	// 											<span>{member.studentCode}</span>
	// 										</div>
	// 									</div>
	// 									<div className={classes.logolist}>
	// 										<div className={classes.badge}></div>
	// 									</div>
	// 								</div>
	// 							</ListItemButton>
	// 						</ListItem>
	// 					)
	// 				})
	// 			) : (
	// 				<div className={classes.content}>
	// 					<CircularProgress />
	// 				</div>
	// 			)}
	// 		</List>
	// 	</div>
	// )
}

export default UserList
