import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Checkbox from '@mui/material/Checkbox'
import ListItemButton from '@mui/material/ListItemButton'
import classes from './styles.module.scss'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import NativeSelect from '@mui/material/NativeSelect'
import Button from '@mui/material/Button'

import CircularProgress from '@mui/material/CircularProgress'

import { getListOfAllUser } from '../../user/apiUtils'
import { useState } from 'react'
import { useEffect } from 'react'

import Badge from '@mui/material/Badge'

import { useRouter } from 'next/router'

function MemberApproval() {
	const [userList, setUserList] = useState(null)
	console.log('list of users: ', userList)
	const router = useRouter()

	useEffect(() => {
		getListOfAllUser().then(data => {
			setUserList(data)
		})
	}, [])

	function handleClick(id) {
		console.log('log: ', id)

		// router.push('http://localhost:3000/user/info/' + id)
	}

	const [status, setStatus] = React.useState(10)

	const handleChange = event => {
		setAge(event.target.value)
	}

	return (
		<div className={classes.userList}>
			<div>
				<h3>Danh sách chờ xét duyệt</h3>
				<Box sx={{ minWidth: 120 }}>
					<FormControl fullWidth>
						<NativeSelect
							defaultValue={10}
							inputProps={{
								name: 'age',
								id: 'uncontrolled-native'
							}}
						>
							<option value={10}>All</option>
							<option value={20}>GDSC</option>
							<option value={30}>DEVER</option>
							<option value={40}>SRC</option>
						</NativeSelect>
					</FormControl>
				</Box>
			</div>
			<hr />
			<List dense sx={{ width: '80%', bgcolor: 'background.paper', padding: '20px' }}>
				{userList !== null ? (
					userList.map(member => {
						const labelId = `checkbox-list-secondary-label-${member.id}`

						return (
							<ListItem key={member.id} disablePadding>
								<ListItemButton
									sx={{
										height: '65px',
										backgroundColor: 'rgb(249 250 251)',
										marginBottom: '10px',
										borderRadius: '8px'
									}}
									onClick={() => {
										handleClick(member.id)
									}}
								>
									<div className={classes.carditem}>
										<div className={classes.carditem__left}>
											<ListItemAvatar>
												<Avatar alt={`Avatar ${member.fullname}`} src={member.avatarURL} />
											</ListItemAvatar>
											{/* <ListItemText
										id={labelId}
										primary={`${member.fullname}`}
										secondary={'text secondary'}
									/> */}
											<div className={classes.info}>
												<p>{member.fullname}</p>
												<span>{member.studentCode}</span>
											</div>
										</div>

										<div className={classes.actionslist}>
											<Select
												labelId='demo-select-small-label'
												id='demo-select-small'
												value={status}
												label='Age'
												onChange={handleChange}
												sx={{ height: '30px' }}
											>
												<MenuItem value=''>
													<em>None</em>
												</MenuItem>
												<MenuItem value={10}>Chọn ban tham gia</MenuItem>
												<MenuItem value={20}>Twenty</MenuItem>
												<MenuItem value={30}>Thirty</MenuItem>
											</Select>
											<Button variant='contained'>Accept</Button>
											<Button variant='outlined'>Reject</Button>
										</div>
									</div>
								</ListItemButton>
							</ListItem>
						)
					})
				) : (
					<div className={classes.content}>
						<CircularProgress />
					</div>
				)}
			</List>
		</div>
	)
}

export default MemberApproval
