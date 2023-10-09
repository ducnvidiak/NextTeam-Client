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

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import NativeSelect from '@mui/material/NativeSelect'

import CircularProgress from '@mui/material/CircularProgress'

import { getListOfAllUser } from '../../user/apiUtils'
import { useState } from 'react'
import { useEffect } from 'react'

import Badge from '@mui/material/Badge'

import { useRouter } from 'next/router'

const UserList = () => {
	const [userList, setUserList] = useState(null)
	const router = useRouter()

	useEffect(() => {
		getListOfAllUser().then(data => {
			setUserList(data)
		})
	}, [])

	function handleClick(id) {
		router.push('http://localhost:3000/user/info/' + id)
	}

	return (
		<div className={classes.userList}>
			<div>
				<h3>Members List</h3>
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
			<List dense sx={{ width: '100%', bgcolor: 'background.paper', padding: '20px' }}>
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
										<div className={classes.logolist}>
											<div className={classes.badge}></div>
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

export default UserList
